import { useEffect, useMemo, useState } from "react";
import { AFFIRMATIONS, ELEMENT_BADGE, GOALS, I18N, MICRO_ACTIONS, QUIZ, QUIZ_TEXT } from "./constants/index.js";

function formatStr(template, vars = {}) {
    return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}
function usePersistedState(key, initialValue) {
    const [val, setVal] = useState(() => {
        try {
            const raw = localStorage.getItem(key);
            if (raw === null) return initialValue;
            return JSON.parse(raw);
        } catch {
            return initialValue;
        }
    });
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(val));
        } catch { }
    }, [key, val]);
    return [val, setVal];
}

/**
 * ----------------------------------------------------------------------------
 * Theme: light / dark / system
 * ----------------------------------------------------------------------------
 * Tailwind dark mode uses 'dark' class on <html>.
 * - light: remove 'dark'
 * - dark: add 'dark'
 * - system: remove explicit control; apply based on matchMedia changes
 */
function applyTheme(theme) {
    const root = document.documentElement;
    root.classList.remove("dark");
    if (theme === "dark") root.classList.add("dark");
    // if system, do nothing here; we’ll handle via listener.
}
function useTheme(theme) {
    useEffect(() => {
        if (typeof window === "undefined") return;

        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const sync = () => {
            if (theme === "system") {
                document.documentElement.classList.toggle("dark", mq.matches);
            } else {
                applyTheme(theme);
            }
        };
        sync();
        mq.addEventListener?.("change", sync);
        return () => mq.removeEventListener?.("change", sync);
    }, [theme]);
}

function todayKey() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}
function pickOne(arr, seedStr) {
    let h = 0;
    for (let i = 0; i < seedStr.length; i++) h = (h * 31 + seedStr.charCodeAt(i)) >>> 0;
    return arr[h % arr.length];
}
function computeProfile(answerOpts) {
    const scores = { doer: 0, thinker: 0, feeler: 0, builder: 0, fire: 0, wind: 0, water: 0, earth: 0 };
    for (const opt of answerOpts) {
        if (!opt?.scores) continue;
        for (const [k, v] of Object.entries(opt.scores)) scores[k] = (scores[k] || 0) + v;
    }
    const archetypes = ["doer", "thinker", "feeler", "builder"];
    const elements = ["fire", "wind", "water", "earth"];
    const archetype = archetypes.reduce((best, k) => (scores[k] > scores[best] ? k : best), "doer");
    const element = elements.reduce((best, k) => (scores[k] > scores[best] ? k : best), "fire");
    return { archetype, element, scores };
}

/**
 * ----------------------------------------------------------------------------
 * Main Page — single file routing state
 * ----------------------------------------------------------------------------
 */
export default function Page() {
    const [lang, setLang] = usePersistedState("mvp_lang", "zh-TW"); // "zh-TW" | "en"
    const [theme, setTheme] = usePersistedState("mvp_theme", "system"); // "system" | "light" | "dark"
    useTheme(theme);

    const dict = I18N[lang] || I18N["zh-TW"];
    const t = (key, vars) => {
        const parts = key.split(".");
        let cur = dict;
        for (const p of parts) cur = cur?.[p];
        if (typeof cur === "string") return vars ? formatStr(cur, vars) : cur;
        return key; // fallback
    };

    const [view, setView] = useState("welcome"); // welcome | quiz | result | home | wall | progress | settings
    const [goalId, setGoalId] = usePersistedState("mvp_goalId", null);
    const [goalText, setGoalText] = usePersistedState("mvp_goalText", "");

    const [quizIndex, setQuizIndex] = usePersistedState("mvp_quizIndex", 0);
    const [picked, setPicked] = usePersistedState("mvp_quizPicked", {}); // qid -> optionId

    // Mock-ish persistence (but “real” UX): keep progress locally
    const [doneDatesArr, setDoneDatesArr] = usePersistedState("mvp_doneDates", []);
    const [streak, setStreak] = usePersistedState("mvp_streak", 0);
    const [evidence, setEvidence] = usePersistedState("mvp_evidence", []);
    const [todayMood, setTodayMood] = usePersistedState("mvp_todayMood", "happy");
    const [todayEvidenceText, setTodayEvidenceText] = usePersistedState("mvp_todayEvidenceText", "");

    const doneDates = useMemo(() => new Set(doneDatesArr), [doneDatesArr]);
    const todayDone = doneDates.has(todayKey());

    const answers = useMemo(() => {
        return QUIZ.map((q) => {
            const optId = picked[q.id];
            if (!optId) return null;
            return q.options.find((o) => o.id === optId) || null;
        }).filter(Boolean);
    }, [picked]);

    const profile = useMemo(() => computeProfile(answers), [answers]);
    const goal = useMemo(() => GOALS.find((g) => g.id === goalId) || null, [goalId]);
    const isReady = goalId && answers.length === QUIZ.length;
    function safeGo(next) {
        if (!isReady && next === "home") setView("welcome");
        else setView(next);
    }

    const dailyContent = useMemo(() => {
        if (!goalId) return null;
        const seed = `${todayKey()}|${goalId}|${profile.element}|${profile.archetype}|${lang}`;
        const affs = AFFIRMATIONS[goalId]?.[profile.element] || [];
        const acts = MICRO_ACTIONS[goalId]?.[profile.element] || [];
        const aff = affs.length ? pickOne(affs, seed + "|aff")[lang] : (lang === "en" ? "I take one small step today." : "我今天往前一步就好。");
        const act = acts.length ? pickOne(acts, seed + "|act")[lang] : (lang === "en" ? "Do a 5-minute action that supports you." : "做一個 5 分鐘的小行動照顧自己。");
        return { affirmation: aff, action: act };
    }, [goalId, profile.element, profile.archetype, lang]);

    // If user already completed setup before, land on Home for better UX
    useEffect(() => {
        if (goalId && answers.length === QUIZ.length && view === "welcome") {
            // keep user in welcome if they intentionally came back; otherwise can auto route later.
        }
    }, [goalId, answers.length, view]);

    function resetAll() {
        setGoalId(null);
        setGoalText("");
        setQuizIndex(0);
        setPicked({});
        setDoneDatesArr([]);
        setStreak(0);
        setEvidence([]);
        setTodayMood("happy");
        setTodayEvidenceText("");
    }

    function startQuiz() {
        if (!goalId) return;
        setView("quiz");
    }

    function onPickQuizOption(q, optId) {
        setPicked((p) => ({ ...p, [q.id]: optId }));
    }

    function nextQuiz() {
        const q = QUIZ[quizIndex];
        if (!picked[q.id]) return;
        if (quizIndex === QUIZ.length - 1) {
            setView("result");
            return;
        }
        setQuizIndex((i) => i + 1);
    }

    function prevQuiz() {
        setQuizIndex((i) => Math.max(0, i - 1));
    }

    function markDoneToday() {
        const k = todayKey();
        if (doneDates.has(k)) return;

        const newDone = new Set(doneDatesArr);
        newDone.add(k);
        setDoneDatesArr(Array.from(newDone));

        // streak logic: if yesterday done => +1 else reset to 1
        const d = new Date();
        d.setDate(d.getDate() - 1);
        const yk = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        const nextStreak = newDone.has(yk) ? (streak || 0) + 1 : 1;
        setStreak(nextStreak);

        const text = (todayEvidenceText || "").trim();
        const entry = {
            date: k,
            mood: todayMood,
            text: text || (lang === "en" ? "I completed today’s micro-action." : "我完成了今天的微行動。"),
            goalId,
        };
        setEvidence((ev) => [entry, ...ev]);

        // clear input for next day
        setTodayEvidenceText("");
    }

    const moods = useMemo(
        () => [
            { id: "happy", label: t("moods.happy") },
            { id: "calm", label: t("moods.calm") },
            { id: "fired", label: t("moods.fired") },
            { id: "tired", label: t("moods.tired") },
            { id: "sad", label: t("moods.sad") },
        ],
        [lang] // eslint-disable-line
    );

    // Apple-like soft UI tokens (Tailwind only)
    // - More whitespace, subtle borders, blur, rounded, calm typography
    return (
        <div className="min-h-dvh bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
            {/* top safe padding / centered container */}
            <div
                className={[
                    "mx-auto w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl",
                    // base padding
                    "px-4 sm:px-6",
                    // SAFE AREA: top/left/right
                    "pt-[calc(1.5rem+var(--sa-top))]",
                    "pl-[calc(1rem+var(--sa-left))] pr-[calc(1rem+var(--sa-right))]",
                    // SAFE AREA: bottom + reserve space for BottomNav
                    "pb-[calc(6.5rem+var(--sa-bottom))]",
                ].join(" ")}
            >
                <TopBar
                    appName={t("app.name")}
                    tagline={t("app.tagline")}
                    onGoHome={() => setView("home")}
                    canGoHome={view !== "home" && goalId && answers.length === QUIZ.length}
                    onRestart={() => {
                        resetAll();
                        setView("welcome");
                    }}
                    lang={lang}
                    setLang={setLang}
                    theme={theme}
                    setTheme={setTheme}
                    t={t}
                />

                <div className="mt-5">
                    {view === "welcome" && (
                        <Welcome
                            goalId={goalId}
                            goalText={goalText}
                            onPickGoal={setGoalId}
                            onGoalText={setGoalText}
                            onContinue={startQuiz}
                            t={t}
                            lang={lang}
                        />
                    )}

                    {view === "quiz" && (
                        <Quiz
                            quizIndex={quizIndex}
                            picked={picked}
                            onPick={onPickQuizOption}
                            onNext={nextQuiz}
                            onPrev={prevQuiz}
                            onExit={() => setView("welcome")}
                            t={t}
                            lang={lang}
                        />
                    )}

                    {view === "result" && (
                        <Result
                            goal={goal}
                            goalText={goalText}
                            profile={profile}
                            onGoHome={() => setView("home")}
                            onBackQuiz={() => setView("quiz")}
                            t={t}
                        />
                    )}

                    {view === "home" && (
                        <Home
                            goal={goal}
                            goalText={goalText}
                            profile={profile}
                            dailyContent={dailyContent}
                            streak={streak}
                            todayDone={todayDone}
                            moods={moods}
                            todayMood={todayMood}
                            onMood={setTodayMood}
                            todayEvidenceText={todayEvidenceText}
                            onEvidenceText={setTodayEvidenceText}
                            onDone={markDoneToday}
                            onOpenWall={() => setView("wall")}
                            onOpenProgress={() => setView("progress")}
                            t={t}
                        />
                    )}

                    {view === "wall" && (
                        <EvidenceWall
                            evidence={evidence}
                            goalLabels={GOALS.reduce((acc, g) => {
                                acc[g.id] = { emoji: g.emoji, label: t(`goals.${g.id}`) };
                                return acc;
                            }, {})}
                            moodsMap={moods.reduce((acc, m) => {
                                acc[m.id] = m.label;
                                return acc;
                            }, {})}
                            onBack={() => setView("home")}
                            t={t}
                        />
                    )}

                    {view === "progress" && (
                        <Progress
                            streak={streak}
                            doneCount={doneDates.size}
                            evidenceCount={evidence.length}
                            onBack={() => setView("home")}
                            t={t}
                        />
                    )}

                    {view === "settings" && (
                        <Settings
                            lang={lang}
                            setLang={setLang}
                            theme={theme}
                            setTheme={setTheme}
                            onBack={() => setView("welcome")}
                            t={t}
                        />
                    )}
                </div>

                <BottomNav
                    current={view}
                    onGo={safeGo}
                    isReady={goalId && answers.length === QUIZ.length}
                    t={t}
                />
            </div>
        </div>
    );
}

/* ----------------------------------------------------------------------------
 * UI Components — Apple-like softness (blur, subtle borders, calm typography)
 * ----------------------------------------------------------------------------
 */

function SoftCard({ children, className = "" }) {
    return (
        <div
            className={[
                "rounded-3xl border border-black/5 bg-white/80 shadow-sm backdrop-blur-xl",
                "dark:border-white/10 dark:bg-white/5",
                className,
            ].join(" ")}
        >
            {children}
        </div>
    );
}

function Pill({ children, active, onClick, className = "", disabled = false }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={[
                "rounded-2xl px-3 py-2 text-xs font-medium transition",
                "active:scale-[0.99]",
                disabled ? "opacity-40" : "opacity-100",
                active
                    ? "bg-black/10 text-neutral-900 dark:bg-white/15 dark:text-neutral-50"
                    : "bg-black/5 text-neutral-700 hover:bg-black/10 dark:bg-white/10 dark:text-neutral-200 dark:hover:bg-white/15",
                className,
            ].join(" ")}
        >
            {children}
        </button>
    );
}

function PrimaryButton({ children, onClick, disabled = false, className = "" }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={[
                "w-full rounded-2xl px-4 py-3 text-sm font-semibold",
                "transition active:scale-[0.99]",
                disabled
                    ? "bg-black/10 text-neutral-400 dark:bg-white/10 dark:text-neutral-500"
                    : "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200",
                className,
            ].join(" ")}
        >
            {children}
        </button>
    );
}

function SecondaryButton({ children, onClick, disabled = false, className = "" }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={[
                "w-full rounded-2xl px-4 py-3 text-sm font-semibold",
                "border border-black/10 bg-black/5 text-neutral-900 hover:bg-black/10",
                "dark:border-white/10 dark:bg-white/5 dark:text-neutral-100 dark:hover:bg-white/10",
                "transition active:scale-[0.99]",
                disabled ? "opacity-40" : "",
                className,
            ].join(" ")}
        >
            {children}
        </button>
    );
}

function TopBar({ appName, tagline, canGoHome, onGoHome, onRestart, lang, setLang, theme, setTheme, t }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-black/5 text-lg dark:bg-white/10">
                    ✨
                </div>
                <div>
                    <div className="text-sm font-semibold tracking-tight">{appName}</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">{tagline}</div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {canGoHome && (
                    <Pill onClick={onGoHome} active={false}>
                        {t("nav.home")}
                    </Pill>
                )}
                <Pill onClick={onRestart} active={false}>
                    {t("nav.restart")}
                </Pill>
            </div>
        </div>
    );
}

function Welcome({ goalId, goalText, onPickGoal, onGoalText, onContinue, t, lang }) {
    return (
        <div className="space-y-4">
            <SoftCard className="p-5">
                <div className="text-base font-semibold tracking-tight">{t("welcome.title")}</div>
                <div className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {t("welcome.subtitle")}
                </div>

                <div className="mt-5">
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                {t("welcome.goalLabel")}
                            </div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400">{t("welcome.goalHint")}</div>
                        </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {GOALS.map((g) => {
                            const active = goalId === g.id;
                            return (
                                <button
                                    key={g.id}
                                    onClick={() => onPickGoal(g.id)}
                                    className={[
                                        "rounded-3xl p-4 text-left transition active:scale-[0.99]",
                                        "border",
                                        active
                                            ? "border-black/10 bg-black/5 dark:border-white/15 dark:bg-white/10"
                                            : "border-black/5 bg-white/60 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
                                    ].join(" ")}
                                >
                                    <div className="text-lg">{g.emoji}</div>
                                    <div className="mt-2 text-sm font-semibold tracking-tight">{t(`goals.${g.id}`)}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-5">
                    <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                        {t("welcome.oneLineLabel")}
                    </label>
                    <input
                        value={goalText}
                        onChange={(e) => onGoalText(e.target.value)}
                        placeholder={t("welcome.oneLinePlaceholder")}
                        className={[
                            "mt-2 w-full rounded-2xl px-4 py-3 text-sm outline-none",
                            "border border-black/10 bg-white/70 placeholder:text-neutral-400 focus:border-black/20",
                            "dark:border-white/10 dark:bg-white/5 dark:placeholder:text-neutral-500 dark:focus:border-white/25",
                        ].join(" ")}
                    />
                </div>

                <div className="mt-5">
                    <PrimaryButton onClick={onContinue} disabled={!goalId}>
                        {goalId ? t("welcome.cta") : t("welcome.ctaDisabled")}
                    </PrimaryButton>
                </div>
            </SoftCard>

            <SoftCard className="p-5">
                <div className="text-sm font-semibold tracking-tight">{t("welcome.noteTitle")}</div>
                <div className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {t("welcome.noteBody")}
                </div>
            </SoftCard>

            <SoftFooter lang={lang} />
        </div>
    );
}

function SoftFooter({ lang }) {
    // Keep it minimal and production-ish; not “hint”
    const text =
        lang === "en"
            ? "This app is designed for reflection and habit-building. It does not provide medical or psychological diagnosis."
            : "本服務以自我覺察與習慣建立為主，不提供醫療或心理診斷。";
    return <div className="px-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-500">{text}</div>;
}

function Quiz({ quizIndex, picked, onPick, onNext, onPrev, onExit, t, lang }) {
    const q = QUIZ[quizIndex];
    const currentOptId = picked[q.id];

    const title = QUIZ_TEXT[lang]?.[q.titleKey] || q.titleKey;

    return (
        <div className="space-y-4">
            <SoftCard className="p-5">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold tracking-tight">{t("quiz.title")}</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                        {t("quiz.progress", { x: quizIndex + 1, n: QUIZ.length })}
                    </div>
                </div>

                <div className="mt-4 text-base font-semibold tracking-tight">{title}</div>

                <div className="mt-4 space-y-2">
                    {q.options.map((opt) => {
                        const optText = QUIZ_TEXT[lang]?.[opt.textKey] || opt.textKey;
                        const active = opt.id === currentOptId;
                        return (
                            <button
                                key={opt.id}
                                onClick={() => onPick(q, opt.id)}
                                className={[
                                    "w-full rounded-3xl px-4 py-3 text-left text-sm transition active:scale-[0.99]",
                                    "border",
                                    active
                                        ? "border-black/10 bg-black/5 dark:border-white/15 dark:bg-white/10"
                                        : "border-black/5 bg-white/60 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
                                ].join(" ")}
                            >
                                {optText}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-5 flex gap-2">
                    <SecondaryButton onClick={onPrev} disabled={quizIndex === 0} className="flex-1">
                        {t("quiz.prev")}
                    </SecondaryButton>
                    <PrimaryButton onClick={onNext} disabled={!picked[q.id]} className="flex-1">
                        {quizIndex === QUIZ.length - 1 ? t("quiz.seeResult") : t("quiz.next")}
                    </PrimaryButton>
                </div>

                <button
                    onClick={onExit}
                    className="mt-4 w-full text-center text-xs text-neutral-500 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
                >
                    {t("quiz.exit")}
                </button>
            </SoftCard>
        </div>
    );
}

function Result({ goal, goalText, profile, onGoHome, onBackQuiz, t }) {
    return (
        <div className="space-y-4">
            <SoftCard className="p-5">
                <div className="text-base font-semibold tracking-tight">{t("result.title")}</div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl border border-black/5 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
                        <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{t("result.archetypeTitle")}</div>
                        <div className="mt-1 text-lg font-semibold tracking-tight">{t(`archetype.${profile.archetype}`)}</div>
                    </div>

                    <div className="rounded-3xl border border-black/5 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
                        <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{t("result.elementTitle")}</div>
                        <div className="mt-1 text-lg font-semibold tracking-tight">
                            {ELEMENT_BADGE[profile.element]} {t(`element.${profile.element}`)}
                        </div>
                    </div>
                </div>

                <div className="mt-4 rounded-3xl border border-black/5 bg-black/5 p-4 text-sm text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200">
                    <div className="font-semibold">{t("result.whyTitle")}</div>
                    <div className="mt-2 leading-relaxed text-neutral-600 dark:text-neutral-300">{t("result.whyBody")}</div>
                </div>

                <div className="mt-4 rounded-3xl border border-black/5 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{t("result.goalTitle")}</div>
                    <div className="mt-1 text-sm font-semibold tracking-tight">
                        {goal ? `${goal.emoji} ${t(`goals.${goal.id}`)}` : t("result.goalEmpty")}
                    </div>
                    {goalText ? (
                        <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">“{goalText}”</div>
                    ) : null}
                </div>

                <div className="mt-5 flex gap-2">
                    <SecondaryButton onClick={onBackQuiz} className="flex-1">
                        {t("result.editQuiz")}
                    </SecondaryButton>
                    <PrimaryButton onClick={onGoHome} className="flex-1">
                        {t("result.enterDaily")}
                    </PrimaryButton>
                </div>
            </SoftCard>
        </div>
    );
}

function Home({
    goal,
    goalText,
    profile,
    dailyContent,
    streak,
    todayDone,
    moods,
    todayMood,
    onMood,
    todayEvidenceText,
    onEvidenceText,
    onDone,
    onOpenWall,
    onOpenProgress,
    t,
}) {
    if (!goal || !dailyContent) {
        return (
            <SoftCard className="p-5">
                <div className="text-sm text-neutral-600 dark:text-neutral-300">
                    {/* Production tone */}
                    {t("welcome.subtitle")}
                </div>
            </SoftCard>
        );
    }

    return (
        <div className="space-y-4">
            <SoftCard className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{t("home.goal")}</div>
                        <div className="mt-1 text-base font-semibold tracking-tight">
                            {goal.emoji} {t(`goals.${goal.id}`)}
                        </div>
                        {goalText ? <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">“{goalText}”</div> : null}
                    </div>

                    <div className="rounded-3xl border border-black/5 bg-black/5 px-3 py-2 text-right dark:border-white/10 dark:bg-white/5">
                        <div className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">{t("home.streak")}</div>
                        <div className="text-lg font-semibold tracking-tight">{streak} 🔥</div>
                    </div>
                </div>

                <div className="mt-5 rounded-3xl border border-black/5 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{t("home.affirmation")}</div>
                    <div className="mt-2 text-sm leading-relaxed">{dailyContent.affirmation}</div>

                    <div className="mt-3 flex flex-wrap gap-2">
                        <div className="rounded-2xl bg-black/5 px-3 py-2 text-xs text-neutral-700 dark:bg-white/10 dark:text-neutral-200">
                            {t("home.archetype")}: {t(`archetype.${profile.archetype}`)}
                        </div>
                        <div className="rounded-2xl bg-black/5 px-3 py-2 text-xs text-neutral-700 dark:bg-white/10 dark:text-neutral-200">
                            {t("home.element")}: {ELEMENT_BADGE[profile.element]} {t(`element.${profile.element}`)}
                        </div>
                    </div>
                </div>

                <div className="mt-4 rounded-3xl border border-black/5 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{t("home.action")}</div>
                    <div className="mt-2 text-sm leading-relaxed">{dailyContent.action}</div>
                </div>

                <div className="mt-4">
                    <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{t("home.mood")}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {moods.map((m) => (
                            <Pill key={m.id} active={todayMood === m.id} onClick={() => onMood(m.id)} className="text-sm">
                                {m.label}
                            </Pill>
                        ))}
                    </div>
                </div>

                <div className="mt-4">
                    <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                        {t("home.evidenceInputLabel")}
                    </label>
                    <input
                        value={todayEvidenceText}
                        onChange={(e) => onEvidenceText(e.target.value)}
                        placeholder={t("home.evidencePlaceholder")}
                        className={[
                            "mt-2 w-full rounded-2xl px-4 py-3 text-sm outline-none",
                            "border border-black/10 bg-white/70 placeholder:text-neutral-400 focus:border-black/20",
                            "dark:border-white/10 dark:bg-white/5 dark:placeholder:text-neutral-500 dark:focus:border-white/25",
                        ].join(" ")}
                    />
                    <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">{t("home.doneSub")}</div>
                </div>

                <div className="mt-5 space-y-3">
                    <PrimaryButton onClick={onDone} disabled={todayDone}>
                        {todayDone ? t("home.doneDone") : t("home.done")}
                    </PrimaryButton>

                    <div className="grid grid-cols-2 gap-2">
                        <SecondaryButton onClick={onOpenWall}>{t("home.openEvidence")}</SecondaryButton>
                        <SecondaryButton onClick={onOpenProgress}>{t("home.openProgress")}</SecondaryButton>
                    </div>
                </div>
            </SoftCard>

            <SoftCard className="p-5">
                <div className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{t("home.gentleNote")}</div>
            </SoftCard>
        </div>
    );
}

function EvidenceWall({ evidence, goalLabels, moodsMap, onBack, t }) {
    const [filterGoal, setFilterGoal] = useState("all");

    const goalsForFilter = useMemo(() => [{ id: "all" }, ...Object.keys(goalLabels).map((id) => ({ id }))], [goalLabels]);

    const filtered = useMemo(() => {
        if (filterGoal === "all") return evidence;
        return evidence.filter((e) => e.goalId === filterGoal);
    }, [evidence, filterGoal]);

    return (
        <div className="space-y-4">
            <SoftCard className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="text-base font-semibold tracking-tight">{t("evidence.title")}</div>
                        <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{t("evidence.subtitle")}</div>
                    </div>
                    <Pill onClick={onBack}>{t("nav.back")}</Pill>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {goalsForFilter.map((g) => {
                        const active = filterGoal === g.id;
                        const label =
                            g.id === "all"
                                ? t("evidence.filterAll")
                                : `${goalLabels[g.id]?.emoji || ""} ${goalLabels[g.id]?.label || ""}`;
                        return (
                            <Pill key={g.id} active={active} onClick={() => setFilterGoal(g.id)}>
                                {label}
                            </Pill>
                        );
                    })}
                </div>

                <div className="mt-4 space-y-3">
                    {filtered.length === 0 ? (
                        <div className="rounded-3xl border border-black/5 bg-black/5 p-4 text-sm text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                            {t("evidence.empty")}
                        </div>
                    ) : (
                        filtered.map((e, idx) => {
                            const g = goalLabels[e.goalId];
                            return (
                                <div
                                    key={`${e.date}-${idx}`}
                                    className="rounded-3xl border border-black/5 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{e.date}</div>
                                        <div className="text-sm">{moodsMap[e.mood] || "🙂"}</div>
                                    </div>
                                    <div className="mt-2 text-sm leading-relaxed">{e.text}</div>
                                    <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                                        {g ? `${g.emoji} ${g.label}` : ""}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </SoftCard>
        </div>
    );
}

function Progress({ streak, doneCount, evidenceCount, onBack, t }) {
    return (
        <div className="space-y-4">
            <SoftCard className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="text-base font-semibold tracking-tight">{t("progress.title")}</div>
                        <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{t("progress.subtitle")}</div>
                    </div>
                    <Pill onClick={onBack}>{t("nav.back")}</Pill>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <Stat title={t("progress.streak")} value={`${streak} 🔥`} />
                    <Stat title={t("progress.daysDone")} value={`${doneCount}`} />
                    <Stat title={t("progress.evidenceCount")} value={`${evidenceCount}`} />
                </div>

                <div className="mt-4 rounded-3xl border border-black/5 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="text-sm font-semibold tracking-tight">{t("progress.milestonesTitle")}</div>
                    <div className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{t("progress.milestonesBody")}</div>
                </div>
            </SoftCard>
        </div>
    );
}

function Stat({ title, value }) {
    return (
        <div className="rounded-3xl border border-black/5 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
            <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{title}</div>
            <div className="mt-1 text-lg font-semibold tracking-tight">{value}</div>
        </div>
    );
}

function Settings({ lang, setLang, theme, setTheme, onBack, t }) {
    return (
        <div className="space-y-4">
            <SoftCard className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="text-base font-semibold tracking-tight">{t("settings.title")}</div>
                    </div>
                    <Pill onClick={onBack}>{t("nav.back")}</Pill>
                </div>

                <div className="mt-5 space-y-4">
                    <Section title={t("settings.language")}>
                        <div className="flex flex-wrap gap-2">
                            <Pill active={lang === "zh-TW"} onClick={() => setLang("zh-TW")}>
                                繁體中文
                            </Pill>
                            <Pill active={lang === "en"} onClick={() => setLang("en")}>
                                English
                            </Pill>
                        </div>
                    </Section>

                    <Section title={t("settings.theme")}>
                        <div className="flex flex-wrap gap-2">
                            <Pill active={theme === "system"} onClick={() => setTheme("system")}>
                                {t("settings.themeSystem")}
                            </Pill>
                            <Pill active={theme === "light"} onClick={() => setTheme("light")}>
                                {t("settings.themeLight")}
                            </Pill>
                            <Pill active={theme === "dark"} onClick={() => setTheme("dark")}>
                                {t("settings.themeDark")}
                            </Pill>
                        </div>
                    </Section>

                    <Section title={t("settings.privacyTitle")}>
                        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{t("settings.privacyBody")}</p>
                    </Section>

                    <Section title={t("settings.aboutTitle")}>
                        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{t("settings.aboutBody")}</p>
                    </Section>
                </div>
            </SoftCard>
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div className="rounded-3xl border border-black/5 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
            <div className="text-xs font-semibold tracking-tight text-neutral-700 dark:text-neutral-200">{title}</div>
            <div className="mt-3">{children}</div>
        </div>
    );
}

function BottomNav({ current, onGo, isReady, t }) {
    const items = [
        { id: "home", label: t("nav.today"), emoji: "🏠" },
        { id: "wall", label: t("nav.evidence"), emoji: "🧱" },
        { id: "progress", label: t("nav.progress"), emoji: "📈" },
        { id: "settings", label: t("nav.settings"), emoji: "⚙️" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 border-t border-black/5 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-neutral-950/70">
            <div className="mx-auto w-full max-w-md px-4 pt-2 pb-[calc(0.5rem+var(--sa-bottom))] sm:max-w-lg sm:px-6 md:max-w-2xl lg:max-w-3xl">
                <div className="flex items-center justify-between gap-2">
                    {items.map((it) => {
                        const active = current === it.id;
                        return (
                            <button
                                key={it.id}
                                onClick={() => onGo(it.id)}
                                className={[
                                    "flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs transition active:scale-[0.99]",
                                    active
                                        ? "bg-black/5 text-neutral-900 dark:bg-white/10 dark:text-neutral-50"
                                        : "text-neutral-600 hover:bg-black/5 dark:text-neutral-300 dark:hover:bg-white/10",
                                ].join(" ")}
                            >
                                <div className="text-base">{it.emoji}</div>
                                <div className="text-[11px] font-medium">{it.label}</div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
