export const JOURNEY_TARGET = 7;
export const START_MODAL_MS = 5000;

export function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function formatStr(template, vars = {}) {
    return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}

export function pickOne(arr, seedStr) {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    let h = 0;
    for (let i = 0; i < seedStr.length; i++) h = (h * 31 + seedStr.charCodeAt(i)) >>> 0;
    return arr[h % arr.length];
}

export function computeProfile(answerOpts) {
    const scores = { doer: 0, thinker: 0, feeler: 0, builder: 0, fire: 0, wind: 0, water: 0, earth: 0 };
    for (const opt of answerOpts) {
        if (!opt?.scores) continue;
        for (const [k, v] of Object.entries(opt.scores)) scores[k] = (scores[k] || 0) + v;
    }
    const archetypes = ["doer", "thinker", "feeler", "builder"];
    const elements = ["fire", "wind", "water", "earth"];
    const archetype = archetypes.reduce((best, k) => (scores[k] > scores[best] ? k : best), "doer");
    const element = elements.reduce((best, k) => (scores[k] > scores[best] ? k : best), "fire");
    return { archetype, element, scores };
}

export function applyTheme(theme) {
    const root = document.documentElement;
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    const isDark = theme === "dark" || (theme === "system" && mq?.matches);
    root.classList.toggle("dark", !!isDark);
}