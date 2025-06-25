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
  },
  {
    question: "Q5: Which of the following is not a programming language?",
    options: ["Python",
      "Java",
      "HTML",
      "C++"],
    correct: "HTML"
  },
  {
    question: "Q6: What does 'OOP' stand for in programming?",
    options: ["Object Oriented Programming",
      "Operational Object Program",
      "Optimal Output Processing",
      "Object Operation Processor"],
    correct: "Object Oriented Programming"
  },
  {
    question: "Q7: Which of the following is a dynamically typed language?",
    options: [" C++",
      "Java",
      "Python",
      "C"],
    correct: "Python"
  },
  {
    question: "Q8:  In Python, what is the output of print(2 ** 3)?",
    options: ["6","8","9","5"],
    correct: "8"
  },
{
  question:"Q9: What keyword is used to define a function in JavaScript?",
  options: ["function","dec","func","method"],
  correct: "function"
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



