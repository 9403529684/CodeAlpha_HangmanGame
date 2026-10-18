"use strict";


/* ==============================
   WORD BANK
============================== */

const wordBank = [

    // Animals
    { word: "elephant", category: "Animals", hint: "The largest land animal." },
    { word: "giraffe", category: "Animals", hint: "An animal with a very long neck." },
    { word: "penguin", category: "Animals", hint: "A bird that cannot fly and loves cold places." },
    { word: "dolphin", category: "Animals", hint: "An intelligent sea mammal." },
    { word: "kangaroo", category: "Animals", hint: "An Australian animal that hops." },
    { word: "tiger", category: "Animals", hint: "A big cat with orange and black stripes." },
    { word: "rabbit", category: "Animals", hint: "A small animal with long ears." },
    { word: "butterfly", category: "Animals", hint: "An insect with colourful wings." },
    { word: "crocodile", category: "Animals", hint: "A large reptile with powerful jaws." },
    { word: "peacock", category: "Animals", hint: "A bird famous for its colourful feathers." },

    // Fruits
    { word: "mango", category: "Fruits", hint: "A sweet tropical fruit known as the king of fruits in India." },
    { word: "pineapple", category: "Fruits", hint: "A tropical fruit with a spiky outside." },
    { word: "watermelon", category: "Fruits", hint: "A large fruit with green skin and juicy red flesh." },
    { word: "strawberry", category: "Fruits", hint: "A red fruit with tiny seeds on its surface." },
    { word: "papaya", category: "Fruits", hint: "A tropical fruit with orange flesh and black seeds." },
    { word: "grapes", category: "Fruits", hint: "Small fruits that grow in bunches." },
    { word: "orange", category: "Fruits", hint: "A citrus fruit rich in vitamin C." },
    { word: "banana", category: "Fruits", hint: "A long yellow fruit." },

    // Nature
    { word: "mountain", category: "Nature", hint: "A very high natural landform." },
    { word: "rainbow", category: "Nature", hint: "A colourful arc seen after rain." },
    { word: "waterfall", category: "Nature", hint: "Water falling from a height." },
    { word: "forest", category: "Nature", hint: "A large area covered with trees." },
    { word: "volcano", category: "Nature", hint: "A mountain that can release lava." },
    { word: "ocean", category: "Nature", hint: "A vast body of salt water." },
    { word: "sunflower", category: "Nature", hint: "A tall flower with yellow petals." },
    { word: "thunder", category: "Nature", hint: "The loud sound heard during a storm." },

    // Sports
    { word: "cricket", category: "Sports", hint: "A bat-and-ball game popular in India." },
    { word: "football", category: "Sports", hint: "A team sport played with a ball and goals." },
    { word: "badminton", category: "Sports", hint: "A racket sport played with a shuttlecock." },
    { word: "basketball", category: "Sports", hint: "A sport in which players shoot a ball into a hoop." },
    { word: "volleyball", category: "Sports", hint: "A team sport played over a net." },
    { word: "swimming", category: "Sports", hint: "Moving through water as a sport." },
    { word: "hockey", category: "Sports", hint: "A sport played using sticks and a ball or puck." },

    // Countries
    { word: "india", category: "Countries", hint: "A country in South Asia." },
    { word: "japan", category: "Countries", hint: "An island country known for Mount Fuji." },
    { word: "brazil", category: "Countries", hint: "A South American country famous for football." },
    { word: "canada", category: "Countries", hint: "A large country in North America." },
    { word: "australia", category: "Countries", hint: "A country and continent known for kangaroos." },
    { word: "france", category: "Countries", hint: "A European country whose capital is Paris." },
    { word: "nepal", category: "Countries", hint: "A country home to Mount Everest." },

    // Food
    { word: "pizza", category: "Food", hint: "An Italian dish with toppings on a flat base." },
    { word: "sandwich", category: "Food", hint: "Food made by putting filling between bread." },
    { word: "pancake", category: "Food", hint: "A flat breakfast food cooked in a pan." },
    { word: "biryani", category: "Food", hint: "A popular spiced rice dish." },
    { word: "chocolate", category: "Food", hint: "A sweet treat made from cocoa." },
    { word: "noodles", category: "Food", hint: "Long strips of dough cooked in water." },

    // Everyday Life
    { word: "umbrella", category: "Everyday Life", hint: "An object used to protect yourself from rain." },
    { word: "library", category: "Everyday Life", hint: "A place where people borrow books." },
    { word: "calendar", category: "Everyday Life", hint: "A chart showing days, weeks, and months." },
    { word: "backpack", category: "Everyday Life", hint: "A bag carried on your back." },
    { word: "mirror", category: "Everyday Life", hint: "An object that reflects your image." },
    { word: "candle", category: "Everyday Life", hint: "An object that gives light when its wick burns." },

    // Space
    { word: "planet", category: "Space", hint: "A celestial body that orbits a star." },
    { word: "galaxy", category: "Space", hint: "A huge collection of stars, gas, and dust." },
    { word: "asteroid", category: "Space", hint: "A small rocky object orbiting the Sun." },
    { word: "satellite", category: "Space", hint: "An object that orbits a planet." },
    { word: "telescope", category: "Space", hint: "An instrument used to observe distant objects." }

];


/* ==============================
   GAME SETTINGS
============================== */

const maxAttempts = 6;
const basePoints = 100;
const pointsLostPerWrongGuess = 10;


/* ==============================
   GAME VARIABLES
============================== */

let secretWord = "";
let currentCategory = "";
let currentHint = "";

let guessedLetters = new Set();

let incorrectGuesses = 0;
let hintUsed = false;
let gameOver = false;

let totalScore = 0;
let gamesWon = 0;
let gamesPlayed = 0;

let previousWord = "";
let nextGameTimer = null;


/* ==============================
   HTML ELEMENTS
============================== */

const wordDisplay = document.getElementById("word");
const attemptsDisplay = document.getElementById("attempts");
const attemptBar = document.getElementById("attemptBar");

const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");

const restartButton = document.getElementById("restart");
const hintButton = document.getElementById("hintButton");
const hintDisplay = document.getElementById("hintDisplay");
const nextWordButton = document.getElementById("nextWord");

const bodyParts = document.querySelectorAll(".body-part");


/* ==============================
   SCORE DISPLAY
============================== */

function updateScoreDisplay() {
    document.getElementById("totalScore").textContent = totalScore;
    document.getElementById("gamesWon").textContent = gamesWon;
    document.getElementById("gamesPlayed").textContent = gamesPlayed;
}


/* ==============================
   SELECT RANDOM WORD
============================== */

function getRandomWord() {
    let availableWords = wordBank.filter(
        item => item.word !== previousWord
    );

    if (availableWords.length === 0) {
        availableWords = wordBank;
    }

    const randomIndex = Math.floor(
        Math.random() * availableWords.length
    );

    const selectedWord = availableWords[randomIndex];

    previousWord = selectedWord.word;

    return selectedWord;
}


/* ==============================
   START GAME
============================== */

function startGame() {

    if (nextGameTimer !== null) {
        clearTimeout(nextGameTimer);
        nextGameTimer = null;
    }

    const selectedWord = getRandomWord();

    secretWord = selectedWord.word;
    currentCategory = selectedWord.category;
    currentHint = selectedWord.hint;

    guessedLetters = new Set();

    incorrectGuesses = 0;
    hintUsed = false;
    gameOver = false;

    bodyParts.forEach(part => {
        part.style.opacity = "0";
    });

    message.textContent = "Good luck! Start guessing.";
    message.style.color = "";

    hintDisplay.textContent = "Your hint will appear here.";

    hintButton.disabled = false;
    nextWordButton.disabled = false;

    updateAttempts();
    createKeyboard();
    renderWord();
    updateScoreDisplay();
}


/* ==============================
   CREATE QWERTY KEYBOARD
============================== */

function createKeyboard() {

    keyboard.innerHTML = "";

    const rows = [
        "QWERTYUIOP",
        "ASDFGHJKL",
        "ZXCVBNM"
    ];

    rows.forEach(rowLetters => {

        const row = document.createElement("div");
        row.className = "keyboard-row";

        for (const letter of rowLetters) {

            const button = document.createElement("button");

            button.type = "button";
            button.textContent = letter;
            button.className = "key";
            button.dataset.letter = letter.toLowerCase();

            button.setAttribute(
                "aria-label",
                "Guess letter " + letter
            );

            button.addEventListener("click", function () {
                guessLetter(letter.toLowerCase());
            });

            row.appendChild(button);
        }

        keyboard.appendChild(row);
    });
}


/* ==============================
   DISPLAY WORD
============================== */

function renderWord() {

    wordDisplay.innerHTML = "";

    for (const letter of secretWord) {

        const slot = document.createElement("span");

        slot.className = "letter-slot";

        slot.textContent = guessedLetters.has(letter)
            ? letter.toUpperCase()
            : "";

        wordDisplay.appendChild(slot);
    }

    const wordGuessed = [...secretWord].every(
        letter => guessedLetters.has(letter)
    );

    if (wordGuessed && !gameOver) {
        finishGame(true);
    }
}


/* ==============================
   GUESS LETTER
============================== */

function guessLetter(letter) {

    if (gameOver) {
        return;
    }

    if (!/^[a-z]$/.test(letter)) {
        return;
    }

    if (guessedLetters.has(letter)) {
        return;
    }

    guessedLetters.add(letter);

    const keyButton = keyboard.querySelector(
        `[data-letter="${letter}"]`
    );

    if (secretWord.includes(letter)) {

        if (keyButton) {
            keyButton.classList.add("correct");
            keyButton.disabled = true;
        }

        message.textContent = "Correct guess! Keep going.";
        message.style.color = "var(--success-color)";

    } else {

        incorrectGuesses++;

        if (keyButton) {
            keyButton.classList.add("wrong");
            keyButton.disabled = true;
        }

        revealHangmanPart();
        updateAttempts();

        message.textContent = "Incorrect guess! Try another letter.";
        message.style.color = "var(--danger-color)";
    }

    renderWord();

    if (!gameOver && incorrectGuesses >= maxAttempts) {
        finishGame(false);
    }
}


/* ==============================
   REVEAL HANGMAN PART
============================== */

function revealHangmanPart() {

    const part = document.querySelector(
        `.body-part[data-part="${incorrectGuesses}"]`
    );

    if (part) {
        part.style.opacity = "1";
    }
}


/* ==============================
   UPDATE ATTEMPTS
============================== */

function updateAttempts() {

    attemptsDisplay.textContent =
        `${incorrectGuesses} / ${maxAttempts}`;

    const percentage =
        (incorrectGuesses / maxAttempts) * 100;

    attemptBar.style.width = `${percentage}%`;

    if (incorrectGuesses >= 4) {

        attemptBar.style.background = "var(--danger-color)";

    } else if (incorrectGuesses >= 2) {

        attemptBar.style.background = "#f59e0b";

    } else {

        attemptBar.style.background = "var(--success-color)";
    }
}


/* ==============================
   SHOW HINT
============================== */

function showHint() {

    if (gameOver || hintUsed) {
        return;
    }

    hintUsed = true;

    hintDisplay.textContent =
        `Category: ${currentCategory} | Hint: ${currentHint}`;

    hintButton.disabled = true;
}


/* ==============================
   FINISH GAME
============================== */

function finishGame(won) {

    if (gameOver) {
        return;
    }

    gameOver = true;
    gamesPlayed++;

    const keys = keyboard.querySelectorAll(".key");

    keys.forEach(key => {
        key.disabled = true;
    });

    hintButton.disabled = true;

    if (won) {

        gamesWon++;

        const pointsEarned = Math.max(
            0,
            basePoints - incorrectGuesses * pointsLostPerWrongGuess
        );

        totalScore += pointsEarned;

        message.textContent =
            `🎉 Excellent! You won ${pointsEarned} points!`;

        message.style.color = "var(--success-color)";

    } else {

        message.textContent =
            `Game over! The word was "${secretWord.toUpperCase()}".`;

        message.style.color = "var(--danger-color)";

        revealWord();
    }

    updateScoreDisplay();
}


/* ==============================
   REVEAL WORD
============================== */

function revealWord() {

    const slots = wordDisplay.querySelectorAll(".letter-slot");

    slots.forEach((slot, index) => {
        slot.textContent = secretWord[index].toUpperCase();
    });
}


/* ==============================
   NEXT WORD / SKIP
============================== */

function skipToNextWord() {

    if (nextGameTimer !== null) {
        clearTimeout(nextGameTimer);
        nextGameTimer = null;
    }

    if (gameOver) {
        startGame();
        return;
    }

    gameOver = true;
    gamesPlayed++;

    const keys = keyboard.querySelectorAll(".key");

    keys.forEach(key => {
        key.disabled = true;
    });

    hintButton.disabled = true;
    nextWordButton.disabled = true;

    message.textContent =
        `Word skipped! The answer was "${secretWord.toUpperCase()}".`;

    message.style.color = "var(--muted-color)";

    revealWord();
    updateScoreDisplay();

    nextGameTimer = setTimeout(() => {
        nextGameTimer = null;
        startGame();
    }, 1000);
}


/* ==============================
   PHYSICAL KEYBOARD SUPPORT
============================== */

document.addEventListener("keydown", function (event) {

    if (
        event.ctrlKey ||
        event.altKey ||
        event.metaKey
    ) {
        return;
    }

    const target = event.target;

    if (
        target instanceof HTMLElement &&
        (
            target.isContentEditable ||
            ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
        )
    ) {
        return;
    }

    const letter = event.key.toLowerCase();

    if (/^[a-z]$/.test(letter)) {
        guessLetter(letter);
    }
});


/* ==============================
   EVENT LISTENERS
============================== */

hintButton.addEventListener("click", showHint);

nextWordButton.addEventListener("click", skipToNextWord);

restartButton.addEventListener("click", startGame);


/* ==============================
   INITIALIZE GAME
============================== */

updateScoreDisplay();
startGame();