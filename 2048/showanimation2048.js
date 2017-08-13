function showNumberWithAnimation(i,j,number){
	var numberCell=$("#number-cell-"+i+"-"+j);
	numberCell.css("background-color",getNumberBackgroundColor(number));
	numberCell.css("color",getNumberColor(number));
	numberCell.css("font-size",getNumberFontsize(number));
	numberCell.text(number);
	numberCell.animate({
		"width":"100px",
		"height":"100px",
		"top":getPosTop(i),
		"left":getPosLeft(j),
	},50);
}

function showMoveAnimation(fromx,fromy,tox,toy){
	var numberCell=$("#number-cell-"+fromx+"-"+fromy);
	numberCell.animate({
		top:getPosTop(tox),
		left:getPosLeft(toy),
	},200);
}

function updateScore(score){
	$("#score").text(score);	
}