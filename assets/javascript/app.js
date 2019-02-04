var page = $("#question-area");

var questions = [{
    question: "how often should you change your oil?",
    answers: ["Every 1000 miles", "Every 3000 miles", "when manufacturer recomends"],
    correctAnswer: "when manufacturer recomends"
}, {
    question: "_______ made the DIT power stroke engine up until ________",
    answers: ["Chevy, 1995", "Ford, 2003", "Fiat, 2018"],
    correctAnswer: "Ford, 2003"
}, {
    question: "Chevy partenered with _______ to build the first _________ engine, that was launched to the market in _______",
    answers: ["duracel, electric engine, 2015", "Izusu, Duramax, 2001", "dunald duck, duckfriendly, 2004"],
    correctAnswer: "Izusu, Duramax, 2001"
}, {
    question: "what is the most famous Diesel engine?",
    answers: ["The 6.0+L Power stroke engines", "Duramax LB7", "Cummings"],
    correctAnswer: "Cummings"
}];

// setting a variable globaly allows for it to be called at any time  

var timer;

// this variable holds the game/ 

var game = {

    correct: 0,
    incorrect: 0,
    counter: 120,

    // creates a span on the html page with an id that holds the timer but also executes the done function if time 
    // is out

    countdown: function () {
        game.counter--;
        $("#counter-number").html(game.counter);
        if (game.counter === 0) {
            console.log("Oh Oh Seems like you are out of time");
            game.done();
        }
    },

    // Start function allows us to start our timer when the button is clicked instead of when the page is loaded 

    start: function () {
        timer = setInterval(game.countdown, 1000);

        // it also adds the remainding html text to the timer

        $("#timer-area").prepend("<h2>Time remaining: <span id='counter-number'>120</span> Seconds</h2>");

        $("#start").remove();

        for (var i = 0; i < questions.length; i++) {
            page.append("<h2>" + questions[i].question + "</h2>");
            for (var j = 0; j < questions[i].answers.length; j++) {
                page.append("<input type='radio' name='question-" + i +
                    "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
            }
        }
        // it creates the done button
        page.append("<button id='done'>Done</button>");
    },

    // this will take in the input for the answeres provided and will check them against the key 
    // to determine if they are correct, incorrect, or unaswered

    done: function () {

        $.each($("input[name='question-0']:checked"), function () {
            if ($(this).val() === questions[0].correctAnswer) {
                game.correct++;
            }
            else {
                game.incorrect++;
            }
        });

        $.each($("input[name='question-1']:checked"), function () {
            if ($(this).val() === questions[1].correctAnswer) {
                game.correct++;
            }
            else {
                game.incorrect++;
            }
        });

        $.each($("input[name='question-2']:checked"), function () {
            if ($(this).val() === questions[2].correctAnswer) {
                game.correct++;
            }
            else {
                game.incorrect++;
            }
        });

        $.each($("input[name='question-3']:checked"), function () {
            if ($(this).val() === questions[3].correctAnswer) {
                game.correct++;
            }
            else {
                game.incorrect++;
            }
        });

        this.result();
    },

    // this function will add to the original variable the results of the executed functions for the quiz

    result: function () {
        clearInterval(timer);

        $("timer-area h2").remove();

        page.html("<h2>Congratulations you are done!!</h2>");
        page.append("<h3>Correct Answers: " + this.correct + "</h3>");
        page.append("<h3> Incorrect Answers: " + this.incorrect + "</h3>");
        page.append("<h3>Unaswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");

    }
};

// the functions below are the ones in charged of runing the functions when the buttons are clicked 

$(document).on("click", "#start", function () {
    game.start();

});

$(document).on("click", "#done", function () {
    game.done();
});