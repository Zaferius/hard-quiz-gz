// Game data with the exact questions provided
const questions = [
  {
    number: "?",
    question: "Türkiye'nin en düz ili hangisidir?",
    options: ["Düzce", "Yukarıgökdere", "Asagigökdere", "Kayısdagi"],
    correct: "Düzce"
  },
  {
    number: "?",
    question: "Neden \"çay\" içilir?",
    options: ["Çünkü kasıklanmaz", "Çünkü sıcak", "Çünkü Türküz", "Çünkü bardakta"],
    correct: "Çünkü kasıklanmaz"
  },
  {
    number: "?",
    question: "1 limon + 1 limon + 0/5 limon = ?",
    options: ["2 limon", "Limonata", "Limonlimonlim", "Fanta"],
    correct: "Limonlimonlim"
  },
  {
    number: "?",
    question: "\"Çok da sey yapmamak lazım\" cümlesi, tam olarak neyi çok daha sey yapmamak anlamına gelir?",
    options: ["Her seyi", "Hiçbir seyi", "Sey'i", "Duruma göre degisir"],
    correct: "Duruma göre degisir"
  },
  {
    number: "?",
    question: "\"Counter Strike oyunundaki ikonik beyaz \"el topu\" lakaplı tabancanın adı nedir?",
    options: ["Glock 17", "Desert Eagle", "Bargello", "Revani 1911"],
    correct: "Desert Eagle"
  },
  {
    number: "?",
    question: "\"Asagıdaki yiyeceklerin hangisinin adı Zafer dilinde çörektir?\"",
    options: ["Nescafe Xpress Original", "Pisi", "File market berliner", "Vantilatör pervanesi"],
    correct: "Pisi"
  },
  {
    number: "?",
    question: "\"Gonca'nın begendigi bir tatlıya karsı sarfettigi ilk cümle?\"",
    options: ["Çok iyi mk", "Çok lezzetli bir tatlı!", "Bunnnuu seevvdikkkk", "Kısır da b*k gibiymiş"],
    correct: "Bunnnuu seevvdikkkk"
  }
];

// Game state
let currentQuestionIndex = 0;
let lives = 2;
let gameStarted = false;

// DOM elements
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const victoryScreen = document.getElementById('victoryScreen');

const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const playAgainButton = document.getElementById('playAgainButton');

const questionText = document.getElementById('questionText');
const questionNumber = document.getElementById('questionNumber');
const optionsContainer = document.getElementById('optionsContainer');

// Heart elements
const gameHeart1 = document.getElementById('gameHeart1');
const gameHeart2 = document.getElementById('gameHeart2');

// Event listeners
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
playAgainButton.addEventListener('click', restartGame);

// Initialize the game
function init() {
    showScreen(startScreen);
    updateLives();
}

// Show specific screen
function showScreen(screen) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    // Show target screen
    screen.classList.add('active');
}

// Start the game
function startGame() {
    gameStarted = true;
    currentQuestionIndex = 0;
    lives = 2;
    updateLives();
    showScreen(gameScreen);
    displayQuestion();
}

// Display current question
function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showVictory();
        return;
    }

    const question = questions[currentQuestionIndex];
    questionText.innerHTML = question.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create option buttons
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'btn btn-option';
        button.textContent = option;
        
        // Apply special styling if specified
        if (question.specialStyling && question.specialStyling.answerButtonSize === "extra-large" && option === "CEVAP") {
            button.classList.add('extra-large');
        }
        
        button.addEventListener('click', () => handleAnswer(option));
        optionsContainer.appendChild(button);
    });
}

// Handle answer selection
function handleAnswer(selectedAnswer) {
    const question = questions[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll('.btn-option');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedAnswer === question.correct) {
        // Correct answer
        const correctButton = Array.from(buttons).find(btn => btn.textContent === selectedAnswer);
        correctButton.classList.add('correct');
        
        // Play correct sound effect
        playSound('correct');
        
        // Move to next question immediately (ŞAK!)
        currentQuestionIndex++;
        displayQuestion();
    } else {
        // Wrong answer
        const wrongButton = Array.from(buttons).find(btn => btn.textContent === selectedAnswer);
        wrongButton.classList.add('wrong');
        
        // Lose a life
        loseLife();
        
        // Play wrong sound effect (optional)
        playSound('wrong');
        
        // Check if game over
        if (lives <= 0) {
            setTimeout(() => {
                showGameOver();
            }, 800);
        } else {
            // Reset buttons and let player try again on the same question
            setTimeout(() => {
                // Clear wrong/correct classes
                buttons.forEach(btn => {
                    btn.classList.remove('wrong', 'correct');
                    btn.disabled = false;
                });
            }, 800);
        }
    }
}

// Lose a life
function loseLife() {
    lives--;
    updateLives();
}

// Update lives display
function updateLives() {
    const hearts = [gameHeart1, gameHeart2];
    
    hearts.forEach((heart, index) => {
        if (heart) { // Check if heart element exists
            if (index < lives) {
                heart.classList.remove('lost');
            } else {
                heart.classList.add('lost');
            }
        }
    });
}

// Show game over screen
function showGameOver() {
    showScreen(gameOverScreen);
    playSound('loser');
}

// Show victory screen
function showVictory() {
    showScreen(victoryScreen);
    playSound('winner');
}

// Restart game
function restartGame() {
    currentQuestionIndex = 0;
    lives = 2;
    gameStarted = false;
    updateLives();
    showScreen(startScreen);
}

// Sound effects
function playSound(type) {
    if (type === 'correct') {
        // Play correct.mp3 sound
        try {
            const audio = new Audio('sfx/correct.mp3');
            audio.volume = 0.5;
            audio.play();
        } catch (e) {
            console.log('Audio file not found or not supported');
        }
    } else if (type === 'wrong') {
        // Play wrong.mp3 sound
        try {
            const audio = new Audio('sfx/wrong.mp3');
            audio.volume = 0.5;
            audio.play();
        } catch (e) {
            console.log('Audio file not found or not supported');
        }
    } else if (type === 'winner') {
        // Play winner.mp3 sound
        try {
            const audio = new Audio('sfx/winner.mp3');
            audio.volume = 0.5;
            audio.play();
        } catch (e) {
            console.log('Audio file not found or not supported');
        }
    } else if (type === 'loser') {
        // Play loser.mp3 sound
        try {
            const audio = new Audio('sfx/loser.mp3');
            audio.volume = 0.5;
            audio.play();
        } catch (e) {
            console.log('Audio file not found or not supported');
        }
    }
}

// Add some fun animations on page load
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    // Add some random floating animations to make it more playful
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        heart.style.animationDelay = `${index * 0.2}s`;
    });
});

// Add keyboard support for accessibility
document.addEventListener('keydown', (e) => {
    if (!gameStarted) return;
    
    const buttons = optionsContainer.querySelectorAll('.btn-option');
    if (buttons.length === 0) return;
    
    switch(e.key) {
        case '1':
        case '2':
        case '3':
        case '4':
            const index = parseInt(e.key) - 1;
            if (buttons[index]) {
                buttons[index].click();
            }
            break;
        case 'Enter':
            if (startScreen.classList.contains('active')) {
                startButton.click();
            } else if (gameOverScreen.classList.contains('active')) {
                restartButton.click();
            } else if (victoryScreen.classList.contains('active')) {
                playAgainButton.click();
            }
            break;
    }
}); 