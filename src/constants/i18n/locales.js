export const I18N = {
  "zh-TW": {
    app: {
      name: "Manifest",
      tagline: "用每天的小行動，把理想慢慢帶回日常。",
    },

    journeyEnd: {
      title: "本次旅程結束",
      body: "你已完成 7 次今日份行動。讓我們期待下個旅程。",
      cta: "開始下一段旅程",
    },

    nav: {
      welcome: "首頁",
      today: "今日",
      journey: "心路足跡",
      settings: "設定",
      back: "返回",
    },

    todayGate: {
      title: "我們先一起準備一下，好嗎？",
      body:
        "你還沒完成第一次的小問卷。它會幫我更懂你，讓每天的提醒更貼近你現在的狀態。\n\n不過你也可以先進入今天，先用最小的步伐開始；等你準備好了，再回來做問卷也沒關係。",
      cta: "開始問卷",
      ctaSecondary: "先進入今天",
      needGoalHint: "先選一個目標，我們就能開始。",
      hintQuizLater: "你可以隨時做問卷，讓提示更貼近你。",
      linkGoQuiz: "去做問卷",
    },

    welcome: {
      title: "先選一個你想靠近的目標",
      subtitle:
        "你會得到一套專屬的每日肯定句與微行動，幫你累積信念，也看見自己真的在前進。",
      goalLabel: "目標類型",
      goalHint: "先從最在意的一件事開始就好。",
      oneLineLabel: "用一句話描述你的目標（選填）",
      oneLinePlaceholder: "例如：我想更有自信，願意把握機會。",
      cta: "開始建立我的每日流程",
      ctaDisabled: "請先選擇目標",
      noteTitle: "你會做的事很簡單",
      noteBody:
        "每天 30–60 秒：看見提醒 → 做一個小行動 → 留下一句足跡。重點是可持續，而不是一次做到完美。",
      // 你現在的流程：選完目標後，按這個按鈕 -> 直接跳 modal
      toGoalStart: "開始這個旅程",
    },

    // ✅ Modal 文案（你說少了 modal text：補齊「按開始旅程跳 modal」+「5 秒自動轉問卷」）
    modals: {
      // ① 按「開始這個旅程」後立即跳出的共情 modal（可隨機挑一則）
      start: [
        {
          title: "先從今天開始就好",
          body:
            "你不用一次就想得很清楚。先選一個想靠近的方向，接下來我們用小小的步伐陪你走。",
          tip: "能做到、能持續，比做很大更重要。",
          cta: "開始",
        },
        {
          title: "你願意開始，已經很不容易",
          body:
            "有些改變不是靠硬撐，而是每天都往前一點點。今天就先走第一步。",
          tip: "狀態普通也沒關係，照著做就算前進。",
          cta: "繼續",
        },
        {
          title: "把心放回你自己身上",
          body:
            "你想顯化的，不只是結果，也是那種「我真的在過我想要的生活」的感覺。我們從一個小動作開始。",
          tip: "先完成一次，你就會更有底。",
          cta: "好",
        },
        {
          title: "你可以選擇一個最輕的開始",
          body:
            "如果今天力氣不多，我們也能開始。你可以把行動縮小到一分鐘，先讓自己感覺「我做得到」。",
          tip: "今天的版本，要能被你完成。",
          cta: "我選一分鐘",
        },
        {
          title: "你不需要完美，你需要可行",
          body:
            "目標不是把自己逼到滿分，而是讓你每天都能對自己說：我有在照顧我的方向。",
          tip: "可行，才會可長久。",
          cta: "我願意試試",
        },
        {
          title: "先選一條你願意走的路",
          body:
            "你可以慢慢來。今天只要選一個你願意靠近的方向，剩下的交給每日的小提示帶你走。",
          tip: "你有選擇，也有退路。",
          cta: "我選好了",
        },
        {
          title: "今天只要做到「一點點」",
          body:
            "顯化不是一口氣衝到底，而是讓你看見自己每天都有一點點不同。今天的一點點，就很夠了。",
          tip: "你越溫柔，越走得久。",
          cta: "從一點點開始",
        },
        {
          title: "如果你想快一點，也可以",
          body:
            "你可以選擇 1 分鐘版本，或 5–10 分鐘版本。你決定今天要用哪種速度前進。",
          tip: "同一條路，也有不同步伐。",
          cta: "我來選步伐",
        },
        {
          title: "你可以先相信「過程」",
          body:
            "就算你還看不到結果，今天的微行動也在累積證據：你正在變得更靠近你想要的自己。",
          tip: "證據會慢慢長出來。",
          cta: "我願意累積",
        },
        {
          title: "你可以先照顧當下，再談結果",
          body:
            "如果你現在心很亂，也沒關係。今天我們先做一個能讓你安定一點的小行動，然後再往目標靠近。",
          tip: "先安住自己，才走得穩。",
          cta: "我先安定一下",
        },
      ],

      // ② 開花動畫 modal（顯示 5 秒，然後自動進問卷）
      // 你可以用 key: "quizIntro" 或你原本的 key（例如 "start"）——看你程式怎麼呼叫
      quizIntro: [
        {
          title: "先停一下，呼吸一下",
          body:
            "我會用 5 秒帶你進入狀態。等一下就開始小問卷，讓提醒更貼近你。",
          tip: "（5 秒後自動開始）",
          cta: "我準備好了",
        },
      ],

      // ✅ 若你想要「結束該週期」那種 wording 也放進 i18n（可用在 JourneyEnd 或別處）
      cycleEnd: {
        title: "本次週期已完成",
        body: "你完成了這一段的累積。休息一下也可以，接下來再決定要不要開啟下一段。",
        cta: "開啟下一段",
      },
    },

    quiz: {
      title: "快速問卷",
      progress: "第 {x} 題，共 {n} 題",
      prev: "上一題",
      next: "下一題",
      seeResult: "看結果",
      exit: "離開問卷",
    },

    result: {
      title: "問卷完成",
      archetypeTitle: "行動偏好",
      elementTitle: "能量元素",
      whyTitle: "這會如何影響你的每日提示？",
      whyBody:
        "我們會依照你的傾向，挑選你更做得下去的微行動，並用你容易吸收的語氣寫肯定句。你也可以隨時回來重新測一次。",
      goalTitle: "你的目標",
      goalEmpty: "（未選擇）",
      editQuiz: "回去調整問卷",
      enterDaily: "進入今日卡片",
    },

    home: {
      goal: "目標",
      streak: "連續天數",
      archetype: "行動偏好",
      element: "元素",
      affirmation: "今日肯定句",
      action: "今日小行動",
      mood: "今天的狀態",
      StepsInputLabel: "寫一句今天的足跡（選填）",
      StepsPlaceholder: "例如：我把拖延的事推進了一點點，心裡更踏實。",
      done: "完成今天",
      doneDone: "今天已完成",
      doneSub: "完成後會記到心路足跡，讓你看見自己正在改變。",
      openSteps: "查看心路足跡",
      gentleNote:
        "如果今天狀態不太好也沒關係。把行動縮小到你做得到的程度，才是能走得久的關鍵。",
      actionMini: "1 分鐘",
      actionFull: "5–10 分鐘",
      actionMiniPrefix: "1 分鐘版：把這件事縮到最小，先做 1 分鐘就好。",
      journeyProgress: "旅程進度：{x}/{n}",

      // 你想做的 textarea 固定大小 / 預設 disabled / 有變更才 enable 用
      title: "今日",
      day: "旅程第 {x} 天 / {n} 天",
      entryTitle: "今天的足跡",
      editEntry: "編輯",
      newEntry: "新增",
      cancelEdit: "取消",
      startWrite: "開始記錄",
      saveEntry: "儲存",
      updateEntry: "更新",
      entryLockedDone: "今日已完成",
      entryHintNew: "預設是鎖住的：按右上角「新增」或下方按鈕開始輸入。",
      entryHintUpdate:
        "預設是鎖住的：按右上角「編輯」後才可修改；有改動才會啟用儲存。",
    },

    steps: {
      title: "心路足跡",
      subtitle: "你完成的每一步，都在替你把信念慢慢養起來",
      empty: "目前還沒有紀錄，每次完成的旅途都會出現在這裡",
      filterAll: "全部",
    },

    progress: {
      streak: "連續天數",
      daysDone: "完成天數",
      stepsTaken: "累積足跡",
      title: "進度",
    },

    settings: {
      title: "設定",

      language: "語言",
      langZh: "繁中",
      langEn: "EN",

      theme: "外觀",
      themeSystem: "系統",
      themeLight: "淺色",
      themeDark: "深色",

      restart: "重新開始",

      tosTitle: "服務條款",
      tosBody:
        "使用本產品代表你同意以下事項：\n\n1) 本產品以自我覺察與習慣建立為目的，提供提示、記錄與回顧等功能。\n2) 你可自行決定是否使用、何時使用，以及使用到什麼程度；若感到不適，請先停下來照顧自己。\n3) 我保留在不影響既有使用者體驗的前提下，逐步調整功能與文字的權利；若未來新增同步或雲端功能，會在介面清楚說明並取得同意。",

      aboutTitle: "關於",
      aboutBody:
        "Manifest 透過「視覺化提醒 × 微行動 × 足跡累積」陪你把想要的生活拆成每天做得到的一小步。\n\n它不是要你變得更用力，而是幫你更穩、更靠近：今天做到一點點，就已經是往前。",

      disclaimerTitle: "重要但書與隱私說明",
      disclaimerBody:
        "1) 本產品不提供諮商、心理治療或醫療診斷，也不能取代專業協助。\n2) 本產品是一個個人工具：內容由你自行輸入與選擇，目的在於支持自我整理與日常練習。\n3) 我不會蒐集你的個人行為資料與敏感隱私，也不會將你的資料提供給任何第三方。\n\n若你正處於強烈焦慮、憂鬱或有自我傷害風險，請優先尋求可信任的親友與專業資源。你值得被好好照顧。",

      disclaimer: "本產品以自我覺察與習慣建立為主，不提供諮商或醫療診斷。",
    },

    goals: {
      relationship: "感情 / 人際",
      confidence: "自信 / 自我價值",
      career: "財務 / 職涯",
      health: "健康 / 體能",
      mind: "生活狀態（平靜 / 快樂）",
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
      wind: "風（靈感 / 社交）",
      water: "水（情緒 / 直覺）",
      earth: "土（穩定 / 紀律）",
    },
  },

  en: {
    app: {
      name: "Manifest",
      tagline: "Small daily actions, a life that feels more like yours.",
    },

    journeyEnd: {
      title: "This journey is complete",
      body: "You’ve completed 7 daily steps. Let’s look forward to the next journey.",
      cta: "Start a new journey",
    },

    nav: {
      welcome: "Home",
      today: "Today",
      journey: "Journey",
      settings: "Settings",
      back: "Back",
    },

    todayGate: {
      title: "Let’s get ready—gently.",
      body:
        "You haven’t taken the first quiz yet. It helps tailor your daily prompts so they feel more supportive.\n\nIf you’d rather start now, you can go to Today first and take the quiz later—when you’re ready.",
      cta: "Start the quiz",
      ctaSecondary: "Go to Today for now",
      needGoalHint: "Pick a goal first to continue.",
      hintQuizLater: "You can take the quiz anytime to personalize your prompts.",
      linkGoQuiz: "Take the quiz",
    },

    welcome: {
      title: "Choose a goal you want to move toward",
      subtitle:
        "You’ll get personalized daily affirmations and small actions—so belief grows through steady, visible progress.",
      goalLabel: "Goal",
      goalHint: "Start with what matters most right now.",
      oneLineLabel: "Describe your goal in one line (optional)",
      oneLinePlaceholder: "E.g., I want to feel more confident and take initiative.",
      cta: "Build my daily flow",
      ctaDisabled: "Select a goal to continue",
      noteTitle: "Your daily flow is simple",
      noteBody:
        "30–60 seconds a day: see a cue → take one small action → log one line of progress. Consistency beats perfection.",
      toGoalStart: "Start this journey",
    },

    // ✅ modal 文案補齊（按開始旅程 -> modal；以及 5 秒 intro modal）
    modals: {
      start: [
        {
          title: "Starting with today is enough",
          body:
            "You don’t have to have it all figured out. Pick a direction—then we’ll take small steps together.",
          tip: "Consistency beats going big.",
          cta: "Start",
        },
        {
          title: "Beginning takes real courage",
          body:
            "Some changes don’t come from pushing harder—they come from showing up, a little at a time. Let’s take the first step today.",
          tip: "An average day still counts.",
          cta: "Continue",
        },
        {
          title: "Bring your attention back to you",
          body:
            "What you’re manifesting isn’t only a result—it’s the feeling of living closer to what you want. We’ll begin with one small action.",
          tip: "Do it once, and you’ll feel more grounded.",
          cta: "OK",
        },
        {
          title: "Choose the gentlest start",
          body:
            "If today’s energy is low, we can still begin. Pick the 1-minute version—just enough to feel “I can do this.”",
          tip: "Today’s plan should be doable.",
          cta: "Choose 1 minute",
        },
        {
          title: "You don’t need perfect—you need possible",
          body:
            "The goal isn’t a flawless day. It’s a day where you can say: I moved in my direction with care.",
          tip: "Possible is sustainable.",
          cta: "I’ll try",
        },
        {
          title: "Pick a path you’re willing to walk",
          body:
            "You can go slowly. Choose a direction today, and let the daily prompts guide the next steps.",
          tip: "You have options—and room to breathe.",
          cta: "I’m ready",
        },
        {
          title: "Today can be “just a little”",
          body:
            "Manifesting isn’t a sprint. It’s small proof, repeated. A little today is more than enough.",
          tip: "Gentle progress lasts longer.",
          cta: "Start small",
        },
        {
          title: "Move faster if you want",
          body:
            "Choose a 1-minute step or a 5–10 minute step. You decide the pace for today.",
          tip: "Same direction, different pace.",
          cta: "Pick my pace",
        },
        {
          title: "Trust the process first",
          body:
            "Even if results feel far away, today’s micro-action is building evidence: you’re becoming who you want to be.",
          tip: "Proof grows with repetition.",
          cta: "Build evidence",
        },
        {
          title: "Care for the moment, then the outcome",
          body:
            "If things feel messy right now, that’s okay. Let’s do one small action that steadies you—then we move forward.",
          tip: "Steady first. Then forward.",
          cta: "Steady me",
        },
      ],

      quizIntro: [
        {
          title: "Take a breath",
          body:
            "Here’s a 5-second intro to help you settle in. Then we’ll start the quiz to personalize your prompts.",
          tip: "(Auto-starts in 5 seconds)",
          cta: "I’m ready",
        },
      ],

      cycleEnd: {
        title: "This cycle is complete",
        body:
          "You’ve finished this stretch of progress. Rest is allowed. When you’re ready, start the next cycle.",
        cta: "Start the next cycle",
      },
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
      title: "Your Survey Result",
      archetypeTitle: "Behavior style",
      elementTitle: "Energy element",
      whyTitle: "How this shapes your daily prompts",
      whyBody:
        "We’ll match actions you’re more likely to complete and phrase affirmations in a tone you naturally absorb. You can retake the quiz anytime.",
      goalTitle: "Your goal",
      goalEmpty: "(Not selected)",
      editQuiz: "Edit quiz",
      enterDaily: "Go to Today",
    },

    home: {
      goal: "Goal",
      streak: "Streak",
      archetype: "Style",
      element: "Element",
      affirmation: "Affirmation",
      action: "Micro-action",
      mood: "How are you today?",
      StepsInputLabel: "One sentence of progress (optional)",
      StepsPlaceholder:
        "E.g., I moved one delayed task forward—and I feel a bit more grounded.",
      done: "Complete today",
      doneDone: "Completed",
      doneSub: "After you complete today, it will be saved to your Journey.",
      openSteps: "Open Journey",
      gentleNote:
        "If today feels heavy, that’s okay. Shrink the action to something you can truly do—showing up is the win.",
      actionMini: "1 minute",
      actionFull: "5–10 min",
      actionMiniPrefix:
        "1-minute version: make it the smallest possible step—just one minute is enough.",
      journeyProgress: "Journey progress: {x}/{n}",

      title: "Today",
      day: "Day {x} / {n}",
      entryTitle: "Today’s note",
      editEntry: "Edit",
      newEntry: "New",
      cancelEdit: "Cancel",
      startWrite: "Start writing",
      saveEntry: "Save",
      updateEntry: "Update",
      entryLockedDone: "✓ Done today",
      entryHintNew:
        "Locked by default. Tap “New” (top-right) or the button below to start writing.",
      entryHintUpdate:
        "Locked by default. Tap “Edit” to modify. Save activates only when changed.",
    },

    steps: {
      title: "Journey",
      subtitle:
        "Every completed step becomes proof you’re changing—quietly, steadily.",
      empty: "No records yet. Your completed journeys will appear here.",
      filterAll: "All",
    },

    progress: {
      streak: "Streak",
      daysDone: "Days completed",
      stepsTaken: "Steps logged",
      title: "PROGRESS",
    },

    settings: {
      title: "Settings",

      language: "Language",
      langZh: "繁中",
      langEn: "EN",

      theme: "Appearance",
      themeSystem: "System",
      themeLight: "Light",
      themeDark: "Dark",

      restart: "Restart",

      tosTitle: "Terms of Service",
      tosBody:
        "By using this product, you agree to the following:\n\n1) This product is intended for reflection and habit-building through prompts, logging, and gentle review.\n2) You choose how and when to use it. If you feel overwhelmed, pause and take care of yourself first.\n3) Features and wording may evolve over time. If cloud sync is added in the future, we will explain it clearly and ask for consent.",

      aboutTitle: "About",
      aboutBody:
        "Manifest helps you turn what you want into something you can do—one small step at a time.\n\nIt’s not about pushing harder. It’s about building steadiness through cues, micro-actions, and a trail of proof you can see.",

      disclaimerTitle: "Important Notice & Privacy",
      disclaimerBody:
        "1) This product does not provide counseling, therapy, or medical diagnosis, and it is not a substitute for professional care.\n2) It’s a personal tool: your content is entered and chosen by you, for self-reflection and daily practice.\n3) We do not collect personal behavior data or sensitive personal information, and we do not share user information with third parties.\n\nIf you’re in crisis or at risk of self-harm, please reach out to trusted people and local professional resources. You deserve support.",

      disclaimer:
        "This app supports reflection and habit-building. It does not provide counseling or medical diagnosis.",
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