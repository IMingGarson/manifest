import { AnimatePresence, motion } from "framer-motion";
import { Languages, Moon, ShieldAlert, User, X } from "lucide-react";
import { useState } from "react";

export function SettingsView({ t, lang, setLang, theme, setTheme }) {
    const [showAbout, setShowAbout] = useState(false);

    const themes = [
        { id: "system", label: t("settings.themeSystem") },
        { id: "light", label: t("settings.themeLight") },
        { id: "dark", label: t("settings.themeDark") },
    ];

    const StoryContent = {
        "zh-TW": {
            title: "關於作者",
            paragraphs: [
                "「我相信，選擇比努力更重要。",
                "以前我也常以為，只要再撐一下、再用力一點，就會變好。",
                "後來我才慢慢明白：很多時候，真正把我救回來的，是一句很簡單的提醒——就算此刻很難，我依然有選擇。",
                "我也相信「吸引力法則」不是玄學，而是一種生活態度。",
                "它不是要你假裝沒事、也不是要你一直正能量；而是把注意力放回自己身上，回到我能做的事、我能改變的事。",
                "當我願意把重心放在這裡，心就比較不會一直被外界拉著跑。",
                "至於焦慮，我不再把它當成負面。",
                "它常常只是某部分真實的我，在小聲提醒：「我在乎。」",
                "我想被理解、我想更靠近理想、我想過得好一點——所以我會緊張、會不安。那並不丟臉，也不代表我不夠好。",
                "這個服務的初衷，是想陪伴那些曾經為生活、感情、工作卡住的人——也包含我自己。",
                "你不需要一次就變得很強，也不必用完美證明什麼。",
                "我們只要從今天開始：把行動縮小、把感受看清、把足跡留下。",
                "每天一點點，就已經是很了不起的前進。",
                "當你願意往前一點點，人生就會開始順著那個方向，慢慢把你推向更適合你的旅途。」"
            ]
        },
        en: {
            title: "About the Creator",
            paragraphs: [
                "\"I believe choice matters more than sheer effort—so I try to remind myself, even on hard days, that I still have options.",
                "",
                "To me, the ‘law of attraction’ isn’t mysticism. It’s a way of living: gently returning to what’s within your reach, and taking one small step you can truly complete.",
                "",
                "And anxiety isn’t ‘bad.’ Sometimes it’s just an honest part of you saying, ‘This matters.’ You’re not weak—you’re human.",
                "",
                "I made this app for anyone who has felt stuck in life, love, or work—myself included. You don’t need to be perfect. We start with today: a tiny action, a quiet check-in, and one small footprint of your journey.",
                "",
                "A little each day is still progress—and often, it’s enough to begin changing your direction.\""
            ]

        }
    };

    const currentStory = StoryContent[lang] || StoryContent["zh-TW"];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 pb-32"
        >
            <header className="px-1">
                <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
                    {t("settings.title")}
                </h2>
            </header>

            {/* --- Preferences Card --- */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                            <Languages size={18} />
                        </div>
                        <p className="font-bold text-slate-700 dark:text-slate-200">{t("settings.language")}</p>
                    </div>
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                        {["zh-TW", "en"].map((l) => (
                            <button
                                key={l}
                                onClick={() => setLang(l)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${lang === l
                                    ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-white"
                                    : "text-slate-400"
                                    }`}
                            >
                                {l === "en" ? "EN" : "繁中"}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-slate-50 dark:bg-slate-800" />

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                            <Moon size={18} />
                        </div>
                        <p className="font-bold text-slate-700 dark:text-slate-200">{t("settings.theme")}</p>
                    </div>
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                        {themes.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => setTheme(opt.id)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${theme === opt.id
                                    ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-white"
                                    : "text-slate-400"
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- About Creator Portal --- */}
            <button
                onClick={() => setShowAbout(true)}
                className="w-full text-left bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between group active:scale-[0.98] transition-all"
            >
                <div className="flex items-center gap-5">
                    <div className="font-black text-xl tracking-tight text-slate-900 dark:text-white">
                        {currentStory.title}
                    </div>
                </div>
            </button>

            {/* --- Footer Disclaimer --- */}
            <div className="px-4 flex gap-4 p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <ShieldAlert size={20} className="text-slate-300 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed text-slate-400 font-medium">
                    {t("settings.disclaimer")}
                </p>
            </div>

            {/* --- Full Screen Story Overlay --- */}
            <AnimatePresence>
                {showAbout && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-white dark:bg-black overflow-y-auto"
                    >
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 200 }}
                            className="min-h-screen p-8 pb-32"
                        >
                            <div className="max-w-lg mx-auto">
                                <nav className="flex justify-end mb-10 sticky top-0 py-4 bg-white/80 dark:bg-black/80 backdrop-blur-md z-10">
                                    <button
                                        onClick={() => setShowAbout(false)}
                                        className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 active:scale-90 transition-all"
                                    >
                                        <X size={24} strokeWidth={3} />
                                    </button>
                                </nav>

                                <header className="mb-12 text-center">
                                    <div className="w-24 h-24 rounded-[2.5rem] bg-indigo-500 mx-auto mb-6 flex items-center justify-center text-white shadow-2xl shadow-indigo-500/30">
                                        <User size={48} />
                                    </div>
                                    <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
                                        {currentStory.title}
                                    </h2>
                                </header>

                                <article className="text-lg font-medium italic border-l-2 border-indigo-500/20 pl-6 ml-1 space-y-6">
                                    {currentStory.paragraphs.map((p, idx) => (
                                        <p key={idx} className="leading-relaxed text-slate-600 dark:text-slate-300">
                                            {p}
                                        </p>
                                    ))}
                                </article>

                                <div className="mt-16 h-px bg-slate-100 dark:bg-slate-800" />
                                <footer className="mt-10 text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.4em]">
                                    Manifest &copy; 2026
                                </footer>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}