    // variables
var header = document.querySelector(".header");
var viewScore = document.querySelector(".view-high-score")
var quizBox = document.querySelector("#quiz-box");
var answerList = document.querySelector(".answer-list");
var questionBox = document.querySelector(".question");
var scoreCard = document.querySelector(".score-card");
var gameOver = document.querySelector(".game-over")
var finalScore = document.getElementById("final-score");
var wrongAnswer = "Wrong Answer!"
var timeLeft = document.querySelector(".timer-count");
var start = document.getElementById("start");
var rules = "Click start game to begin. If the timer gets to zero before you finish then your score will be zero. Wrong answers take 15 seconds off the clock, your final score is the time left on the clock. Good luck"
var highScores = document.querySelector(".high-scores");
var opt1 = document.getElementById('ans1');
var opt2 = document.getElementById('ans2');
var opt3 = document.getElementById('ans3');
var opt4 = document.getElementById('ans4');
var answerStatus = document.querySelector(".answer-status");
var inputButton = document.querySelector(".input-initials");
var userInput = document.getElementById("user-input");
var scores = document.getElementById("scores");
var resetButton = document.querySelector("#reset-button");
var clearButton = document.querySelector("#clear-scores");
var userScoreList = [];

  //sets style for opening page with rules
quizBox.setAttribute("style", "max-width: 800px; margin: 100px auto; border: solid black;");
  // questions and answers object array, format credit to "Code Explained you tube channel"
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
    ques: "Which array method is used to replace existing elements with new elements in place?",
    opt1: 'slice',
    opt2: 'splice',
    opt3: 'unshift',
    opt4: 'pop',
    correct: 'B'
  }
];



var runningQuestionIndex;
var timer;
var timerCount;
var lastQuestionIndex = allQuestions.length - 1;

 
 
 

 //function for page load with startgame button event

function init() {
  questionBox.innerHTML = rules;
  
  timeLeft.textContent = 75;
  start.addEventListener("click", startGame);
  answerList.style.display = "none";
 // displayHighScores();
  
}

// displays scoreboard
function showScore() {
  header.style.visibility = "hidden";
  quizBox.style.display = "none";
  gameOver.style.display = "none";
  scoreCard.style.display = "block";
  displayHighScores();
  
}

// button and click events
viewScore.addEventListener("click", showScore);

resetButton.addEventListener("click", function() {
  window.location.reload();
});


// function to call the questions - Format credit to Code Eplained you tube channel
function renderQuestion() {
  if (runningQuestionIndex > lastQuestionIndex) {
    endGame();
    clearInterval(timer);
  } else {
    var q = allQuestions[runningQuestionIndex];
  questionBox.textContent = q.ques;
  opt1.textContent = q.opt1;
  opt2.textContent = q.opt2;
  opt3.textContent = q.opt3;
  opt4.textContent = q.opt4;
  }
  
}
// function to display score and a button to add score to scoreboard
function endGame() {
  header.style.visibility = "hidden";
  quizBox.style.display = "none";
  gameOver.style.display = "block";
  finalScore.textContent = timerCount;

  inputButton.addEventListener("click", function(event) {
    event.preventDefault();

    const existingScores = JSON.parse(localStorage.getItem('userScoreList')) || [] // credit to David Elutilo for helping me understand this!

    var userScore = {
      player: userInput.value,
      score: timerCount
    };
    existingScores.push(userScore);
    //stores and calls name and score for scoreboard
    localStorage.setItem("userScoreList", JSON.stringify(existingScores));

    
    showScore();
    
  });

} 



// displayes questions and starts timer

function startGame() {
  // quizBox.style.display = "block"
  answerList.style.display = "block";
  // scoreCard.style.display = "none";
  runningQuestionIndex = 0;
    timerCount = 75;
    
    startTimer();
    renderQuestion();
  }

// timer function with rules on time running out

function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timeLeft.textContent = timerCount;
   
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        endGame();
      }
    }, 1000);
  }

    // check if correct response was entered
  function checkAnswer(answer) {
    
     if (allQuestions[runningQuestionIndex].correct == answer) {
      answerStatus.textContent = "Correct";
      answerStatus.style.color = "white";
      answerStatus.style.backgroundColor = "green";
      runningQuestionIndex++
      renderQuestion();
    } else if (allQuestions[runningQuestionIndex].correct !== answer) {
      timerCount -= 15;
      answerStatus.textContent = "Wrong Answer";
      answerStatus.style.color = "white";
      answerStatus.style.backgroundColor = "red";
      runningQuestionIndex++;
      renderQuestion();
    } 
    
  }
    
  // function to display scoreboard

  function displayHighScores() {
    var userScoreList = JSON.parse(localStorage.getItem("userScoreList"));
   
    for (var i = 0; i < userScoreList.length; i++) {
      var high = userScoreList[i];

      var listItem = document.createElement("li");
      listItem.textContent = high.player + "  =     " + high.score;
      listItem.setAttribute("data-index", i);
      scores.appendChild(listItem);
    }
    clearButton.addEventListener("click", function(event) {
      event.preventDefault();

      scores.style.display = 'none';
      localStorage.clear();

      
    });
    
  }
    //  on page load
  init();




