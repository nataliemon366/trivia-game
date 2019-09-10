$('#start').on('click', function () {
    $('#start').remove();
    game.loadQuestion();
})
$(document).on('click', '.answer-button', function (e) {
    game.clicked(e);
})

var questions = [{
    question: "1. What dates does the purge fall on in 'The Purge'?",
    answer: ["December 25- December 26", "Dec. 31st- Jan 1", "March 21 - March 22", "May 13 - May 14"],
    correctAnswer: "March 21 - March 22",
    image: "assets/images/"
}, {
    question: "2. What is the name of the Villain in 'The Ring'?",
    answer: ["camille", "Samara", "Audrey", "Naomi "],
    correctAnswer: "Samara",
    image: "assets/images/"
}, {
    question: "3. Which movie was based on a video game?",
    answer: ["Texas Chainsaw Massacre", "Silent Hill", "Child's Play", "Halloween "],
    correctAnswer: "Silent Hill",
    image: "assets/images/"

}, {
    question: "4. In 'Saw', where was Amanda's key hidden?",
    answer: ["In the intestines of the guy next to her", "In a scorching hot oven", "Behind her eye", "In a safe covered in spikes"],
    correctAnswer: "5. In the intestines of the guy next to her",
    image: "assets/images/"

}, {
    question: "6. Which horror movie came out in 1979?",
    answer: ["Alien", "Black Christmas", "A Nightmare on Elm Street", "Poltergeist"],
    correctAnswer: "Alien",
    image: "assets/images/"

}, {
    question: "7. Which horror film does the quote 'The Power of Christ compels you!' come from?",
    answer: ["An American Haunting", "Halloween", "A Nightmare on Elm Street", "The Exorcist"],
    correctAnswer: "The Exorcist",
    image: "assets/images/"
}, {
    question: "8. What is not one of the rules for taking care of a Mogwai in 'Gremlins'?",
    answer: ["Cannot Feed Them Wheat", "No Bright Light", "Never Get Them Wet", "Do Not Feed After Midnight"],
    correctAnswer: "Cannot Feed Them Wheat",
    image: "assets/images/"
}, {
    question: "9. Which Horror film among these is based on a true story?",
    answer: ["Get Out", "The Conjuring", "Halloween", "Jeepers Kreepers"],
    correctAnswer: "Get Out",
    image: "assets/images/"
}, {
    question: "10. True or False: Michael Meyers escaped from a federal penitentiary.",
    answer: ["True", "False"],
    correctAnswer: "False. (He escaped from a state hospital.)",
    image: "assets/images/"
}];

var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    countdown: function () {
        game.counter--;
        $('#counter'.html(game.counter));
        if (game.counter <= 0) {
            console.log("Time's up!");
            game.timeUp();
        }
    },
    loadQuestion: function () {
        timer = setInterval(game.countdown, 1000);
        $('subwrapper').html('<h2>' + question[game.currentQuestion].question + '</h2>');
        for (var i = 0; i < questions[game.currentQuestion].answer.length; i++) {
            $('#subwrapper').append('<button class = "answer-button"id= "button-' + i + '"data-name"' + questions[game.currentQuestion.answers[i] + '">' + questions[game.currentQuestion].answers[i] + '</button>']);
        }

    },
    nextQuestion: function () {
        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function () {
        clearInterval(timer);
        $('#subwrapper').html('<h2>OUT OF TIME!</h2>');
        $('#subwrapper').append('<h3>Correct answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game, results, 3 * 1000)
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    results: function () {

    },
    clicked: function (e) {
        clearInterval(timer);
        if ($(e.target).data("name") == question[game.currentQuestion].correctAnswer) {
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }
    },
    answeredCorrectly: function () {
        console.log("YOU GOT IT!");
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2>YOU GOT IT RIGHT!</h2>');
        $('#subwrapper').append('<h3>Correct answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game, results, 3 * 1000)
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    answeredIncorrectly: function () {
        console.log("WRONG!");
    },
    reset: function () {

    },
}