var buttonColours = ["red", "blue", "green", "yellow"];

var gamepattern = [];
var userclickedpattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level" + level);
     nextSequence();
     started = true;
    }
});

$(".btn").click(function(){
    var userchosencolour = $(this).attr("id");
    userclickedpattern.push(userchosencolour);

    playsound(userchosencolour);
    animatepress(userchosencolour);

 checkanswer(userclickedpattern.length-1);
});

function checkanswer(currentlevel){
    if (gamepattern[currentlevel] === userclickedpattern[currentlevel]){
        if(userclickedpattern.length === gamepattern.length ){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playsound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over, Press any key to restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}



function nextSequence(){
    userclickedpattern = [];
    level++;
    $("#level-title").text("Level - " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomchosencolour = buttonColours[randomNumber];
    gamepattern.push(randomchosencolour);

    $("#"+ randomchosencolour).fadeIn(100).fadeOut(100).fadeIn(100);
playsound(randomchosencolour);


}

function animatepress(currentcolor){
    $("#" + currentcolor).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentcolor).removeClass("pressed");
    },100);
}

function playsound(name){
var audio = new Audio(name + ".mp3");
audio.play();
}

function startOver(){
    level = 0;
    gamepattern =[];
    started = false;
}

