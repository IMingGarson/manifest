import { motion } from "framer-motion";
import { ELEMENT_BADGE } from "../../constants";

export function HomeView({
    t,
    journeyCount,
    journeyTarget,
    profile,
    dailyContent,
    actionSize,
    setActionSize,
    draftText,
    setDraftText,
    isEditingToday,
    setIsEditingToday,
    todayDone,
    saveToday,
    draftDirty
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Header Area */}
            <header className="px-1">
                <h2 className="text-3xl font-bold tracking-tight">{t("home.title")}</h2>
                <p className="text-neutral-500 italic mt-1">
                    {t("home.day", { x: journeyCount + 1, n: journeyTarget })}
                </p>
            </header>

            {/* Affirmation Card - Original Vibrant Style */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-7 rounded-[2.5rem] text-white shadow-xl shadow-blue-500/20">
                <div className="flex flex-col h-full justify-between">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-80">
                            {t("home.affirmation")}
                        </span>
                        <p className="text-xl font-medium mt-3 leading-relaxed">
                            “{dailyContent?.affirmation}”
                        </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                        <span className="text-[11px] bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full font-medium">
                            {t(`archetype.${profile.archetype}`)}
                        </span>
                        <span className="text-[11px] bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full font-medium">
                            {ELEMENT_BADGE[profile.element]} {t(`element.${profile.element}`)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Action Card - Modern & Structured */}
            <div className="bg-white dark:bg-[#1C1C1E] rounded-[2.25rem] p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10 space-y-5">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg tracking-tight">{t("home.action")}</h3>

                    {/* Time Switcher */}
                    <div className="flex bg-[#F2F2F7] dark:bg-[#2C2C2E] p-1 rounded-xl">
                        {["mini", "full"].map((size) => (
                            <button
                                key={size}
                                onClick={() => setActionSize(size)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${actionSize === size
                                    ? "bg-white dark:bg-[#48484A] text-blue-600 dark:text-white shadow-sm"
                                    : "text-neutral-400 hover:text-neutral-600"
                                    }`}
                            >
                                {size === 'mini' ? '1m' : '5m'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Daily Micro Action Text */}
                <div className="bg-blue-50/50 dark:bg-blue-500/5 p-4 rounded-2xl border border-blue-100/50 dark:border-blue-500/10">
                    <p className="text-neutral-700 dark:text-neutral-300 text-[15px] leading-relaxed">
                        {dailyContent?.action || t("home.actionPlaceholder")}
                    </p>
                </div>

                {/* Reflection Area */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                            {t("home.entryTitle") || "Reflection"}
                        </span>
                    </div>

                    <textarea
                        rows={4}
                        // disabled={!isEditingToday}
                        value={draftText}
                        onChange={(e) => setDraftText(e.target.value)}
                        className={`w-full bg-[#F2F2F7] dark:bg-[#2C2C2E] rounded-2xl p-4 text-sm outline-none resize-none transition-all border-2 ${isEditingToday
                            ? "border-blue-500/30 bg-white dark:bg-black shadow-inner"
                            : "border-transparent"
                            }`}
                        placeholder={t("home.StepsPlaceholder")}
                    />
                </div>

                <button
                    onClick={() => isEditingToday ? saveToday() : setIsEditingToday(true)}
                    disabled={isEditingToday && !draftDirty}
                    className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-[0.98] ${!isEditingToday
                        ? (todayDone ? "bg-emerald-500 text-white" : "bg-blue-500 text-white shadow-lg shadow-blue-500/25")
                        : (!draftDirty ? "bg-neutral-200 text-neutral-400" : "bg-blue-500 text-white shadow-lg shadow-blue-500/25")
                        }`}
                >
                    {!isEditingToday
                        ? (todayDone ? `✓ ${t("home.entryLockedDone")}` : t("home.startWrite"))
                        : t("home.saveEntry")}
                </button>
            </div>

            {/* Progress Bar Area */}
            <div className="px-2 pt-2">
                <div className="flex justify-between items-end text-xs font-bold mb-2">
                    <span className="text-neutral-400 uppercase tracking-widest">{t("progress.title")}</span>
                    <span className="text-blue-500">{Math.round((journeyCount / journeyTarget) * 100)}%</span>
                </div>
                <div className="h-2.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(journeyCount / journeyTarget) * 100}%` }}
                        className="h-full bg-blue-500 rounded-full"
                    />
                </div>
            </div>
        </motion.div>
    );
}