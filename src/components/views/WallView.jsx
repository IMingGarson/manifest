import { motion } from "framer-motion";

export function WallView({ t, steps = [] }) {
    return (
        <motion.div
            key="wall"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <header>
                <h2 className="text-3xl font-bold">{t("steps.title")}</h2>
            </header>

            {steps.length === 0 ? (
                /* Enhanced Empty State */
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white dark:bg-[#1C1C1E] rounded-[2.5rem] border border-dashed border-neutral-200 dark:border-neutral-800"
                >
                    <div className="w-16 h-16 bg-neutral-100 dark:bg-[#2C2C2E] rounded-full flex items-center justify-center text-2xl mb-4">
                        📖
                    </div>
                    <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-200 w-full">
                        {t("steps.subtitle")}
                    </h3>
                    <p className="text-sm text-neutral-500 mt-2 w-full">
                        {t("steps.empty")}
                    </p>
                </motion.div>
            ) : (
                /* List of entries */
                <div className="space-y-4">
                    {steps.map((s, i) => (
                        <motion.div
                            key={`${s.date}-${i}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white dark:bg-[#1C1C1E] p-6 rounded-[2rem] shadow-sm border border-black/5 dark:border-white/5"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest">
                                    {s.date}
                                </span>
                                <span className="text-lg">{s.mood === "happy" ? "☀️" : "☁️"}</span>
                            </div>
                            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
                                {s.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}