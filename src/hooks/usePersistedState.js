import { useEffect, useState } from "react";

export function usePersistedState(key, initialValue) {
    const [val, setVal] = useState(() => {
        try {
            const raw = localStorage.getItem(key);
            return raw === null ? initialValue : JSON.parse(raw);
        } catch { return initialValue; }
    });

    useEffect(() => {
        try { localStorage.setItem(key, JSON.stringify(val)); } catch { }
    }, [key, val]);

    return [val, setVal];
}