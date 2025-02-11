const questions = [
  {
    question: "Какой город является столицей Франции?",
    answers: [
      {
        text: "Токио", correct: false
      },
      {
        text: "Лондон", correct: false
      },
      {
        text: "Пекин", correct: false
      },
      {
        text: "Париж", correct: true
      },
    ]
  }, 
  {
    question: "Что является трапезой на природе?",
    answers: [
      {
        text: "Раут", correct: false
      },
      {
        text: "Братчина", correct: false
      },
      {
        text: "Пикник", correct: true
      },
      {
        text: "Банкет", correct: false
      },
    ]
  }, 
  {
    question: "Что делает собака на охоте?",
    answers: [
      {
        text: "Стенку", correct: false
      },
      {
        text: "Перекладину", correct: false
      },
      {
        text: "Планку", correct: false
      },
      {
        text: "Стойку", correct: true
      },
    ]
  }, 
  {
    question: "Что изучает уфология?",
    answers: [
      {
        text: "НЛО", correct: true
      },
      {
        text: "прогнозы на будущее", correct: false
      },
      {
        text: "Историю", correct: false
      },
      {
        text: "Мифологию", correct: false
      },
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerButtons");
const nextButton = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuizz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Следующий вопрос";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer)
  });
}

function resetState() {
  nextButton.style.display = "none";
  while(answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  })
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Ваш счет ${score} из ${questions.length}!`;
  nextButton.innerHTML = "Играть снова";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if(currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuizz();
  }
});

startQuizz();