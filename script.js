const wheelBtn = document.getElementById("wheel-btn");
const wheelModal = document.getElementById("wheel-modal");
const closeWheel = document.getElementById("close-wheel");
const spinWheelBtn = document.getElementById("spin-wheel-btn");
const wheelResult = document.getElementById("wheel-result");

const faqBtn = document.getElementById("faq-btn");
const faqModal = document.getElementById("faq-modal");
const closeFaq = document.getElementById("close-faq");

const button = document.getElementById("flip-btn");
const themeButton = document.getElementById("theme-btn");
const result = document.querySelector(".result");
const coin = document.querySelector(".coin");
const quote = document.getElementById("quote");
const flipSound = new Audio("sounds/flip.mp3");
const shareButton = document.getElementById("share-btn");
const historyList = document.getElementById("history-list");
const challengeBox = document.getElementById("challenge-box");
const counter = document.getElementById("counter");
const streakText = document.getElementById("streak");
const remainingFlipsText = document.getElementById("remaining-flips");
const achievementsList = document.getElementById("achievements-list");

const settingsBtn = document.getElementById("settings-btn");
const settingsModal = document.getElementById("settings-modal");
const closeSettings = document.getElementById("close-settings");
const resetStreakBtn = document.getElementById("reset-streak-btn");
const resetDataBtn = document.getElementById("reset-data-btn");
const motivationBtn = document.getElementById("motivation-btn");
const motivationModal = document.getElementById("motivation-modal");
const closeMotivation = document.getElementById("close-motivation");
const motivateBtn = document.getElementById("motivate-btn");
const feelingInput = document.getElementById("feeling-input");
const motivationResult = document.getElementById("motivation-result");

let maxFlips = 3;
let history = [];

const today = new Date().toDateString();

let savedDate = localStorage.getItem("flipDate");
let flipCount = parseInt(localStorage.getItem("flipCount")) || 0;

if (savedDate !== today) {
    flipCount = 0;
    localStorage.setItem("flipDate", today);
    localStorage.setItem("flipCount", flipCount);
}

let totalFlips = parseInt(localStorage.getItem("totalFlips")) || 0;

let streak = parseInt(localStorage.getItem("streak")) || 0;
let lastVisit = localStorage.getItem("lastVisit");

if (lastVisit !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastVisit === yesterday.toDateString()) {
        streak++;
    } else {
        streak = 1;
    }

    localStorage.setItem("streak", streak);
    localStorage.setItem("lastVisit", today);
}

function updateAchievements() {
    let achievements = [];

    if (totalFlips >= 1) achievements.push("🥉 First Flip");
    if (flipCount >= 3) achievements.push("🥈 3 Flips Today");
    if (streak >= 1) achievements.push("🔥 Daily Streak Started");
    if (streak >= 7) achievements.push("🏆 7-Day Streak");
    if (totalFlips >= 30) achievements.push("👑 Lucky Master");

    achievementsList.innerHTML = "";

    if (achievements.length === 0) {
        achievementsList.innerHTML = "<li>No achievements yet...</li>";
    } else {
        achievements.forEach(item => {
            achievementsList.innerHTML += `<li>${item}</li>`;
        });
    }
}

counter.innerText = `Total Flips: ${flipCount}`;
remainingFlipsText.innerText = `🍀 Remaining Flips Today: ${maxFlips - flipCount}`;
streakText.innerText = `🔥 Daily Streak: ${streak} Day${streak > 1 ? "s" : ""}`;
updateAchievements();

button.addEventListener("click", () => {
    if (flipCount >= maxFlips) {
        result.innerHTML = `
        <h2 style="color:tomato;">
        ⏳ You've used all 3 flips today.
        </h2>
        <p>🍀 Come back tomorrow for more luck!</p>
        `;
        return;
    }

    flipSound.currentTime = 0;
    flipSound.play();

    flipCount++;
    totalFlips++;

    localStorage.setItem("flipCount", flipCount);
    localStorage.setItem("totalFlips", totalFlips);

    counter.innerText = `Total Flips: ${flipCount}`;
    remainingFlipsText.innerText = `🍀 Remaining Flips Today: ${maxFlips - flipCount}`;

    coin.classList.add("spin");

    setTimeout(() => {
        coin.classList.remove("spin");
    }, 1000);

    const goodAdvices = [
        "Start something new today.",
        "Trust yourself and take the opportunity.",
        "A positive surprise awaits you.",
        "Today is a perfect day to learn something new.",
        "Spread kindness and good things will come back."
    ];

    const badAdvices = [
        "Take things slowly and stay calm.",
        "Avoid making impulsive decisions.",
        "Patience will help you today.",
        "Focus on rest and self-care.",
        "Don't let small problems affect your mood."
    ];

    const challenges = [
        "💧 Drink 2L of water",
        "🚶 Walk 5000 steps",
        "📚 Read 10 pages",
        "📞 Call your parents",
        "😊 Compliment someone",
        "🧘 Meditate for 5 minutes",
        "🌳 Spend 10 minutes outside"
    ];

    const quotes = [
        "Believe in yourself and all that you are.",
        "Every day is a fresh start.",
        "Small steps lead to big achievements.",
        "Your future is created by what you do today.",
        "Happiness is found in the little things.",
        "Success begins with self-belief.",
        "Stay positive and trust the journey."
    ];

    quote.innerText = quotes[Math.floor(Math.random() * quotes.length)];
    challengeBox.innerText = challenges[Math.floor(Math.random() * challenges.length)];

    let dailyMood = localStorage.getItem("dailyMood");
let moodDate = localStorage.getItem("moodDate");

if (moodDate !== today || !dailyMood) {
    const moods = ["good", "mixed", "challenging"];
    dailyMood = moods[Math.floor(Math.random() * moods.length)];

    localStorage.setItem("dailyMood", dailyMood);
    localStorage.setItem("moodDate", today);
}

let luckyNumber = Math.floor(Math.random() * 99) + 1;

const colors = ["Green", "Blue", "Purple", "Red", "Yellow", "Orange", "Pink"];
let luckyColor = colors[Math.floor(Math.random() * colors.length)];

if (dailyMood === "good") {
    const goodTitles = ["🟢 GOOD DAY", "🟢 POSITIVE ENERGY", "🟢 LUCKY MOMENT"];
    let title = goodTitles[Math.floor(Math.random() * goodTitles.length)];
    let score = Math.floor(Math.random() * 16) + 80;
    let advice = goodAdvices[Math.floor(Math.random() * goodAdvices.length)];

    history.unshift(`${title} - ${score}%`);

    result.innerHTML = `
    <h2 style="color:lightgreen;">${title}</h2>
    <p>✨ Fortune Score : ${score}%</p>
    <p>🍀 Lucky Number : ${luckyNumber}</p>
    <p>🎨 Lucky Color : ${luckyColor}</p>
    <p>💡 Advice : ${advice}</p>
    `;
} else if (dailyMood === "mixed") {
    const mixedTitles = ["🟡 MIXED DAY", "🟡 SLOW PROGRESS", "🟡 STAY BALANCED"];
    const mixedAdvices = [
        "Take one step at a time today.",
        "Stay calm and avoid overthinking.",
        "Some things may be slow, but progress is still progress.",
        "Balance your energy and focus on what matters.",
        "Do not rush important decisions today."
    ];

    let title = mixedTitles[Math.floor(Math.random() * mixedTitles.length)];
    let score = Math.floor(Math.random() * 21) + 55;
    let advice = mixedAdvices[Math.floor(Math.random() * mixedAdvices.length)];

    history.unshift(`${title} - ${score}%`);

    result.innerHTML = `
    <h2 style="color:gold;">${title}</h2>
    <p>✨ Fortune Score : ${score}%</p>
    <p>🍀 Lucky Number : ${luckyNumber}</p>
    <p>🎨 Lucky Color : ${luckyColor}</p>
    <p>💡 Advice : ${advice}</p>
    `;
} else {
    const challengeTitles = ["🔴 CHALLENGING DAY", "🔴 STAY CAREFUL", "🔴 PATIENCE NEEDED"];
    let title = challengeTitles[Math.floor(Math.random() * challengeTitles.length)];
    let score = Math.floor(Math.random() * 26) + 25;
    let advice = badAdvices[Math.floor(Math.random() * badAdvices.length)];

    history.unshift(`${title} - ${score}%`);

    result.innerHTML = `
    <h2 style="color:tomato;">${title}</h2>
    <p>✨ Fortune Score : ${score}%</p>
    <p>🍀 Lucky Number : ${luckyNumber}</p>
    <p>🎨 Lucky Color : ${luckyColor}</p>
    <p>💡 Advice : ${advice}</p>
    `;
}

    if (history.length > 5) history.pop();

    historyList.innerHTML = "";
    history.forEach(item => {
        historyList.innerHTML += `<li>${item}</li>`;
    });

    updateAchievements();
});

shareButton.addEventListener("click", () => {
    const text = result.innerText + "\n\n🌟 Generated with Lucky Coin";
    navigator.clipboard.writeText(text);
    alert("Result copied! You can paste it anywhere.");
});

let savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
}

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
});

faqBtn.addEventListener("click", () => {
    faqModal.style.display = "flex";
});

closeFaq.addEventListener("click", () => {
    faqModal.style.display = "none";
});

wheelBtn.addEventListener("click", () => {
    wheelModal.style.display = "flex";
});

closeWheel.addEventListener("click", () => {
    wheelModal.style.display = "none";
});

spinWheelBtn.addEventListener("click", () => {
    const wheelDate = localStorage.getItem("wheelDate");

    if (wheelDate === today) {
        wheelResult.innerText =
            "⏳ You already used your Lucky Wheel today. Come back tomorrow!";
        spinWheelBtn.disabled = true;
        spinWheelBtn.innerText = "Come Back Tomorrow";
        return;
    }

    localStorage.setItem("wheelDate", today);

    const rewards = [
    "🍀 Extra Luck +10%",
    "⭐ Super Lucky Day",
    "💎 Lucky Color Upgrade",
    "🎁 Bonus Fortune",
    "🎉 JACKPOT!",
    "🔥 Streak Shield",
    "👑 Lucky Master Reward",
    "🌈 Rainbow Luck",
    "🚀 Success Boost",
    "💰 Fortune Magnet"
];

    const reward = rewards[Math.floor(Math.random() * rewards.length)];

    wheelResult.innerHTML = `
<h2>${reward}</h2>
<p>✨ Your reward has been claimed for today!</p>
`;
    spinWheelBtn.disabled = true;
    spinWheelBtn.innerText = "Come Back Tomorrow";
});
if (localStorage.getItem("wheelDate") === today) {
    spinWheelBtn.disabled = true;
    spinWheelBtn.innerText = "Come Back Tomorrow";
}

settingsBtn.addEventListener("click", () => {
    settingsModal.style.display = "flex";
});

closeSettings.addEventListener("click", () => {
    settingsModal.style.display = "none";
});

resetStreakBtn.addEventListener("click", () => {
    localStorage.removeItem("streak");
    localStorage.removeItem("lastVisit");

    alert("🔥 Streak Reset!");
    location.reload();
});

resetDataBtn.addEventListener("click", () => {
    localStorage.clear();

    alert("🗑️ All Lucky Coin data has been reset!");
    location.reload();
});
motivationBtn.addEventListener("click", () => {
    motivationModal.style.display = "flex";
});

closeMotivation.addEventListener("click", () => {
    motivationModal.style.display = "none";
});

motivateBtn.addEventListener("click", () => {

    const feeling = feelingInput.value.toLowerCase();

    if (feeling.includes("stress")) {
        motivationResult.innerText =
        "🌟 It's okay to feel stressed. Focus on one small step at a time.";
    }

    else if (feeling.includes("sad")) {
        motivationResult.innerText =
        "💙 Tough days don't last forever. Better days are ahead.";
    }

    else if (feeling.includes("fail")) {
        motivationResult.innerText =
        "📚 Failure is part of learning. Keep moving forward.";
    }

    else if (feeling.includes("tired")) {
        motivationResult.innerText =
        "😌 Rest today. Your energy will come back stronger.";
    }

    else if (feeling.includes("happy") || feeling.includes("good")) {
    motivationResult.innerText =
    "😄 Love that energy! Use this mood to finish one important thing today.";
}

else if (feeling.includes("angry")) {
    motivationResult.innerText =
    "🌿 Take a pause, breathe slowly, and respond with a calm mind.";
}

else if (feeling.includes("lazy")) {
    motivationResult.innerText =
    "🚀 Start with just 5 minutes. Once you begin, momentum will follow.";
}

else if (feeling.includes("confused")) {
    motivationResult.innerText =
    "🧭 Write down the next small step. Clarity comes after action.";
}

else {
    motivationResult.innerText =
    "✨ Believe in yourself. You are stronger than you think.";
}

});