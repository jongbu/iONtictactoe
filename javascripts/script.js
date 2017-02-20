



/* iON Object - our AI*/
var iON=function(){
	this.random_move=function(){
		//return Math.floor((Math.random()*8)+0);
		getiONMove("box-"+Math.floor((Math.random()*9)+1));
	}
	this.smart_move=function(){
		return Math.floor((Math.random()*9)+1);
	}
}
/*end of iON Object*/

//instantiating our web_iON Object
var web_iON=new iON();


/*Start of Game Functions and Boarsd Rendering*/
var board_array=[-10,-10,-10,-10,-10,-10-10,-10,-10,-10];
var playerMovesArray=[-10,-10,-10,-10,-10,-10-10,-10,-10,-10];
var iONMovesArray=[-10,-10,-10,-10,-10,-10-10,-10,-10,-10];
var playerMove=false;
var iONMove=false;
var move_counter=0;

function moveFirst(move){
	if(move=='player'){
		playerMove=true;
	}
	else if(move=='iON'){
		iONMove=true;
		web_iON.random_move();
	}
	else{
		coinToss();
	}

	startMatch();	//start the match
}

function coinToss(){
	var toss_result=Math.floor((Math.random()*4)+1); //outputting 4 random no. because js can't produce both 0 or 1
	if(toss_result==1||toss_result==2)
		playerMove=true;
	else{
		iONMove=true;
		web_iON.random_move();
	}
	
}

//to start the match between two
function startMatch(){
	showMenus();
	showBoard();
	hideFirstMoveOption();
	document.getElementById("iONMoves").innerHTML="<p> > Hello! Human. My name is iON. Let's play this game. My Moves are numbered as follows: </p>"+
													   "<p> &emsp;&emsp;__8__|__1__|__6__ </p>"+
													   "<p> &emsp;&emsp;__3__|__5__|__7__ </p>"+
													   "<p> &emsp;&emsp;__4__|__9__|__2__ </p><br>";
}

function showBoard(){
	document.getElementById("game-board").style.display="block";
}

function hideBoard(){
	document.getElementById("game-board").style.display="none";
}

function showFirstMoveOption(){
	document.getElementById("first-move-option").style.display="block";
}

function hideFirstMoveOption(){
	document.getElementById("first-move-option").style.display="none";
}

function showMenus(){
	document.getElementById("iON-menus").style.display="block";
}

function hideMenus(){
	document.getElementById("iON-menus").style.display="none";
}

function getClick(id){// player's move which is triggered from click
	if(playerMove)//restricting User to make a move if it is iON's move
	{
		var index_id=id.charAt(4);
		if(!board_array.includes(index_id)){
			move_counter++;
			board_array[index_id]=index_id;
			playerMovesArray[index_id]=index_id;
			document.getElementById(id).innerHTML="<span class='glyphicon glyphicon-remove'></span>";
			if(playerMovesArray.length>=3)
				if(checkWinner())
					return;
			//for next turn
			playerMove=false;
			iONMove=true;
			web_iON.random_move();
		}else{
			playerMove=true;
			return;
		}
	}
}

function getiONMove(id){
	if(iONMove)//restricting iON to make a move if it is player's move
	{
		var index_id=id.charAt(4);
		if(!board_array.includes(index_id)){
			move_counter++;
			board_array[index_id]=index_id;
			iONMovesArray[index_id]=index_id;
			document.getElementById(id).innerHTML="<span class='glyphicon glyphicon-record'></span>";
			document.getElementById("iONMoves").innerHTML+="<p> > move to box "+index_id+"</p>";
			if(iONMovesArray.length>=3)
				if(checkWinner())
					return;
			//for next turn
			iONMove=false;
			playerMove=true;
		}else{
			iONMove=true;
			web_iON.random_move();
			return;
		}
		
	}
}


function checkWinner(){
	var winner_sum=0;
	if(iONMove){
		winner_sum1=parseInt(iONMovesArray[8])+parseInt(iONMovesArray[1])+parseInt(iONMovesArray[6]);
		winner_sum2=parseInt(iONMovesArray[3])+parseInt(iONMovesArray[5])+parseInt(iONMovesArray[7]);
		winner_sum3=parseInt(iONMovesArray[4])+parseInt(iONMovesArray[9])+parseInt(iONMovesArray[2]);
		winner_sum4=parseInt(iONMovesArray[8])+parseInt(iONMovesArray[3])+parseInt(iONMovesArray[4]);
		winner_sum5=parseInt(iONMovesArray[1])+parseInt(iONMovesArray[5])+parseInt(iONMovesArray[9]);
		winner_sum6=parseInt(iONMovesArray[6])+parseInt(iONMovesArray[7])+parseInt(iONMovesArray[2]);
		winner_sum7=parseInt(iONMovesArray[8])+parseInt(iONMovesArray[5])+parseInt(iONMovesArray[2]);
		winner_sum8=parseInt(iONMovesArray[4])+parseInt(iONMovesArray[5])+parseInt(iONMovesArray[6]);
		if(winner_sum1==15||winner_sum2==15||winner_sum3==15||winner_sum4==15||winner_sum5==15||winner_sum6==15||winner_sum7==15||winner_sum8==15){
			document.getElementById("winner_text").innerHTML="<span class='glyphicon glyphicon-thumbs-down'> You Lost! iON is the Winner</span>";
			$("#winnerModal").modal("show");
			return true;
		}
	}
	else{
		winner_sum1=parseInt(playerMovesArray[8])+parseInt(playerMovesArray[1])+parseInt(playerMovesArray[6]);
		winner_sum2=parseInt(playerMovesArray[3])+parseInt(playerMovesArray[5])+parseInt(playerMovesArray[7]);
		winner_sum3=parseInt(playerMovesArray[4])+parseInt(playerMovesArray[9])+parseInt(playerMovesArray[2]);
		winner_sum4=parseInt(playerMovesArray[8])+parseInt(playerMovesArray[3])+parseInt(playerMovesArray[4]);
		winner_sum5=parseInt(playerMovesArray[1])+parseInt(playerMovesArray[5])+parseInt(playerMovesArray[9]);
		winner_sum6=parseInt(playerMovesArray[6])+parseInt(playerMovesArray[7])+parseInt(playerMovesArray[2]);
		winner_sum7=parseInt(playerMovesArray[8])+parseInt(playerMovesArray[5])+parseInt(playerMovesArray[2]);
		winner_sum8=parseInt(playerMovesArray[4])+parseInt(playerMovesArray[5])+parseInt(playerMovesArray[6]);
		if(winner_sum1==15||winner_sum2==15||winner_sum3==15||winner_sum4==15||winner_sum5==15||winner_sum6==15||winner_sum7==15||winner_sum8==15){
			document.getElementById("winner_text").innerHTML="<span class='glyphicon glyphicon-thumbs-up'> Congratulations! You won</span>";
			$("#winnerModal").modal("show");
			return true;
		}
	}
	//check if game is over
		if(move_counter>=9){
			document.getElementById("winner_text").innerHTML="It's a Tie";
			$("#winnerModal").modal("show");
			return true;
		}
	return false;
}

function resetGame(){
	board_array=[-10,-10,-10,-10,-10,-10-10,-10,-10,-10];
	playerMovesArray=[-10,-10,-10,-10,-10,-10-10,-10,-10,-10];
	iONMovesArray=[-10,-10,-10,-10,-10,-10-10,-10,-10,-10];
	playerMove=false;
	iONMove=false;
	move_counter=0;

	//to empty the board 
	for(var i=1;i<10;i++)
		document.getElementById("box-"+i).innerHTML="";
}

function newGame(){
	hideMenus();
	resetGame();
	hideBoard();
    showFirstMoveOption();
    $("#winnerModal").modal("hide");
}

function closeModal(){
	hideMenus();
	resetGame();
	hideBoard();
    showFirstMoveOption();
    $("#winnerModal").modal("hide");
}


/*End of Board Rendering*/

