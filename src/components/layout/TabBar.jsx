import { motion } from "framer-motion";

export function TabBar({ view, onNavigate, t }) {
    const tabs = [
        { id: "welcome", label: t("nav.welcome"), icon: "⊕" },
        { id: "home", label: t("nav.today"), icon: "◎" },
        { id: "wall", label: t("nav.journey"), icon: "▤" },
        { id: "settings", label: t("nav.settings"), icon: "⚙" },
    ];

    return (
        <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-sm">
            <div className="bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-2xl border border-white/20 dark:border-neutral-800 rounded-[2rem] p-2 flex justify-between items-center shadow-2xl">
                {tabs.map((tab) => (
                    <button key={tab.id} onClick={() => onNavigate(tab.id)} className="flex-1 flex flex-col items-center py-2 relative">
                        <span className={`text-xl ${view === tab.id ? "text-blue-500" : "text-neutral-400"}`}>{tab.icon}</span>
                        <span className={`text-[10px] font-bold mt-1 ${view === tab.id ? "text-blue-500" : "text-neutral-400"}`}>{tab.label}</span>
                        {view === tab.id && <motion.div layoutId="tab-pill" className="absolute -bottom-1 w-1 h-1 bg-blue-500 rounded-full" />}
                    </button>
                ))}
            </div>
        </nav>
    );
}