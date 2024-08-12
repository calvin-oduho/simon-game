const currentYear = new Date().getFullYear();
$(".year").text(currentYear);

playGame();

var level = 0;

var started = false;

var gamePattern = [];

var userClickedPattern = [];

var buttonColors = [ "red", "blue", "green", "yellow" ]; 

function playGame() {
    $(document).on("keydown", function() {
        if (!started) {
            nextSequence();
            $("#level-title").text("Level " + level);
            started = true;
        }
    });
}

function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.floor( Math.random() * 4 );
    var randomChosenColor = buttonColors[ randomNumber ];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level)
}

$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    var audio = new Audio("./public/assets/sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success!");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout( function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");    
        
        startOver();
    }
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
    playGame();
}