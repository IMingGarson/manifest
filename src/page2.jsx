"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Constants
import {
    GOALS,
    I18N,
    MICRO_ACTIONS,
    QUIZ
} from "./constants/index.js";

// Hooks & Utils
import { usePersistedState } from "./hooks/usePersistedState";
import {
    applyTheme,
    computeProfile,
    JOURNEY_TARGET,
    pickOne,
    START_MODAL_MS,
    todayKey
} from "./utils/helpers";

// Components
import { TabBar } from "./components/layout/TabBar";
import { AutoStartModal } from "./components/modals/AutoStartModal";

// View Components
import { HomeView } from "./components/views/HomeView";
import { QuizView } from "./components/views/QuizView";
import { ResultView } from "./components/views/ResultView";
import { SettingsView } from "./components/views/SettingsView"; // Logic included below
import { WallView } from "./components/views/WallView";
import { WelcomeView } from "./components/views/WelcomeView";

export default function AppleInspiredApp() {
    // --- View State ---
    const [view, setView] = useState("welcome");

    // --- Persisted State ---
    const [lang, setLang] = usePersistedState("mvp_lang", "zh-TW");
    const [theme, setTheme] = usePersistedState("mvp_theme", "system");
    const [goalId, setGoalId] = usePersistedState("mvp_goalId", null);
    const [goalText, setGoalText] = usePersistedState("mvp_goalText", "");
    const [quizIndex, setQuizIndex] = usePersistedState("mvp_quizIndex", 0);
    const [picked, setPicked] = usePersistedState("mvp_quizPicked", {});
    const [steps, setSteps] = usePersistedState("mvp_steps", []);
    const [journeyCount, setJourneyCount] = usePersistedState("mvp_journeyCount", 0);
    const [todayMood, setTodayMood] = usePersistedState("mvp_todayMood", "happy");
    const [actionSize, setActionSize] = usePersistedState("mvp_actionSize", "full");

    // --- Local UI State ---
    const [journeyEndOpen, setJourneyEndOpen] = useState(false);
    const [startModalOpen, setStartModalOpen] = useState(false);
    const [draftText, setDraftText] = useState("");
    const [isEditingToday, setIsEditingToday] = useState(false);
    const [draftDirty, setDraftDirty] = useState(false);
    const pendingStartRef = useRef(false);

    // --- Theme & I18N ---
    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const dict = I18N[lang] || I18N["zh-TW"];
    const t = useCallback((key, vars) => {
        const parts = key.split(".");
        let cur = dict;
        for (const p of parts) cur = cur?.[p];
        if (typeof cur === "string") {
            return vars ? cur.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? "")) : cur;
        }
        return key;
    }, [dict]);

    // --- Memoized Logic ---
    const goal = useMemo(() => GOALS.find((g) => g.id === goalId) || null, [goalId]);

    const answers = useMemo(() => {
        return QUIZ.map((q) => {
            const optId = picked[q.id];
            return q.options.find((o) => o.id === optId) || null;
        }).filter(Boolean);
    }, [picked]);

    const hasQuiz = answers.length === QUIZ.length;
    const profile = useMemo(() => computeProfile(answers), [answers]);

    const startModalContent = useMemo(() => {
        const arr = dict?.modals?.start || [];
        const seed = `${todayKey()}|${goalId}|start|${lang}`;
        return pickOne(arr, seed) || arr[0] || null;
    }, [dict, goalId, lang]);

    const dailyContent = useMemo(() => {
        if (!goalId) return null;
        const seed = `${todayKey()}|${goalId}|${lang}`;
        const categoryActions = MICRO_ACTIONS[goalId] || [];
        const pickedAct = pickOne(categoryActions, seed);

        if (pickedAct) {
            const sizeKey = actionSize === "mini" ? "oneMin" : "fiveMin";
            const actionText = pickedAct[sizeKey]?.[lang];
            const finalAction = actionText || (lang === "en" ? "Take a small step." : "前進一小步。");
            const affirmation = lang === "en" ? "You are doing enough." : "你已經做得很好。";

            return { affirmation, action: finalAction };
        }
        return {
            affirmation: "...",
            action: lang === "en" ? "Support yourself today." : "今天也溫柔地對待自己。"
        };
    }, [goalId, lang, actionSize]);

    const todayEntry = useMemo(() => steps.find((s) => s.date === todayKey()) || null, [steps]);

    const safeGo = useCallback((next) => {
        if (next === "home" && !hasQuiz) {
            if (goalId) {
                pendingStartRef.current = true;
                setStartModalOpen(true);
            } else {
                setView("welcome");
            }
            return;
        }

        setView(next);
    }, [goalId, hasQuiz]);

    const saveToday = () => {
        const entry = {
            date: todayKey(),
            mood: todayMood,
            text: draftText.trim() || (lang === "en" ? "Done." : "完成。"),
            goalId,
        };
        const existing = steps.findIndex((s) => s.date === todayKey());
        if (existing > -1) {
            const updated = [...steps];
            updated[existing] = entry;
            setSteps(updated);
        } else {
            setSteps([entry, ...steps]);
            const nextCount = journeyCount + 1;
            setJourneyCount(nextCount);
            if (nextCount >= JOURNEY_TARGET) setJourneyEndOpen(true);
        }
        setDraftDirty(false);
        setIsEditingToday(false);
    };

    const restartJourney = () => {
        setGoalId(null);
        setPicked({});
        setSteps([]);
        setJourneyCount(0);
        setView("welcome");
    };

    return (
        <div className="min-h-screen bg-[#F2F2F7] dark:bg-black text-black dark:text-white font-sans selection:bg-blue-100">
            <div className="h-12 w-full" />

            <main className="max-w-lg mx-auto px-5 pb-32">
                <AnimatePresence mode="wait">
                    {view === "welcome" && (
                        <WelcomeView
                            t={t} lang={lang} goalId={goalId} setGoalId={setGoalId}
                            goalText={goalText} setGoalText={setGoalText}
                            onStart={() => { pendingStartRef.current = true; setStartModalOpen(true); }}
                        />
                    )}

                    {view === "quiz" && (
                        <QuizView
                            lang={lang} t={t} quizIndex={quizIndex} picked={picked}
                            onPick={(q, optId) => setPicked(p => ({ ...p, [q.id]: optId }))}
                            onPrev={() => setQuizIndex(i => Math.max(0, i - 1))}
                            onNext={() => quizIndex === QUIZ.length - 1 ? setView("result") : setQuizIndex(i => i + 1)}
                            onExit={() => setView("welcome")}
                        />
                    )}

                    {view === "result" && (
                        <ResultView
                            t={t} lang={lang} profile={profile} goal={goal} goalText={goalText}
                            onEdit={() => setView("quiz")} onDone={() => setView("home")}
                        />
                    )}

                    {view === "home" && (
                        <HomeView
                            t={t} journeyCount={journeyCount} journeyTarget={JOURNEY_TARGET}
                            profile={profile} dailyContent={dailyContent} actionSize={actionSize} setActionSize={setActionSize}
                            draftText={draftText} setDraftText={(val) => { setDraftText(val); setDraftDirty(true); }}
                            isEditingToday={isEditingToday} setIsEditingToday={setIsEditingToday}
                            todayDone={!!todayEntry} saveToday={saveToday} draftDirty={draftDirty} todayEntry={todayEntry}
                        />
                    )}

                    {view === "wall" && <WallView t={t} steps={steps} />}

                    {view === "settings" && (
                        <SettingsView
                            t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}
                            onRestart={restartJourney}
                        />
                    )}
                </AnimatePresence>
            </main>

            <TabBar view={view} onNavigate={safeGo} t={t} />

            <AutoStartModal
                open={startModalOpen}
                durationMs={START_MODAL_MS}
                title={startModalContent?.title}
                body={startModalContent?.body}
                tip={startModalContent?.tip}
                ctaLabel={startModalContent?.cta}
                onFinished={() => { setStartModalOpen(false); setQuizIndex(0); setView("quiz"); }}
                onCancel={() => setStartModalOpen(false)}
            />

            {/* Journey End Modal */}
            <AnimatePresence>
                {journeyEndOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-white/40 dark:bg-black/40 backdrop-blur-xl">
                        <div className="bg-white dark:bg-[#1C1C1E] p-10 rounded-[3rem] text-center border border-neutral-100 dark:border-neutral-800">
                            <div className="text-4xl mb-4">🏆</div>
                            <h2 className="text-2xl font-bold mb-2">{t("journeyEnd.title")}</h2>
                            <p className="text-neutral-500 mb-8">{t("journeyEnd.body")}</p>
                            <button onClick={() => { setJourneyEndOpen(false); restartJourney(); }} className="w-full py-4 bg-black dark:bg-white dark:text-black text-white rounded-2xl font-bold">
                                {t("journeyEnd.cta")}
                            </button>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}