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
        // $(this).attr('rel', this.rel);
    }

    function get_cell(i, j) {
        var tr = $("tr").eq(i);
        return tr.children("td").eq(j);
    }

    cell_new = new Cell(0, 0, 0, 0);
    cell_temp = new Cell(0, 0, 0, 0);
    function creat_cell_ui(cell_new, cell_old) {
        var i = Math.round(Math.random() * 3);
        var j = Math.round(Math.random() * 3);
        var num = Math.round(Math.random() * range + range / 8) ;
        cell_new.i = i, cell_new.j = j, cell_new.num = num;

        if(typeof cell_old !== "undefined") {
            if((cell_new.i === cell_old.i && cell_new.j === cell_old.j) || cell_new.num === cell_old.num ) {
                console.log("ts");
                creat_cell_ui(cell_new, cell_old);
            } else {
                var tar = get_cell(cell_new.i, cell_new.j).addClass('active');
                tar.append("<span>" + num + "</span>");
            }
        } else {
            var tar = get_cell(cell_new.i, cell_new.j).addClass('active');
            tar.append("<span>" + num + "</span>")

            cell_old = new Cell(i,j,num,0);
            //cell_old.i = i; //? error
        }
        return cell_old;
    }

    cell_old = creat_cell_ui(cell_new);
    creat_cell_ui(cell_new, cell_old);
    $("table").on('click', '.active', function(){
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
            score++;
            $("#score").text(score);
            self.removeClass("active").text('').attr('rel','1');
           creat_cell_ui(cell_new, cell_old);
        } else {
            if( time.innerHTML > 20 )
            {
                time.innerHTML -= 5;
            }
        }
    });

    // console.log(typeof cell_old);

            /*function cell(i,j) {
                var tr = $("tr").eq(i);
                return tr.children("td").eq(j);
            }

            function init() {
                i = Math.round(Math.random() * 3);
                j = Math.round(Math.random() * 3);
                var tar = cell(i,j).addClass('active');
                add_num(tar, tar);
            }
            (function start(){
                init();
                init();
            }());
            $("table").on('click','.active',function(e){
                var self = $(this);
                (function start() {
                    self.removeClass('active');
                    var nowPos_i = Math.round(Math.random() * 3);
                    var nowPos_j = Math.round(Math.random() * 3);
                    if(nowPos_i != i || nowPos_j != j) {
                        tar = cell(nowPos_i,nowPos_j).addClass('active');
                        i = nowPos_i; j = nowPos_j;
                    } else { console.log('tes');start(self); }
                }(self));
                add_num(self, tar);
                score++;
                $("#score").text(score);
            });
            function add_num(self, tar){
                self.html("");
                var num = Math.round(Math.random() * 50);
                tar.append("<span>" + num + "</span>");
            }
            function compare() {
                
            }*/
});