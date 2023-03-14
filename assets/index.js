var quizBox = document.querySelector("#quiz-box");
var answerList = document.querySelector(".answer-list");
var questionBox = document.querySelector(".question");
var wrongAnswer = "Wrong Answer!"
var timeLeft = document.querySelector(".timer-count");
var startButton = document.querySelector(".startButton");
var highScores = document.querySelector(".high-scores");
var opt1 = document.getElementById('ans1');
var opt2 = document.getElementById('ans2');
var opt3 = document.getElementById('ans3');
var opt4 = document.getElementById('ans4');
var answerStatus = document.querySelector(".answer-status");
var question1 = "Which of the following is not a javascript data type?";
var ans1 = ['string', 'array', 'subject', 'number'] // = subject (2)
var question2 = "Which property in CSS would you use to underline a word?";
var ans2 =  ['text-decoration', 'font-style', 'font-decoration', 'text-emphasis'] // = text-decoration (0)
var question3 = 'The process of combining strings and/or variables together is called?';
// Joining, concatenation, Javascript, JSON = concatenation (1)
var question4 = "Which of the following describes a blueprint of a website's layout?";
// Div, Syntax, Container, Wireframe - Wireframe (3)
var question5 = "Which array method is used to replace existing elements with new elemts in place?";
// splice, slice, unshift, pop = splice (0)
var allQuestions = [
  {
    ques: 'Which of the following is not a javascript data type?',
    opt1: 'string',
    opt2: 'array',
    opt3: 'subject',
    opt4: 'number',
    correct: 'C'
  },
  {
    ques: 'Which property in CSS would you use to underline a word?',
    opt1: 'text-decoration',
    opt2: 'font-style',
    opt3: 'font-decoration',
    opt4: 'text-emphasis',
    correct: 'A'
  },
  {    
    ques: 'The process of combining strings and/or variables together is called?',
    opt1: 'joining',
    opt2: 'concatenation',
    opt3: 'javascript',
    opt4: 'JSON',
    correct: 'B'
  },
  {
    ques: "Which of the following describes a blueprint of a website's layout?",
    opt1: 'div',
    opt2: 'syntax',
    opt3: 'container',
    opt4: 'wireframe',
    correct: 'D'
  },
  {
    ques: "Which array method is used to replace existing elements with new elemts in place?",
    opt1: 'slice',
    opt2: 'splice',
    opt3: 'unshift',
    opt4: 'pop',
    correct: 'B'
  }
];



var runningQuestionIndex = 0;
var timer;
var timerCount;


function renderQuestion() {
  var q = allQuestions[runningQuestionIndex];
  questionBox.textContent = q.ques;
  opt1.textContent = q.opt1;
  opt2.textContent = q.opt2;
  opt3.textContent = q.opt3;
  opt4.textContent = q.opt4;
}



quizBox.setAttribute("style", "max-width: 600px; margin: 0 auto; border: solid black;");


  var lastQuestionIndex = allQuestions.length - 1;
    

    

var start = document.getElementById("start");
var rules = "Click start game to begin. If the timer gets to zero before you finish then your score will be zero. Wrong answers take 15 seconds off the clock, your final score is the time left on the clock. Good luck"
function init() {
    questionBox.innerHTML = rules;
    
    timeLeft.textContent = 75;
    start.addEventListener("click", startGame);
}

function startGame() {
    // isWin = false;
    timerCount = 75;
    // Prevents start button from being clicked when round is in progress
    // startButton.disabled = true;
    
    startTimer();
    playGame();
  }

function playGame() {
  renderQuestion();

}




function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timeLeft.textContent = timerCount;
    //   if (timerCount = 0) {
        // // Tests if win condition is met
        // if (isWin && timerCount > 0) {
        //   // Clears interval and stops timer
        //   clearInterval(timer);
        //   winGame();
        // }
    //   }
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        // loseGame();
      }
    }, 1000);
  }

  function checkAnswer(answer) {
    // check if correct response was entered
    if (allQuestions[runningQuestionIndex].correct == answer) {
      answerStatus.textContent = "Correct";
      runningQuestionIndex++
      renderQuestion();
    } else {
      timerCount -= 15;
      answerStatus.textContent = "Wrong Answer";
      runningQuestionIndex++;
      renderQuestion();
    }
    //if no timer -=15
    //if yes += 10 points
  }
  
  init();




