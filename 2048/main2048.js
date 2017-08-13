var board = [];
var score=0;

$(function(){
	init();
});

function newgame(){
	//初始化棋盘格
	init();
	//在随机两个格子生成函数
	generateOneNumber();
	generateOneNumber();
}

function init(){
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			var gridCell=$("#grid-cell-"+i+"-"+j);
			gridCell.css("top",getPosTop(i));
			gridCell.css("left",getPosLeft(j));
		}
	for(var i=0;i<4;i++){
		board[i]=[];
		for(var j=0;j<4;j++)
			board[i][j]=0;
		}

	updateBoardView();
	score=0;
	updateScore(score);
}

function updateBoardView(){
	$(".number-cell").remove();
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell=$("#number-cell-"+i+"-"+j);
			if(board[i][j]==0){
				theNumberCell.css("width","0px");
				theNumberCell.css("height","0px");
				theNumberCell.css("top",getPosTop(i)+50);
				theNumberCell.css("left",getPosLeft(j)+50);
				theNumberCell.css("font-size","0px");
			}
			else{
				theNumberCell.css("width","100px");
				theNumberCell.css("height","100px");
				theNumberCell.css("top",getPosTop(i));
				theNumberCell.css("left",getPosLeft(j));
				theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
				theNumberCell.css("color",getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
				theNumberCell.css("font-size",getNumberFontsize(board[i][j]));
			}
		}
}

function generateOneNumber(){
	if(nospace(board))
		return false;
	else{
		//随机一个位置
		var randx=parseInt(Math.floor(Math.random()*4));
		var randy=parseInt(Math.floor(Math.random()*4));
		var times=0;
		while(times<50){
			if(board[randx][randy]==0) break;
			randx=parseInt(Math.floor(Math.random()*4));
			randy=parseInt(Math.floor(Math.random()*4));
			times++;
		}
		if(times==50){
			for(var i=0;i<4;i++)
				for(var j=0;j<4;j++)
					if(board[i][j]==0){
						randx=i;
						randy=j;
					}
		}
		//随机一个数字
		var randNumber=Math.random()<0.5?2:4;
		board[randx][randy]=randNumber;
		setTimeout("showNumberWithAnimation("+randx+","+randy+","+randNumber+")",210);
		return true;
	}
}

$(document).keydown(function(event){
	switch(event.keyCode) {
		case 37:  //left
			if(moveLeft()){
				generateOneNumber();
				setTimeout("isgameover()",300);
			}
			return false;		
			break;
		case 38:  //up
			if(moveUp()){
				generateOneNumber();
				setTimeout("isgameover()",300);
			}
			return false;	
			break;
		case 39:  //right
			if(moveRight()){
				generateOneNumber();
				setTimeout("isgameover()",300);
			}
			return false;
			break;
		case 40:  //down
			if(moveDown()){
				generateOneNumber();
				setTimeout("isgameover()",300);
			}	
			return false;
			break;
		default:break;
	}
})


/*这是视频中向左的方法
function moveLeft(){
	if(!canMoveLeft(board))
		return false;
	for(i=0;i<4;i++)
		for(j=0;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j]&& noBlockHorizontal(i,k,j,board)){
						showMoveAnimation(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						continue;
					}
				}
			}
		}
	updateBoardView();
	return true;
}
*/
//下面是我自己想的方法
function moveLeft(){
	if(!canMoveLeft(board))
		return false;
	for(var i=0;i<4;i++){
		var a=0;     //此参数改变防止已经加过的地方再次运算
		for(var j=1;j<4;j++){
					if(board[i][j]!=0){
						var k=j-1;
						while (board[i][k]==0&&k>a)
							k--;
						if(board[i][k]==0){
							showMoveAnimation(i,j,i,k);
							board[i][k]=board[i][j];
							board[i][j]=0;
						}
						else if(board[i][k]==board[i][j]){
							showMoveAnimation(i,j,i,k);
							board[i][k]=board[i][k]+board[i][j];
							board[i][j]=0;
							a=k+1;
							score+=board[i][k];
							if(board[i][k]==2048)
								setTimeout("win()",210);
							updateScore(score);
						}
						else if((k+1)!=j){
							showMoveAnimation(i,j,i,k+1);
							board[i][k+1]=board[i][j];
							board[i][j]=0;
						}
					}
				}
			}
		setTimeout("updateBoardView()",200);
		return true;
}

function moveUp(){
	if(!canMoveUp(board))
		return false;
	for(var j=0;j<4;j++){
		var a=0;     //此参数改变防止已经加过的地方再次运算
		for(var i=1;i<4;i++){
					if(board[i][j]!=0){
						var k=i-1;
						while (board[k][j]==0&&k>a)
							k--;
						if(board[k][j]==0){
							showMoveAnimation(i,j,k,j);
							board[k][j]=board[i][j];
							board[i][j]=0;
						}
						else if(board[k][j]==board[i][j]){
							showMoveAnimation(i,j,k,j);
							board[k][j]=board[k][j]+board[i][j];
							board[i][j]=0;
							a=k+1;
							if(board[k][j]==2048)
								setTimeout("win()",210);
							score+=board[k][j];
							updateScore(score);
						}
						else if((k+1)!=i){
							showMoveAnimation(i,j,k+1,j);
							board[k+1][j]=board[i][j];
							board[i][j]=0;
						}
					}
				}
			}
		setTimeout("updateBoardView()",200);
		return true;
}

function moveRight(){
	if(!canMoveRight(board))
		return false;
	for(var i=0;i<4;i++){
		var a=3;     //此参数改变防止已经加过的地方再次运算
		for(var j=2;j>=0;j--){
					if(board[i][j]!=0){
						var k=j+1;
						while (board[i][k]==0&&k<a)
							k++;
						if(board[i][k]==0){
							showMoveAnimation(i,j,i,k);
							board[i][k]=board[i][j];
							board[i][j]=0;
						}
						else if(board[i][k]==board[i][j]){
							showMoveAnimation(i,j,i,k);
							board[i][k]=board[i][k]+board[i][j];
							board[i][j]=0;
							a=k-1;
							if(board[i][k]==2048)
								setTimeout("win()",210);
							score+=board[i][k];
							updateScore(score);
						}
						else if((k-1)!=j){
							showMoveAnimation(i,j,i,k-1);
							board[i][k-1]=board[i][j];
							board[i][j]=0;
						}
					}
				}
			}
		setTimeout("updateBoardView()",200);
		return true;
}
function moveDown(){
	if(!canMoveDown(board))
		return false;
	for(var j=0;j<4;j++){
		var a=3;     //此参数改变防止已经加过的地方再次运算
		for(var i=2;i>=0;i--){
					if(board[i][j]!=0){
						var k=i+1;
						while (board[k][j]==0&&k<a)
							k++;
						if(board[k][j]==0){
							showMoveAnimation(i,j,k,j);
							board[k][j]=board[i][j];
							board[i][j]=0;
						}
						else if(board[k][j]==board[i][j]){
							showMoveAnimation(i,j,k,j);
							board[k][j]=board[k][j]+board[i][j];
							board[i][j]=0;
							a=k-1;
							if(board[k][j]==2048)
								setTimeout("win()",210);
							score+=board[k][j];
							updateScore(score);
						}
						else if((k-1)!=i){
							showMoveAnimation(i,j,k-1,j);
							board[k-1][j]=board[i][j];
							board[i][j]=0;
						}
					}
				}
			}
		setTimeout("updateBoardView()",200);
		return true;
}


function isgameover(){
	if(nospace(board)&&nomove(board))
		gameover();
}
function gameover(){
	var pannel=$("#lose");
	pannel.show();
	$("#lose button").click(function(){
		pannel.hide();
		init();
	});
}

function win(){
	var pannel=$("#win");
	pannel.show();
	$("#win #yes").click(function(){
		pannel.hide();
	})
	$("#win #no").click(function(){
		pannel.hide();
		init();
	})
}