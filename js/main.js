
// var score = $("#score").text();
function time_down() {
    if(time.innerHTML > 5) {
        time.innerHTML --;
    } else {
        clearInterval(inter);
        $("table").off('click', '.active');
        game_over();
    }
}
function time_start() {
	inter = setInterval('time_down()', 1000);
};
function game_over() {
    // console.log('game over');
    var score = $("#score").text();
    alert("Game over" + '\n' + "your score is   " + score);
}
