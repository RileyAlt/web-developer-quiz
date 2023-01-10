var startQuizButton = document.getElementById("start-quiz-button");
var enterNameScreen = document.getElementById("enter-name-screen");
var leaderboardScreen = document.getElementById("leaderboard-screen");
var enterNameSubmitButton = document.getElementById("enter-name-submit-button");
var timerText = document.getElementById("timer")
var counterInterval;
var answerText = document.getElementById("answer-text");
var viewHighscoresButton = document.getElementById("highscore-button");
var currentScore = 100; 

var currentQuestionIndex = 0;

// QUESTIONS is an ARRAY with elements of type OBJECT
const QUESTIONS = [
    {
        question: "Which of the following is the top most heading on the page?", 
        answers: ["h1", "h3", "h6", "h10"],
        correct: "h1"
    },
    {
        question: "What option is a CSS selector for ID?", 
        answers: ['start-quiz-button', '#start-quiz-button', "leaderboard-screen", "none of the above" ],
        correct: "'#start-quiz-button'"
    },
    {
        question: "Which of the following is used for styling?", 
        answers: ["Java", "HTML", "Java-Script", "CSS"],
        correct: "CSS"
    },
    {
        question: "WWhich of the following would you use for an ordered List", 
        answers: ["ol", "il", "ul", "dl" ],
        correct: "ol"
    },
    {
        question: "Which of the following is a valid CSS unit?", 
        answers: ["mx", "bi", "fx", "px"],
        correct: "px"
    },
    {
        question: "Which of the following elements brings you to a new page?", 
        answers: ["p", "br", "link", "a"],
        correct: "a"
    },
    {
        question: "Which of the following is not a number?", 
        answers: ["4", "3.17", "'pi'", "3.14" ],
        correct: "'pi'"
    },
    {
        question: "What is `z-index` refer to?", 
        answers: ["Order of size", "Order of overlapping", "Neither", "All of the above"],
        correct: "Order of overlapping"
    },
    {
        question: "When a developer leaves notes in their code, this is called what??", 
        answers: ["Replies", "Comments", "Likes", "Subscribe"],
        correct: "Comments"
    },
    {
        question: "Which tool allows you to easily colloborate on code?", 
        answers: ["get", "git", "mit", "bit"],
        correct: "git"
    }
];

//starting the quiz 
startQuizButton.addEventListener('click',  function (event) {
    document.getElementById('landing-screen').style.display = 'none';
    showCurrentQuestion();
    counterInterval = setInterval(decromentScoreByOne, 1000)
});

//View Highscores
viewHighscoresButton.addEventListener('click', function(event) {
    const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    leaderboardScreen.style.display = 'block';

    var scoreList = document.getElementById("score-list");

    for (const scoreRecord of highScores) {
        var li = document.createElement('li');
        li.textContent = `${scoreRecord.name} ... ${scoreRecord.score}`;
        scoreList.appendChild(li);
    }
});

// When they hit enter on the "Enter Name" screen
enterNameSubmitButton.addEventListener('click',  function (event) {
    const name = document.getElementById("enter-name-textfield").value;
    
    // Save the leaderboard into local storage
    const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");


    highScores.push({ name: name, score: currentScore });
    //sort highscores
    function compareHighScoreRecords( a, b ) {
        if ( a.score > b.score ){
          return -1;
        }
        if ( a.score < b.score ){
          return 1;
        }
        return 0;
    }

    highScores.sort( compareHighScoreRecords );

    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Start by hiding the enter name screen
    enterNameScreen.style.display = 'none';

    // Now show the leaderboard screen
    leaderboardScreen.style.display = 'block';

    var scoreList = document.getElementById("score-list");

    for (const scoreRecord of highScores) {
        var li = document.createElement('li');
        li.textContent = `${scoreRecord.name} ... ${scoreRecord.score}`;
        scoreList.appendChild(li);
    }
});

var answerTextClearTimeout; 
// When they click an answer
function answerGuessed(userGuess) {
    var correctAnswer = QUESTIONS[currentQuestionIndex].correct;
    //Prevents clearing out the right or wrong answer before we are ready
    if (answerTextClearTimeout){
        clearTimeout(answerTextClearTimeout);
    }
    if (userGuess == correctAnswer) {
        answerText.textContent = "Correct!!!";
    } else {
        currentScore -= 10;
        timerText.textContent=`Current Score: ${currentScore}`;
        answerText.textContent = "Wrong!!!";
    }

    answerTextClearTimeout = setTimeout(function () {
        answerText.textContent = "";
    },2000);

    // Finally, go to the next question unless we are at the last question
    var numberOfTotalQuestions = QUESTIONS.length; 
    var currentQuestionNumber = currentQuestionIndex + 1; // The +1 is because the index starts at 0, so if we are on question 2 of 2, currentQuestionIndex is 1.

    if (currentQuestionNumber == numberOfTotalQuestions) {
        endQuiz();
        
    } else {
        // GO TO NEXT QUESTION
        currentQuestionIndex++;
        showCurrentQuestion();
    }
}

// Removes last questions answers
function removeCurrentButtons() {
    var currentButtons = document.getElementsByClassName("question-answer-button");
    for (var i = currentButtons.length - 1; i >= 0; i--) {
        currentButtons[i].remove();
    }
}

// Displays current question
function showCurrentQuestion() {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    document.getElementById('question-text').textContent = currentQuestion.question;
    var butonContainer = document.getElementById('question-buttons');

    removeCurrentButtons()

    for (const possibleAnswer of currentQuestion.answers) {
        var btn = document.createElement('button'); // <btn></btn>
        btn.className = "question-answer-button" // <btn class="question-answer-button"></btn>
        btn.textContent = possibleAnswer; // <btn class="question-answer-button"> Possible Answer 1 </btn>
        btn.addEventListener('click', function() { answerGuessed(possibleAnswer) });
        butonContainer.appendChild(btn);
    } 
}

// Ends quiz
function endQuiz() {
    // Hides the question section
    removeCurrentButtons();
    document.getElementById('question-section').style.display = 'none';

    // Show the enter name screen
    enterNameScreen.style.display = 'block';
    document.getElementById('enter-name-score-summary').textContent = `Your Test is complete. You scored ${currentScore}`;
    clearInterval(counterInterval);
}


function decromentScoreByOne(){
    currentScore--;
    timerText.textContent=`Current Score: ${currentScore}`;
    if(currentScore === 0){
        endQuiz();
    }
};