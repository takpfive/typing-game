const wordElement = document.getElementById('word');
const userInput = document.getElementById('user-input');
const timerElement = document.getElementById('timer');
const charactersElement = document.getElementById('characters');
const wordsElement = document.getElementById('words');
const finishMessage = document.getElementById('finish-message');
const startGameButton = document.getElementById('start-game');
const playAgainButton = document.getElementById('play-again');

const words = [
    'quick', 'brown', 'fox', 'jumps', 'lazy', 'dog',
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'hello', 'world'
];

let timeLeft = 60;
let timerInterval;
let currentWord;
let charCount = 0;
let wordCount = 0;

function startGame() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    finishMessage.classList.add('hidden');
    playAgainButton.classList.add('hidden');
    startGameButton.classList.add('hidden');
    nextWord();
    userInput.disabled = false;
    userInput.value = '';
    userInput.focus();
    charCount = 0;
    wordCount = 0;
    charactersElement.textContent = charCount;
    wordsElement.textContent = wordCount;
    timeLeft = 60;
    timerElement.textContent = timeLeft;
    timerInterval = setInterval(countdown, 1000);
}

function nextWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    wordElement.textContent = currentWord;
}

function countdown() {
    timeLeft -= 1;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endGame();
    }
}

function endGame() {
    userInput.disabled = true;
    finishMessage.classList.remove('hidden');
    playAgainButton.classList.remove('hidden');
}

function playAgain() {
    startGame();
}

userInput.addEventListener('input', () => {
    const inputValue = userInput.value.trim();
    if (inputValue === currentWord) {
        charCount += inputValue.length;
        wordCount += 1;
        charactersElement.textContent = charCount;
        wordsElement.textContent = wordCount;
        userInput.value = '';
        nextWord();
    }
});

startGameButton.addEventListener('click', startGame);
playAgainButton.addEventListener('click', playAgain);
