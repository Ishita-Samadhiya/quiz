const questions = [
    {
      q: "When was \"The Outsiders\" released?",
      answers: [
        { ans: "1983", corr: true },
        { ans: "2023", corr: false },
        { ans: "1503", corr: false },
        { ans: "1985", corr: false }
      ]
    },
    {
      q: "When was \"Excalibur\" released?",
      answers: [
        { ans: "1983", corr: false },
        { ans: "2023", corr: false },
        { ans: "1981", corr: true },
        { ans: "1985", corr: false }
      ]
    },
    {
      q: "When was \"The Hunger Games: The Ballad of Songbirds & Snakes\" released?",
      answers: [
        { ans: "1983", corr: false },
        { ans: "2023", corr: true },
        { ans: "1981", corr: false },
        { ans: "1985", corr: false }
      ]
    },
    {
        q: "When was \"Legally Blonde\" released?",
        answers: [
          { ans: "2001", corr: true },
          { ans: "2002", corr: false },
          { ans: "2003", corr: false },
          { ans: "2004", corr: false }
        ]
    },
    {
        q: "When was \"13 Going On 30\" released?",
        answers: [
          { ans: "2001", corr: false },
          { ans: "2002", corr: false },
          { ans: "2003", corr: false },
          { ans: "2004", corr: true }
        ]
    },
    {
        q: "When was \"Spirit\" released?",
        answers: [
          { ans: "2001", corr: false },
          { ans: "2002", corr: true },
          { ans: "2003", corr: false },
          { ans: "2004", corr: false }
        ]
    },
    {
        q: "When was \"Freaky Friday\" released?",
        answers: [
          { ans: "2001", corr: false },
          { ans: "2002", corr: false },
          { ans: "2003", corr: true },
          { ans: "2004", corr: false }
        ]
    },
    {
        q: "When was \"Allegiant\" released?",
        answers: [
          { ans: "2010", corr: false },
          { ans: "2022", corr: false },
          { ans: "2003", corr: false },
          { ans: "2016", corr: true }
        ]
    },
    {
        q: "When was \"Shutter Island\" released?",
        answers: [
          { ans: "2010", corr: true },
          { ans: "2022", corr: false },
          { ans: "2003", corr: false },
          { ans: "2016", corr: false }
        ]
    },
    {
      q: "When was \"Clue\" released?",
      answers: [
        { ans: "1983", corr: false },
        { ans: "2023", corr: false },
        { ans: "1981", corr: false },
        { ans: "1985", corr: true }
      ]
    }
  ];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    console.log("loadQuestion executed");
    document.getElementById("q").textContent = currentQuestion.q;
    document.getElementById("opt1").textContent = currentQuestion.answers[0].ans;
    document.getElementById("opt2").textContent = currentQuestion.answers[1].ans;
    document.getElementById("opt3").textContent = currentQuestion.answers[2].ans;
    document.getElementById("opt4").textContent = currentQuestion.answers[3].ans;

    enableOptions(); // Move this line to set up event listeners after updating content
}


function checkAnswer(questionIndex, selectedOptionIndex) {
    console.log("checkAnswer executed");
    const selectedAnswer = questions[questionIndex].answers[selectedOptionIndex];
    if (selectedAnswer.corr) {
        correctAnswers++;
    } else {
        wrongAnswers++;
        document.getElementById("try-again").style.display = "block";
    }
    
    document.getElementById("next-btn").style.display = "block";

    disableOptions();
}

function disableOptions() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.onclick = null; // Disable click event on options after an answer is selected
    });
}

function nextQuestion() {
    console.log("nextQuestion executed");
    document.getElementById("try-again").style.display = "none";
    document.getElementById("next-btn").style.display = "none";

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        enableOptions();
    } else {
        showScore();
    }
}

function enableOptions() {
    console.log("enable executed");
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.onclick = function () {
            checkAnswer(currentQuestionIndex, Array.from(options).indexOf(option));
        }
    });
}

function showScore() {
    document.getElementById("score").textContent = `You got ${correctAnswers} correct and ${wrongAnswers} wrong out of ${correctAnswers+wrongAnswers}.`;
    document.getElementById("score").style.display = "block";
}
// Load the first question when the page loads
console.log("hi")
loadQuestion();