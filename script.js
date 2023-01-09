var startQuizButton = document.querySelector('#start-quiz-button');
var nextQuestionButton = document.querySelector('#next-question-button');
var currentScore = 0; 

var currentQuestionIndex = 0;


// QUESTIONS is an ARRAY with elements of type OBJECT
const QUESTIONS = [
    {
        question: "Which of the following is the top most heading on the page?", 
        answers: ["h1", "h2", "h3", "h4", "h5", "h6"],
        correct: "h1"
    },
    {
        question: "Who is the flyest friend", 
        answers: ["T-rev", "Moos"],
        correct: "T-rev"
    }
];

//starting the quiz 
startQuizButton.addEventListener('click',  function (event) {
    document.getElementById('landing-screen').style.display = 'none';
    showCurrentQuestion();
});

//starts the next question
nextQuestionButton.addEventListener('click',  function (event) {
    questionNumber++;
    showCurrentQuestion();
});

function answerGuessed(userGuess) {
    var correctAnswer = QUESTIONS[currentQuestionIndex].correct;

    // TODO: FILL THIS OUT
    if (userGuess == correctAnswer) {
        // Add 1 to the user score
        currentScore++;
    } else {

    }

    // Finally, go to the next question
    // TODO: NEED TO HANDLE WHEN AT LAST QUESTION
    var numberOfTotalQuestions = QUESTIONS.length; // TODO;
    var currentQuestionNumber = currentQuestionIndex + 1; // The +1 is because the index starts at 0, so if we are on question 2 of 2, currentQuestionIndex is 1.

    if (currentQuestionNumber == numberOfTotalQuestions) {
        // At this point, we have just answered the last question, so do the following:
      
        // 1Hides the last question
        document.getElementById('question-text').textContent = `Your Test is complete. You scored ${currentScore} out of ${numberOfTotalQuestions}`;
      
        removeCurrentButtons();

        // 3. Show the leaderboard screen

    } else {
        // GO TO NEXT QUESTION
        currentQuestionIndex++;
        showCurrentQuestion();
    }
}

// Removes last questions answers
function removeCurrentButtons() {
    var currentButtons = document.getElementsByClassName("question-answer-button");
    for (var i = 0; i < currentButtons.length; i++) {
        currentButtons[i].style.display = 'none';
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


 // var myAge = 21; NUMBER
    // var myName = 'Riley'; STRING (text)
    // var myFavNUmbers = [1, 5, 9, 11, 15]; ARRAY of numbers
    // var myFavPeople = ["Trev", "Moilly"]; ARRAY of strings
    // myFavNumbers.length => 5
    // myFavPeople.length => 2
    // var aboutMe = {
    //     favoriteSport: "Wrestling",
    //     favoriteMovie: "Hangover"
    // }; OBJECT (arbitrary shape)
