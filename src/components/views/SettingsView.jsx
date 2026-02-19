import { motion } from "framer-motion";

export function SettingsView({ t, lang, setLang, theme, setTheme, onRestart }) {
    const themes = [
        { id: "system", label: t("settings.themeSystem") },
        { id: "light", label: t("settings.themeLight") },
        { id: "dark", label: t("settings.themeDark") },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <header>
                <h2 className="text-3xl font-bold">{t("settings.title")}</h2>
            </header>

            <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10 space-y-5">
                {/* Language Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-bold">{t("settings.language")}</p>
                    </div>
                    <div className="flex gap-2">
                        {["zh-TW", "en"].map((l) => (
                            <button
                                key={l}
                                onClick={() => setLang(l)}
                                className={`px-3 py-2 rounded-xl text-xs font-bold transition ${lang === l
                                    ? "bg-blue-500 text-white"
                                    : "bg-neutral-100 dark:bg-[#2C2C2E] text-neutral-50"
                                    }`}
                            >
                                {l === "en" ? t("settings.langEn") : t("settings.langZh")}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

                {/* Theme Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-bold">{t("settings.theme")}</p>
                    </div>
                    <div className="flex gap-2">
                        {themes.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => setTheme(opt.id)}
                                className={`px-3 py-2 rounded-xl text-xs font-bold transition ${theme === opt.id
                                    ? "bg-blue-500 text-white"
                                    : "bg-neutral-100 dark:bg-[#2C2C2E] text-neutral-500"
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-neutral-100 dark:bg-neutral-800" />
            </div>

            <div className="text-xs text-neutral-400 px-2 leading-relaxed">
                {t("settings.disclaimer")}
            </div>
        </motion.div>
    );
}