import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AFFIRMATIONS, ELEMENT_BADGE, GOALS, I18N, MICRO_ACTIONS, QUIZ, QUIZ_TEXT } from "./constants/index.js";

const TRANSITION_MS = 4000;

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
 */
function applyTheme(theme) {
    const root = document.documentElement;
    root.classList.remove("dark");
    if (theme === "dark") root.classList.add("dark");
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
 * Device-first tap helper
 * ----------------------------------------------------------------------------
 */
function useTapLock() {
    const lockRef = useRef(false);
    const lock = useCallback(() => {
        if (lockRef.current) return false;
        lockRef.current = true;
        return true;
    }, []);
    const unlock = useCallback(() => {
        lockRef.current = false;
    }, []);
    return { lock, unlock };
}

function isPrimaryPointer(e) {
    return !!e && "pointerType" in e;
}

function useModalA11y({ open, panelRef, onRequestClose, initialFocusRef }) {
    useEffect(() => {
        if (!open) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const panel = panelRef?.current;
        const initialEl = initialFocusRef?.current || panel;

        queueMicrotask(() => {
            try {
                initialEl?.focus?.();
            } catch { }
        });

        const onKeyDown = (e) => {
            if (!open) return;

            if (e.key === "Escape") {
                e.preventDefault();
                onRequestClose?.("escape");
                return;
            }

            if (e.key !== "Tab") return;
            if (!panel) return;

            const focusables = panel.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const list = Array.from(focusables).filter(
                (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
            );

            if (list.length === 0) {
                e.preventDefault();
                panel.focus?.();
                return;
            }

            const first = list[0];
            const last = list[list.length - 1];
            const active = document.activeElement;

            if (e.shiftKey) {
                if (active === first || !panel.contains(active)) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (active === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener("keydown", onKeyDown, true);
        return () => {
            document.body.style.overflow = prevOverflow;
            document.removeEventListener("keydown", onKeyDown, true);
        };
    }, [open, panelRef, onRequestClose, initialFocusRef]);
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
        return key;
    };

    const [view, setView] = useState("welcome"); // welcome | quiz | result | home | wall | settings
    const [goalId, setGoalId] = usePersistedState("mvp_goalId", null);
    const [goalText, setGoalText] = usePersistedState("mvp_goalText", "");

    const [quizIndex, setQuizIndex] = usePersistedState("mvp_quizIndex", 0);
    const [picked, setPicked] = usePersistedState("mvp_quizPicked", {});

    const [doneDatesArr, setDoneDatesArr] = usePersistedState("mvp_doneDates", []);
    const [streak, setStreak] = usePersistedState("mvp_streak", 0);
    const [steps, setSteps] = usePersistedState("mvp_Steps", []);
    const [todayMood, setTodayMood] = usePersistedState("mvp_todayMood", "happy");
    const [todayStepsText, setTodayStepsText] = usePersistedState("mvp_todayStepsText", "");

    const [autoModal, setAutoModal] = useState({ open: false, key: null });

    const autoModalVariant = useMemo(() => {
        if (!autoModal.open || !autoModal.key) return null;
        const list = dict?.modals?.[autoModal.key];
        if (!Array.isArray(list) || list.length === 0) return null;
        return pickOne(list, `${todayKey()}|${autoModal.key}|${lang}`);
    }, [autoModal.open, autoModal.key, lang, dict]);

    const transitionTimerRef = useRef(null);
    useEffect(() => {
        return () => {
            if (transitionTimerRef.current) {
                clearTimeout(transitionTimerRef.current);
                transitionTimerRef.current = null;
            }
        };
    }, []);

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

    // Setup completion
    const isReady = !!goalId && answers.length === QUIZ.length;

    const safeSetView = useCallback((next) => setView(next), []);

    // "GoHome" stays to the daily home
    const goHome = useCallback(() => safeSetView("home"), [safeSetView]);

    // New: go to welcome landing
    const goWelcome = useCallback(() => safeSetView("welcome"), [safeSetView]);

    const dailyContent = useMemo(() => {
        if (!goalId) return null;
        const seed = `${todayKey()}|${goalId}|${profile.element}|${profile.archetype}|${lang}`;
        const affs = AFFIRMATIONS[goalId]?.[profile.element] || [];
        const acts = MICRO_ACTIONS[goalId]?.[profile.element] || [];
        const aff = affs.length
            ? pickOne(affs, seed + "|aff")[lang]
            : lang === "en"
                ? "I take one small step today."
                : "我今天往前一步就好。";
        const act = acts.length
            ? pickOne(acts, seed + "|act")[lang]
            : lang === "en"
                ? "Do a 5-minute action that supports you."
                : "做一個 5 分鐘的小行動照顧自己。";
        return { affirmation: aff, action: act };
    }, [goalId, profile.element, profile.archetype, lang]);

    function resetAll() {
        setGoalId(null);
        setGoalText("");
        setQuizIndex(0);
        setPicked({});
        setDoneDatesArr([]);
        setStreak(0);
        setSteps([]);
        setTodayMood("happy");
        setTodayStepsText("");
    }

    function onPickQuizOption(q, optId) {
        setPicked((p) => ({ ...p, [q.id]: optId }));
    }

    function nextQuiz() {
        const q = QUIZ[quizIndex];
        if (!picked[q.id]) return;
        if (quizIndex === QUIZ.length - 1) {
            safeSetView("result");
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

        const d = new Date();
        d.setDate(d.getDate() - 1);
        const yk = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        const nextStreak = newDone.has(yk) ? (streak || 0) + 1 : 1;
        setStreak(nextStreak);

        const text = (todayStepsText || "").trim();
        const entry = {
            date: k,
            mood: todayMood,
            text: text || (lang === "en" ? "I completed today’s micro-action." : "我完成了今天的微行動。"),
            goalId,
        };
        setSteps((ev) => [entry, ...ev]);
        setTodayStepsText("");
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

    const pendingNextRef = useRef(null);

    const startTransitionToQuiz = useCallback(() => {
        if (transitionTimerRef.current) {
            clearTimeout(transitionTimerRef.current);
            transitionTimerRef.current = null;
        }
        setAutoModal({ open: false, key: null });
        pendingNextRef.current = null;
        safeSetView("quiz");
    }, [safeSetView]);

    const onStartQuizFromGate = useCallback(() => {
        // if no goal yet, welcome is the place to pick one
        if (!goalId) {
            safeSetView("welcome");
            return;
        }
        safeSetView("quiz");
    }, [goalId, safeSetView]);

    return (
        <div
            className={[
                "min-h-dvh bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50",
                "text-[15px] sm:text-[16px] lg:text-[17px]",
                "antialiased",
            ].join(" ")}
        >
            <div
                className={[
                    "mx-auto w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl",
                    "px-4 sm:px-6 md:px-8",
                    "pt-[calc(1.25rem+var(--sa-top))] sm:pt-[calc(1.5rem+var(--sa-top))] md:pt-[calc(1.75rem+var(--sa-top))]",
                    "pl-[calc(1rem+var(--sa-left))] pr-[calc(1rem+var(--sa-right))]",
                    "pb-[calc(6.75rem+var(--sa-bottom))] sm:pb-[calc(7.25rem+var(--sa-bottom))] md:pb-[calc(7.75rem+var(--sa-bottom))]",
                ].join(" ")}
            >
                <TopBar
                    appName={t("app.name")}
                    tagline={t("app.tagline")}
                    onGoHome={goHome} // ✅ GoHome stays to daily home
                    canGoHome={view !== "home" && isReady}
                    onGoWelcome={goWelcome} // ✅ New: welcome landing
                    canGoWelcome={view !== "welcome"}
                    onRestart={() => {
                        resetAll();
                        safeSetView("welcome");
                    }}
                    lang={lang}
                    setLang={setLang}
                    theme={theme}
                    setTheme={setTheme}
                    t={t}
                />

                <div className="mt-5 sm:mt-6 md:mt-7">
                    {view === "welcome" && (
                        <Welcome
                            goalId={goalId}
                            goalText={goalText}
                            onPickGoal={setGoalId}
                            onGoalText={setGoalText}
                            onContinue={() => {
                                if (!goalId) return;

                                if (transitionTimerRef.current) {
                                    clearTimeout(transitionTimerRef.current);
                                    transitionTimerRef.current = null;
                                }

                                pendingNextRef.current = "quiz";
                                setAutoModal({ open: true, key: "start" });

                                transitionTimerRef.current = setTimeout(() => {
                                    transitionTimerRef.current = null;
                                    setAutoModal({ open: false, key: null });
                                    pendingNextRef.current = null;
                                    safeSetView("quiz");
                                }, TRANSITION_MS);
                            }}
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
                            onExit={() => safeSetView("welcome")}
                            t={t}
                            lang={lang}
                        />
                    )}

                    {view === "result" && (
                        <Result
                            goal={goal}
                            goalText={goalText}
                            profile={profile}
                            onGoHome={goHome}
                            onBackQuiz={() => safeSetView("quiz")}
                            t={t}
                        />
                    )}

                    {view === "home" && (
                        <Home
                            isReady={isReady}
                            onStartQuiz={onStartQuizFromGate}
                            goal={goal}
                            goalText={goalText}
                            profile={profile}
                            dailyContent={dailyContent}
                            streak={streak}
                            todayDone={todayDone}
                            moods={moods}
                            todayMood={todayMood}
                            onMood={setTodayMood}
                            todayStepsText={todayStepsText}
                            onStepsText={setTodayStepsText}
                            onDone={markDoneToday}
                            onOpenWall={() => safeSetView("wall")}
                            t={t}
                            lang={lang}
                        />
                    )}

                    {view === "wall" && (
                        <StepsWall
                            steps={steps}
                            streak={streak}
                            doneCount={doneDates.size}
                            stepsTaken={steps.length}
                            goalLabels={GOALS.reduce((acc, g) => {
                                acc[g.id] = { emoji: g.emoji, label: t(`goals.${g.id}`) };
                                return acc;
                            }, {})}
                            moodsMap={moods.reduce((acc, m) => {
                                acc[m.id] = m.label;
                                return acc;
                            }, {})}
                            onBack={goHome}
                            t={t}
                        />
                    )}

                    {view === "settings" && (
                        <Settings
                            lang={lang}
                            setLang={setLang}
                            theme={theme}
                            setTheme={setTheme}
                            onBack={() => safeSetView("welcome")}
                            t={t}
                        />
                    )}
                </div>

                <AutoTransitionModal
                    open={autoModal.open && !!autoModalVariant}
                    title={autoModalVariant?.title}
                    body={autoModalVariant?.body}
                    tip={autoModalVariant?.tip}
                    durationMs={TRANSITION_MS}
                    onRequestClose={() => {
                        if (pendingNextRef.current === "quiz") startTransitionToQuiz();
                        else setAutoModal({ open: false, key: null });
                    }}
                />

                <BottomNav current={view} onGo={safeSetView} isReady={isReady} t={t} />
            </div>
        </div>
    );
}

function AutoTransitionModal({ open, title, body, tip, durationMs = 1500, onRequestClose }) {
    const D = durationMs / 1000;
    const panelRef = useRef(null);
    const closeBtnRef = useRef(null);

    useModalA11y({
        open,
        panelRef,
        onRequestClose,
        initialFocusRef: closeBtnRef,
    });

    const onOverlayPointerUp = (e) => {
        if (e.target === e.currentTarget) onRequestClose?.("overlay");
    };

    return (
        <AnimatePresence>
            {open ? (
                <motion.div
                    className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-6"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Transition dialog"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onPointerUp={onOverlayPointerUp}
                >
                    <motion.div
                        className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    <motion.div
                        ref={panelRef}
                        tabIndex={-1}
                        className={[
                            "relative w-full max-w-sm sm:max-w-md md:max-w-lg",
                            "overflow-hidden rounded-[36px]",
                            "border border-black/10 bg-white/92 shadow-2xl backdrop-blur-xl",
                            "ring-1 ring-black/10",
                            "dark:border-white/10 dark:bg-neutral-950/82",
                            "touch-manipulation",
                            "outline-none",
                        ].join(" ")}
                        initial={{ opacity: 0, y: 18, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.99 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        onPointerUp={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <button
                            ref={closeBtnRef}
                            onPointerUp={(e) => {
                                e.preventDefault();
                                onRequestClose?.("button");
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                onRequestClose?.("button");
                            }}
                            className="sr-only"
                        >
                            Close
                        </button>

                        {/* Top animation area */}
                        <div className="relative h-64 sm:h-72 md:h-80">
                            <div className="absolute inset-0">
                                <motion.div
                                    className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-black/10 blur-3xl dark:bg-white/10"
                                    initial={{ x: -24, y: 0, scale: 0.92, opacity: 0.7 }}
                                    animate={{ x: 52, y: 18, scale: 1.07, opacity: 0.9 }}
                                    transition={{ duration: D, ease: "easeInOut" }}
                                />
                                <motion.div
                                    className="absolute -right-28 bottom-0 h-72 w-72 rounded-full bg-black/10 blur-3xl dark:bg-white/10"
                                    initial={{ x: 24, y: 0, scale: 0.95, opacity: 0.7 }}
                                    animate={{ x: -52, y: -18, scale: 1.1, opacity: 0.9 }}
                                    transition={{ duration: D, ease: "easeInOut" }}
                                />
                            </div>

                            <div className="absolute inset-0 grid place-items-center">
                                <svg width="280" height="280" viewBox="0 0 280 280" className="opacity-95">
                                    <defs>
                                        <radialGradient id="petalPink" cx="35%" cy="30%" r="70%">
                                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                                            <stop offset="58%" stopColor="#FBCFE8" stopOpacity="0.95" />
                                            <stop offset="100%" stopColor="#FB7185" stopOpacity="0.95" />
                                        </radialGradient>
                                        <radialGradient id="petalCoral" cx="35%" cy="30%" r="70%">
                                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                                            <stop offset="62%" stopColor="#FED7AA" stopOpacity="0.95" />
                                            <stop offset="100%" stopColor="#FB923C" stopOpacity="0.95" />
                                        </radialGradient>
                                        <radialGradient id="centerWarm" cx="35%" cy="30%" r="70%">
                                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
                                            <stop offset="55%" stopColor="#FDBA74" stopOpacity="0.95" />
                                            <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.92" />
                                        </radialGradient>
                                        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                                            <feGaussianBlur stdDeviation="6" result="blur" />
                                            <feMerge>
                                                <feMergeNode in="blur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                    </defs>

                                    <motion.circle
                                        cx="140"
                                        cy="140"
                                        r="54"
                                        fill="none"
                                        stroke="#FBCFE8"
                                        strokeOpacity="0.55"
                                        strokeWidth="28"
                                        filter="url(#softGlow)"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: [0, 0.5, 0.22], scale: [0.9, 1.06, 1.0] }}
                                        transition={{ duration: D, times: [0, 0.55, 1], ease: "easeInOut" }}
                                    />

                                    <motion.g
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 0, 1, 0] }}
                                        transition={{ duration: D, times: [0, 0.5, 0.78, 1], ease: "easeOut" }}
                                    >
                                        <motion.circle
                                            cx="92"
                                            cy="98"
                                            r="2.6"
                                            fill="#FFFFFF"
                                            opacity="0.85"
                                            animate={{ y: [0, -8, 0], opacity: [0.35, 0.95, 0.35] }}
                                            transition={{ duration: 0.95, repeat: Infinity, ease: "easeInOut" }}
                                        />
                                        <motion.circle
                                            cx="198"
                                            cy="102"
                                            r="2.2"
                                            fill="#FED7AA"
                                            opacity="0.85"
                                            animate={{ y: [0, -9, 0], opacity: [0.3, 0.9, 0.3] }}
                                            transition={{ duration: 1.05, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                                        />
                                        <motion.circle
                                            cx="212"
                                            cy="160"
                                            r="2.0"
                                            fill="#FBCFE8"
                                            opacity="0.8"
                                            animate={{ y: [0, -7, 0], opacity: [0.25, 0.85, 0.25] }}
                                            transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                                        />
                                    </motion.g>

                                    <motion.path
                                        d="M140 98
                       C120 114, 112 132, 120 154
                       C126 170, 136 178, 140 194
                       C144 178, 154 170, 160 154
                       C168 132, 160 114, 140 98 Z"
                                        fill="#F43F5E"
                                        opacity="0.28"
                                        initial={{ opacity: 0.28, scale: 0.92, transformOrigin: "140px 150px" }}
                                        animate={{ opacity: [0.28, 0.28, 0], scale: [0.92, 0.95, 1.0] }}
                                        transition={{ duration: D, times: [0, 0.35, 0.72], ease: "easeInOut" }}
                                    />

                                    <motion.g
                                        style={{ transformOrigin: "140px 150px" }}
                                        initial={{ rotate: 0, y: 0 }}
                                        animate={{ rotate: [0, -2.4, 2.4, -1.8, 1.8, 0], y: [0, 2, -2, 1.4, -1.4, 0] }}
                                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                                    >
                                        <motion.g
                                            style={{ transformOrigin: "140px 150px" }}
                                            initial={{ scale: 0.68, opacity: 0 }}
                                            animate={{ scale: [0.68, 1.02, 1.0], opacity: [0, 1, 1] }}
                                            transition={{ duration: D, times: [0, 0.75, 1], ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            {[
                                                { rot: 0, delay: 0.1, fill: "url(#petalPink)" },
                                                { rot: 60, delay: 0.16, fill: "url(#petalCoral)" },
                                                { rot: 120, delay: 0.22, fill: "url(#petalPink)" },
                                                { rot: 180, delay: 0.28, fill: "url(#petalCoral)" },
                                                { rot: 240, delay: 0.34, fill: "url(#petalPink)" },
                                                { rot: 300, delay: 0.4, fill: "url(#petalCoral)" },
                                            ].map((p) => (
                                                <motion.path
                                                    key={p.rot}
                                                    d="M140 96
                             C118 112, 114 140, 128 162
                             C138 178, 154 186, 140 206
                             C126 186, 142 178, 152 162
                             C166 140, 162 112, 140 96 Z"
                                                    fill={p.fill}
                                                    style={{ transformOrigin: "140px 150px" }}
                                                    initial={{ rotate: p.rot, scale: 0.1, opacity: 0, y: 14 }}
                                                    animate={{
                                                        rotate: p.rot,
                                                        y: [14, -2, 0],
                                                        scale: [0.1, 1.08, 1.0],
                                                        opacity: [0, 1, 1],
                                                    }}
                                                    transition={{ duration: D, delay: p.delay, times: [0, 0.72, 1], ease: [0.16, 1, 0.3, 1] }}
                                                />
                                            ))}

                                            <motion.circle
                                                cx="140"
                                                cy="150"
                                                r="12"
                                                fill="url(#centerWarm)"
                                                filter="url(#softGlow)"
                                                initial={{ scale: 0.25, opacity: 0 }}
                                                animate={{ scale: [0.25, 1.12, 1.0], opacity: 1 }}
                                                transition={{ duration: 0.55, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
                                            />
                                            <motion.circle
                                                cx="136"
                                                cy="146"
                                                r="3.6"
                                                fill="#FFFFFF"
                                                opacity="0.75"
                                                initial={{ opacity: 0, scale: 0.6 }}
                                                animate={{ opacity: [0, 0.95, 0.75], scale: [0.6, 1.12, 1.0] }}
                                                transition={{ duration: D, times: [0, 0.72, 1], ease: "easeOut" }}
                                            />
                                        </motion.g>
                                    </motion.g>
                                </svg>
                            </div>
                        </div>

                        {/* Bottom text area */}
                        <div className="p-5 sm:p-6 md:p-7">
                            <div className="text-center">
                                <div className="text-lg font-semibold tracking-tight sm:text-xl md:text-2xl text-balance">{title}</div>
                                <div className="mt-3 mx-auto max-w-[34ch] text-base leading-relaxed text-neutral-700 dark:text-neutral-200 sm:text-lg md:text-xl">
                                    {body}
                                </div>
                            </div>

                            {tip ? (
                                <div className="mt-5 mx-auto max-w-[38ch] rounded-2xl border border-black/5 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-full text-center text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                                            {tip}
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

/* ----------------------------------------------------------------------------
 * UI Components
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

function TapButton({ onPress, disabled, className, children, type = "button", ...rest }) {
    const { lock, unlock } = useTapLock();

    const fire = (e) => {
        if (disabled) return;
        if (!onPress) return;
        if (isPrimaryPointer(e)) {
            if (!lock()) return;
            try {
                onPress(e);
            } finally {
                setTimeout(unlock, 0);
            }
            return;
        }
        onPress(e);
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onPointerUp={(e) => {
                e.preventDefault();
                fire(e);
            }}
            onClick={(e) => {
                fire(e);
            }}
            className={["touch-manipulation select-none", className].join(" ")}
            {...rest}
        >
            {children}
        </button>
    );
}

function Pill({ children, active, onClick, className = "", disabled = false }) {
    return (
        <TapButton
            onClick={onClick}
            disabled={disabled}
            aria-pressed={!!active}
            className={[
                // size / hit-area (bigger, clearer)
                "rounded-2xl px-4 py-2.5 sm:px-4 sm:py-3",
                "text-sm sm:text-base font-semibold",
                "whitespace-nowrap shrink-0",
                "transition active:scale-[0.98]",
                "touch-manipulation select-none",

                // focus ring (keyboard / a11y, also helps visibility)
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 dark:focus-visible:ring-white/25",

                disabled ? "opacity-40" : "opacity-100",

                active
                    ? [
                        // light
                        "bg-neutral-900/5 text-neutral-900",
                        "ring-3 ring-neutral-900/15",
                        "bg-black/10",

                        // dark
                        "dark:bg-white/10 dark:text-white",
                        "dark:ring-white/20 dark:shadow-black/20",
                    ].join(" ")
                    : [
                        // light
                        "bg-black/5 text-neutral-700 hover:bg-black/10",
                        "ring-1 ring-black/5",

                        // dark
                        "dark:bg-white/10 dark:text-neutral-200 dark:hover:bg-white/15",
                        "dark:ring-white/10",
                    ].join(" "),

                className,
            ].join(" ")}
        >
            {children}
        </TapButton>
    );
}


function PrimaryButton({ children, onClick, disabled = false, className = "" }) {
    return (
        <TapButton
            onPress={onClick}
            disabled={disabled}
            className={[
                "w-full rounded-2xl px-4 py-3 sm:py-3.5",
                "text-sm sm:text-base font-semibold",
                "transition active:scale-[0.99]",
                disabled
                    ? "bg-black/10 text-neutral-400 dark:bg-white/10 dark:text-neutral-500"
                    : "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200",
                className,
            ].join(" ")}
        >
            {children}
        </TapButton>
    );
}

function SecondaryButton({ children, onClick, disabled = false, className = "" }) {
    return (
        <TapButton
            onPress={onClick}
            disabled={disabled}
            className={[
                "w-full rounded-2xl px-4 py-3 sm:py-3.5",
                "text-sm sm:text-base font-semibold",
                "border border-black/10 bg-black/5 text-neutral-900 hover:bg-black/10",
                "dark:border-white/10 dark:bg-white/5 dark:text-neutral-100 dark:hover:bg-white/10",
                "transition active:scale-[0.99]",
                disabled ? "opacity-40" : "",
                className,
            ].join(" ")}
        >
            {children}
        </TapButton>
    );
}

/**
 * TopBar:
 * - GoHome => daily home
 * - GoWelcome => welcome landing
 */
function TopBar({
    appName,
    tagline,
    canGoHome,
    onGoHome,
    canGoWelcome,
    onGoWelcome,
    onRestart,
    lang,
    setLang,
    theme,
    setTheme,
    t,
}) {
    return (
        <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-black/5 text-lg dark:bg-white/10 shrink-0">
                    ✨
                </div>
                <div className="min-w-0">
                    <div className="text-sm sm:text-base font-semibold tracking-tight truncate">{appName}</div>
                    <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 truncate">{tagline}</div>
                </div>
            </div>
        </div>
    );
}

function Welcome({ goalId, goalText, onPickGoal, onGoalText, onContinue, t, lang }) {
    return (
        <div className="space-y-4 sm:space-y-5">
            <SoftCard className="p-4 sm:p-5 md:p-6">
                <div className="text-base sm:text-lg font-semibold tracking-tight">{t("welcome.title")}</div>
                <div className="mt-1 text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {t("welcome.subtitle")}
                </div>

                <div className="mt-5">
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                {t("welcome.goalLabel")}
                            </div>
                            <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">{t("welcome.goalHint")}</div>
                        </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
                        {GOALS.map((g) => {
                            const active = goalId === g.id;
                            return (
                                <TapButton
                                    key={g.id}
                                    onPress={() => onPickGoal(g.id)}
                                    className={[
                                        "rounded-3xl p-4 md:p-5 text-left transition active:scale-[0.99]",
                                        "border",
                                        active
                                            ? "border-black/10 bg-black/5 dark:border-white/15 dark:bg-white/10"
                                            : "border-black/5 bg-white/60 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
                                    ].join(" ")}
                                >
                                    <div className="text-lg sm:text-xl">{g.emoji}</div>
                                    <div className="mt-2 text-sm sm:text-base font-semibold tracking-tight">{t(`goals.${g.id}`)}</div>
                                </TapButton>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-5">
                    <label className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">
                        {t("welcome.oneLineLabel")}
                    </label>
                    <input
                        value={goalText}
                        onChange={(e) => onGoalText(e.target.value)}
                        placeholder={t("welcome.oneLinePlaceholder")}
                        className={[
                            "mt-2 w-full rounded-2xl px-4 py-3 sm:py-3.5 outline-none",
                            "text-sm sm:text-base",
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

            <SoftCard className="p-4 sm:p-5 md:p-6">
                <div className="text-sm sm:text-base font-semibold tracking-tight">{t("welcome.noteTitle")}</div>
                <div className="mt-2 text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {t("welcome.noteBody")}
                </div>
            </SoftCard>

            <SoftFooter lang={lang} />
        </div>
    );
}

function SoftFooter({ lang }) {
    const text =
        lang === "en"
            ? "This app is designed for reflection and habit-building. It does not provide medical or psychological diagnosis."
            : "本服務以自我覺察與習慣建立為主，不提供醫療或心理診斷。";
    return <div className="px-2 text-xs sm:text-sm leading-relaxed text-neutral-500 dark:text-neutral-500">{text}</div>;
}

function Quiz({ quizIndex, picked, onPick, onNext, onPrev, onExit, t, lang }) {
    const q = QUIZ[quizIndex];
    const currentOptId = picked[q.id];
    const title = QUIZ_TEXT[lang]?.[q.titleKey] || q.titleKey;

    return (
        <div className="space-y-4 sm:space-y-5">
            <SoftCard className="p-4 sm:p-5 md:p-6">
                <div className="flex items-center justify-between">
                    <div className="text-sm sm:text-base font-semibold tracking-tight">{t("quiz.title")}</div>
                    <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                        {t("quiz.progress", { x: quizIndex + 1, n: QUIZ.length })}
                    </div>
                </div>

                <div className="mt-4 text-base sm:text-lg font-semibold tracking-tight">{title}</div>

                <div className="mt-4 space-y-2 sm:space-y-3">
                    {q.options.map((opt) => {
                        const optText = QUIZ_TEXT[lang]?.[opt.textKey] || opt.textKey;
                        const active = opt.id === currentOptId;
                        return (
                            <TapButton
                                key={opt.id}
                                onPress={() => onPick(q, opt.id)}
                                className={[
                                    "w-full rounded-3xl px-4 py-3 sm:py-3.5 text-left transition active:scale-[0.99]",
                                    "text-sm sm:text-base",
                                    "border",
                                    active
                                        ? "border-black/10 bg-black/5 dark:border-white/15 dark:bg-white/10"
                                        : "border-black/5 bg-white/60 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
                                ].join(" ")}
                            >
                                {optText}
                            </TapButton>
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

                <TapButton
                    onPress={onExit}
                    className="mt-4 w-full text-center text-xs sm:text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
                >
                    {t("quiz.exit")}
                </TapButton>
            </SoftCard>
        </div>
    );
}

function Result({ goal, goalText, profile, onGoHome, onBackQuiz, t }) {
    return (
        <div className="space-y-4 sm:space-y-5">
            <SoftCard className="p-4 sm:p-5 md:p-6">
                <div className="text-base sm:text-lg font-semibold tracking-tight">{t("result.title")}</div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 md:gap-4">
                    <div className="rounded-3xl border border-black/5 bg-black/5 p-4 md:p-5 dark:border-white/10 dark:bg-white/5">
                        <div className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">
                            {t("result.archetypeTitle")}
                        </div>
                        <div className="mt-1 text-lg sm:text-xl font-semibold tracking-tight">{t(`archetype.${profile.archetype}`)}</div>
                    </div>

                    <div className="rounded-3xl border border-black/5 bg-black/5 p-4 md:p-5 dark:border-white/10 dark:bg-white/5">
                        <div className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">
                            {t("result.elementTitle")}
                        </div>
                        <div className="mt-1 text-lg sm:text-xl font-semibold tracking-tight">
                            {ELEMENT_BADGE[profile.element]} {t(`element.${profile.element}`)}
                        </div>
                    </div>
                </div>

                <div className="mt-4 rounded-3xl border border-black/5 bg-black/5 p-4 md:p-5 text-sm sm:text-base text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200">
                    <div className="font-semibold">{t("result.whyTitle")}</div>
                    <div className="mt-2 leading-relaxed text-neutral-600 dark:text-neutral-300">{t("result.whyBody")}</div>
                </div>

                <div className="mt-4 rounded-3xl border border-black/5 bg-black/5 p-4 md:p-5 dark:border-white/10 dark:bg-white/5">
                    <div className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">{t("result.goalTitle")}</div>
                    <div className="mt-1 text-sm sm:text-base font-semibold tracking-tight">
                        {goal ? `${goal.emoji} ${t(`goals.${goal.id}`)}` : t("result.goalEmpty")}
                    </div>
                    {goalText ? (
                        <div className="mt-1 text-sm sm:text-base text-neutral-600 dark:text-neutral-300">“{goalText}”</div>
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
    isReady,
    onStartQuiz,
    goal,
    goalText,
    profile,
    dailyContent,
    streak,
    todayDone,
    moods,
    todayMood,
    onMood,
    todayStepsText,
    onStepsText,
    onDone,
    onOpenWall,
    t,
    lang,
}) {
    if (!isReady) {
        // Warm gate — only show when user hasn't completed onboarding quiz
        return (
            <div className="space-y-4 sm:space-y-5">
                <SoftCard className="p-4 sm:p-5 md:p-6">
                    <div className="text-base sm:text-lg font-semibold tracking-tight">{t("todayGate.title")}</div>
                    <div className="mt-2 text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                        {t("todayGate.body")}
                    </div>
                    <div className="mt-4">
                        <PrimaryButton onClick={onStartQuiz}>{t("todayGate.cta")}</PrimaryButton>
                    </div>
                </SoftCard>
            </div>
        );
    }

    if (!goal || !dailyContent) {
        return (
            <SoftCard className="p-4 sm:p-5 md:p-6">
                <div className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300">{t("welcome.subtitle")}</div>
            </SoftCard>
        );
    }

    return (
        <div className="space-y-4 sm:space-y-5">
            <SoftCard className="p-4 sm:p-5 md:p-6">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">{t("home.goal")}</div>
                        <div className="mt-1 text-base sm:text-lg font-semibold tracking-tight">
                            {goal.emoji} {t(`goals.${goal.id}`)}
                        </div>
                        {goalText ? <div className="mt-1 text-sm sm:text-base text-neutral-600 dark:text-neutral-300">“{goalText}”</div> : null}
                    </div>

                    <div className="rounded-xl border border-black/5 bg-black/5 px-3 py-2 text-right dark:border-white/10 dark:bg-white/5">
                        <div className="text-[11px] text-left sm:text-xs font-medium text-neutral-500 dark:text-neutral-400">{t("home.streak")}</div>
                        <div className="text-lg text-left sm:text-xl font-semibold tracking-tight">{streak}</div>
                    </div>
                </div>

                <div className="mt-5 rounded-3xl border border-black/5 bg-white/70 p-4 md:p-5 dark:border-white/10 dark:bg-white/5">
                    <div className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">{t("home.affirmation")}</div>
                    <div className="mt-2 text-sm sm:text-base leading-relaxed">{dailyContent.affirmation}</div>

                    <div className="mt-3 flex flex-wrap gap-2">
                        <div className="rounded-2xl bg-black/5 px-3 py-2 text-xs sm:text-sm text-neutral-700 dark:bg-white/10 dark:text-neutral-200">
                            {t("home.archetype")}: {t(`archetype.${profile.archetype}`)}
                        </div>
                        <div className="rounded-2xl bg-black/5 px-3 py-2 text-xs sm:text-sm text-neutral-700 dark:bg-white/10 dark:text-neutral-200">
                            {t("home.element")}: {ELEMENT_BADGE[profile.element]} {t(`element.${profile.element}`)}
                        </div>
                    </div>
                </div>

                <div className="mt-4 rounded-3xl border border-black/5 bg-white/70 p-4 md:p-5 dark:border-white/10 dark:bg-white/5">
                    <div className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">{t("home.action")}</div>
                    <div className="mt-2 text-sm sm:text-base leading-relaxed">{dailyContent.action}</div>
                </div>

                <div className="mt-4">
                    <div className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">{t("home.mood")}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {moods.map((m) => (
                            <Pill key={m.id} active={todayMood === m.id} onClick={() => onMood(m.id)} className="text-sm">
                                {m.label}
                            </Pill>
                        ))}
                    </div>
                </div>

                <div className="mt-4">
                    <label className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">{t("home.StepsInputLabel")}</label>
                    <input
                        value={todayStepsText}
                        onChange={(e) => onStepsText(e.target.value)}
                        placeholder={t("home.StepsPlaceholder")}
                        className={[
                            "mt-2 w-full rounded-2xl px-4 py-3 sm:py-3.5 outline-none",
                            "text-sm sm:text-base",
                            "border border-black/10 bg-white/70 placeholder:text-neutral-400 focus:border-black/20",
                            "dark:border-white/10 dark:bg-white/5 dark:placeholder:text-neutral-500 dark:focus:border-white/25",
                        ].join(" ")}
                    />
                    <div className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">{t("home.doneSub")}</div>
                </div>

                <div className="mt-5 space-y-3">
                    <PrimaryButton onClick={onDone} disabled={todayDone}>
                        {todayDone ? t("home.doneDone") : t("home.done")}
                    </PrimaryButton>

                    <SecondaryButton onClick={onOpenWall}>{t("home.openSteps")}</SecondaryButton>
                </div>
            </SoftCard>

            <SoftCard className="p-4 sm:p-5 md:p-6">
                <div className="text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300">{t("home.gentleNote")}</div>
            </SoftCard>
        </div>
    );
}

function StepsWall({ steps, streak, doneCount, stepsTaken, goalLabels, moodsMap, t }) {
    const [filterGoal, setFilterGoal] = useState("all");
    const goalsForFilter = useMemo(() => [{ id: "all" }, ...Object.keys(goalLabels).map((id) => ({ id }))], [goalLabels]);

    const filtered = useMemo(() => {
        if (filterGoal === "all") return steps;
        return steps.filter((e) => e.goalId === filterGoal);
    }, [steps, filterGoal]);

    return (
        <div className="space-y-4 sm:space-y-5">
            <SoftCard className="p-4 sm:p-5 md:p-6">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="text-base sm:text-lg font-semibold tracking-tight">{t("steps.title")}</div>
                        <div className="mt-1 text-sm sm:text-base text-neutral-600 dark:text-neutral-300">{t("steps.subtitle")}</div>
                    </div>
                </div>

                {/* ✅ Progress summary table */}
                <div className="mt-4 overflow-hidden rounded-3xl border border-black/5 bg-black/5 dark:border-white/10 dark:bg-white/5">
                    <table className="w-full text-sm sm:text-base">
                        <tbody>
                            <tr className="border-b border-black/5 dark:border-white/10">
                                <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">{t("progress.streak")}</td>
                                <td className="px-4 py-3 text-right font-semibold">{streak}</td>
                            </tr>
                            <tr className="border-b border-black/5 dark:border-white/10">
                                <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">{t("progress.daysDone")}</td>
                                <td className="px-4 py-3 text-right font-semibold">{doneCount}</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">{t("progress.stepsTaken")}</td>
                                <td className="px-4 py-3 text-right font-semibold">{stepsTaken}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {goalsForFilter.map((g) => {
                        const active = filterGoal === g.id;
                        const label =
                            g.id === "all" ? t("steps.filterAll") : `${goalLabels[g.id]?.emoji || ""} ${goalLabels[g.id]?.label || ""}`;
                        return (
                            <Pill key={g.id} active={active} onClick={() => setFilterGoal(g.id)}>
                                {label}
                            </Pill>
                        );
                    })}
                </div>

                <div className="mt-4 space-y-3">
                    {filtered.length === 0 ? (
                        <div className="rounded-3xl border border-black/5 bg-black/5 p-4 text-sm sm:text-base text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                            {t("steps.empty")}
                        </div>
                    ) : (
                        filtered.map((e, idx) => {
                            const g = goalLabels[e.goalId];
                            return (
                                <div
                                    key={`${e.date}-${idx}`}
                                    className="rounded-3xl border border-black/5 bg-white/70 p-4 md:p-5 dark:border-white/10 dark:bg-white/5"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">{e.date}</div>
                                        <div className="text-sm sm:text-base">{moodsMap[e.mood] || "🙂"}</div>
                                    </div>
                                    <div className="mt-2 text-sm sm:text-base leading-relaxed">{e.text}</div>
                                    <div className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
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

function Settings({ lang, setLang, theme, setTheme, onBack, t }) {
    return (
        <div className="space-y-4 sm:space-y-5">
            <SoftCard className="p-4 sm:p-5 md:p-6">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="text-base sm:text-lg font-semibold tracking-tight">{t("settings.title")}</div>
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
                        <p className="text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300">{t("settings.privacyBody")}</p>
                    </Section>

                    <Section title={t("settings.aboutTitle")}>
                        <p className="text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300">{t("settings.aboutBody")}</p>
                    </Section>
                </div>
            </SoftCard>
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div className="rounded-3xl border border-black/5 bg-black/5 p-4 md:p-5 dark:border-white/10 dark:bg-white/5">
            <div className="text-xs sm:text-sm font-semibold tracking-tight text-neutral-700 dark:text-neutral-200">{title}</div>
            <div className="mt-3">{children}</div>
        </div>
    );
}

/**
 * BottomNav:
 * - remove progress tab
 * - add welcome tab at far-left
 */
function BottomNav({ current, onGo, isReady, t }) {
    const items = [
        { id: "welcome", label: t("nav.welcome"), emoji: "🏡" },
        { id: "home", label: t("nav.today"), emoji: "☀️" },
        { id: "wall", label: t("nav.journey"), emoji: "🖼️" },
        { id: "settings", label: t("nav.settings"), emoji: "⚙️" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 border-t border-black/5 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-neutral-950/70">
            <div className="mx-auto w-full max-w-md px-4 pt-2 pb-[calc(0.5rem+var(--sa-bottom))] sm:max-w-lg sm:px-6 md:max-w-2xl md:px-8 lg:max-w-3xl xl:max-w-4xl">
                <div className="flex items-center justify-between gap-2">
                    {items.map((it) => {
                        const active = current === it.id;
                        return (
                            <TapButton
                                key={it.id}
                                onPress={() => onGo(it.id)}
                                className={[
                                    "flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 sm:py-2.5 transition active:scale-[0.99]",
                                    "text-xs sm:text-sm",
                                    active
                                        ? "bg-black/5 text-neutral-900 dark:bg-white/10 dark:text-neutral-50"
                                        : "text-neutral-600 hover:bg-black/5 dark:text-neutral-300 dark:hover:bg-white/10",
                                ].join(" ")}
                            >
                                <div className="text-base sm:text-lg">{it.emoji}</div>
                                <div className="text-[11px] sm:text-xs font-medium">{it.label}</div>
                            </TapButton>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
