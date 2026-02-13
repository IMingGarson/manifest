export const I18N = {
  "zh-TW": {
    app: {
      name: "Manifest",
      tagline: "你一直都有選擇：每天一小步，把想要的生活慢慢走成日常。",
    },

    nav: {
      welcome: "首頁",
      today: "今日",
      journey: "心路足跡",
      settings: "設定",
      home: "回首頁",
      restart: "重新開始",
      back: "返回",
      exit: "退出",
    },

    todayGate: {
      title: "我們先一起準備一下，好嗎？",
      body: "你可以先做一份很短的小問卷，讓我更懂你；也可以先進入今天，晚點再回來做。沒有標準答案，選你最貼近、最自在的那個就好。",
      cta: "開始問卷",
    },

    welcome: {
      title: "先選一個你想靠近的目標",
      subtitle:
        "你會得到一套依你步調設計的每日肯定句與小行動。你可以隨時調整方向；我們先從今天做得到的一小步開始。",
      goalLabel: "目標類型",
      goalHint: "不必一次選到最完美。先選你此刻最在意的那一件就好。",
      oneLineLabel: "用一句話說說你的目標（選填）",
      oneLinePlaceholder: "例如：我想更有自信，願意把握眼前的機會。",
      cta: "開始建立我的每日步調",
      ctaDisabled: "請先選擇目標",
      noteTitle: "你要做的事，其實很簡單",
      noteBody:
        "每天 30–60 秒：看見提醒 → 做一個小行動 → 留下一句證據。你有選擇：做小一點，也一樣算前進。",
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
      title: "你的設定已完成",
      archetypeTitle: "行動偏好",
      elementTitle: "能量元素",
      whyTitle: "這會怎麼影響你的每日提示？",
      whyBody:
        "我們會依照你的傾向，提供你更容易做到的行動方式，也用你更容易吸收的語氣寫肯定句。你也可以把行動縮小、換個做法；能走得下去的那條路，就是你的路。",
      goalTitle: "你的目標",
      goalEmpty: "（尚未選擇）",
      editQuiz: "回去調整問卷",
      enterDaily: "進入今日卡片",
    },

    home: {
      title: "今日卡片",
      goal: "目標",
      streak: "連續天數",
      archetype: "行動偏好",
      element: "元素",
      affirmation: "今日肯定句",
      action: "今日小行動（5–10 分鐘）",
      mood: "你今天的狀態",

      // 注意：你的 page.js 目前用的是 StepsInputLabel/StepsPlaceholder/openSteps（大小寫如程式）
      StepsInputLabel: "寫一句今天的證據（選填）",
      StepsPlaceholder:
        "例如：我今天把一件拖著的事往前推進了一點點，心裡更踏實。",
      done: "完成今天",
      doneDone: "今天已完成",
      doneSub:
        "完成後會記到證據牆。你也可以選擇只按完成、不寫文字；但若留下一句話，日後回看會更清楚你走過的路。",
      openSteps: "查看心路足跡",
      gentleNote:
        "如果今天覺得沉重，也沒關係。你有選擇：把行動縮到「你做得到」的大小，哪怕只是一分鐘，也算你在照顧自己、也算你在前進。",
    },

    steps: {
      title: "證據牆",
      subtitle: "你做過的每一步，都是你選擇前進的證據。",
      empty: "目前還沒有紀錄。沒關係，先完成第一天，就會從這裡開始累積。",
      filterAll: "全部",
    },

    progress: {
      title: "進度",
      subtitle: "穩穩累積，勝過偶爾衝刺。",
      streak: "連續天數",
      daysDone: "完成天數",
      stepsTaken: "累積足跡",
      milestonesTitle: "里程碑",
      milestonesBody:
        "完成 7 天、14 天、30 天後，我們會在這裡給你一段小小回顧。",
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
        "你的內容預設只留在本機（MVP）。未來若加入同步或雲端功能，會在此清楚說明並取得你的同意。",
      aboutTitle: "關於",
      aboutBody:
        "Manifest 透過「提醒 × 小行動 × 證據累積」陪你建立更穩的心與更踏實的日常。你可以照自己的步調走；能持續的方式，才會帶你走得更遠。",
    },

    goals: {
      relationship: "感情／人際",
      confidence: "自信／自我價值",
      career: "財務／職涯",
      health: "健康／體能",
      mind: "生活狀態（平靜／快樂）",
      growth: "學習／成長",
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
      wind: "風（靈感／社交）",
      water: "水（情緒／直覺）",
      earth: "土（穩定／紀律）",
    },

    modals: {
      start: [
        {
          title: "先從今天開始就好",
          body: "你不用一次就把一切想清楚。先選一個你想靠近的方向，接下來，我們用小小的步驟陪你走。",
          tip: "你有選擇：先做你做得到的版本。",
          cta: "開始",
        },
        {
          title: "你願意開始，已經很不容易",
          body: "有些改變不是靠硬撐出來的，而是每天都往前一點點。今天先走一步，就很好。",
          tip: "狀態普通也沒關係；照著做，就算在前進。",
          cta: "繼續",
        },
        {
          title: "把心放回你自己身上",
          body: "你想顯化的，不只是結果，也是那種「我真的在過我想要的生活」的感覺。我們從一個小動作開始。",
          tip: "先完成一次，你就會更有底。",
          cta: "好",
        },
        {
          title: "溫柔一點，但方向很清楚",
          body: "你會拿到一句當日肯定句，還有一個很小的行動。不是要你變完美，而是讓你更穩、更靠近。",
          tip: "你可以縮小到 1 分鐘；也可以做完整 5–10 分鐘。",
          cta: "開始吧",
        },
        {
          title: "不用急著證明什麼",
          body: "你可以把這當成練習：練習相信、練習出手、練習記錄。剩下的，就交給時間慢慢發酵。",
          tip: "你只要做你能做到的那一點點。",
          cta: "出發",
        },
      ],

      quiz_intro: [
        {
          title: "沒有標準答案",
          body: "這份問卷不是在考你對不對，而是幫你更懂自己：你平常怎麼想、怎麼做。",
          tip: "選「平常的你」，不必選「理想的你」。",
          cta: "我知道了",
        },
        {
          title: "選真實的就好",
          body: "你越照實選，後面的肯定句和小行動就越貼近你，也越容易做得下去。",
          tip: "卡住時，先選比較常出現的那個選項。",
          cta: "繼續",
        },
        {
          title: "把它當成一段安靜的自我對話",
          body: "不用解釋給任何人聽。你只要選你最有感、最貼近的那個版本就好。",
          tip: "猶豫很正常，那代表你正在看見自己。",
          cta: "開始回答",
        },
        {
          title: "慢慢來也沒關係",
          body: "你可以一題一題來。重點不是快，而是更清楚自己。",
          tip: "之後心情或狀態變了，也可以再回來重選。",
          cta: "好",
        },
        {
          title: "你不需要把自己說得很完整",
          body: "你不需要完美描述自己。你每一次選擇，都足夠讓我們給你一個你做得到的下一步。",
          tip: "只要誠實一點點，就會很有用。",
          cta: "了解",
        },
      ],

      element_fire: [
        {
          title: "火元素：把動能點起來",
          body: "你比較靠熱情啟動。接下來我們會把那股衝勁放進「做得到的小行動」，讓想法落在生活裡。",
          tip: "完成一次小行動，就算成功。",
          cta: "繼續",
        },
        {
          title: "火元素：熱情需要出口",
          body: "你有想做的事，也可能一口氣想做很多。我們會幫你把力氣用在最關鍵的那一步。",
          tip: "先做小一點，才走得久。",
          cta: "好",
        },
        {
          title: "火元素：你適合先做再調整",
          body: "你的強項是行動力。先把第一步做出來，方向會在走的過程裡越來越清楚。",
          tip: "做 5 分鐘，比想 30 分鐘更有推進感。",
          cta: "往下",
        },
        {
          title: "火元素：你需要看見前進感",
          body: "你在意的是「我有在往前」的感覺。我們會用短短的節奏，讓你更容易保持信心。",
          tip: "把目標切小一點，讓「做到」更常發生。",
          cta: "繼續",
        },
        {
          title: "火元素：把熱忱變成日常",
          body: "你不是缺熱情，你需要的是一個能長期維持的步調。接下來的練習會讓你穩穩地燒。",
          tip: "穩穩做，比爆衝更有效。",
          cta: "繼續",
        },
      ],

      element_wind: [
        {
          title: "風元素：想得清楚，也走得動",
          body: "你很會想、也很會調整。接下來我們會把你的想法變成「真的做得到」的節奏。",
          tip: "先做一點點，就能打開下一步。",
          cta: "繼續",
        },
        {
          title: "風元素：用節奏讓心安住",
          body: "你腦袋很忙、點子很多。我們會用短短的行動，讓你不被想法淹沒。",
          tip: "先做一個很小的開始。",
          cta: "好",
        },
        {
          title: "風元素：你需要的是落地",
          body: "你理解很快，但有時會停在腦內排練。接下來我們會讓你把理解轉成生活裡的一個動作。",
          tip: "做一次，就會更踏實。",
          cta: "往下",
        },
        {
          title: "風元素：別等完美時機",
          body: "你可能會想等「更確定」再開始。但其實走幾步，你就會更確定。",
          tip: "先走 5 分鐘就好。",
          cta: "繼續",
        },
        {
          title: "風元素：讓思緒有個出口",
          body: "你擅長整理與理解。接下來我們會把整理變成行動，讓你感覺自己真的在往前。",
          tip: "把一件事做到很小，就不會那麼難開始。",
          cta: "繼續",
        },
      ],

      element_water: [
        {
          title: "水元素：先照顧感受，再往前",
          body: "你很敏銳，也知道自己需要被理解。接下來我們會用不勉強的方式，讓你慢慢推進。",
          tip: "穩定，比用力更重要。",
          cta: "繼續",
        },
        {
          title: "水元素：溫柔也是力量",
          body: "你不是不努力，你只是需要一個更適合你的步調。我們會陪你用柔軟的方式往前。",
          tip: "先把自己顧好，就已經在前進。",
          cta: "好",
        },
        {
          title: "水元素：你需要安心感",
          body: "當你心裡有安全感，就更容易行動。接下來我們會用小小的承諾，讓你每天都能做到。",
          tip: "只要做得到，就算很棒。",
          cta: "往下",
        },
        {
          title: "水元素：別跟自己硬碰硬",
          body: "你可能對自己很嚴格。接下來我們會用更好走的路，讓你不靠逼自己也能持續。",
          tip: "把標準放在「有做」，不是「做到最好」。",
          cta: "繼續",
        },
        {
          title: "水元素：讓信念慢慢長出來",
          body: "起伏很正常。接下來我們會用一個可重複的小行動，讓你慢慢把信心養起來。",
          tip: "今天只要一點點就夠了。",
          cta: "繼續",
        },
      ],

      element_earth: [
        {
          title: "土元素：穩穩走，就會到",
          body: "你重視踏實與累積。接下來我們會用可重複的小步驟，讓你看見自己真的在前進。",
          tip: "你要的是能走很久的方法。",
          cta: "繼續",
        },
        {
          title: "土元素：你擅長把事情做成",
          body: "你不是靠靈感，你靠的是每天一點點。接下來我們會用很務實的方式讓你持續下去。",
          tip: "不用做很多，做得到最重要。",
          cta: "好",
        },
        {
          title: "土元素：用日常的步調顯化",
          body: "對你來說，最有感的是「我有在做」。我們會讓你每天都有一個可以完成的小承諾。",
          tip: "小承諾，會變成大改變。",
          cta: "往下",
        },
        {
          title: "土元素：你需要的是可持續",
          body: "你不愛空談，你愛能落地的。接下來我們會把目標變成你做得到的日常。",
          tip: "穩定做幾次，你會更有信心。",
          cta: "繼續",
        },
        {
          title: "土元素：把信念放進行動裡",
          body: "你可能不太愛講漂亮話，但你會做。接下來我們會用「做到的紀錄」讓信念越來越穩。",
          tip: "你做過的事，就是最好的證據。",
          cta: "繼續",
        },
      ],
    },
  },

  en: {
    app: {
      name: "Manifest",
      tagline:
        "You always have choices—one small step at a time becomes real change.",
    },

    nav: {
      welcome: "Home",
      today: "Today",
      journey: "Gallery",
      settings: "Settings",
      home: "Home",
      restart: "Restart",
      back: "Back",
      exit: "Exit",
    },

    todayGate: {
      title: "Let’s get you ready—gently.",
      body: "You can take a quick 1-minute quiz now to personalize your daily prompts, or you can come back to it later. There’s no right answer—choose what feels most like you.",
      cta: "Start the quiz",
    },

    welcome: {
      title: "Pick a goal you want to move toward",
      subtitle:
        "You’ll get daily affirmations and small actions designed to fit your pace. You can adjust your goal anytime—let’s start with a step you can do today.",
      goalLabel: "Goal",
      goalHint:
        "You don’t have to pick perfectly. Choose what matters most right now.",
      oneLineLabel: "Describe your goal in one line (optional)",
      oneLinePlaceholder:
        "E.g., I want to feel more confident and take initiative more often.",
      cta: "Build my daily rhythm",
      ctaDisabled: "Select a goal to continue",
      noteTitle: "Your daily practice is simple",
      noteBody:
        "30–60 seconds a day: see a cue → do a small action → leave one line of proof. You have choices—smaller still counts.",
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
      title: "Your setup is ready",
      archetypeTitle: "Behavior style",
      elementTitle: "Energy element",
      whyTitle: "How this shapes your daily prompts",
      whyBody:
        "We’ll match you with actions you’re more likely to complete and write affirmations in a tone you naturally absorb. You can always shrink the action or do it your way—what matters is staying with yourself.",
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
      action: "Small action (5–10 min)",
      mood: "How are you today?",

      StepsInputLabel: "One sentence of proof (optional)",
      StepsPlaceholder:
        "E.g., I moved one stuck task forward a little, and I feel more grounded.",
      done: "Complete today",
      doneDone: "Completed",
      doneSub:
        "After you complete today, it’ll go to your Gallery. You can also choose to simply check it off without writing—writing just helps you see your progress more clearly later.",
      openSteps: "Open Gallery",
      gentleNote:
        "If today feels heavy, that’s okay. You have options: shrink the action to something you can truly do—even one minute counts. Consistency beats perfection.",
    },

    steps: {
      title: "Gallery",
      subtitle: "Every step you’ve taken is proof you chose to move forward.",
      empty:
        "No entries yet. That’s okay—complete your first day, and this will begin to fill in.",
      filterAll: "All",
    },

    progress: {
      title: "Progress",
      subtitle: "Steady beats intense.",
      streak: "Streak",
      daysDone: "Days completed",
      stepsTaken: "Steps logged",
      milestonesTitle: "Milestones",
      milestonesBody:
        "At 7, 14, and 30 days, you’ll see a short reflection here.",
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
        "By default, your content stays on this device (MVP). If cloud sync is added later, we’ll explain it clearly and ask for your consent.",
      aboutTitle: "About",
      aboutBody:
        "Manifest supports you through cues, small actions, and an accumulating record of proof. You can go at your pace—what matters is choosing a version you can keep.",
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

    modals: {
      start: [
        {
          title: "Starting with today is enough",
          body: "You don’t have to have it all figured out. Pick a direction you want to move toward, and we’ll take small steps together.",
          tip: "You have choices—start with the version you can do.",
          cta: "Start",
        },
        {
          title: "Beginning takes real courage",
          body: "Some changes don’t come from pushing harder. They come from showing up, a little at a time. Today can be a small win.",
          tip: "Even on an average day, showing up counts.",
          cta: "Continue",
        },
        {
          title: "Bring your attention back to you",
          body: "What you’re manifesting isn’t only a result—it’s the feeling of living closer to what you want. We’ll begin with one small action.",
          tip: "Do it once, and you’ll feel more grounded.",
          cta: "OK",
        },
        {
          title: "Gentle, but with direction",
          body: "You’ll get a daily affirmation and one small action. This isn’t about being perfect—it’s about becoming steadier and closer.",
          tip: "You can do the 1-minute version or the full 5–10 minutes.",
          cta: "Let’s go",
        },
        {
          title: "No need to prove anything",
          body: "Think of this as practice: practice believing, practice taking action, practice noticing what’s real. The rest can unfold with time.",
          tip: "Just do the part you can do today—no more.",
          cta: "Begin",
        },
      ],

      quiz_intro: [
        {
          title: "There’s no “right” answer",
          body: "This isn’t a test. It’s a way to understand how you tend to think and act in everyday life.",
          tip: "Choose your real self, not your ideal self.",
          cta: "Got it",
        },
        {
          title: "Choose what’s true for you",
          body: "The more honest your choices are, the more your affirmations and actions will feel like they fit—and the easier it is to keep going.",
          tip: "If you’re torn, pick what shows up more often.",
          cta: "Continue",
        },
        {
          title: "Treat this as a quiet check-in",
          body: "You don’t have to explain anything to anyone. Just pick what feels most like you.",
          tip: "Hesitation is normal—it means you’re noticing yourself.",
          cta: "Start",
        },
        {
          title: "Slow is still progress",
          body: "One question at a time is fine. The goal isn’t speed—it’s clarity.",
          tip: "If your mood changes later, you can always come back and adjust.",
          cta: "OK",
        },
        {
          title: "You don’t need the perfect wording",
          body: "You don’t have to describe yourself perfectly. Each choice is enough for us to offer a next step you can actually do.",
          tip: "A little honesty goes a long way.",
          cta: "Understood",
        },
      ],

      element_fire: [
        {
          title: "Fire: spark your momentum",
          body: "You tend to start with passion. We’ll turn that energy into actions you can complete—not just ideas in your head.",
          tip: "One small action today is a win.",
          cta: "Continue",
        },
        {
          title: "Fire: give your energy an outlet",
          body: "You have drive, and you might want to do everything at once. We’ll help you focus on the step that matters most.",
          tip: "Start smaller so you can last longer.",
          cta: "OK",
        },
        {
          title: "Fire: do first, adjust later",
          body: "Your strength is action. Take the first step—your direction gets clearer as you move.",
          tip: "Five minutes of doing beats thirty minutes of thinking.",
          cta: "Next",
        },
        {
          title: "Fire: you need to feel progress",
          body: "You’re motivated by the feeling of moving forward. We’ll keep the rhythm short so it’s easier to hold your confidence.",
          tip: "Make the goal smaller so “done” happens more often.",
          cta: "Continue",
        },
        {
          title: "Fire: make passion sustainable",
          body: "You’re not lacking passion—you need a pace you can keep. These practices help you burn steady, not burn out.",
          tip: "Steady beats intense, long-term.",
          cta: "Continue",
        },
      ],

      element_wind: [
        {
          title: "Wind: clarity that can move",
          body: "You think fast and adapt well. We’ll turn your insights into a rhythm you can actually follow day to day.",
          tip: "A tiny start can unlock the next step.",
          cta: "Continue",
        },
        {
          title: "Wind: let action calm the mind",
          body: "You have a lot of thoughts and possibilities. Short actions help you move without getting stuck in your head.",
          tip: "Start with one very small step.",
          cta: "OK",
        },
        {
          title: "Wind: bring it down to earth",
          body: "You’re great at understanding, and sometimes it stays in mental rehearsal. We’ll translate understanding into one real-life action.",
          tip: "Do it once, and it will feel more real.",
          cta: "Next",
        },
        {
          title: "Wind: don’t wait for the perfect moment",
          body: "You might want to feel sure before starting. But a few steps forward often creates the certainty you’re looking for.",
          tip: "Just five minutes is enough to begin.",
          cta: "Continue",
        },
        {
          title: "Wind: give your thoughts an outlet",
          body: "You’re good at organizing and making sense of things. We’ll turn that clarity into action so you can feel real movement.",
          tip: "Make it small, and it becomes easier to start.",
          cta: "Continue",
        },
      ],

      element_water: [
        {
          title: "Water: care first, then move",
          body: "You’re sensitive and you notice what you need. We’ll move forward without forcing it—one gentle step at a time.",
          tip: "Stability matters more than pushing harder.",
          cta: "Continue",
        },
        {
          title: "Water: softness is strength",
          body: "You’re not lazy—you need a pace that fits you. We’ll support progress that doesn’t require you to fight yourself.",
          tip: "Caring for yourself is still progress.",
          cta: "OK",
        },
        {
          title: "Water: you move best with safety",
          body: "When you feel safe inside, action comes more easily. We’ll use small promises you can keep, day by day.",
          tip: "If it’s doable, it’s enough.",
          cta: "Next",
        },
        {
          title: "Water: don’t go to war with yourself",
          body: "You might be harder on yourself than you realize. We’ll choose a path that helps you keep going without self-pressure.",
          tip: "Aim for “I did it,” not “I did it perfectly.”",
          cta: "Continue",
        },
        {
          title: "Water: let belief grow slowly",
          body: "Ups and downs are normal. We’ll use one repeatable small action to help your confidence grow over time.",
          tip: "A little is enough for today.",
          cta: "Continue",
        },
      ],

      element_earth: [
        {
          title: "Earth: steady gets you there",
          body: "You value grounded progress and accumulation. We’ll use repeatable small steps so you can see yourself moving forward.",
          tip: "Choose a way you can keep for a long time.",
          cta: "Continue",
        },
        {
          title: "Earth: you’re good at making things real",
          body: "You don’t rely on bursts of inspiration—you rely on showing up. We’ll keep it practical so it’s easier to continue.",
          tip: "You don’t need a lot—just something you can do.",
          cta: "OK",
        },
        {
          title: "Earth: manifest through daily rhythm",
          body: "What feels real to you is “I actually did it.” We’ll give you one small commitment you can complete each day.",
          tip: "Small commitments become big change.",
          cta: "Next",
        },
        {
          title: "Earth: keep it sustainable",
          body: "You don’t like empty talk—you want something that works in real life. We’ll turn the goal into a daily step you can handle.",
          tip: "After a few steady days, confidence comes naturally.",
          cta: "Continue",
        },
        {
          title: "Earth: put belief into action",
          body: "You may not love pretty words, but you follow through. We’ll build belief through what you’ve actually done—your own steps.",
          tip: "What you’ve done is proof.",
          cta: "Continue",
        },
      ],
    },
  },
};
