window.addEventListener("load", main, false);
function main() {
	var ctx = canvas_example.getContext("2d");
	var w = canvas_example.width;
	var h = canvas_example.height;
	var add_button = document.getElementById("add_ball");
	var hah_button = document.getElementById("hah");
	let t = setInterval(control, 5)
   clearInterval(t);
	function timer() {  t = setInterval(control, 5);
    }
	var fps = 120;
	var dt = 1/fps;
	var c = 100;
	let v1x = ''
	let v2x = ''
  let v1y = ''
  let v2y = ''
  let m1 = ''
  let m2 = ''
  let ball = [];

	add_button.onclick = function() {
		clearInterval(t);
	 	ball[0] = 
			{x: 0, y: 0, vx: 0, vy:0, r: 0, m: 0, }; //создадим массив с одним элементом.элемент - объект
		while(ball.length > 1){
			ball.pop();
		}
		let l = ball.length;

		while (ball.length < hah_button.value) { 
			ball.push({x: 0, y: 0, vx: 0, vy:0, r: 0, m: 0}) } // добавили еще объектов
			for(var i = 0;i<ball.length; i++) { // определили начальные параметры объектов и нарисовали их
				var wasIt = true;
					while (wasIt){
						if (wasIt) {wasIt=false;}
							ball[i].x=Math.random()*(w-20);
							ball[i].y=Math.random()*(h-20);
							ball[i].r=Math.trunc(Math.random()*40);
							ball[i].m=Math.trunc(Math.PI*ball[i].r**2*c);


								for (var k=0; k<i; k++)
					if ((ball[k].x-ball[i].x)**2 + (ball[k].y-ball[i].y)**2 < (ball[i].r+ball[k].r+2)**2) {
						wasIt = true;}
//если расстояние между центрами шаров меньше суммы их радиусов, то сделай другой шар, а то блин они же слипнутся.

					}//while



			ball[i].vx = Math.trunc(Math.random()*100);
			ball[i].vy= Math.trunc(Math.random()*100);
		}		
	
		timer();
}



function phys() { // теперь будем работать с этими значениями
	for (let i = 0; i < ball.length ; i++) {
		ball[i].x += ball[i].vx*dt;
		ball[i].y += ball[i].vy*dt;

		if(ball[i].x < ball[i].r) {
    ball[i].vx *= -1;
    ball[i].x = ball[i].r;
  }
  if(ball[i].y < ball[i].r) {
    ball[i].vy *= -1;
    ball[i].y = ball[i].r;
  }
  if(ball[i].x > w - ball[i].r) {
    ball[i].vx *= -1;
    ball[i].x = w - ball[i].r;
  }
  if(ball[i].y > h - ball[i].r) {
    ball[i].vy *= -1;
    ball[i].y = h - ball[i].r;
  }
  function dynamics() {
  		let m1 = ball[i].m;
    	let m2 = ball[j].m;
    	v1x = ball[i].vx;
    	v1y = ball[i].vy;
    	v2x = ball[j].vx;
    	v2y = ball[j].vy; 
    	if (m1 > m2) {  	
    	ball[i]["vx"] = v1x*(m1 - m2)/(m1 + m2) + v2x*(2*m2)/(m1 + m2);// зси + зсэ 
    	ball[i]["vy"] = v1y*(m1 - m2)/(m1 + m2) + v2y*(2*m2)/(m1 + m2);
    	ball[j]["vx"] = v1x*(2*m1)/(m1 + m2) + v2x*(m2 - m1)/(m2 + m1);
    	ball[j]["vy"] = v1y*(2*m1)/(m1 + m2) + v2y*(m2 - m1)/(m2 + m1);
    } else if (m2 > m1){
    	ball[i]["vx"] = v1x*(m2 - m1)/(m1 + m2) + v2x*(2*m2)/(m1 + m2);// зси + зсэ 
    	ball[i]["vy"] = v1y*(m2 - m1)/(m1 + m2) + v2y*(2*m2)/(m1 + m2);
    	ball[j]["vx"] = v1x*(2*m1)/(m1 + m2) + v2x*(m1 - m2)/(m2 + m1);
    	ball[j]["vy"] = v1y*(2*m1)/(m1 + m2) + v2y*(m1 - m2)/(m2 + m1);
    }

    }
 for (var j = 0; j < ball.length; j++){

 		if((ball[i].x - ball[j].x)**2 + (ball[i].y - ball[j].y)**2 <= (ball[i].r + ball[j].r)**2){
 			dynamics();

      } 

    
 }
	}
}
function draw() { 
	ctx.clearRect(0, 0, w, h)
	for(let i = 0; i < ball.length; i++){
	 ctx.beginPath()
	 ctx.arc(ball[i].x, ball[i].y, ball[i].r, 0, 2*Math.PI)
	 	 ctx.fillStyle = "#1496e6"; 
     ctx.fill();
	 	}
}

function control(){
	draw()
	phys()
}

}