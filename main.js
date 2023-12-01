

var buttonColors = ["green", "red", "yellow", "blue"];

var patternColors = [];

var playerColors = [];

var level = -1;

var gameStart = false;


$(document).keypress(function () { 
    if (gameStart == false){
        nextSequence();
        gameStart = true;
    }
});


$(".btn").click(function () { 
    
    var color = this.getAttribute("id");
    playAudio(color);
    
    
    var selector = $("#"+color);
    selector.addClass("click");
    setTimeout(function(){
        selector.removeClass("click");
    }, 100);
    
    playerColors.push(color);

    if(gameStart == true){
        if (checkAnwer() == false) {
            playAudio("wrong");
            $("h1").text("Game Over, Press Any Key to Restart");
    
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200)
    
            gameOver();
        }
        else if (playerColors.length == patternColors.length){
            nextSequence();
        }
    }
    

});

function gameOver(){
    patternColors = [];
    level = -1;
    gameStart = false;
}

function checkAnwer(){
    
    if (playerColors[playerColors.length - 1] != patternColors[playerColors.length - 1]) return false;
    
    return true;
}

function playAudio(name){
    var audio = new Audio("./sounds/" + name + ".mp3")
    audio.play();
}

function nextSequence(){
    level++;
    $("h1").text("Level " + level);
    var color = buttonColors[Math.floor(Math.random()*4)];

    playerColors = [];
    setTimeout(function(){
        $("#"+color).fadeOut(200).fadeIn(200);
        playAudio(color);
    }, 500)
    
    

    patternColors.push(color);

}