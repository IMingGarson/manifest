export const I18N = {
  "zh-TW": {
    app: {
      name: "Manifest",
      tagline: "用每天的小行動，把理想慢慢成為日常。",
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
      toGoalStart: "開始這個旅程",
    },

    modals: {
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
          tip: "狀態普通也沒關係，照著做就算進展。",
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
      ],
      quizIntro: [
        {
          title: "先停一下，呼吸一下",
          body:
            "我會用 5 秒帶你進入狀態。等一下就開始小問卷，讓提醒更貼近你。",
          tip: "（5 秒後自動開始）",
          cta: "我準備好了",
        },
      ],
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
        "我們會依照你的傾向，挑選你更做得下去的微行動，並用你容易吸收的語氣寫肯定句。",
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
      StepsInputLabel: "寫一句今天的足跡",
      StepsPlaceholder: "例如：我把拖延的事推進了一點點，心裡更踏實。",
      done: "完成今天",
      doneDone: "今天已完成",
      doneSub: "完成後會記到心路足跡，讓你看見自己正在改變。",
      openSteps: "查看心路足跡",
      gentleNote: "如果今天狀態不太好也沒關係。把行動縮小到你做得到的程度，才是關鍵。",
      actionMini: "1 分鐘",
      actionFull: "5–10 分鐘",
      actionMiniPrefix: "1 分鐘版：把這件事縮到最小。",
      journeyProgress: "旅程進度：{x}/{n}",
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
      entryHintNew: "預設是鎖住的：按「新增」或下方按鈕開始輸入。",
      entryHintUpdate: "按「編輯」後才可修改；有改動才會啟用儲存。",
    },

    steps: {
      title: "心路足跡",
      subtitle: "你完成的每一步，都在替你把信念慢慢養起來",
      empty: "目前還沒有紀錄。每次完成的旅途都會出現在這裡",
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
      restart: "重新開始旅程",
      aboutTitle: "關於創作者",
      aboutBody: "我相信，選擇比努力更重要。以前我也常以為只要再撐一下就會變好，後來才明白：真正把我救回來的，是一句簡單的提醒——就算此刻很難，我依然有選擇。",
      disclaimer: "本產品以自我覺察為主，不提供諮商或醫療診斷。",
    },

    goals: {
      relationship: "感情 / 人際",
      confidence: "自信 / 自我價值",
      career: "財務 / 職涯",
      health: "健康 / 體能",
      mind: "生活狀態（平靜 / 快樂）",
      growth: "學習 / 成長",
    },

    archetype: {
      doer: "行動派",
      thinker: "思考派",
      feeler: "感受派",
      builder: "秩序派",
    },

    element: {
      fire: "火（動能）",
      wind: "風（靈感）",
      water: "水（情緒）",
      earth: "土（穩定）",
    },
  },

  en: {
    app: {
      name: "Manifest",
      tagline: "Small daily actions. Ideals, made everyday.",
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
        "You haven’t taken the quiz yet. It helps tailor your daily prompts.\n\nYou can also start Today first and take the quiz later when you’re ready.",
      cta: "Start quiz",
      ctaSecondary: "Go to Today first",
      needGoalHint: "Pick a goal first to continue.",
      hintQuizLater: "You can take the quiz anytime to personalize prompts.",
      linkGoQuiz: "Take the quiz",
    },

    welcome: {
      title: "Choose a goal to move toward",
      subtitle:
        "You’ll get personalized affirmations and micro-actions to build belief through steady progress.",
      goalLabel: "Goal Type",
      goalHint: "Start with what matters most right now.",
      oneLineLabel: "Describe your goal in one line (optional)",
      oneLinePlaceholder: "E.g., I want to feel more confident taking initiative.",
      cta: "Build my daily flow",
      ctaDisabled: "Select a goal to continue",
      noteTitle: "Simple daily flow",
      noteBody: "30–60 seconds a day: see cue → take small action → log progress.",
      toGoalStart: "Start this journey",
    },

    modals: {
      start: [
        {
          title: "Starting with today is enough",
          body: "You don’t have to have it all figured out. Pick a direction—then we’ll take small steps together.",
          tip: "Consistency beats going big.",
          cta: "Start",
        },
        {
          title: "Beginning takes real courage",
          body: "Some changes don’t come from pushing harder—they come from showing up. Let’s take the first step today.",
          tip: "An average day still counts.",
          cta: "Continue",
        },
        {
          title: "Bring your attention back to you",
          body: "What you’re manifesting isn’t only a result—it’s the feeling of living closer to what you want.",
          tip: "Do it once to feel grounded.",
          cta: "OK",
        },
        {
          title: "Choose the gentlest start",
          body: "If energy is low, start with 1 minute—just enough to feel “I can do this.”",
          tip: "Today’s plan should be doable.",
          cta: "Choose 1 minute",
        },
        {
          title: "Possible is sustainable",
          body: "The goal isn’t a flawless day. It’s a day where you moved in your direction with care.",
          tip: "You don’t need perfect.",
          cta: "I’ll try",
        },
      ],
      quizIntro: [
        {
          title: "Take a breath",
          body: "Here’s a 5-second intro to help you settle in. Then we’ll start the quiz.",
          tip: "(Auto-starts in 5 seconds)",
          cta: "I’m ready",
        },
      ],
      cycleEnd: {
        title: "Cycle complete",
        body: "You’ve finished this stretch. Rest is allowed. Start next cycle when ready.",
        cta: "Start next cycle",
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
      title: "Survey Result",
      archetypeTitle: "Behavior style",
      elementTitle: "Energy element",
      whyTitle: "Your Daily Prompts",
      whyBody: "We match actions you’re likely to complete in a tone you naturally absorb.",
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
      StepsInputLabel: "Today's Progress",
      StepsPlaceholder: "E.g., I moved one delayed task forward and feel grounded.",
      done: "Complete today",
      doneDone: "Completed",
      doneSub: "This will be saved to your Journey.",
      openSteps: "Open Journey",
      gentleNote: "If today feels heavy, shrink the action. Showing up is the win.",
      actionMini: "1 minute",
      actionFull: "5–10 min",
      actionMiniPrefix: "1-minute version: smallest step.",
      journeyProgress: "Progress: {x}/{n}",
      title: "Today",
      day: "Day {x} / {n}",
      entryTitle: "Today’s note",
      editEntry: "Edit",
      newEntry: "New",
      cancelEdit: "Cancel",
      startWrite: "Start writing",
      saveEntry: "Save",
      updateEntry: "Update",
      entryLockedDone: "Done today",
      entryHintNew: "Tap “New” or the button below to start writing.",
      entryHintUpdate: "Tap “Edit” to modify. Save activates on change.",
    },

    steps: {
      title: "Journey",
      subtitle: "Every completed step becomes proof you’re changing.",
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
      restart: "Restart Journey",
      aboutTitle: "About the Creator",
      aboutBody: "I believe choice matters more than effort. I used to think pushing harder was the answer, but what truly saved me was realizing that even in hard times, I still have a choice.",
      disclaimer: "This app supports reflection. It does not provide medical diagnosis.",
    },

    goals: {
      relationship: "Relationships",
      confidence: "Confidence",
      career: "Career / Money",
      health: "Health",
      mind: "Mindset / Calm",
      growth: "Learning / Growth",
    },

    archetype: {
      doer: "Doer",
      thinker: "Thinker",
      feeler: "Feeler",
      builder: "Builder",
    },

    element: {
      fire: "Fire (Drive)",
      wind: "Wind (Ideas)",
      water: "Water (Emotion)",
      earth: "Earth (Stability)",
    },
  },
};