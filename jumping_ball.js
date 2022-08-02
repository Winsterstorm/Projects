window.addEventListener("load", main, false);

function main(){
    let ctx = canvas_example.getContext('2d');
    let w = canvas_example.width;
    let h = canvas_example.height;
    let start_button = document.getElementById("start");
    let restart_button = document.getElementById("restart");
    let hello = document.getElementById("orient");
    let dt = 0.1;
    let x0 = w/5;
    let y0 = h/3;
    let vx0 = 0;
    let vy0 = -50;
    let isPlaying = false;
    let animate;
    let counter = document.getElementById("counter");
    const img = new Image();
    img.src = 'coin.png';

   



    const g = 9.8;

    let timer = setInterval(enemyGo, dt);
    clearInterval(timer);
    function time(){
       timer = setInterval(enemyGo, dt);
    }

    let timere = setInterval(createEnemy, w/2);
    clearInterval(timere);
    function time_e(){
       timere = setInterval(createEnemy, w/2);
    }
    

 class balls {
    constructor(x,y,r,vx,vy) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = vx;
        this.vy = vy;
    }
}

    let ball = new balls(x0, y0, 20, vx0, vy0);

    class Enemy {
        constructor(x,y,r,vx) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.vx = vx;
        }
        draw() {
            if (isPlaying){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r,0,2*Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            }
        }
        phys() {

            this.x -= this.vx*dt;  
            if ((ball.x-this.x)**2+(ball.y-this.y)**2 < (ball.r+this.r)**2){
                gameOver();
            }
            if (this.x === ball.x){
                counter.value++;
            }
        }
    }

    class Coins {
        constructor(x,y,size ) {
            this.x = x;
            this.y = y;
            this.size = size;
        }
        draw() {
            let a = this.x;
            let b = this.y;
            img.onload = function (){
            ctx.drawImage(img,0,0,30,30,a,b,30,30);
            }
        }
    }
    let coin = new Coins(100, 100, 10);

    let coin1 = new Coins(200,200, 10);
    /*coin1.draw();
    coin.draw();
*/
        let enemyClub = [];
    function createEnemy() {
        if (enemyClub.length > 50){
            enemyClub.shift();
        }
        enemyClub.push(new Enemy(w, h * Math.random(), 50 * Math.random()+5, 50));

    }
    function enemyGo(){
            phys();
            draw();
        for (let i = 0; i < enemyClub.length-1; i++) {

                    enemyClub[i].phys();
                    enemyClub[i].draw();

        }

    }
   


    let arr = [{x: ball.x, y: ball.y},];
    function points() {
        arr.push({x: ball.x, y: ball.y},)
    }
    function phys(){

    ball.vy+= g*dt;
        ball.y += ball.vy*dt;
        ball.x += ball.vx*dt;
        if (ball.x >= w-ball.r){
            ball.vx *= -1;
            vx0*=-1;

            ball.x = w-ball.r;
        }
        if (ball.y >= h-ball.r){
            
           gameOver();

        }
        if (ball.x <= ball.r){
            ball.vx *= -1;
            vx0*=-1;
            ball.x = ball.r
        }
        if (ball.y <= ball.r){
            ball.vy *= -0.5;
            ball.y = ball.r

        }


    }
   
    
    function draw(){
        ctx.clearRect(0,0,w,h);
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r,0,2*Math.PI);
        ctx.fillStyle = "yellow"
        ctx.fill();

    }
    draw();
    function dir_draw(){
        for (let i = 0; i < arr.length-1; i++) {
            if (arr.length > 100){
                arr.shift();
            }
        ctx.beginPath();
        ctx.moveTo(arr[i].x, arr[i].y);
        ctx.lineTo(arr[i+1].x, arr[i+1].y);
        ctx.strokeStyle = "#fff"
        ctx.stroke();
        }
    }
    function control(){
      phys();
      draw();

      /*dir_draw();
      points();*/
    }
    function gameOver(){
        isPlaying = false;
    hello.value = 'GAME OVER! Your Score: ' + counter.value;
        counter.value = '0';
        clearInterval(timer);
        clearInterval(timere);

        enemyClub.splice(0, enemyClub.length);
        ctx.clearRect(0,0,w,h);
        ball.x = x0;
        ball.y = y0;

        //arr.splice(0, arr.length);

        draw();

        
    }
    /*start_button.onclick = function (){
    clearInterval(timer);
        timer = setInterval(enemyGo, dt*100);
      
       if(!isPlaying){
       timere = setInterval(createEnemy, w/2);
       createEnemy();
        }
       ball.vx = vx0;
        ball.vy = vy0;
        isPlaying = true;
        
        
    }*/
   /* restart_button.onclick = function (){
        gameOver();
       
    }*/
    window.onkeydown = (e)=>{
        if (e.keyCode === 32){


            if(counter.value > 10 && counter.value < 30 ){
                clearInterval(timere);
                timere = setInterval(createEnemy, w/4);
            }
            if(counter.value > 30){
                clearInterval(timere);
                timere = setInterval(createEnemy, w/8);

            }
            if(!isPlaying){
                timere = setInterval(createEnemy, w/2);
                createEnemy();
            }
            hello.value = '';
            ball.vx = vx0;
            ball.vy = vy0;
            isPlaying = true;
            clearInterval(timer);
            timer = setInterval(enemyGo, dt*100);
        }
    }


}