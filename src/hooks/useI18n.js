import { useCallback } from 'react';
import { I18N } from '../constants';
import { formatStr } from '../utils/helpers';

export function useI18n(lang) {
    const dict = I18N[lang] || I18N["zh-TW"];

    const t = useCallback((key, vars) => {
        const parts = key.split(".");
        let cur = dict;
        for (const p of parts) cur = cur?.[p];
        if (typeof cur === "string") return vars ? formatStr(cur, vars) : cur;
        return key;
    }, [dict]);

    return { t, dict };
}