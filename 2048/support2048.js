function getPosTop(i){
	return 20*(i+1)+100*i;
}
function getPosLeft(j){
	return 20*(j+1)+100*j;
}

function getNumberBackgroundColor(number){
	switch(number) {
		case 2:   return "#eee4da";break;
		case 4:   return "#ede0c8";break;
		case 8:   return "#f2b179";break;
		case 16:  return "#f59563";break;
		case 32:  return "#f67c5f";break;
		case 64:  return "#f65e3b";break;
		case 128: return "#edcf72";break;
		case 256: return "#edcc61";break;
		case 512: return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2028:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}

	return "black";
}

function getNumberFontsize(number){
	switch(number) {
		case 128: return "50px";break;
		case 256: return "50px";break;
		case 512: return "50px";break;
		case 1024:return "40px";break;
		case 2028:return "40px";break;
		case 4096:return "40px";break;
		case 8192:return "40px";break;
	}
	return "60px";
}

function getNumberColor(number){
	if(number<=4)
		return "#776e65"
	else
		return "white"
}

function nospace(board){
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			if(board[i][j]==0)
				return false;
		}
	return true;
}

function canMoveLeft(board){
	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				if(board[i][j-1]==0||board[i][j-1]==board[i][j])
					return true;
			}
		}
		return false;
}

function canMoveUp(board){
	for(var i=1;i<4;i++)
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				if(board[i-1][j]==0||board[i-1][j]==board[i][j])
					return true;
			}
		}
		return false;
}

function canMoveRight(board){
	for(var i=0;i<4;i++)
		for(var j=0;j<3;j++){
			if(board[i][j]!=0){
				if(board[i][j+1]==0||board[i][j+1]==board[i][j])
					return true;
			}
		}
		return false;
}

function canMoveDown(board){
	for(var i=0;i<3;i++)
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				if(board[i+1][j]==0||board[i+1][j]==board[i][j])
					return true;
			}
		}
		return false;
}

/*这是视频中用到的一个方法
function noBlockHorizontal(row,col1,col2,board){
	for(var i=col1+1;i<col2;i++){
		if(board[row]!=0)
			return false;
	}
	return true;
}*/

function nomove(board){
	if(canMoveDown(board)||
		canMoveLeft(board)||
		canMoveRight(board)||
		canMoveUp(board)
		)
		return false;
	return true;
}