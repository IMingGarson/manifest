import { motion } from "framer-motion";
import { GOALS } from "../../constants";

export function WelcomeView({ t, lang, goalId, setGoalId, goalText, setGoalText, onStart }) {
    return (
        <motion.div
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
                                onClick={() => setGoalId(g.id)}
                                className={`w-full p-5 rounded-2xl flex items-center justify-between shadow-sm active:scale-[0.98] transition-all group ${active ? "ring-2 ring-blue-500/40 bg-white dark:bg-[#1C1C1E]" : "bg-white dark:bg-[#1C1C1E] ring-1 ring-black/5 dark:ring-white/10"
                                    }`}
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
                </div>

                <button
                    onClick={onStart}
                    disabled={!goalId}
                    className={`w-full py-4 rounded-2xl font-bold shadow-md transition ${goalId ? "bg-blue-500 text-white active:bg-blue-600" : "bg-neutral-200 text-neutral-400 dark:bg-neutral-800"
                        }`}
                >
                    {goalId ? t("welcome.toGoalStart") : t("welcome.ctaDisabled")}
                </button>
            </section>
        </motion.div>
    );
}