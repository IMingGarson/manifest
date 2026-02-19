import { motion } from "framer-motion";
import { ELEMENT_BADGE } from "../../constants";

export function ResultView({ t, profile, goal, goalText, onEdit, onDone }) {
    return (
        <motion.div
            key="result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
        >
            <header>
                <h2 className="text-3xl font-bold">{t("result.title")}</h2>
            </header>

            <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#F2F2F7] dark:bg-[#2C2C2E] rounded-2xl p-4">
                        <div className="text-xs font-bold text-neutral-500 uppercase">
                            {t("result.archetypeTitle")}
                        </div>
                        <div className="text-lg font-bold mt-1">
                            {t(`archetype.${profile.archetype}`)}
                        </div>
                    </div>
                    <div className="bg-[#F2F2F7] dark:bg-[#2C2C2E] rounded-2xl p-4">
                        <div className="text-xs font-bold text-neutral-500 uppercase">
                            {t("result.elementTitle")}
                        </div>
                        <div className="text-lg font-bold mt-1">
                            {ELEMENT_BADGE[profile.element]} {t(`element.${profile.element}`)}
                        </div>
                    </div>
                </div>

                <div className="bg-[#F2F2F7] dark:bg-[#2C2C2E] rounded-2xl p-4">
                    <div className="text-xs font-bold text-neutral-500 uppercase">
                        {t("result.goalTitle")}
                    </div>
                    <div className="text-base font-bold mt-1">
                        {goal ? `${goal.emoji} ${t(`goals.${goal.id}`)}` : t("result.goalEmpty")}
                    </div>
                    {goalText && (
                        <div className="text-sm text-neutral-500 mt-2 italic">“{goalText}”</div>
                    )}
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        onClick={onEdit}
                        className="flex-1 py-3 rounded-xl font-bold bg-neutral-900 text-white dark:bg-white dark:text-black"
                    >
                        {t("result.editQuiz")}
                    </button>
                    <button
                        onClick={onDone}
                        className="flex-1 py-3 rounded-xl font-bold bg-blue-500 text-white active:bg-blue-600"
                    >
                        {t("result.enterDaily")}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}