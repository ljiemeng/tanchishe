window.onload = function(){
	var tonzhi=document.createElement('div');
		tonzhi.setAttribute('id','tonzhi');
	var again=document.createElement('div');
		again.setAttribute('id','again');
	var elSNK=document.getElementById('changjing');
	var ROWX=17,ROWY=14;
	var fenshu=0;
	var kaiguan=true;
	var scroll=document.getElementById('scroll');
	var dengji=document.getElementById('dengji');
	var sd=1;

	var sudu = 1000;

	for(var i=0;i<ROWY;i++){
		for(var j=0;j<ROWX;j++){
			var block=document.createElement('div');
				block.setAttribute('class','block');
				block.style.width=(680-ROWX)/ROWX+'px';
				block.style.height=(560-ROWY)/ROWY+'px';
				elSNK.appendChild(block);
				block.setAttribute('id',i+'_'+j);
		}

	};







	var snake = [{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	var LEFT =37, RIGHT = 39, UP = 38, DOWN = 40,PAUSH=32;
	var dd = RIGHT;
	var dict = {};
	var isInSnake = function(x,y){
		for(var i =0;i<snake.length;i++){
			if(snake[i].x == x && snake[i].y ==y){return true;}
		}
		return false;
	};
	var dropFood = function(){
		var x = Math.floor(Math.random()*ROWY),
	    y = Math.floor(Math.random()*ROWX);
	    if(snake.length ==ROWY*ROWX){
	    		changjing.appendChild(tonzhi);
	    		tonzhi.innerHTML="你超神了!";
	    		tonzhi.appendChild(again);
	    		again.innerHTML='再来一局！';
	    		kaiguan=true;
	    		return;
	    }
	    while(isInSnake(x,y)){
		   	x = Math.floor(Math.random()*ROWY),
	    	y = Math.floor(Math.random()*ROWX);	
		   }
		   document.getElementById( x+'_'+y).style.background = '#f2c019';
		   return {foodx:x,foody:y};
	};
	var food = dropFood();
	var drawSnake = function(){
		for(i=0;i<snake.length;i++){
			document.getElementById(snake[i].x+'_'+snake[i].y).style.background = 'red';
		};
	}
	drawSnake();

	var t;
	zou = function(){
		var newHead;
		var last = snake.length-1;
		
		if(dd ==RIGHT)
		{
			newHead = {x:snake[last].x,y:snake[last].y+1};
		}
		if(dd ==LEFT)
		{
			newHead = {x:snake[last].x,y:snake[last].y-1};
		}
		if(dd ==UP)
		{
			newHead = {x:snake[last].x-1,y:snake[last].y};
		}
		if(dd ==DOWN)
		{
			newHead = {x:snake[last].x+1,y:snake[last].y};
		}
		if(newHead.x>ROWY-1 ||newHead.x<0 ||newHead.y>ROWX-1 ||newHead.y<0){
			clearInterval(t);
				changjing.appendChild(tonzhi);
	    		tonzhi.innerHTML="GAME OVER!";
	    		tonzhi.appendChild(again);
	    		again.innerHTML='再来一局！';
	    		kaiguan=true;
				return;
		}
		if(isInSnake(newHead.x,newHead.y)){
			clearInterval(t);
				changjing.appendChild(tonzhi);
	    		tonzhi.innerHTML="咬到自己了!";
	    		tonzhi.appendChild(again);
	    		again.innerHTML='再来一局！';
	    		kaiguan=true;
				return  ;
		}
		if(newHead.x == food.foodx && newHead.y == food.foody){
			snake.push(newHead);
			var tmp = document.getElementById(food.foodx+'_'+food.foody);
			tmp.style.background= 'red';
			fenshu+=10;
			scroll.innerHTML=fenshu;
			console.log(fenshu);
			food = dropFood();
			return ;
		}
		var weiba = snake.shift();
		snake.push(newHead);
		document.getElementById(weiba.x+'_'+weiba.y).style.background='none';
		document.getElementById(newHead.x+'_'+newHead.y).style.background='red';
		return null;
	}
	set.onclick=function(){
		if(!kaiguan){
			sudu = 1000 - sd*50;
			sd+=1
			if(sd==10){
				sd=1;
			}
			dengji.innerHTML=sd;
			t =setInterval(zou,sudu);			
		}
	
		console.log(sudu);
	}
	
	document.onkeydown = function(e){
		var d = e.keyCode ;		
		if(d ==LEFT || d==UP||d==RIGHT||d==DOWN){
			if(!kaiguan){
				if(Math.abs(d-dd) !== 2){
					dd = d;
				}else{
					return null;
				}
				zou();
			}else{
				return;
			}
			
		}		
		if(d==PAUSH){
			console.log(d,kaiguan)
			if(!kaiguan){
				kaiguan = true;
				clearInterval(t);
				
			}else{
				t=setInterval(zou,sudu);
				kaiguan = false;
			}
		}else{
			return;
		}
		
		
	}
	start.onclick = function(){
		clearInterval(t);
		t = setInterval(zou,sudu);
		kaiguan = false;
	}
	again.onclick=function(){
		location.reload();
	}


	// PAUSH.onclick = function(){
	// 	if(!kaiguan){
	// 		clearInterval(t);
	// 		kaiguan = true;
	// 	}else{
	// 		t=setInterval(zou,1000);
	// 		kaiguan = false;
	// 	}
	// }
	// var t = setInterval(zou,1000);



	// var weizhi = {x:'',y:''};
	// var dianming  =function(){
	
	// var x = Math.floor(Math.random()*5);
	// var y = Math.floor(Math.random()*10);
	// if(x!=2||y!=0){
	// 	weizhi.x=x;
	// 	weizhi.y=y;
	// 	return weizhi;
	// }
	// else{
	// 	return dianming();
	// }
	// }
	// console.log(dianming(weizhi));



	// var arr  = [{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	// var fn = function(){
	// 	arr.shift();
	// 	var c = {};
	// 	c.x= arr[arr.length-1].x;
	// 	c.y = arr[arr.length-1].y+1;
	// 	arr.push(c);	
	// };
	// fn();
	// console.log(arr);


	//清除setInterval;
	// var t = setInterval(aa,1000);
	// clearInterval(t);



	// var kaiguan = true;
	// document.onclick =function(){
	// 	if(kaiguan){
	// 		alert(1);kaiguan = false;
	// 	}else{
	// 		alert(2);kaiguan = true;
	// 	}
	// }





}
