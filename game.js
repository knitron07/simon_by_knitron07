var gamepattern = [];
var userClickedPattern = [];
var buttoncolour = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("Level " + (++level));
  var randomnumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttoncolour[randomnumber];
  gamepattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}


function handler() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer();
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function startOver() {
  level = 0;
  gamepattern = [];
  started= false;

}

function checkAnswer() {
  var index = userClickedPattern.length;
  if (userClickedPattern[index - 1] === gamepattern[index - 1]) {
    console.log("s");

    if (userClickedPattern.length === gamepattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {
    console.log("f");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("GAME OVER !!!!  press any key to restart....");
     startOver();
  }
}




$(document).on("keypress", function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
$(".btn").on("click", handler);
// $(".btn").on("click",nextSequence;
