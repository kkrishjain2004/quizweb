// ============================
// Quiz Data
// ============================
const quizData = [
  {
    question: "Q1: What backend language is used in MERN?",
    options: ["Node.js", "Java", "JavaScript", "Python"],
    correct: "Node.js"
  },
  {
    question: "Q2: Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correct: "JavaScript"
  },
  {
    question: "Q3: What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "HyperText Markup Language",
      "HyperText Markdown Language",
      "None of the above"
    ],
    correct: "HyperText Markup Language"
  },
  {
    question: "Q4: What type of language is React.js?",
    options: ["Database", "Backend", "Frontend"],
    correct: "Frontend"
  }
];

// ============================
// DOM Elements
// ============================
const questionEl = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer");
const nextBtn = document.getElementById("next");
const resetBtn = document.getElementById("reset");
const scoreDisplay = document.getElementById("scoreDisplay");
const timerDisplay = document.getElementById("timer");

// ============================
// Quiz State
// ============================
let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timerInterval = null;

// ============================
// Load Current Question
// ============================
function loadQuiz() {
  clearStatus();

  const current = quizData[currentQuestion];
  questionEl.textContent = current.question;

  answerButtons.forEach((btn, index) => {
    btn.textContent = current.options[index];
    btn.disabled = false;
    btn.className = "answer";
    btn.onclick = () => handleAnswer(btn, current.correct);
  });

  updateScore();
}

// ============================
// Handle Answer Selection
// ============================
function handleAnswer(button, correctAnswer) {
  const isCorrect = button.textContent === correctAnswer;

  if (isCorrect) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    answerButtons.forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }

  answerButtons.forEach(btn => btn.disabled = true);
  updateScore();
}

// ============================
// Clear Button States
// ============================
function clearStatus() {
  answerButtons.forEach(btn => {
    btn.classList.remove("correct", "wrong");
  });
}

// ============================
// Next Question
// ============================
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuiz();
  } else {
    finishQuiz();
  }
});

// ============================
// Finish Quiz
// ============================
function finishQuiz() {
  clearInterval(timerInterval);
  questionEl.textContent = "Quiz Completed!";
  document.querySelector("ul").style.display = "none";
  nextBtn.style.display = "none";
  resetBtn.style.display = "inline-block";
  scoreDisplay.textContent = `Final Score: ${score} / ${quizData.length}`;
  alert("Your score has been submitted. Thank you!");
}

// ============================
// Reset Quiz
// ============================
resetBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  timeLeft = 60;

  document.querySelector("ul").style.display = "block";
  nextBtn.style.display = "inline-block";
  resetBtn.style.display = "none";

  loadQuiz();
  startTimer();
});

// ============================
// Timer
// ============================
function startTimer() {
  clearInterval(timerInterval); // Ensure no overlap

  timerDisplay.textContent = `Time Left: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      finishQuiz();
    }
  }, 1000);
}

// ============================
// Update Score Display
// ============================
function updateScore() {
  scoreDisplay.textContent = `Score: ${score} / ${quizData.length}`;
}

// ============================
// Initialize Quiz
// ============================
loadQuiz();
startTimer();



