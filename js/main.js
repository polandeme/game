
// var score = $("#score").text();
function time_down() {
    if(time.innerHTML > 0) {
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
    $(".mask,.mask-content").css("display","block");
    $(".mask").click(function(){
        $(".mask,.mask-content").css("display","none");
    });
    $(".mask-content").append("Game over" + '\n' + "your score is   " + score);
}
