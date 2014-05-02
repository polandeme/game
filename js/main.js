
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
}
// localStorage 存储最高分 max_score
function save_max_score() {
    if(window.localStorage && window.localStorage.getItem) {
        var ls = localStorage;
        var score = $("#score").text();
            if(ls.getItem('max_score')) {
                console.info("save");
                var max_score_old = parseInt(ls.getItem('max_score'));
                score = parseInt(score);
                var score = score > max_score_old ? score : max_score_old;
            }
        ls.setItem('max_score', score);
        $("#max-score").html(score);
    } else {
        console.log("dd");
    }
}
function game_over() {
    var score = $("#score").text();
    save_max_score();
    $(".mask,.mask-content").css("display","block");
    $(".mask").click(function(){
        $(".mask,.mask-content").css("display","none");
    });
    $(".mask-content").text("Game over" + '\n' + "your score is   " + score);
}
