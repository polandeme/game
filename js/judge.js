$(document).ready(function(){
    var i,j,tar;
            function cell(i,j) {
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
});