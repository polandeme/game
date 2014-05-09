$(document).ready(function(){
    var cell_new, cell_old, cell_temp, score;
    score = 0;
    var range = 10;
    $("td").attr('rel',0);

    function Cell(i,j,num) {
        this.i   = i;
        this.j   = j;
        this.num = num;
        this.rel = 0;
    }

    function get_cell(i, j) {
        var tr = $("tr").eq(i);
        return tr.children("td").eq(j);
    }

    function game_start() {
        time_start();
        bind_click();
    }

    function game_restart() {
        $(".active").text('');
        $(".active").removeClass();
        score = 0;
        game_init();
        game_start();
    }
    function game_init() {
        $("#time").html(60);
        $("#score").html(0);
        // 判断 本地存储 模块化 todo
        if(window.localStorage && window.localStorage.getItem) {

            var ls = localStorage;
            if(ls.getItem('max_score')) {
                var max_score_old = parseInt(ls.getItem('max_score'));
            } else {
                max_score_old = 0;
            }
        }
        console.log(max_score_old);
        $("#max-score").html(max_score_old);
        cell_old = creat_cell_ui(cell_new);
        creat_cell_ui(cell_new, cell_old);
    }

    $(".container").on('click','.game_start', function(){
        game_start();
        $(this).text("重新开始").css("background", "#D69BB2");
        $(this).removeClass().addClass("game_restart");
    });

    $(".container").on('click','.game_restart', function(){
        game_restart();
    });

    $(".replay").click(function(){
        game_restart();
        $(".mask,.mask-content").css("display","none");
    });

    cell_new = new Cell(0, 0, 0, 0);
    cell_temp = new Cell(0, 0, 0, 0);

    function creat_cell_ui(cell_new, cell_old) {
        var i = Math.round(Math.random() * 3);
        var j = Math.round(Math.random() * 3);
        var num = Math.round(Math.random() * range + range / 3) ;
        cell_new.i = i, cell_new.j = j, cell_new.num = num;

        if(typeof cell_old !== "undefined") {
            if((cell_new.i === cell_old.i && cell_new.j === cell_old.j) || cell_new.num === cell_old.num ) {
                creat_cell_ui(cell_new, cell_old);
            } else {
                var tar = get_cell(cell_new.i, cell_new.j).addClass('active');
                tar.append("<span>" + num + "</span>");
            }
        } else {
            var tar = get_cell(cell_new.i, cell_new.j).addClass('active');
            tar.append("<span>" + num + "</span>");
            cell_old = new Cell(i,j,num,0);
            //cell_old.i = i; //? error
        }
        return cell_old;
    }

    game_init();

    function bind_click() {

        $("body").on('click', '.active', function(){
            var self = $(this);
            $("td").attr('rel', 0);
            var ind = self.index();
            var pa = self.parent().parent().find("tr").index($(this).parent()[0]);
            if(cell_new.i === pa && cell_new.j === ind) {
                cell_new = cell_new;
            } else {
                cell_temp =  cell_new;
                cell_new = cell_old;
                cell_old = cell_temp;
            }
            if (cell_new.num < cell_old.num) {
                range += 2;
                score_anim();
                score++;
                $("#score").text(score);
                self.removeClass("active").text('').attr('rel','1');
               creat_cell_ui(cell_new, cell_old);
            } else {
                    $(this).animate({
                        backgroundColor: "red"
                    }, 150, function() {
                        var self = $(this);
                        // self.mouseout(function(){
                        //     console.log("dd00");
                        //     self.css("background", "");
                           
                        //     event.stopPropagation(); 
                        // }); // have a bug 
                        setTimeout(function(){
                                self.css("background", "");
                        },50);
                    });
                    if(time.innerHTML > 15 )
                    { 
                        clearInterval(inter);
                        time.innerHTML -= 5;
                        time_start();
                    }
                event.stopPropagation();
            }
        });
    }

    //分数增加动画
    function score_anim() {
        var tar = $(".score-box");
        var i = $("<b>").text("+" + 1);
        console.log("gd");
        var y = event.pageY, x = event.pageX;
        i.css({
            top: y-50,
            left: x,
            "font-size": "24px",
            position: "absolute",
            color: "red"
        });
        tar.append(i);
        i.animate({
            top: y-150,
            left: x,
            opacity: 0,
            "font-size": "1.4em"
        }, 600,function(){ i.remove(); });

        $("#score").animate({
            "font-size": '25px'
        }, 300, function(){
            $(this).animate({"font-size":'17px'},300);
        });
        event.stopPropagation();
    }
});
