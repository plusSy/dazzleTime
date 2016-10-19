/**
 * Created by applesyl on 2016/10/10.
 * 程序主逻辑
 */
var WINDOW_WIDTH = 1048;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

// var endTime = new Date();
// endTime.setTime(endTime.getTime()+3600*1000);
//alert(endTime);
var curShowTimeSecondes = 0;

var balls = [];

const colors = ["red","blue","green","yellow","#613209","pink","#fff","#E8722C","#7b1f49"];


window.onload = function () {
    WINDOW_WIDTH = document.documentElement.clientWidth;
    WINDOW_HEIGHT = document.documentElement.clientHeight-50;
    //WINDOW_HEIGHT = window.screen.height;
    //alert(WINDOW_HEIGHT);
    MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
    RADIUS =  Math.round(WINDOW_WIDTH*4/5/108)-1;
    MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);

    var canvas = document.getElementById("canvas");
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    //解救兼容性问题
    if(canvas.getContext("2d")){
        var context = canvas.getContext("2d");
    }else{
        alert("当前浏览器不支持Canvas,请更换浏览器后在尝试。")
    }
    curShowTimeSecondes = getCurrentShowTimeSeconds();
    //salert(curShowTimeSecondes);

    setInterval(
        function () {
            render(context);
            update();
        }
        ,
        50
    );


}

function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    //alert(curTime);
    // var ret =endTime.getTime()-curTime.getTime();
    // //alert(ret);
    // ret = Math.round(ret/1000);
    //alert(ret);
    //return ret>=0?ret:0;
    var ret = curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
    return ret;

}

function update() {
    var nextShowTimeSeconds =  getCurrentShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds/3600);
    var nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600)/60);
    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt(curShowTimeSecondes/3600);
    var curMinutes = parseInt((curShowTimeSecondes-curHours*3600)/60);
    var curSeconds = curShowTimeSecondes % 60;

    if(nextSeconds != curSeconds){

        if(parseInt(curHours/10) != parseInt(nextHours/10)){
            addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(curHours/10));
        }
        if(parseInt(curHours%10) != parseInt(nextHours%10)){
            addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours/10));
        }

        if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
            addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
        }
        if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
            addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10));
        }

        if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
            addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
        }
        if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
            addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(nextSeconds%10));
        }
        curShowTimeSecondes = nextShowTimeSeconds;
    }

    updateBalls();

}

function updateBalls() {
    for(var i=0;i<balls.length;i++){
        balls[i].x +=balls[i].vx;
        balls[i].y +=balls[i].vy;
        balls[i].vy +=balls[i].g;

        if(balls[i].y >= WINDOW_HEIGHT-RADIUS){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = -balls[i].vy*0.75;
        }
    }

    var cnt = 0;
    for(var i=0;i<balls.length;i++)
        if(balls[i].x + RADIUS>0 && balls[i].x-RADIUS<WINDOW_WIDTH)
            balls[cnt++] = balls[i]

    while(balls.length>Math.min(300,cnt)){
        balls.pop();

    }

}

function addBalls(x,y,num) {
    for(var  i=0;i<digit[num].length;i++)
        for(var  j=0;j<digit[num][i].length;j++)
            if(digit[num][i][j] == 1){
                var aBall = {
                    x : x+j*2*(RADIUS+1)+(RADIUS+1),
                    y : y+i*2*(RADIUS+1)+(RADIUS+1),
                    g : 1.5+Math.random(),
                    vx : Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy : -5,
                    color : colors[Math.floor(Math.random()*colors.length)]

                 };

                 balls.push(aBall);
            }
}

function render(cxt) {

    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

    var hours = parseInt(curShowTimeSecondes/3600);
    var minutes = parseInt((curShowTimeSecondes-hours*3600)/60);
    var seconds = curShowTimeSecondes % 60;

    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
    renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);

    renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);

    renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
    renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);

    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);

    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);


    for(var i=0;i<balls.length;i++){
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,Math.PI*2,true);
        cxt.closePath();

        cxt.fill();
    }


}

function renderDigit(x,y,num,cxt) {

    cxt.fillStyle = "rgb(0,102,153)";

    for(var i=0; i<digit[num].length; i++)
        for(var j=0; j<digit[num][i].length; j++)
            if(digit[num][i][j]==1){
                cxt.beginPath();
                cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,Math.PI*2);
                cxt.closePath();
                cxt.fill();
            }
}
