import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

export function AutoStartModal({
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