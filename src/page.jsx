"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    AFFIRMATIONS,
    ELEMENT_BADGE,
    GOALS,
    I18N,
    MICRO_ACTIONS,
    QUIZ,
    QUIZ_TEXT,
} from "./constants/index.js";

/** ---------------- Helpers ---------------- */
const JOURNEY_TARGET = 7;
const START_MODAL_MS = 5000;

function todayKey() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

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

function pickOne(arr, seedStr) {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    let h = 0;
    for (let i = 0; i < seedStr.length; i++) h = (h * 31 + seedStr.charCodeAt(i)) >>> 0;
    return arr[h % arr.length];
}

function computeProfile(answerOpts) {
    const scores = {
        doer: 0,
        thinker: 0,
        feeler: 0,
        builder: 0,
        fire: 0,
        wind: 0,
        water: 0,
        earth: 0,
    };

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

function applyTheme(theme) {
    const root = document.documentElement;
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    const isDark = theme === "dark" || (theme === "system" && mq?.matches);
    root.classList.toggle("dark", !!isDark);
}

/** ---------------- Modal (auto transition) ---------------- */
function AutoStartModal({
    open,
    title,
    body,
    tip,
    ctaLabel = "OK",
    durationMs,
    onFinished,
    onCancel,
}) {
    const timerRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        timerRef.current = setTimeout(() => {
            timerRef.current = null;
            onFinished?.();
        }, durationMs);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = null;
        };
    }, [open, durationMs, onFinished]);

    const finishNow = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        onFinished?.();
    };

    return (
        <AnimatePresence>
            {open ? (
                <motion.div
                    className="fixed inset-0 z-50 grid place-items-center p-6 bg-white/40 dark:bg-black/40 backdrop-blur-xl"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Start dialog"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onPointerUp={(e) => {
                        if (e.target === e.currentTarget) onCancel?.();
                    }}
                >
                    <motion.div
                        className="w-full max-w-sm rounded-[2.75rem] bg-white/90 dark:bg-[#1C1C1E]/90 border border-white/20 dark:border-neutral-800 shadow-2xl overflow-hidden"
                        initial={{ opacity: 0, y: 18, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.99 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                        {/* top animation area */}
                        <div className="relative h-64">
                            <div className="absolute inset-0">
                                <motion.div
                                    className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-black/10 blur-3xl dark:bg-white/10"
                                    initial={{ x: -24, y: 0, scale: 0.92, opacity: 0.7 }}
                                    animate={{ x: 52, y: 18, scale: 1.07, opacity: 0.9 }}
                                    transition={{ duration: durationMs / 1000, ease: "easeInOut" }}
                                />
                                <motion.div
                                    className="absolute -right-28 bottom-0 h-72 w-72 rounded-full bg-black/10 blur-3xl dark:bg-white/10"
                                    initial={{ x: 24, y: 0, scale: 0.95, opacity: 0.7 }}
                                    animate={{ x: -52, y: -18, scale: 1.1, opacity: 0.9 }}
                                    transition={{ duration: durationMs / 1000, ease: "easeInOut" }}
                                />
                            </div>

                            <div className="absolute inset-0 grid place-items-center">
                                {/* “開花” SVG */}
                                <svg width="240" height="240" viewBox="0 0 280 280" className="opacity-95">
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

                                    <motion.g
                                        style={{ transformOrigin: "140px 140px" }}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: [0.8, 1.02, 1.0], opacity: 1 }}
                                        transition={{ duration: 1.0, ease: "easeOut" }}
                                    >
                                        {[0, 60, 120, 180, 240, 300].map((rot, idx) => (
                                            <motion.path
                                                key={rot}
                                                d="M140 86
                          C118 104, 112 134, 126 160
                          C138 180, 154 190, 140 214
                          C126 190, 142 180, 154 160
                          C168 134, 162 104, 140 86 Z"
                                                fill={idx % 2 === 0 ? "url(#petalPink)" : "url(#petalCoral)"}
                                                style={{ transformOrigin: "140px 150px" }}
                                                initial={{ rotate: rot, scale: 0.12, opacity: 0, y: 18 }}
                                                animate={{ rotate: rot, y: [18, 0], scale: [0.12, 1.02], opacity: [0, 1] }}
                                                transition={{ duration: 0.9, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] }}
                                            />
                                        ))}

                                        <motion.circle
                                            cx="140"
                                            cy="150"
                                            r="12"
                                            fill="url(#centerWarm)"
                                            filter="url(#softGlow)"
                                            initial={{ scale: 0.2, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.55, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                        />
                                    </motion.g>
                                </svg>
                            </div>
                        </div>

                        {/* bottom text area */}
                        <div className="p-6 text-center">
                            <div className="text-lg font-bold tracking-tight">{title}</div>
                            <div className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-200 whitespace-pre-wrap">
                                {body}
                            </div>

                            {tip ? (
                                <div className="mt-4 rounded-2xl border border-black/5 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
                                    <div className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300 whitespace-pre-wrap">
                                        {tip}
                                    </div>
                                </div>
                            ) : null}

                            <button
                                onClick={finishNow}
                                className="mt-5 w-full py-3 rounded-2xl font-bold bg-neutral-900 text-white dark:bg-white dark:text-black"
                            >
                                {ctaLabel}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

/** ---------------- Main App ---------------- */
export default function AppleInspiredApp() {
    // views: welcome | quiz | result | home | wall | settings
    const [view, setView] = useState("welcome");

    // persisted
    const [lang, setLang] = usePersistedState("mvp_lang", "zh-TW");
    const [theme, setTheme] = usePersistedState("mvp_theme", "system");

    const [goalId, setGoalId] = usePersistedState("mvp_goalId", null);
    const [goalText, setGoalText] = usePersistedState("mvp_goalText", "");

    const [quizIndex, setQuizIndex] = usePersistedState("mvp_quizIndex", 0);
    const [picked, setPicked] = usePersistedState("mvp_quizPicked", {});

    const [steps, setSteps] = usePersistedState("mvp_steps", []);
    const [journeyCount, setJourneyCount] = usePersistedState("mvp_journeyCount", 0);

    const [todayMood, setTodayMood] = usePersistedState("mvp_todayMood", "happy");
    const [actionSize, setActionSize] = usePersistedState("mvp_actionSize", "full"); // "full" | "mini"

    const [journeyEndOpen, setJourneyEndOpen] = useState(false);

    // start modal
    const [startModalOpen, setStartModalOpen] = useState(false);
    const pendingStartRef = useRef(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        applyTheme(theme);
        const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
        const onChange = () => applyTheme(theme);
        mq?.addEventListener?.("change", onChange);
        return () => mq?.removeEventListener?.("change", onChange);
    }, [theme]);

    // i18n
    const dict = I18N[lang] || I18N["zh-TW"];
    const t = useCallback(
        (key, vars) => {
            const parts = key.split(".");
            let cur = dict;
            for (const p of parts) cur = cur?.[p];
            if (typeof cur === "string") return vars ? formatStr(cur, vars) : cur;
            return key;
        },
        [dict]
    );

    const goal = useMemo(() => GOALS.find((g) => g.id === goalId) || null, [goalId]);

    // quiz answers -> profile
    const answers = useMemo(() => {
        return QUIZ.map((q) => {
            const optId = picked[q.id];
            if (!optId) return null;
            return q.options.find((o) => o.id === optId) || null;
        }).filter(Boolean);
    }, [picked]);

    const hasQuiz = answers.length === QUIZ.length;
    const profile = useMemo(() => computeProfile(answers), [answers]);

    // ✅ i18n modal content: modals.start is an array (你前面給的 i18n)
    const startModalContent = useMemo(() => {
        const arr = dict?.modals?.start || [];
        const seed = `${todayKey()}|${goalId || "no-goal"}|start|${lang}`;
        const pickedModal = pickOne(arr, seed) || arr[0] || null;
        return pickedModal;
    }, [dict, goalId, lang]);

    // daily content (affirmation + micro-action)
    const dailyContent = useMemo(() => {
        if (!goalId || !hasQuiz) return null;

        const seed = `${todayKey()}|${goalId}|${profile.element}|${profile.archetype}|${lang}|${actionSize}`;

        const affs = AFFIRMATIONS[goalId]?.[profile.element] || [];
        const acts = MICRO_ACTIONS[goalId]?.[profile.element] || [];

        const affirmation =
            affs.length > 0
                ? pickOne(affs, seed + "|aff")?.[lang]
                : lang === "en"
                    ? "I’ll take one small step today."
                    : "我今天往前一步就好。";

        let action = "";
        if (acts.length > 0) {
            const pickedAct = pickOne(acts, seed + "|act");
            const key = actionSize === "mini" ? "oneMin" : "fiveMin";
            action =
                pickedAct?.[key]?.[lang] ||
                pickedAct?.fiveMin?.[lang] ||
                pickedAct?.oneMin?.[lang] ||
                "";
        }
        if (!action) action = lang === "en" ? "Do one small action that supports you." : "做一個小行動，讓自己更靠近想要的方向。";

        return { affirmation, action };
    }, [goalId, hasQuiz, profile.element, profile.archetype, lang, actionSize]);

    // today entry & refined textarea flow
    const todayEntry = useMemo(() => steps.find((s) => s.date === todayKey()) || null, [steps]);
    const todayDone = !!todayEntry;

    const [draftText, setDraftText] = useState("");
    const [isEditingToday, setIsEditingToday] = useState(false);
    const [draftDirty, setDraftDirty] = useState(false);

    // when entering home or steps change, reset draft to today entry text
    useEffect(() => {
        if (view !== "home") return;
        const base = (todayEntry?.text || "").trim();
        setDraftText(base);
        setDraftDirty(false);
        setIsEditingToday(false); // default disabled
    }, [view, todayEntry?.text]);

    /** ---------------- Navigation ---------------- */
    const safeGo = useCallback(
        (next) => {
            // require goal for most pages
            if ((next === "home" || next === "wall" || next === "settings") && !goalId) {
                setView("welcome");
                return;
            }

            // require quiz for home/wall -> 直接引導「開始旅程」(modal) -> quiz
            if ((next === "home" || next === "wall") && !hasQuiz) {
                // 已選 goal 的話：打開 modal（5 秒後進 quiz）
                if (goalId) {
                    pendingStartRef.current = true;
                    setStartModalOpen(true);
                    return;
                }
                setView("welcome");
                return;
            }

            setView(next);
        },
        [goalId, hasQuiz]
    );

    /** ---------------- Quiz actions ---------------- */
    const onPickQuizOption = (q, optId) => setPicked((p) => ({ ...p, [q.id]: optId }));

    const nextQuiz = () => {
        const q = QUIZ[quizIndex];
        if (!picked[q.id]) return;

        if (quizIndex === QUIZ.length - 1) {
            setView("result");
            return;
        }
        setQuizIndex((i) => i + 1);
    };

    const prevQuiz = () => setQuizIndex((i) => Math.max(0, i - 1));

    /** ---------------- Start quiz flow (modal 5s) ---------------- */
    const startJourney = () => {
        if (!goalId) return;
        pendingStartRef.current = true;
        setStartModalOpen(true);
    };

    const finishStartModal = () => {
        if (!pendingStartRef.current) return;
        pendingStartRef.current = false;

        setStartModalOpen(false);
        setQuizIndex(0);
        setView("quiz");
    };

    const cancelStartModal = () => {
        pendingStartRef.current = false;
        setStartModalOpen(false);
    };

    /** ---------------- Save today entry ---------------- */
    const saveToday = () => {
        const k = todayKey();
        const text = (draftText || "").trim();

        // 沒改就不要動
        if (!draftDirty) return;

        const entry = {
            date: k,
            mood: todayMood,
            text: text || (lang === "en" ? "Done." : "完成。"),
            goalId,
        };

        const existing = steps.findIndex((s) => s.date === k);
        if (existing > -1) {
            const updated = [...steps];
            updated[existing] = entry;
            setSteps(updated);
        } else {
            setSteps([entry, ...steps]);
            const next = (journeyCount || 0) + 1;
            setJourneyCount(next);
            if (next >= JOURNEY_TARGET) setJourneyEndOpen(true);
        }

        setDraftDirty(false);
        setIsEditingToday(false);
    };

    const restartJourney = () => {
        setGoalId(null);
        setGoalText("");
        setQuizIndex(0);
        setPicked({});
        setSteps([]);
        setJourneyCount(0);
        setTodayMood("happy");
        setActionSize("full");
        setJourneyEndOpen(false);
        setView("welcome");
    };

    /** ---------------- UI ---------------- */
    return (
        <div className="min-h-screen bg-[#F2F2F7] dark:bg-black text-black dark:text-white font-sans selection:bg-blue-100">
            <div className="h-12 w-full" />

            <main className="max-w-lg mx-auto px-5 pb-32">
                <AnimatePresence mode="wait">
                    {/* ---------------- Welcome ---------------- */}
                    {view === "welcome" && (
                        <motion.div
                            key="welcome"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <header className="mb-8">
                                <p className="text-sm font-semibold text-blue-500 uppercase tracking-tight">
                                    {new Date().toLocaleDateString(lang, { weekday: "long", month: "long", day: "numeric" })}
                                </p>
                                <h1 className="text-4xl font-bold tracking-tight">{t("app.name")}</h1>
                                <p className="text-neutral-500 mt-2">{t("app.tagline")}</p>
                            </header>

                            <section className="space-y-4">
                                <h2 className="text-xs font-semibold text-neutral-500 uppercase ml-1">
                                    {t("welcome.goalLabel")}
                                </h2>

                                <div className="space-y-3">
                                    {GOALS.map((g) => {
                                        const active = goalId === g.id;
                                        return (
                                            <button
                                                key={g.id}
                                                onClick={() => {
                                                    setGoalId(g.id);
                                                    setQuizIndex(0);
                                                    setPicked({});
                                                }}
                                                className={[
                                                    "w-full p-5 rounded-2xl flex items-center justify-between shadow-sm active:scale-[0.98] transition-all group",
                                                    "bg-white dark:bg-[#1C1C1E]",
                                                    active ? "ring-2 ring-blue-500/40" : "ring-1 ring-black/5 dark:ring-white/10",
                                                ].join(" ")}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className="text-3xl">{g.emoji}</span>
                                                    <span className="text-lg font-semibold">{t(`goals.${g.id}`)}</span>
                                                </div>
                                                <span className="text-neutral-300 group-hover:text-blue-500 transition-colors">〉</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
                                    <label className="text-xs font-bold text-neutral-500 uppercase">{t("welcome.oneLineLabel")}</label>
                                    <input
                                        value={goalText}
                                        onChange={(e) => setGoalText(e.target.value)}
                                        placeholder={t("welcome.oneLinePlaceholder")}
                                        className="mt-3 w-full bg-[#F2F2F7] dark:bg-[#2C2C2E] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-blue-500"
                                    />
                                    <p className="mt-3 text-xs text-neutral-500">{t("welcome.goalHint")}</p>
                                </div>

                                {/* ✅ 不要 goalStart：按開始旅程 -> 直接跳 modal */}
                                <button
                                    onClick={startJourney}
                                    disabled={!goalId}
                                    className={[
                                        "w-full py-4 rounded-2xl font-bold shadow-md transition",
                                        goalId
                                            ? "bg-blue-500 text-white active:bg-blue-600"
                                            : "bg-neutral-200 text-neutral-400 dark:bg-neutral-800",
                                    ].join(" ")}
                                >
                                    {goalId ? t("welcome.toGoalStart") : t("welcome.ctaDisabled")}
                                </button>
                            </section>
                        </motion.div>
                    )}

                    {/* ---------------- Quiz ---------------- */}
                    {view === "quiz" && (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="space-y-6"
                        >
                            <header className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-3xl font-bold">{t("quiz.title")}</h2>
                                    <p className="text-neutral-500 italic">
                                        {t("quiz.progress", { x: quizIndex + 1, n: QUIZ.length })}
                                    </p>
                                </div>
                                <button onClick={() => setView("welcome")} className="text-sm font-bold text-neutral-400 hover:text-blue-500">
                                    {t("quiz.exit")}
                                </button>
                            </header>

                            <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10 space-y-4">
                                {(() => {
                                    const q = QUIZ[quizIndex];
                                    const title = QUIZ_TEXT?.[lang]?.[q.titleKey] || q.titleKey;
                                    const currentOptId = picked[q.id];

                                    return (
                                        <>
                                            <div className="text-xl font-bold leading-snug">{title}</div>

                                            <div className="space-y-2">
                                                {q.options.map((opt) => {
                                                    const optText = QUIZ_TEXT?.[lang]?.[opt.textKey] || opt.textKey;
                                                    const active = opt.id === currentOptId;

                                                    return (
                                                        <button
                                                            key={opt.id}
                                                            onClick={() => onPickQuizOption(q, opt.id)}
                                                            className={[
                                                                "w-full text-left px-4 py-4 rounded-2xl transition active:scale-[0.99]",
                                                                "ring-1",
                                                                active
                                                                    ? "bg-blue-500/10 ring-blue-500/30 text-blue-600 dark:text-blue-300"
                                                                    : "bg-[#F2F2F7] dark:bg-[#2C2C2E] ring-black/5 dark:ring-white/10 text-neutral-700 dark:text-neutral-200",
                                                            ].join(" ")}
                                                        >
                                                            <div className="font-semibold">{optText}</div>
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            <div className="flex gap-3 pt-2">
                                                <button
                                                    onClick={prevQuiz}
                                                    disabled={quizIndex === 0}
                                                    className={[
                                                        "flex-1 py-3 rounded-xl font-bold transition",
                                                        quizIndex === 0
                                                            ? "bg-neutral-200 text-neutral-400 dark:bg-neutral-800"
                                                            : "bg-neutral-900 text-white dark:bg-white dark:text-black",
                                                    ].join(" ")}
                                                >
                                                    {t("quiz.prev")}
                                                </button>

                                                <button
                                                    onClick={nextQuiz}
                                                    disabled={!picked[q.id]}
                                                    className={[
                                                        "flex-1 py-3 rounded-xl font-bold transition",
                                                        !picked[q.id]
                                                            ? "bg-neutral-200 text-neutral-400 dark:bg-neutral-800"
                                                            : "bg-blue-500 text-white active:bg-blue-600",
                                                    ].join(" ")}
                                                >
                                                    {quizIndex === QUIZ.length - 1 ? t("quiz.seeResult") : t("quiz.next")}
                                                </button>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        </motion.div>
                    )}

                    {/* ---------------- Result ---------------- */}
                    {view === "result" && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="space-y-6"
                        >
                            <header>
                                <h2 className="text-3xl font-bold">{t("result.title")}</h2>
                                <p className="text-neutral-500 italic">{lang === "en" ? "Your starting profile" : "你的起始設定"}</p>
                            </header>

                            <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10 space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-[#F2F2F7] dark:bg-[#2C2C2E] rounded-2xl p-4">
                                        <div className="text-xs font-bold text-neutral-500 uppercase">{t("result.archetypeTitle")}</div>
                                        <div className="text-lg font-bold mt-1">{t(`archetype.${profile.archetype}`)}</div>
                                    </div>
                                    <div className="bg-[#F2F2F7] dark:bg-[#2C2C2E] rounded-2xl p-4">
                                        <div className="text-xs font-bold text-neutral-500 uppercase">{t("result.elementTitle")}</div>
                                        <div className="text-lg font-bold mt-1">
                                            {ELEMENT_BADGE[profile.element]} {t(`element.${profile.element}`)}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#F2F2F7] dark:bg-[#2C2C2E] rounded-2xl p-4">
                                    <div className="text-xs font-bold text-neutral-500 uppercase">{t("result.goalTitle")}</div>
                                    <div className="text-base font-bold mt-1">
                                        {goal ? `${goal.emoji} ${t(`goals.${goal.id}`)}` : t("result.goalEmpty")}
                                    </div>
                                    {goalText ? <div className="text-sm text-neutral-500 mt-2">“{goalText}”</div> : null}
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={() => setView("quiz")}
                                        className="flex-1 py-3 rounded-xl font-bold bg-neutral-900 text-white dark:bg-white dark:text-black"
                                    >
                                        {t("result.editQuiz")}
                                    </button>
                                    <button
                                        onClick={() => setView("home")}
                                        className="flex-1 py-3 rounded-xl font-bold bg-blue-500 text-white active:bg-blue-600"
                                    >
                                        {t("result.enterDaily")}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ---------------- Home ---------------- */}
                    {view === "home" && (
                        <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <header>
                                <h2 className="text-3xl font-bold">{t("home.title")}</h2>
                                <p className="text-neutral-500 italic">
                                    {t("home.day", { x: journeyCount + 1, n: JOURNEY_TARGET })}
                                </p>
                                {goal ? (
                                    <div className="mt-2 inline-flex items-center gap-2 text-sm text-neutral-500">
                                        <span className="text-lg">{goal.emoji}</span>
                                        <span>{t(`goals.${goal.id}`)}</span>
                                    </div>
                                ) : null}
                            </header>

                            {/* Affirmation Card */}
                            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-[2.5rem] text-white shadow-lg shadow-blue-500/20">
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">{t("home.affirmation")}</span>
                                <p className="text-xl font-medium mt-2 leading-snug">
                                    “{dailyContent?.affirmation || (lang === "en" ? "One step at a time." : "一步一步就好。")}”
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="text-[11px] bg-white/15 px-3 py-1.5 rounded-full">
                                        {t("home.archetype")}: {t(`archetype.${profile.archetype}`)}
                                    </span>
                                    <span className="text-[11px] bg-white/15 px-3 py-1.5 rounded-full">
                                        {t("home.element")}: {ELEMENT_BADGE[profile.element]} {t(`element.${profile.element}`)}
                                    </span>
                                </div>
                            </div>

                            {/* Micro-action Card */}
                            <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10 space-y-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="font-bold text-lg">{t("home.action")}</h3>
                                        <p className="text-neutral-500 text-sm">{dailyContent?.action}</p>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setActionSize("mini")}
                                            className={[
                                                "px-3 py-2 rounded-xl text-xs font-bold transition",
                                                actionSize === "mini"
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-neutral-100 dark:bg-[#2C2C2E] text-neutral-500",
                                            ].join(" ")}
                                        >
                                            {t("home.actionMini")}
                                        </button>
                                        <button
                                            onClick={() => setActionSize("full")}
                                            className={[
                                                "px-3 py-2 rounded-xl text-xs font-bold transition",
                                                actionSize === "full"
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-neutral-100 dark:bg-[#2C2C2E] text-neutral-500",
                                            ].join(" ")}
                                        >
                                            {t("home.actionFull")}
                                        </button>
                                    </div>
                                </div>

                                {/* textarea fixed size + default disabled + refined flow */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="text-xs font-bold text-neutral-500 uppercase">{t("home.entryTitle")}</div>

                                        {!isEditingToday ? (
                                            <button
                                                onClick={() => setIsEditingToday(true)}
                                                className="text-xs font-bold text-blue-500 hover:text-blue-600"
                                            >
                                                {todayDone ? t("home.editEntry") : t("home.newEntry")}
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    const base = (todayEntry?.text || "").trim();
                                                    setDraftText(base);
                                                    setDraftDirty(false);
                                                    setIsEditingToday(false);
                                                }}
                                                className="text-xs font-bold text-neutral-400 hover:text-neutral-500"
                                            >
                                                {t("home.cancelEdit")}
                                            </button>
                                        )}
                                    </div>

                                    <textarea
                                        rows={4}
                                        className={[
                                            "w-full bg-[#F2F2F7] dark:bg-[#2C2C2E] rounded-xl p-4 text-sm outline-none transition-all",
                                            "resize-none",
                                            isEditingToday ? "focus:ring-2 ring-blue-500" : "opacity-90",
                                        ].join(" ")}
                                        placeholder={t("home.StepsPlaceholder")}
                                        value={draftText}
                                        disabled={!isEditingToday}
                                        onChange={(e) => {
                                            setDraftText(e.target.value);
                                            setDraftDirty(true);
                                        }}
                                    />

                                    <div className="text-xs text-neutral-500">
                                        {todayDone ? t("home.entryHintUpdate") : t("home.entryHintNew")}
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        if (!isEditingToday) {
                                            setIsEditingToday(true);
                                            return;
                                        }
                                        saveToday();
                                    }}
                                    disabled={isEditingToday && !draftDirty}
                                    className={[
                                        "w-full py-4 rounded-xl font-bold transition-all shadow-md",
                                        !isEditingToday
                                            ? todayDone
                                                ? "bg-emerald-500 text-white"
                                                : "bg-blue-500 text-white active:bg-blue-600"
                                            : !draftDirty
                                                ? "bg-neutral-200 text-neutral-400 dark:bg-neutral-800"
                                                : "bg-blue-500 text-white active:bg-blue-600",
                                    ].join(" ")}
                                >
                                    {!isEditingToday
                                        ? todayDone
                                            ? t("home.entryLockedDone")
                                            : t("home.startWrite")
                                        : todayDone
                                            ? t("home.updateEntry")
                                            : t("home.saveEntry")}
                                </button>

                                <p className="text-xs text-neutral-500">{t("home.doneSub")}</p>
                            </div>

                            {/* Progress View */}
                            <div className="px-2">
                                <div className="flex justify-between text-xs font-bold text-neutral-400 mb-2">
                                    <span>{t("progress.title")}</span>
                                    <span>{Math.round((journeyCount / JOURNEY_TARGET) * 100)}%</span>
                                </div>
                                <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(journeyCount / JOURNEY_TARGET) * 100}%` }}
                                        className="h-full bg-blue-500"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ---------------- Wall ---------------- */}
                    {view === "wall" && (
                        <motion.div key="wall" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                            <h2 className="text-3xl font-bold mb-6">{t("steps.title")}</h2>

                            {steps.length === 0 ? (
                                <div className="bg-white dark:bg-[#1C1C1E] p-5 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800 text-neutral-500">
                                    {t("steps.empty")}
                                </div>
                            ) : (
                                steps.map((s, i) => (
                                    <div
                                        key={`${s.date}-${i}`}
                                        className="bg-white dark:bg-[#1C1C1E] p-5 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-bold text-blue-500 uppercase">{s.date}</span>
                                            <span>{s.mood === "happy" ? "☀️" : "☁️"}</span>
                                        </div>
                                        <p className="text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">{s.text}</p>
                                    </div>
                                ))
                            )}
                        </motion.div>
                    )}

                    {/* ---------------- Settings ---------------- */}
                    {view === "settings" && (
                        <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <header>
                                <h2 className="text-3xl font-bold">{t("settings.title")}</h2>
                                <p className="text-neutral-500 italic">{t("settings.subtitle")}</p>
                            </header>

                            <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10 space-y-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-bold">{t("settings.language")}</p>
                                        <p className="text-sm text-neutral-500">{t("settings.languageHint")}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setLang("zh-TW")}
                                            className={[
                                                "px-3 py-2 rounded-xl text-xs font-bold transition",
                                                lang === "zh-TW" ? "bg-blue-500 text-white" : "bg-neutral-100 dark:bg-[#2C2C2E] text-neutral-500",
                                            ].join(" ")}
                                        >
                                            {t("settings.langZh")}
                                        </button>
                                        <button
                                            onClick={() => setLang("en")}
                                            className={[
                                                "px-3 py-2 rounded-xl text-xs font-bold transition",
                                                lang === "en" ? "bg-blue-500 text-white" : "bg-neutral-100 dark:bg-[#2C2C2E] text-neutral-500",
                                            ].join(" ")}
                                        >
                                            {t("settings.langEn")}
                                        </button>
                                    </div>
                                </div>

                                <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-bold">{t("settings.theme")}</p>
                                        <p className="text-sm text-neutral-500">{t("settings.themeHint")}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        {[
                                            { id: "system", label: t("settings.themeSystem") },
                                            { id: "light", label: t("settings.themeLight") },
                                            { id: "dark", label: t("settings.themeDark") },
                                        ].map((opt) => (
                                            <button
                                                key={opt.id}
                                                onClick={() => setTheme(opt.id)}
                                                className={[
                                                    "px-3 py-2 rounded-xl text-xs font-bold transition",
                                                    theme === opt.id ? "bg-blue-500 text-white" : "bg-neutral-100 dark:bg-[#2C2C2E] text-neutral-500",
                                                ].join(" ")}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

                                <button
                                    onClick={restartJourney}
                                    className="w-full py-3 rounded-2xl font-bold bg-neutral-900 text-white dark:bg-white dark:text-black"
                                >
                                    {t("settings.restart")}
                                </button>
                            </div>

                            <div className="text-xs text-neutral-400 px-2 leading-relaxed">{t("settings.disclaimer")}</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* --- Floating Tab Bar --- */}
            <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-sm">
                <div className="bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-2xl border border-white/20 dark:border-neutral-800 rounded-[2rem] p-2 flex justify-between items-center shadow-2xl">
                    {[
                        { id: "welcome", label: t("nav.welcome"), icon: "⊕" },
                        { id: "home", label: t("nav.today"), icon: "◎" },
                        { id: "wall", label: t("nav.journey"), icon: "▤" },
                        { id: "settings", label: t("nav.settings"), icon: "⚙" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => safeGo(tab.id)}
                            className="flex-1 flex flex-col items-center py-2 relative"
                        >
                            <span className={`text-xl ${view === tab.id ? "text-blue-500" : "text-neutral-400"}`}>
                                {tab.icon}
                            </span>
                            <span className={`text-[10px] font-bold mt-1 ${view === tab.id ? "text-blue-500" : "text-neutral-400"}`}>
                                {tab.label}
                            </span>
                            {view === tab.id && <motion.div layoutId="tab-pill" className="absolute -bottom-1 w-1 h-1 bg-blue-500 rounded-full" />}
                        </button>
                    ))}
                </div>
            </nav>

            {/* --- Start Modal (5 seconds then go quiz) --- */}
            <AutoStartModal
                open={startModalOpen}
                durationMs={START_MODAL_MS}
                title={startModalContent?.title || (lang === "en" ? "Getting ready" : "準備一下")}
                body={startModalContent?.body || ""}
                tip={startModalContent?.tip || ""}
                ctaLabel={startModalContent?.cta || "OK"}
                onFinished={finishStartModal}
                onCancel={cancelStartModal}
            />

            {/* --- Journey End Modal (7 days) --- */}
            <AnimatePresence>
                {journeyEndOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-white/40 dark:bg-black/40 backdrop-blur-xl">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white dark:bg-[#1C1C1E] p-10 rounded-[3rem] shadow-2xl text-center border border-neutral-100 dark:border-neutral-800"
                        >
                            <div className="w-20 h-20 bg-blue-500 rounded-3xl mx-auto mb-6 flex items-center justify-center text-4xl text-white shadow-lg shadow-blue-500/40">
                                🏆
                            </div>

                            <h2 className="text-2xl font-bold mb-2">{t("journeyEnd.title")}</h2>
                            <p className="text-neutral-500 mb-8">{t("journeyEnd.body")}</p>

                            <button
                                onClick={() => {
                                    setJourneyEndOpen(false);
                                    restartJourney();
                                }}
                                className="w-full py-4 bg-black dark:bg-white dark:text-black text-white rounded-2xl font-bold"
                            >
                                {t("journeyEnd.cta")}
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}