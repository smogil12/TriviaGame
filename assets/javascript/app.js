$(document).ready(function () {
    var options = [
        {
            question: "Who won the last Superbowl?",
            choice: ["Patriots", "Rams", "Seahawks" , "Chiefs"],
            answer: 0
         },
         {
            question: "Who is the starting QB for the Jets?",
            choice: ["Sam Darnold", "Phillip Rivers", "Patrick Mahomes", "Derek Carr"],
            answer: 0
         },
         {
            question: "Which team is the newest addition to the NFL?" , 
            choice: ["Giants", "Texans", "Cowboys" , "Chargers"],
            answer: 1
        },
        {
            question: "Which player has the most superbowl rings?" ,
            choice: ["Elway", "Brady", "Flacco" , "Namath"],
            answer: 1
        },
        {
            question: "Who is the owner of the Dallas Cowboys?",
            choice: ["Rex Ryan", "Dak Preskott", "Jerry Jones", "Stephen Ross"],
            answer: 2
        },
       
       
      ];
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 15;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    $("#reset").hide();
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000);
        running = true;
        }
    }
    function decrement() {
        $("#timer").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answers").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            results();
        }	
    }
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    function displayQuestion() {
        index = 0;
        pick = options[index];
            $("#questions").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                userChoice.attr("data-guessvalue", i);
                $("#answers").append(userChoice);
    }
    $(".answerchoice").on("click", function () {
        userGuess = parseInt($(this).attr("data-guessvalue"));
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answers").html("<p>Correct!</p>");
            results();
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answers").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            results();
        }
    })
    }
    function results () {
        newArray.push(pick);
        options.splice(index,1);
        var timerResult = setTimeout(function() {
            $("#answers").empty();
            timer= 20;
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questions").empty();
            $("#questions").html("<h3>Game Over!  Here's Your Results: </h3>");
            $("#answers").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answers").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answers").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
        } else {
            runTimer();
            displayQuestion();
          }
        }, 3000);
    }
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answers").empty();
        $("#questions").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    })
    })
