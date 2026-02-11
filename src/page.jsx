import { useEffect, useMemo, useState } from "react";

/**
 * ----------------------------------------------------------------------------
 * i18n (zh-TW + en) — every wording MUST use t(...)
 * ----------------------------------------------------------------------------
 */
const I18N = {
    "zh-TW": {
        app: {
            name: "Manifest",
            tagline: "用每天的小行動，把理想變成日常。",
        },
        nav: {
            today: "今日",
            evidence: "證據牆",
            progress: "進度",
            settings: "設定",
            home: "回首頁",
            restart: "重新開始",
            back: "返回",
            exit: "退出",
        },
        welcome: {
            title: "先選一個你想實現的目標",
            subtitle:
                "你會得到一套專屬的每日肯定句與微行動，幫你累積信念與可見的改變。",
            goalLabel: "目標類型",
            goalHint: "先從最在意的一件事開始就好。",
            oneLineLabel: "用一句話描述你的目標（選填）",
            oneLinePlaceholder: "例如：我想更有自信、更願意主動面對機會。",
            cta: "開始建立我的每日流程",
            ctaDisabled: "請先選擇目標",
            noteTitle: "你會做的事很簡單",
            noteBody:
                "每天 30–60 秒：看見提醒 → 做一個小行動 → 留下一句證據。重點是可持續，而不是一次做到完美。",
        },
        quiz: {
            title: "快速問卷",
            progress: "第 {x} 題，共 {n} 題",
            prev: "上一題",
            next: "下一題",
            seeResult: "看結果",
            exit: "退出問卷",
        },
        result: {
            title: "你的個人化設定完成",
            archetypeTitle: "行為傾向",
            elementTitle: "能量元素",
            whyTitle: "這會如何影響你的每日提示？",
            whyBody:
                "我們會依照你的傾向，挑選你「更做得下去」的微行動，並用你容易吸收的語氣寫肯定句。你可以隨時回來重新測一次。",
            goalTitle: "你的目標",
            goalEmpty: "（未選擇）",
            editQuiz: "回去調整問卷",
            enterDaily: "進入每日卡片",
        },
        home: {
            title: "今日卡片",
            goal: "目標",
            streak: "連續天數",
            archetype: "行動偏好",
            element: "元素",
            affirmation: "今日肯定句",
            action: "今日微行動（5–10 分鐘）",
            mood: "今天的狀態",
            evidenceInputLabel: "寫一句今天的證據（選填）",
            evidencePlaceholder:
                "例如：我今天把一件拖延的事推進了 10 分鐘，心裡更踏實。",
            done: "完成今天",
            doneDone: "今天已完成",
            doneSub:
                "完成後會記到證據牆，讓你看見自己正在改變。",
            openEvidence: "查看證據牆",
            openProgress: "查看進度",
            gentleNote:
                "如果今天狀態不好也沒關係。把行動縮小到「你做得到」的程度，才是能持續的關鍵。",
        },
        evidence: {
            title: "證據牆",
            subtitle: "你完成的每一步，都在替你建立更穩的信念。",
            empty: "目前還沒有紀錄。完成第一天後，就會出現在這裡。",
            filterAll: "全部",
            filterGoal: "依目標",
        },
        progress: {
            title: "進度",
            subtitle: "穩定累積，勝過偶爾爆衝。",
            streak: "連續天數",
            daysDone: "完成天數",
            evidenceCount: "證據筆數",
            milestonesTitle: "里程碑",
            milestonesBody: "7 天、14 天、30 天完成後，我們會在這裡給你一個小回顧。",
        },
        settings: {
            title: "設定",
            language: "語言",
            theme: "外觀",
            themeSystem: "跟隨系統",
            themeLight: "淺色",
            themeDark: "深色",
            privacyTitle: "隱私",
            privacyBody:
                "你的內容預設只留在本機（MVP）。未來若啟用同步或雲端功能，會在此清楚說明並取得同意。",
            aboutTitle: "關於",
            aboutBody:
                "Manifest 透過「視覺化提醒 × 微行動 × 證據累積」協助你建立更穩的心態與更主動的習慣。",
        },
        goals: {
            relationship: "感情 / 人際",
            confidence: "自信 / 自我價值",
            career: "財務 / 職涯",
            health: "健康 / 體能",
            mind: "生活狀態（平靜/快樂）",
            growth: "學習 / 成長",
        },
        moods: {
            happy: "😊",
            calm: "😌",
            fired: "🤩",
            tired: "😤",
            sad: "😢",
        },
        archetype: {
            doer: "行動派",
            thinker: "思考派",
            feeler: "感受派",
            builder: "秩序派",
        },
        element: {
            fire: "火（動能）",
            wind: "風（靈感/社交）",
            water: "水（情緒/直覺）",
            earth: "土（穩定/紀律）",
        },
    },

    en: {
        app: {
            name: "Manifest",
            tagline: "Small daily actions, real visible change.",
        },
        nav: {
            today: "Today",
            evidence: "Evidence",
            progress: "Progress",
            settings: "Settings",
            home: "Home",
            restart: "Restart",
            back: "Back",
            exit: "Exit",
        },
        welcome: {
            title: "Choose a goal you want to bring into your life",
            subtitle:
                "You’ll get personalized daily affirmations and micro-actions to build belief through consistent progress.",
            goalLabel: "Goal",
            goalHint: "Start with the one that matters most right now.",
            oneLineLabel: "Describe your goal in one line (optional)",
            oneLinePlaceholder: "E.g., I want to feel confident and take initiative more often.",
            cta: "Build my daily flow",
            ctaDisabled: "Select a goal to continue",
            noteTitle: "Your daily flow is simple",
            noteBody:
                "30–60 seconds a day: see a cue → do a small action → log one piece of evidence. Consistency beats perfection.",
        },
        quiz: {
            title: "Quick Quiz",
            progress: "Question {x} of {n}",
            prev: "Previous",
            next: "Next",
            seeResult: "View result",
            exit: "Exit quiz",
        },
        result: {
            title: "Your personalization is ready",
            archetypeTitle: "Behavior style",
            elementTitle: "Energy element",
            whyTitle: "How this affects your daily prompts",
            whyBody:
                "We’ll match micro-actions you’re more likely to complete and phrase affirmations in a tone you naturally absorb. You can retake the quiz anytime.",
            goalTitle: "Your goal",
            goalEmpty: "(Not selected)",
            editQuiz: "Edit quiz",
            enterDaily: "Go to Today",
        },
        home: {
            title: "Today",
            goal: "Goal",
            streak: "Streak",
            archetype: "Style",
            element: "Element",
            affirmation: "Affirmation",
            action: "Micro-action (5–10 min)",
            mood: "How are you today?",
            evidenceInputLabel: "One sentence of evidence (optional)",
            evidencePlaceholder:
                "E.g., I moved a delayed task forward for 10 minutes, and I feel more grounded.",
            done: "Complete today",
            doneDone: "Completed",
            doneSub: "After completing, we’ll add it to your Evidence wall.",
            openEvidence: "Open Evidence",
            openProgress: "Open Progress",
            gentleNote:
                "If today feels heavy, that’s okay. Shrink the action to something you can truly complete—consistency is the win.",
        },
        evidence: {
            title: "Evidence",
            subtitle: "Every completed step becomes proof you’re changing.",
            empty: "No entries yet. Complete your first day to see it here.",
            filterAll: "All",
            filterGoal: "By goal",
        },
        progress: {
            title: "Progress",
            subtitle: "Steady beats intense.",
            streak: "Streak",
            daysDone: "Days completed",
            evidenceCount: "Evidence entries",
            milestonesTitle: "Milestones",
            milestonesBody: "At 7, 14, and 30 days, you’ll see a short reflection here.",
        },
        settings: {
            title: "Settings",
            language: "Language",
            theme: "Appearance",
            themeSystem: "System",
            themeLight: "Light",
            themeDark: "Dark",
            privacyTitle: "Privacy",
            privacyBody:
                "By default, your content stays on this device (MVP). If cloud sync is added later, we’ll explain it clearly and ask for consent.",
            aboutTitle: "About",
            aboutBody:
                "Manifest helps you build belief and momentum through cues, micro-actions, and an accumulating evidence wall.",
        },
        goals: {
            relationship: "Relationships",
            confidence: "Confidence",
            career: "Career / Money",
            health: "Health",
            mind: "Mindset / Calm",
            growth: "Learning / Growth",
        },
        moods: {
            happy: "😊",
            calm: "😌",
            fired: "🤩",
            tired: "😤",
            sad: "😢",
        },
        archetype: {
            doer: "Doer",
            thinker: "Thinker",
            feeler: "Feeler",
            builder: "Builder",
        },
        element: {
            fire: "Fire (Drive)",
            wind: "Wind (Ideas/Social)",
            water: "Water (Emotion/Intuition)",
            earth: "Earth (Stability)",
        },
    },
};

function formatStr(template, vars = {}) {
    return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}
function usePersistedState(key, initialValue) {
    const [val, setVal] = useState(() => {
        try {
            const raw = localStorage.getItem(key);
            if (raw === null) return initialValue;
            return JSON.parse(raw);
        } catch {
            return initialValue;
        }
    });
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(val));
        } catch { }
    }, [key, val]);
    return [val, setVal];
}

/**
 * ----------------------------------------------------------------------------
 * Theme: light / dark / system
 * ----------------------------------------------------------------------------
 * Tailwind dark mode uses 'dark' class on <html>.
 * - light: remove 'dark'
 * - dark: add 'dark'
 * - system: remove explicit control; apply based on matchMedia changes
 */
function applyTheme(theme) {
    const root = document.documentElement;
    root.classList.remove("dark");
    if (theme === "dark") root.classList.add("dark");
    // if system, do nothing here; we’ll handle via listener.
}
function useTheme(theme) {
    useEffect(() => {
        if (typeof window === "undefined") return;

        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const sync = () => {
            if (theme === "system") {
                document.documentElement.classList.toggle("dark", mq.matches);
            } else {
                applyTheme(theme);
            }
        };
        sync();
        mq.addEventListener?.("change", sync);
        return () => mq.removeEventListener?.("change", sync);
    }, [theme]);
}

/**
 * ----------------------------------------------------------------------------
 * Data: Goals / Quiz / Content Library
 * ----------------------------------------------------------------------------
 */
const GOALS = [
    { id: "relationship", emoji: "💞" },
    { id: "confidence", emoji: "🦁" },
    { id: "career", emoji: "💼" },
    { id: "health", emoji: "🏃‍♂️" },
    { id: "mind", emoji: "🧘‍♀️" },
    { id: "growth", emoji: "📚" },
];

const QUIZ = [
    {
        id: "q1",
        titleKey: "q1",
        options: [
            { id: "a", textKey: "q1a", scores: { doer: 2, fire: 2 } },
            { id: "b", textKey: "q1b", scores: { thinker: 2, wind: 2 } },
            { id: "c", textKey: "q1c", scores: { feeler: 2, water: 2 } },
            { id: "d", textKey: "q1d", scores: { builder: 2, earth: 2 } },
        ],
    },
    {
        id: "q2",
        titleKey: "q2",
        options: [
            { id: "a", textKey: "q2a", scores: { fire: 2, doer: 1 } },
            { id: "b", textKey: "q2b", scores: { wind: 2, thinker: 1 } },
            { id: "c", textKey: "q2c", scores: { water: 2, feeler: 1 } },
            { id: "d", textKey: "q2d", scores: { earth: 2, builder: 1 } },
        ],
    },
    {
        id: "q3",
        titleKey: "q3",
        options: [
            { id: "a", textKey: "q3a", scores: { fire: 2 } },
            { id: "b", textKey: "q3b", scores: { wind: 2 } },
            { id: "c", textKey: "q3c", scores: { water: 2 } },
            { id: "d", textKey: "q3d", scores: { earth: 2 } },
        ],
    },
    {
        id: "q4",
        titleKey: "q4",
        options: [
            { id: "a", textKey: "q4a", scores: { fire: 2 } },
            { id: "b", textKey: "q4b", scores: { wind: 2 } },
            { id: "c", textKey: "q4c", scores: { water: 2 } },
            { id: "d", textKey: "q4d", scores: { earth: 2 } },
        ],
    },
    {
        id: "q5",
        titleKey: "q5",
        options: [
            { id: "a", textKey: "q5a", scores: { builder: 1, earth: 1 } },
            { id: "b", textKey: "q5b", scores: { wind: 1 } },
            { id: "c", textKey: "q5c", scores: { water: 1 } },
            { id: "d", textKey: "q5d", scores: { doer: 1, fire: 1 } },
        ],
    },
    {
        id: "q6",
        titleKey: "q6",
        options: [
            { id: "a", textKey: "q6a", scores: { wind: 2 } },
            { id: "b", textKey: "q6b", scores: { fire: 1, earth: 1 } },
            { id: "c", textKey: "q6c", scores: { earth: 2 } },
            { id: "d", textKey: "q6d", scores: { thinker: 1, wind: 1 } },
        ],
    },
    {
        id: "q7",
        titleKey: "q7",
        options: [
            { id: "a", textKey: "q7a", scores: { fire: 1, doer: 1 } },
            { id: "b", textKey: "q7b", scores: { wind: 1 } },
            { id: "c", textKey: "q7c", scores: { earth: 1, builder: 1 } },
            { id: "d", textKey: "q7d", scores: { water: 1 } },
        ],
    },
    {
        id: "q8",
        titleKey: "q8",
        options: [
            { id: "a", textKey: "q8a", scores: { water: 1, fire: 1 } },
            { id: "b", textKey: "q8b", scores: { fire: 2 } },
            { id: "c", textKey: "q8c", scores: { earth: 2 } },
            { id: "d", textKey: "q8d", scores: { wind: 2 } },
        ],
    },
];

// Quiz wording per language
const QUIZ_TEXT = {
    "zh-TW": {
        q1: "遇到新目標你通常先？",
        q1a: "立刻開始做，邊做邊調整",
        q1b: "先想清楚方向與風險",
        q1c: "先確認感受與直覺是不是對的",
        q1d: "先排節奏，穩穩做",

        q2: "你卡住最常因為？",
        q2a: "熱度退太快，動力跟不上",
        q2b: "想太多，怕做錯",
        q2c: "情緒起伏大，容易內耗",
        q2d: "缺乏規律，難以持續",

        q3: "你最需要的支持是？",
        q3a: "有人推我一把，讓我動起來",
        q3b: "幫我釐清優先順序與方向",
        q3c: "被理解、被安定情緒",
        q3d: "協助我建立可執行的習慣",

        q4: "你偏好的提醒語氣？",
        q4a: "直接明確：現在就做一小步",
        q4b: "理性拆解：一步一步來",
        q4c: "溫柔陪伴：我陪你慢慢走",
        q4d: "簡潔指令：給我今天要做什麼",

        q5: "你一天最容易完成小行動的時間？",
        q5a: "早上",
        q5b: "中午",
        q5c: "晚上",
        q5d: "不固定",

        q6: "你比較做得下去的微行動是？",
        q6a: "社交型（訊息、連結、互動）",
        q6b: "身體型（走路、運動、呼吸）",
        q6c: "整理規劃型（清單、整理環境）",
        q6d: "學習輸出型（讀、寫、練習）",

        q7: "你現在怎麼看待「顯化」？",
        q7a: "我相信它，想認真練",
        q7b: "半信半疑，但願意試看看",
        q7c: "我把它當作習慣與心態訓練",
        q7d: "我比較看感覺，但希望更穩定",

        q8: "30 天後你最想看到的改變？",
        q8a: "更有自信",
        q8b: "更有行動力",
        q8c: "更穩定、有節奏",
        q8d: "更清楚方向、少內耗",
    },
    en: {
        q1: "When you start a new goal, what do you do first?",
        q1a: "Start immediately and adjust along the way",
        q1b: "Think it through and assess risks",
        q1c: "Check how it feels—trust your intuition",
        q1d: "Set a steady plan and follow a rhythm",

        q2: "You get stuck most often because…",
        q2a: "Motivation fades too fast",
        q2b: "Overthinking and fear of mistakes",
        q2c: "Emotional ups and downs drain you",
        q2d: "Lack of consistency and structure",

        q3: "The support you need most is…",
        q3a: "A push that gets me moving",
        q3b: "Clarity on priorities and direction",
        q3c: "Emotional grounding and understanding",
        q3d: "Help building doable habits",

        q4: "What tone works best for reminders?",
        q4a: "Direct: take one small step now",
        q4b: "Rational: break it down",
        q4c: "Gentle: I’m with you",
        q4d: "Minimal: just tell me what to do",

        q5: "When are you most likely to do a micro-action?",
        q5a: "Morning",
        q5b: "Midday",
        q5c: "Evening",
        q5d: "Varies",

        q6: "Which micro-actions are easiest for you to keep?",
        q6a: "Social (message, connect, interact)",
        q6b: "Body (walk, move, breathe)",
        q6c: "Organize (plan, tidy, list)",
        q6d: "Learn/Output (read, write, practice)",

        q7: "How do you see “manifesting” right now?",
        q7a: "I believe in it and want to train it",
        q7b: "Not sure, but I’ll try",
        q7c: "I treat it as mindset + habit training",
        q7d: "I’m feeling-based, but want more stability",

        q8: "In 30 days, what change do you want most?",
        q8a: "More confidence",
        q8b: "More action and momentum",
        q8c: "More stability and rhythm",
        q8d: "More clarity, less mental noise",
    },
};

const ELEMENT_BADGE = { fire: "🔥", wind: "🌬️", water: "💧", earth: "🪨" };

// Production-ready content pools (still mock, but not “demo hint” tone)
const AFFIRMATIONS = {
    relationship: {
        fire: [
            { "zh-TW": "我值得被真誠對待；我今天願意主動踏出一小步。", en: "I deserve sincerity. Today I’ll take one small step toward connection." },
            { "zh-TW": "我把自己活得更明亮，適合的人會更靠近我。", en: "When I show up brighter, the right people move closer." },
        ],
        wind: [
            { "zh-TW": "我用好奇與真誠建立連結；我允許關係自然發生。", en: "I connect with curiosity and sincerity. I allow things to unfold." },
            { "zh-TW": "我願意嘗試新的互動方式，讓緣分有機會進來。", en: "I try new ways to connect and make room for possibility." },
        ],
        water: [
            { "zh-TW": "我先照顧自己的感受；被理解與被珍惜會來到我身上。", en: "I care for my feelings first. Being seen and cherished comes to me." },
            { "zh-TW": "我把溫柔留給自己，也留給我想要的關係。", en: "I bring gentleness to myself and the relationship I want." },
        ],
        earth: [
            { "zh-TW": "我用穩定與界線建立關係；真誠會被看見。", en: "I build with steadiness and boundaries. My sincerity will be seen." },
            { "zh-TW": "我不急著證明什麼；我專注在持續的善意與一致。", en: "I don’t rush to prove anything. I practice steady kindness and consistency." },
        ],
    },

    confidence: {
        fire: [
            { "zh-TW": "我不需要完美才值得；我今天可以更勇敢一點。", en: "I don’t need perfection to be worthy. I can be a little braver today." },
            { "zh-TW": "我選擇行動，而不是等待自信先出現。", en: "I choose action instead of waiting for confidence to arrive first." },
        ],
        wind: [
            { "zh-TW": "清晰會在路上長出來；我先做下一步。", en: "Clarity grows on the way. I’ll take the next step first." },
            { "zh-TW": "我把自我懷疑換成更有用的問題：下一步是什麼？", en: "I replace doubt with a useful question: what’s the next step?" },
        ],
        water: [
            { "zh-TW": "我願意理解自己的不安；我仍然值得被喜歡。", en: "I can hold my insecurity with kindness. I’m still worthy of love." },
            { "zh-TW": "我把自己放回優先順位，安全感會回來。", en: "I put myself back on the priority list. Safety returns." },
        ],
        earth: [
            { "zh-TW": "我用小步累積自信；我正在變得更可靠。", en: "I build confidence in small steps. I’m becoming more reliable." },
            { "zh-TW": "我完成一件小事，就是在訓練『我做得到』。", en: "Every small completion trains my ‘I can do this’." },
        ],
    },

    career: {
        fire: [
            { "zh-TW": "我敢於爭取更好的機會；我的價值值得被看見。", en: "I advocate for better opportunities. My value deserves visibility." },
            { "zh-TW": "我把能量放在行動與產出，結果會回應我。", en: "I place my energy into action and output. Results respond." },
        ],
        wind: [
            { "zh-TW": "我優化策略與步驟；我用更聰明的方法前進。", en: "I refine strategy and steps. I move forward intelligently." },
            { "zh-TW": "我把焦慮轉成計畫：下一個可驗證的小步驟。", en: "I turn anxiety into a plan: the next verifiable step." },
        ],
        water: [
            { "zh-TW": "我值得一個更適合我的舞台；我允許自己有節奏。", en: "I deserve a stage that fits me. I allow my own pace." },
            { "zh-TW": "我相信我能被看見；我用真誠建立連結。", en: "I can be seen. I build connections with sincerity." },
        ],
        earth: [
            { "zh-TW": "我用穩定輸出建立信任；機會會跟上。", en: "I build trust through consistent output. Opportunities follow." },
            { "zh-TW": "我持續做對的事，長期會給我回報。", en: "I do the right things consistently. The long term rewards me." },
        ],
    },

    health: {
        fire: [
            { "zh-TW": "我今天動起來，就是在選擇更強的自己。", en: "Moving today is choosing a stronger version of me." },
            { "zh-TW": "我把身體當夥伴；我願意好好照顧它。", en: "My body is my teammate. I choose to care for it." },
        ],
        wind: [
            { "zh-TW": "我找到適合我、做得久的方法；不追求一次到位。", en: "I choose what I can sustain, not what’s perfect." },
            { "zh-TW": "我用好奇心照顧健康：今天只做一點點。", en: "I care with curiosity: just a little today." },
        ],
        water: [
            { "zh-TW": "我溫柔對待身體；它一直在努力支持我。", en: "I treat my body gently. It’s been supporting me all along." },
            { "zh-TW": "我允許慢慢變好；我正在回到更舒服的狀態。", en: "I allow slow improvement. I’m returning to ease." },
        ],
        earth: [
            { "zh-TW": "我用日常的小規律，換來更穩的健康。", en: "Small daily structure creates stable health." },
            { "zh-TW": "我今天守住一個小習慣，就很值得。", en: "Keeping one small habit today is a win." },
        ],
    },

    mind: {
        fire: [
            { "zh-TW": "我主動選擇讓我更快樂的事；幸福可以練習。", en: "I choose what lifts me. Happiness is trainable." },
            { "zh-TW": "我把注意力拉回當下，心會更亮。", en: "I bring attention back to now. My mind brightens." },
        ],
        wind: [
            { "zh-TW": "我把雜訊整理成一件可做的事；清爽會出現。", en: "I turn noise into one doable thing. Relief follows." },
            { "zh-TW": "我允許自己換個角度看事情，心會更鬆。", en: "I allow a new perspective. My mind loosens." },
        ],
        water: [
            { "zh-TW": "我的感受可以存在；它會流過去，而我仍然安好。", en: "My feelings can exist. They pass through, and I’m still okay." },
            { "zh-TW": "我先安住自己；內在穩了，外在也會跟著順。", en: "I settle myself first. Outer life follows inner steadiness." },
        ],
        earth: [
            { "zh-TW": "我用一點秩序換一點平靜；慢慢就會變多。", en: "A bit of order creates a bit of calm—then more." },
            { "zh-TW": "我做完一件小事，就是在建立安全感。", en: "Completing one small thing builds safety." },
        ],
    },

    growth: {
        fire: [
            { "zh-TW": "我用行動學習；今天的一小步會長成實力。", en: "I learn by doing. A small step becomes skill." },
            { "zh-TW": "我敢於練習；熟練是做出來的。", en: "I practice. Mastery is built." },
        ],
        wind: [
            { "zh-TW": "我拆小、驗證、再優化；我用方法前進。", en: "I break it down, verify, then refine. I move with method." },
            { "zh-TW": "我把學習變得有趣，就能更持久。", en: "I make learning enjoyable so it lasts." },
        ],
        water: [
            { "zh-TW": "我欣賞自己願意成長；慢慢來也算前進。", en: "I respect my growth. Slow is still forward." },
            { "zh-TW": "我不跟別人比較；我只跟昨天的自己比。", en: "I don’t compare with others—only with yesterday’s me." },
        ],
        earth: [
            { "zh-TW": "我用固定節奏累積；每天一點就很強。", en: "I build with rhythm. A little every day is powerful." },
            { "zh-TW": "我把成長做成習慣，成果會自然出現。", en: "I turn growth into a habit. Results follow naturally." },
        ],
    },
};

const MICRO_ACTIONS = {
    relationship: {
        fire: [
            { "zh-TW": "主動傳一則真誠訊息給一個你欣賞的人（30 秒就好）", en: "Send one sincere message to someone you appreciate (30 seconds)." },
            { "zh-TW": "去一個『會遇到人』的地方待 15 分鐘", en: "Spend 15 minutes somewhere you might meet people." },
        ],
        wind: [
            { "zh-TW": "更新社群/交友檔案一句話：寫出你重視的關係特質", en: "Update one line in your profile: what quality you value in a relationship." },
            { "zh-TW": "跟朋友聊 5 分鐘：分享你最近在變好的地方", en: "Talk to a friend for 5 minutes: share one way you’re improving." },
        ],
        water: [
            { "zh-TW": "寫下你想要的關係感受 3 點（安心/被看見/尊重…）", en: "Write 3 feelings you want in a relationship (safe/seen/respected…)." },
            { "zh-TW": "做 2 分鐘慢呼吸：想像被溫柔對待的畫面", en: "2 minutes of slow breathing while imagining being treated gently." },
        ],
        earth: [
            { "zh-TW": "整理外在或環境一個角落（桌面/衣櫃 5 分鐘）", en: "Tidy one small area (desk/closet) for 5 minutes." },
            { "zh-TW": "把今晚睡前流程縮短成一個固定動作（例如：洗臉就上床）", en: "Choose one consistent bedtime action (e.g., wash face → bed)." },
        ],
    },

    confidence: {
        fire: [
            { "zh-TW": "做一件你一直拖延的小事（5 分鐘版本）", en: "Do the 5-minute version of something you’ve been avoiding." },
            { "zh-TW": "出門走 10 分鐘：抬頭、放鬆肩膀、慢慢呼吸", en: "Walk for 10 minutes: head up, shoulders relaxed, breathe slowly." },
        ],
        wind: [
            { "zh-TW": "把『我不行』改寫成『我下一步可以…』寫一行", en: "Rewrite “I can’t” into “My next step is…” (one line)." },
            { "zh-TW": "列出 3 個你做得到的證據（再小也算）", en: "List 3 pieces of proof you can do things (tiny counts)." },
        ],
        water: [
            { "zh-TW": "對自己說一句溫柔話（真的唸出來）", en: "Say one kind sentence to yourself out loud." },
            { "zh-TW": "寫下：今天我最需要被理解的是____（一句就好）", en: "Write: “What I most need understood today is ____.”" },
        ],
        earth: [
            { "zh-TW": "把明天第一件事寫成一行清單（越小越好）", en: "Write tomorrow’s first task as one tiny checklist item." },
            { "zh-TW": "整理手機桌面：刪 5 張不需要的截圖或照片", en: "Clean your phone: delete 5 unnecessary screenshots/photos." },
        ],
    },

    career: {
        fire: [
            { "zh-TW": "把一件作品/工作推進 10 分鐘（只要開始）", en: "Push one work item forward for 10 minutes (just start)." },
            { "zh-TW": "寫一句你今天要主動爭取的事（例如：提案/詢問/回覆）", en: "Write one thing you’ll advocate for today (pitch/ask/reply)." },
        ],
        wind: [
            { "zh-TW": "把一個目標拆成 3 個可驗證小步驟（各一句）", en: "Break one goal into 3 verifiable mini-steps (one line each)." },
            { "zh-TW": "研究一個你欣賞的人：他怎麼做決策/呈現作品（10 分鐘）", en: "Study someone you admire: decisions/presentation (10 minutes)." },
        ],
        water: [
            { "zh-TW": "寫下：我希望怎樣被看見？（一句）", en: "Write: “How do I want to be seen?” (one sentence)." },
            { "zh-TW": "發一則真誠訊息建立連結（簡短也可以）", en: "Send a short sincere message to build a connection." },
        ],
        earth: [
            { "zh-TW": "整理履歷/作品集一個段落（10 分鐘）", en: "Improve one section of your resume/portfolio (10 minutes)." },
            { "zh-TW": "把本週最重要的 1 件事排到行事曆上", en: "Schedule the single most important thing for this week." },
        ],
    },

    health: {
        fire: [
            { "zh-TW": "做 1 分鐘活動（深蹲/開合跳/快走任選）", en: "Move for 1 minute (squats/jumping jacks/brisk walk)." },
            { "zh-TW": "喝一大杯水，然後走動 3 分鐘", en: "Drink a big glass of water, then walk for 3 minutes." },
        ],
        wind: [
            { "zh-TW": "挑一個你願意持續的健康選項：今天只做 5 分鐘", en: "Pick a sustainable health habit: do just 5 minutes today." },
            { "zh-TW": "記錄今天第一餐：我有沒有慢慢吃？（是/否）", en: "Check your first meal: did I eat slowly? (yes/no)" },
        ],
        water: [
            { "zh-TW": "做 2 分鐘身體掃描：找到一處緊繃，讓它放鬆", en: "2-minute body scan: find one tension spot and release it." },
            { "zh-TW": "洗澡時專注於『被照顧』的感覺 30 秒", en: "During a shower, focus on the feeling of being cared for (30s)." },
        ],
        earth: [
            { "zh-TW": "今天只守住一個小規律：例如固定睡前關燈時間", en: "Keep one tiny routine today (e.g., lights-out time)." },
            { "zh-TW": "把一個零食換成更好的選擇（今天一次就好）", en: "Swap one snack for a better option (once is enough)." },
        ],
    },

    mind: {
        fire: [
            { "zh-TW": "做一件會讓你心情變亮的小事（5 分鐘）", en: "Do one 5-minute thing that lifts your mood." },
            { "zh-TW": "把你想要的狀態寫成一句宣言", en: "Write a one-line statement of the state you want." },
        ],
        wind: [
            { "zh-TW": "寫下腦中雜訊 1 分鐘，然後圈出『可做的 1 件』", en: "Brain-dump for 1 minute, then circle one doable thing." },
            { "zh-TW": "清空桌面 3 分鐘：讓眼睛舒服，心也會更鬆", en: "Clear your desk for 3 minutes—ease for eyes and mind." },
        ],
        water: [
            { "zh-TW": "寫下：我現在的感受是____（不評論，只描述）", en: "Write: “Right now I feel ____.” (describe, don’t judge)" },
            { "zh-TW": "做 10 次慢呼吸：吸 4 拍、吐 6 拍", en: "10 slow breaths: in 4 counts, out 6 counts." },
        ],
        earth: [
            { "zh-TW": "把房間一個角落整理到『可用』", en: "Make one corner of your space ‘usable’." },
            { "zh-TW": "把明天早上第一步寫好：醒來→喝水→洗臉", en: "Write tomorrow’s first step: wake → water → wash face." },
        ],
    },

    growth: {
        fire: [
            { "zh-TW": "練習 10 分鐘：只求完成，不求完美", en: "Practice for 10 minutes: finish, don’t perfect." },
            { "zh-TW": "把你學到的內容用 60 秒講給自己聽", en: "Explain what you learned to yourself in 60 seconds." },
        ],
        wind: [
            { "zh-TW": "把你要學的拆成：概念/例子/輸出（各 3 分鐘）", en: "Split learning into concept/example/output (3 minutes each)." },
            { "zh-TW": "找一篇短文或短片做 5 行筆記", en: "Take 5 lines of notes from a short article/video." },
        ],
        water: [
            { "zh-TW": "寫下：今天學到的一件事，讓我更安心的是____", en: "Write: “One thing I learned today that calms me is ____.”" },
            { "zh-TW": "對自己說：慢慢來也算前進", en: "Tell yourself: slow is still forward." },
        ],
        earth: [
            { "zh-TW": "固定一個『每天 5 分鐘』的學習時間並打勾", en: "Choose a daily 5-minute learning time and check it off." },
            { "zh-TW": "整理你的學習資料夾/書籤 5 分鐘", en: "Organize your learning folder/bookmarks for 5 minutes." },
        ],
    },
};

function todayKey() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}
function pickOne(arr, seedStr) {
    let h = 0;
    for (let i = 0; i < seedStr.length; i++) h = (h * 31 + seedStr.charCodeAt(i)) >>> 0;
    return arr[h % arr.length];
}
function computeProfile(answerOpts) {
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

/**
 * ----------------------------------------------------------------------------
 * Main Page — single file routing state
 * ----------------------------------------------------------------------------
 */
export default function Page() {
    const [lang, setLang] = usePersistedState("mvp_lang", "zh-TW"); // "zh-TW" | "en"
    const [theme, setTheme] = usePersistedState("mvp_theme", "system"); // "system" | "light" | "dark"
    useTheme(theme);

    const dict = I18N[lang] || I18N["zh-TW"];
    const t = (key, vars) => {
        const parts = key.split(".");
        let cur = dict;
        for (const p of parts) cur = cur?.[p];
        if (typeof cur === "string") return vars ? formatStr(cur, vars) : cur;
        return key; // fallback
    };

    const [view, setView] = useState("welcome"); // welcome | quiz | result | home | wall | progress | settings
    const [goalId, setGoalId] = usePersistedState("mvp_goalId", null);
    const [goalText, setGoalText] = usePersistedState("mvp_goalText", "");

    const [quizIndex, setQuizIndex] = usePersistedState("mvp_quizIndex", 0);
    const [picked, setPicked] = usePersistedState("mvp_quizPicked", {}); // qid -> optionId

    // Mock-ish persistence (but “real” UX): keep progress locally
    const [doneDatesArr, setDoneDatesArr] = usePersistedState("mvp_doneDates", []);
    const [streak, setStreak] = usePersistedState("mvp_streak", 0);
    const [evidence, setEvidence] = usePersistedState("mvp_evidence", []);
    const [todayMood, setTodayMood] = usePersistedState("mvp_todayMood", "happy");
    const [todayEvidenceText, setTodayEvidenceText] = usePersistedState("mvp_todayEvidenceText", "");

    const doneDates = useMemo(() => new Set(doneDatesArr), [doneDatesArr]);
    const todayDone = doneDates.has(todayKey());

    const answers = useMemo(() => {
        return QUIZ.map((q) => {
            const optId = picked[q.id];
            if (!optId) return null;
            return q.options.find((o) => o.id === optId) || null;
        }).filter(Boolean);
    }, [picked]);

    const profile = useMemo(() => computeProfile(answers), [answers]);
    const goal = useMemo(() => GOALS.find((g) => g.id === goalId) || null, [goalId]);

    const dailyContent = useMemo(() => {
        if (!goalId) return null;
        const seed = `${todayKey()}|${goalId}|${profile.element}|${profile.archetype}|${lang}`;
        const affs = AFFIRMATIONS[goalId]?.[profile.element] || [];
        const acts = MICRO_ACTIONS[goalId]?.[profile.element] || [];
        const aff = affs.length ? pickOne(affs, seed + "|aff")[lang] : (lang === "en" ? "I take one small step today." : "我今天往前一步就好。");
        const act = acts.length ? pickOne(acts, seed + "|act")[lang] : (lang === "en" ? "Do a 5-minute action that supports you." : "做一個 5 分鐘的小行動照顧自己。");
        return { affirmation: aff, action: act };
    }, [goalId, profile.element, profile.archetype, lang]);

    // If user already completed setup before, land on Home for better UX
    useEffect(() => {
        if (goalId && answers.length === QUIZ.length && view === "welcome") {
            // keep user in welcome if they intentionally came back; otherwise can auto route later.
        }
    }, [goalId, answers.length, view]);

    function resetAll() {
        setGoalId(null);
        setGoalText("");
        setQuizIndex(0);
        setPicked({});
        setDoneDatesArr([]);
        setStreak(0);
        setEvidence([]);
        setTodayMood("happy");
        setTodayEvidenceText("");
    }

    function startQuiz() {
        if (!goalId) return;
        setView("quiz");
    }

    function onPickQuizOption(q, optId) {
        setPicked((p) => ({ ...p, [q.id]: optId }));
    }

    function nextQuiz() {
        const q = QUIZ[quizIndex];
        if (!picked[q.id]) return;
        if (quizIndex === QUIZ.length - 1) {
            setView("result");
            return;
        }
        setQuizIndex((i) => i + 1);
    }

    function prevQuiz() {
        setQuizIndex((i) => Math.max(0, i - 1));
    }

    function markDoneToday() {
        const k = todayKey();
        if (doneDates.has(k)) return;

        const newDone = new Set(doneDatesArr);
        newDone.add(k);
        setDoneDatesArr(Array.from(newDone));

        // streak logic: if yesterday done => +1 else reset to 1
        const d = new Date();
        d.setDate(d.getDate() - 1);
        const yk = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        const nextStreak = newDone.has(yk) ? (streak || 0) + 1 : 1;
        setStreak(nextStreak);

        const text = (todayEvidenceText || "").trim();
        const entry = {
            date: k,
            mood: todayMood,
            text: text || (lang === "en" ? "I completed today’s micro-action." : "我完成了今天的微行動。"),
            goalId,
        };
        setEvidence((ev) => [entry, ...ev]);

        // clear input for next day
        setTodayEvidenceText("");
    }

    const moods = useMemo(
        () => [
            { id: "happy", label: t("moods.happy") },
            { id: "calm", label: t("moods.calm") },
            { id: "fired", label: t("moods.fired") },
            { id: "tired", label: t("moods.tired") },
            { id: "sad", label: t("moods.sad") },
        ],
        [lang] // eslint-disable-line
    );

    // Apple-like soft UI tokens (Tailwind only)
    // - More whitespace, subtle borders, blur, rounded, calm typography
    return (
        <div className="min-h-dvh bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
            {/* top safe padding / centered container */}
            <div
                className={[
                    "mx-auto w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl",
                    // base padding
                    "px-4 sm:px-6",
                    // SAFE AREA: top/left/right
                    "pt-[calc(1.5rem+var(--sa-top))]",
                    "pl-[calc(1rem+var(--sa-left))] pr-[calc(1rem+var(--sa-right))]",
                    // SAFE AREA: bottom + reserve space for BottomNav
                    "pb-[calc(6.5rem+var(--sa-bottom))]",
                ].join(" ")}
            >
                <TopBar
                    appName={t("app.name")}
                    tagline={t("app.tagline")}
                    onGoHome={() => setView("home")}
                    canGoHome={view !== "home" && goalId && answers.length === QUIZ.length}
                    onRestart={() => {
                        resetAll();
                        setView("welcome");
                    }}
                    lang={lang}
                    setLang={setLang}
                    theme={theme}
                    setTheme={setTheme}
                    t={t}
                />

                <div className="mt-5">
                    {view === "welcome" && (
                        <Welcome
                            goalId={goalId}
                            goalText={goalText}
                            onPickGoal={setGoalId}
                            onGoalText={setGoalText}
                            onContinue={startQuiz}
                            t={t}
                            lang={lang}
                        />
                    )}

                    {view === "quiz" && (
                        <Quiz
                            quizIndex={quizIndex}
                            picked={picked}
                            onPick={onPickQuizOption}
                            onNext={nextQuiz}
                            onPrev={prevQuiz}
                            onExit={() => setView("welcome")}
                            t={t}
                            lang={lang}
                        />
                    )}

                    {view === "result" && (
                        <Result
                            goal={goal}
                            goalText={goalText}
                            profile={profile}
                            onGoHome={() => setView("home")}
                            onBackQuiz={() => setView("quiz")}
                            t={t}
                        />
                    )}

                    {view === "home" && (
                        <Home
                            goal={goal}
                            goalText={goalText}
                            profile={profile}
                            dailyContent={dailyContent}
                            streak={streak}
                            todayDone={todayDone}
                            moods={moods}
                            todayMood={todayMood}
                            onMood={setTodayMood}
                            todayEvidenceText={todayEvidenceText}
                            onEvidenceText={setTodayEvidenceText}
                            onDone={markDoneToday}
                            onOpenWall={() => setView("wall")}
                            onOpenProgress={() => setView("progress")}
                            t={t}
                        />
                    )}

                    {view === "wall" && (
                        <EvidenceWall
                            evidence={evidence}
                            goalLabels={GOALS.reduce((acc, g) => {
                                acc[g.id] = { emoji: g.emoji, label: t(`goals.${g.id}`) };
                                return acc;
                            }, {})}
                            moodsMap={moods.reduce((acc, m) => {
                                acc[m.id] = m.label;
                                return acc;
                            }, {})}
                            onBack={() => setView("home")}
                            t={t}
                        />
                    )}

                    {view === "progress" && (
                        <Progress
                            streak={streak}
                            doneCount={doneDates.size}
                            evidenceCount={evidence.length}
                            onBack={() => setView("home")}
                            t={t}
                        />
                    )}

                    {view === "settings" && (
                        <Settings
                            lang={lang}
                            setLang={setLang}
                            theme={theme}
                            setTheme={setTheme}
                            onBack={() => setView("home")}
                            t={t}
                        />
                    )}
                </div>

                <BottomNav
                    current={view}
                    onGo={setView}
                    isReady={goalId && answers.length === QUIZ.length}
                    t={t}
                />
            </div>
        </div>
    );
}

/* ----------------------------------------------------------------------------
 * UI Components — Apple-like softness (blur, subtle borders, calm typography)
 * ----------------------------------------------------------------------------
 */

function SoftCard({ children, className = "" }) {
    return (
        <div
            className={[
                "rounded-3xl border border-black/5 bg-white/80 shadow-sm backdrop-blur-xl",
                "dark:border-white/10 dark:bg-white/5",
                className,
            ].join(" ")}
        >
            {children}
        </div>
    );
}

function Pill({ children, active, onClick, className = "", disabled = false }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={[
                "rounded-2xl px-3 py-2 text-xs font-medium transition",
                "active:scale-[0.99]",
                disabled ? "opacity-40" : "opacity-100",
                active
                    ? "bg-black/10 text-neutral-900 dark:bg-white/15 dark:text-neutral-50"
                    : "bg-black/5 text-neutral-700 hover:bg-black/10 dark:bg-white/10 dark:text-neutral-200 dark:hover:bg-white/15",
                className,
            ].join(" ")}
        >
            {children}
        </button>
    );
}

function PrimaryButton({ children, onClick, disabled = false, className = "" }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={[
                "w-full rounded-2xl px-4 py-3 text-sm font-semibold",
                "transition active:scale-[0.99]",
                disabled
                    ? "bg-black/10 text-neutral-400 dark:bg-white/10 dark:text-neutral-500"
                    : "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200",
                className,
            ].join(" ")}
        >
            {children}
        </button>
    );
}

function SecondaryButton({ children, onClick, disabled = false, className = "" }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={[
                "w-full rounded-2xl px-4 py-3 text-sm font-semibold",
                "border border-black/10 bg-black/5 text-neutral-900 hover:bg-black/10",
                "dark:border-white/10 dark:bg-white/5 dark:text-neutral-100 dark:hover:bg-white/10",
                "transition active:scale-[0.99]",
                disabled ? "opacity-40" : "",
                className,
            ].join(" ")}
        >
            {children}
        </button>
    );
}

function TopBar({ appName, tagline, canGoHome, onGoHome, onRestart, lang, setLang, theme, setTheme, t }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-black/5 text-lg dark:bg-white/10">
                    ✨
                </div>
                <div>
                    <div className="text-sm font-semibold tracking-tight">{appName}</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">{tagline}</div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {canGoHome && (
                    <Pill onClick={onGoHome} active={false}>
                        {t("nav.home")}
                    </Pill>
                )}
                <Pill onClick={onRestart} active={false}>
                    {t("nav.restart")}
                </Pill>
            </div>
        </div>
    );
}

function Welcome({ goalId, goalText, onPickGoal, onGoalText, onContinue, t, lang }) {
    return (
        <div className="space-y-4">
            <SoftCard className="p-5">
                <div className="text-base font-semibold tracking-tight">{t("welcome.title")}</div>
                <div className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {t("welcome.subtitle")}
                </div>

                <div className="mt-5">
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                {t("welcome.goalLabel")}
                            </div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400">{t("welcome.goalHint")}</div>
                        </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {GOALS.map((g) => {
                            const active = goalId === g.id;
                            return (
                                <button
                                    key={g.id}
                                    onClick={() => onPickGoal(g.id)}
                                    className={[
                                        "rounded-3xl p-4 text-left transition active:scale-[0.99]",
                                        "border",
                                        active
                                            ? "border-black/10 bg-black/5 dark:border-white/15 dark:bg-white/10"
                                            : "border-black/5 bg-white/60 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
                                    ].join(" ")}
                                >
                                    <div className="text-lg">{g.emoji}</div>
                                    <div className="mt-2 text-sm font-semibold tracking-tight">{t(`goals.${g.id}`)}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-5">
                    <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                        {t("welcome.oneLineLabel")}
                    </label>
                    <input
                        value={goalText}
                        onChange={(e) => onGoalText(e.target.value)}
                        placeholder={t("welcome.oneLinePlaceholder")}
                        className={[
                            "mt-2 w-full rounded-2xl px-4 py-3 text-sm outline-none",
                            "border border-black/10 bg-white/70 placeholder:text-neutral-400 focus:border-black/20",
                            "dark:border-white/10 dark:bg-white/5 dark:placeholder:text-neutral-500 dark:focus:border-white/25",
                        ].join(" ")}
                    />
                </div>

                <div className="mt-5">
                    <PrimaryButton onClick={onContinue} disabled={!goalId}>
                        {goalId ? t("welcome.cta") : t("welcome.ctaDisabled")}
                    </PrimaryButton>
                </div>
            </SoftCard>

            <SoftCard className="p-5">
                <div className="text-sm font-semibold tracking-tight">{t("welcome.noteTitle")}</div>
                <div className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {t("welcome.noteBody")}
                </div>
            </SoftCard>

            <SoftFooter lang={lang} />
        </div>
    );
}

function SoftFooter({ lang }) {
    // Keep it minimal and production-ish; not “hint”
    const text =
        lang === "en"
            ? "This app is designed for reflection and habit-building. It does not provide medical or psychological diagnosis."
            : "本服務以自我覺察與習慣建立為主，不提供醫療或心理診斷。";
    return <div className="px-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-500">{text}</div>;
}

function Quiz({ quizIndex, picked, onPick, onNext, onPrev, onExit, t, lang }) {
    const q = QUIZ[quizIndex];
    const currentOptId = picked[q.id];

    const title = QUIZ_TEXT[lang]?.[q.titleKey] || q.titleKey;

    return (
        <div className="space-y-4">
            <SoftCard className="p-5">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold tracking-tight">{t("quiz.title")}</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                        {t("quiz.progress", { x: quizIndex + 1, n: QUIZ.length })}
                    </div>
                </div>

                <div className="mt-4 text-base font-semibold tracking-tight">{title}</div>

                <div className="mt-4 space-y-2">
                    {q.options.map((opt) => {
                        const optText = QUIZ_TEXT[lang]?.[opt.textKey] || opt.textKey;
                        const active = opt.id === currentOptId;
                        return (
                            <button
                                key={opt.id}
                                onClick={() => onPick(q, opt.id)}
                                className={[
                                    "w-full rounded-3xl px-4 py-3 text-left text-sm transition active:scale-[0.99]",
                                    "border",
                                    active
                                        ? "border-black/10 bg-black/5 dark:border-white/15 dark:bg-white/10"
                                        : "border-black/5 bg-white/60 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
                                ].join(" ")}
                            >
                                {optText}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-5 flex gap-2">
                    <SecondaryButton onClick={onPrev} disabled={quizIndex === 0} className="flex-1">
                        {t("quiz.prev")}
                    </SecondaryButton>
                    <PrimaryButton onClick={onNext} disabled={!picked[q.id]} className="flex-1">
                        {quizIndex === QUIZ.length - 1 ? t("quiz.seeResult") : t("quiz.next")}
                    </PrimaryButton>
                </div>

                <button
                    onClick={onExit}
                    className="mt-4 w-full text-center text-xs text-neutral-500 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
                >
                    {t("quiz.exit")}
                </button>
            </SoftCard>
        </div>
    );
}

function Result({ goal, goalText, profile, onGoHome, onBackQuiz, t }) {
    return (
        <div className="space-y-4">
            <SoftCard className="p-5">
                <div className="text-base font-semibold tracking-tight">{t("result.title")}</div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl border border-black/5 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
                        <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{t("result.archetypeTitle")}</div>
                        <div className="mt-1 text-lg font-semibold tracking-tight">{t(`archetype.${profile.archetype}`)}</div>
                    </div>

                    <div className="rounded-3xl border border-black/5 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
                        <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{t("result.elementTitle")}</div>
                        <div className="mt-1 text-lg font-semibold tracking-tight">
                            {ELEMENT_BADGE[profile.element]} {t(`element.${profile.element}`)}
                        </div>
                    </div>
                </div>

                <div className="mt-4 rounded-3xl border border-black/5 bg-black/5 p-4 text-sm text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200">
                    <div className="font-semibold">{t("result.whyTitle")}</div>
                    <div className="mt-2 leading-relaxed text-neutral-600 dark:text-neutral-300">{t("result.whyBody")}</div>
                </div>

                <div className="mt-4 rounded-3xl border border-black/5 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{t("result.goalTitle")}</div>
                    <div className="mt-1 text-sm font-semibold tracking-tight">
                        {goal ? `${goal.emoji} ${t(`goals.${goal.id}`)}` : t("result.goalEmpty")}
                    </div>
                    {goalText ? (
                        <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">“{goalText}”</div>
                    ) : null}
                </div>

                <div className="mt-5 flex gap-2">
                    <SecondaryButton onClick={onBackQuiz} className="flex-1">
                        {t("result.editQuiz")}
                    </SecondaryButton>
                    <PrimaryButton onClick={onGoHome} className="flex-1">
                        {t("result.enterDaily")}
                    </PrimaryButton>
                </div>
            </SoftCard>
        </div>
    );
}

function Home({
    goal,
    goalText,
    profile,
    dailyContent,
    streak,
    todayDone,
    moods,
    todayMood,
    onMood,
    todayEvidenceText,
    onEvidenceText,
    onDone,
    onOpenWall,
    onOpenProgress,
    t,
}) {
    if (!goal || !dailyContent) {
        return (
            <SoftCard className="p-5">
                <div className="text-sm text-neutral-600 dark:text-neutral-300">
                    {/* Production tone */}
                    {t("welcome.subtitle")}
                </div>
            </SoftCard>
        );
    }

    return (
        <div className="space-y-4">
            <SoftCard className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{t("home.goal")}</div>
                        <div className="mt-1 text-base font-semibold tracking-tight">
                            {goal.emoji} {t(`goals.${goal.id}`)}
                        </div>
                        {goalText ? <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">“{goalText}”</div> : null}
                    </div>

                    <div className="rounded-3xl border border-black/5 bg-black/5 px-3 py-2 text-right dark:border-white/10 dark:bg-white/5">
                        <div className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">{t("home.streak")}</div>
                        <div className="text-lg font-semibold tracking-tight">{streak} 🔥</div>
                    </div>
                </div>

                <div className="mt-5 rounded-3xl border border-black/5 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{t("home.affirmation")}</div>
                    <div className="mt-2 text-sm leading-relaxed">{dailyContent.affirmation}</div>

                    <div className="mt-3 flex flex-wrap gap-2">
                        <div className="rounded-2xl bg-black/5 px-3 py-2 text-xs text-neutral-700 dark:bg-white/10 dark:text-neutral-200">
                            {t("home.archetype")}: {t(`archetype.${profile.archetype}`)}
                        </div>
                        <div className="rounded-2xl bg-black/5 px-3 py-2 text-xs text-neutral-700 dark:bg-white/10 dark:text-neutral-200">
                            {t("home.element")}: {ELEMENT_BADGE[profile.element]} {t(`element.${profile.element}`)}
                        </div>
                    </div>
                </div>

                <div className="mt-4 rounded-3xl border border-black/5 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{t("home.action")}</div>
                    <div className="mt-2 text-sm leading-relaxed">{dailyContent.action}</div>
                </div>

                <div className="mt-4">
                    <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{t("home.mood")}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {moods.map((m) => (
                            <Pill key={m.id} active={todayMood === m.id} onClick={() => onMood(m.id)} className="text-sm">
                                {m.label}
                            </Pill>
                        ))}
                    </div>
                </div>

                <div className="mt-4">
                    <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                        {t("home.evidenceInputLabel")}
                    </label>
                    <input
                        value={todayEvidenceText}
                        onChange={(e) => onEvidenceText(e.target.value)}
                        placeholder={t("home.evidencePlaceholder")}
                        className={[
                            "mt-2 w-full rounded-2xl px-4 py-3 text-sm outline-none",
                            "border border-black/10 bg-white/70 placeholder:text-neutral-400 focus:border-black/20",
                            "dark:border-white/10 dark:bg-white/5 dark:placeholder:text-neutral-500 dark:focus:border-white/25",
                        ].join(" ")}
                    />
                    <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">{t("home.doneSub")}</div>
                </div>

                <div className="mt-5 space-y-3">
                    <PrimaryButton onClick={onDone} disabled={todayDone}>
                        {todayDone ? t("home.doneDone") : t("home.done")}
                    </PrimaryButton>

                    <div className="grid grid-cols-2 gap-2">
                        <SecondaryButton onClick={onOpenWall}>{t("home.openEvidence")}</SecondaryButton>
                        <SecondaryButton onClick={onOpenProgress}>{t("home.openProgress")}</SecondaryButton>
                    </div>
                </div>
            </SoftCard>

            <SoftCard className="p-5">
                <div className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{t("home.gentleNote")}</div>
            </SoftCard>
        </div>
    );
}

function EvidenceWall({ evidence, goalLabels, moodsMap, onBack, t }) {
    const [filterGoal, setFilterGoal] = useState("all");

    const goalsForFilter = useMemo(() => [{ id: "all" }, ...Object.keys(goalLabels).map((id) => ({ id }))], [goalLabels]);

    const filtered = useMemo(() => {
        if (filterGoal === "all") return evidence;
        return evidence.filter((e) => e.goalId === filterGoal);
    }, [evidence, filterGoal]);

    return (
        <div className="space-y-4">
            <SoftCard className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="text-base font-semibold tracking-tight">{t("evidence.title")}</div>
                        <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{t("evidence.subtitle")}</div>
                    </div>
                    <Pill onClick={onBack}>{t("nav.back")}</Pill>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {goalsForFilter.map((g) => {
                        const active = filterGoal === g.id;
                        const label =
                            g.id === "all"
                                ? t("evidence.filterAll")
                                : `${goalLabels[g.id]?.emoji || ""} ${goalLabels[g.id]?.label || ""}`;
                        return (
                            <Pill key={g.id} active={active} onClick={() => setFilterGoal(g.id)}>
                                {label}
                            </Pill>
                        );
                    })}
                </div>

                <div className="mt-4 space-y-3">
                    {filtered.length === 0 ? (
                        <div className="rounded-3xl border border-black/5 bg-black/5 p-4 text-sm text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                            {t("evidence.empty")}
                        </div>
                    ) : (
                        filtered.map((e, idx) => {
                            const g = goalLabels[e.goalId];
                            return (
                                <div
                                    key={`${e.date}-${idx}`}
                                    className="rounded-3xl border border-black/5 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{e.date}</div>
                                        <div className="text-sm">{moodsMap[e.mood] || "🙂"}</div>
                                    </div>
                                    <div className="mt-2 text-sm leading-relaxed">{e.text}</div>
                                    <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                                        {g ? `${g.emoji} ${g.label}` : ""}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </SoftCard>
        </div>
    );
}

function Progress({ streak, doneCount, evidenceCount, onBack, t }) {
    return (
        <div className="space-y-4">
            <SoftCard className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="text-base font-semibold tracking-tight">{t("progress.title")}</div>
                        <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{t("progress.subtitle")}</div>
                    </div>
                    <Pill onClick={onBack}>{t("nav.back")}</Pill>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <Stat title={t("progress.streak")} value={`${streak} 🔥`} />
                    <Stat title={t("progress.daysDone")} value={`${doneCount}`} />
                    <Stat title={t("progress.evidenceCount")} value={`${evidenceCount}`} />
                </div>

                <div className="mt-4 rounded-3xl border border-black/5 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="text-sm font-semibold tracking-tight">{t("progress.milestonesTitle")}</div>
                    <div className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{t("progress.milestonesBody")}</div>
                </div>
            </SoftCard>
        </div>
    );
}

function Stat({ title, value }) {
    return (
        <div className="rounded-3xl border border-black/5 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
            <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{title}</div>
            <div className="mt-1 text-lg font-semibold tracking-tight">{value}</div>
        </div>
    );
}

function Settings({ lang, setLang, theme, setTheme, onBack, t }) {
    return (
        <div className="space-y-4">
            <SoftCard className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="text-base font-semibold tracking-tight">{t("settings.title")}</div>
                    </div>
                    <Pill onClick={onBack}>{t("nav.back")}</Pill>
                </div>

                <div className="mt-5 space-y-4">
                    <Section title={t("settings.language")}>
                        <div className="flex flex-wrap gap-2">
                            <Pill active={lang === "zh-TW"} onClick={() => setLang("zh-TW")}>
                                繁體中文
                            </Pill>
                            <Pill active={lang === "en"} onClick={() => setLang("en")}>
                                English
                            </Pill>
                        </div>
                    </Section>

                    <Section title={t("settings.theme")}>
                        <div className="flex flex-wrap gap-2">
                            <Pill active={theme === "system"} onClick={() => setTheme("system")}>
                                {t("settings.themeSystem")}
                            </Pill>
                            <Pill active={theme === "light"} onClick={() => setTheme("light")}>
                                {t("settings.themeLight")}
                            </Pill>
                            <Pill active={theme === "dark"} onClick={() => setTheme("dark")}>
                                {t("settings.themeDark")}
                            </Pill>
                        </div>
                    </Section>

                    <Section title={t("settings.privacyTitle")}>
                        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{t("settings.privacyBody")}</p>
                    </Section>

                    <Section title={t("settings.aboutTitle")}>
                        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{t("settings.aboutBody")}</p>
                    </Section>
                </div>
            </SoftCard>
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div className="rounded-3xl border border-black/5 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
            <div className="text-xs font-semibold tracking-tight text-neutral-700 dark:text-neutral-200">{title}</div>
            <div className="mt-3">{children}</div>
        </div>
    );
}

function BottomNav({ current, onGo, isReady, t }) {
    const items = [
        { id: "home", label: t("nav.today"), emoji: "🏠" },
        { id: "wall", label: t("nav.evidence"), emoji: "🧱" },
        { id: "progress", label: t("nav.progress"), emoji: "📈" },
        { id: "settings", label: t("nav.settings"), emoji: "⚙️" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 border-t border-black/5 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-neutral-950/70">
            <div className="mx-auto w-full max-w-md px-4 pt-2 pb-[calc(0.5rem+var(--sa-bottom))] sm:max-w-lg sm:px-6 md:max-w-2xl lg:max-w-3xl">
                <div className="flex items-center justify-between gap-2">
                    {items.map((it) => {
                        const disabled = !isReady && it.id !== "settings";
                        const active = current === it.id;
                        return (
                            <button
                                key={it.id}
                                onClick={() => onGo(it.id)}
                                disabled={disabled}
                                className={[
                                    "flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs transition active:scale-[0.99]",
                                    disabled ? "opacity-40" : "opacity-100",
                                    active
                                        ? "bg-black/5 text-neutral-900 dark:bg-white/10 dark:text-neutral-50"
                                        : "text-neutral-600 hover:bg-black/5 dark:text-neutral-300 dark:hover:bg-white/10",
                                ].join(" ")}
                            >
                                <div className="text-base">{it.emoji}</div>
                                <div className="text-[11px] font-medium">{it.label}</div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
