var gamePattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
let level = 0;
let checkerNum = 0;

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
    $("#level-title").html(`Level ${level++}`);
}

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $('#' + currentColor).addClass("pressed").delay(100).queue(function (next) {
        $(this).removeClass("pressed");
        next();
    });
}
function checker() {
    if (userClickedPattern[checkerNum] != gamePattern[checkerNum]) {
        var audio = new Audio("/sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOVer();
    }
    else{
        checkerNum++;
        if (userClickedPattern.length == gamePattern.length) {
            checkerNum = 0;
            userClickedPattern = [];
            setTimeout(nextSequence, 1000);
        }
    }
}

function startOVer() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

$(document).keypress(() => {
    if (level == 0) {
        nextSequence();
    }
})

$(".btn").click(function () {
    let userChosenColor = this.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checker();
})

