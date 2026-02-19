import { motion } from "framer-motion";
import { QUIZ, QUIZ_TEXT } from "../../constants";

export function QuizView({ lang, t, quizIndex, picked, onPick, onPrev, onNext, onExit }) {
    const q = QUIZ[quizIndex];
    const title = QUIZ_TEXT?.[lang]?.[q.titleKey] || q.titleKey;
    const currentOptId = picked[q.id];
    const isLastQuestion = quizIndex === QUIZ.length - 1;

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
        >
            <header className="flex items-start justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{t("quiz.title")}</h2>
                    <p className="text-neutral-500 font-medium">
                        {t("quiz.progress", { x: quizIndex + 1, n: QUIZ.length })}
                    </p>
                </div>
                <button
                    onClick={onExit}
                    className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors py-1 px-2"
                >
                    {t("quiz.exit")}
                </button>
            </header>

            <div className="bg-white dark:bg-[#1C1C1E] rounded-[2.5rem] p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10 space-y-6">
                <div className="text-xl font-bold leading-tight px-1">{title}</div>

                <div className="space-y-3">
                    {q.options.map((opt) => {
                        const isSelected = opt.id === currentOptId;
                        return (
                            <button
                                key={opt.id}
                                onClick={() => onPick(q, opt.id)}
                                className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-200 border-2 ${isSelected
                                        ? "bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-500/20"
                                        : "bg-[#F2F2F7] dark:bg-[#2C2C2E] border-transparent text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-[#3A3A3C]"
                                    }`}
                            >
                                <div className="font-bold">{QUIZ_TEXT?.[lang]?.[opt.textKey] || opt.textKey}</div>
                            </button>
                        );
                    })}
                </div>

                <div className="flex gap-3 pt-4">
                    {/* Secondary Button: Previous (Now always visible) */}
                    <button
                        onClick={onPrev}
                        disabled={quizIndex === 0}
                        className={`flex-1 py-4 rounded-2xl font-bold transition-all border-2 ${quizIndex === 0
                                ? "bg-transparent border-neutral-200 dark:border-neutral-800 text-neutral-300 dark:text-neutral-700 cursor-not-allowed"
                                : "bg-neutral-100 dark:bg-[#2C2C2E] border-transparent text-neutral-700 dark:text-neutral-200 active:scale-95 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                            }`}
                    >
                        {t("quiz.prev")}
                    </button>

                    {/* Primary Button: Next/Result */}
                    <button
                        onClick={onNext}
                        disabled={!currentOptId}
                        className={`flex-1 py-4 rounded-2xl font-bold transition-all active:scale-95 border-2 border-transparent ${!currentOptId
                                ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
                                : "bg-blue-500 text-white shadow-lg shadow-blue-500/25 border-blue-600"
                            }`}
                    >
                        {isLastQuestion ? t("quiz.seeResult") : t("quiz.next")}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}