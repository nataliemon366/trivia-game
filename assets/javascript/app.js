// initial values
let counter = 10;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;
//if timer is over go 2 next question

function nextQuestion() {
    const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {
        console.log('Game is Over!')
        displayResult();
    } else {
        currentQuestion++;
        loadQuestion();
    }
}

//start a timer of 10 secs to respond to answer chosen
function timeUp() {
    clearInterval(timer);

    lost++;
    preloadImage('lost');
    setTimeout(nextQuestion, 3 * 1000)

}
function countDown() {
    counter--;

    $('#time').html('Timer: ' + counter);

    if (counter === 0) {
        timeUp();
    }
}

/// display ?'s and choices in browswer
function loadQuestion() {
    counter = 10;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question;
    const choices = quizQuestions[currentQuestion].choices;

    $('#timer').html('Timer: ' + counter);
    $('#game').html(`
        <h4>${question}</h4>
        ${loadChoices(choices)}
        ${loadRemainingQuestion()}
   `);
}

function loadChoices(choices) {
    let result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }

    return result;

}
//correct wrong choice selection
//event delegation
$(document).on('click', '.choice', function () {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        console.log(`winssss`);
        preloadImage('win');
        setTimeout(nextQuestion, 3 * 1000);
    } else {
        lost++;
        console.log(`lost`);
        preloadImage('lost');
        setTimeout(nextQuestion, 3 * 1000);
    }
});;
function displayResult() {
    const result = `
        <p>You Got ${score} questions(s) right</p>
        <p>You Missed ${lost} questions(s)</p>
        <p>Total Questions ${quizQuestions.length} questions(s) right</p>
        <button class= "btn btn-primary" id="reset">Reset Game </button>
    `;
    $('#game').html(result);
}

$(document).on('click', '#reset', function () {
    counter = 10;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;

    loadQuestion();
});
function loadRemainingQuestion() {
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    const totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
}
function randomImage(images) {
    const random = Math.floor(Math.floor() * images.length);
    const randomImage = images[random];
    return randomImage;
}


//display giphy
function preloadImage(status) {
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (status === 'win') {
        $('#game').html(`
            <p class="preload-image"></p>Congratulations,you picked the correct answer!</p>
            <p class="preload-image"></p>The correct answer is <b>${correctAnswer}</b></p>
            <img src="${randomImage(funImages)}"/>
        `);
    } else {
        $('#game').html(`
        <p class="preload-image"></p>The correct answer was <b>${correctAnswer}</b></p >
        <p class="preload-image"></p>You lost pretty Bad !!</p >
        <img src="${randomImage(sadImages)}"/>
        `);

    }
}

//preloadImage('win');
loadQuestion();
//couldn't get my gifs to load properly


