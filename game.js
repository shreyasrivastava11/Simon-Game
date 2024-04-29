let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let level = 0;
let start = false;

$(document).keypress(function () {

    if (!start) {
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
});

function nextSequence() {
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    let audio = new Audio("sounds/" + name + '.mp3');
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");

        playSound("wrong");

        document.querySelector("body").classList.add("game-over");
        setTimeout(function () {
            document.querySelector("body").classList.remove("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    start = false;
    gamePattern = [];
}