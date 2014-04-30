var timer = document.getElementById("time");
time.innerHTML = 59;
var score = document.getElementById("score");
score.innerHTML = 0;
                var score = $("#score").text();
function time_down() {
    if(time.innerHTML > 0) {
        time.innerHTML --;
    } else {
        clearInterval(inter);
        game_over();
    }
}
var inter = setInterval('time_down()', 1000);
function game_over() {
    // console.log('game over');
    var score = $("#score").text();
    alert("Game over" + '\n' + "your score is   " + score);
}
