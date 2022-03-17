let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let startGame = false;
let level = 0;

// start the game
$(document).keypress(() => {
    if (!startGame) {
        $("#level-title").text("Level " + level);
        nextSequence();
        startGame = true;
    } 
});

// anonymous function for user clicked pattern
$(".btn").click(() => {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animateButtonPress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1); 
});

// check user's answer against pattern
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if(userClickedPattern.length == gamePattern.length) {
            // if successful continue pattern.
            setTimeout(() => { nextSequence(); }, 1000);
        }
    } 
    else {
        playSound("wrong");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Try Again");

        setTimeout(() => { $("body").removeClass("game-over"); }, 200);
        startOver();
    }
}


// select random number for next color and add it to game pattern array
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomColorChoice = buttonColors[randomNumber];

    // add a color to the array
    gamePattern.push(randomColorChoice);

    // make box flash
    $("#" + randomColorChoice).fadeIn(100).fadeOut(100).fadeIn(100);

    // play sound
    playSound(randomColorChoice);
    
}

// animate button press
function animateButtonPress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => { $("#" + currentColor).removeClass("pressed"); }, 100);
}

// restart game
function startOver() {
    gamePattern = [];
    startGame = false;
    level = 0;
}

// trigger sounds for buttons
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}






