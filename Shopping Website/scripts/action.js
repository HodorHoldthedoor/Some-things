//  搜索框效果
$(function(){
	$(".search input").focus(function(){
		this.placeholder="";
	}).blur(function(){
		this.placeholder="输入商品名称";
	})
})

//  皮肤更换
$(function(){
	var skinnodes=$("#skin li");
	skinnodes.click(function(){
		switchSkin(this.id);
	});
	var cookie_skin=$.cookie("MyCssSkin");
	if(cookie_skin){
		switchSkin(cookie_skin);
	}
});
function switchSkin(skinName){
	$("#"+skinName).addClass("selected")
	.siblings().removeClass("selected");
	$("#cssfile").attr("href","styles/"+skinName+".css");
	$.cookie("MyCssSkin",skinName,{path:'/',expires:10});
}

//导航条效果
$(function(){
	$("#nav li").hover(function(){
		$(this).find(".jnNav").show();
	},function(){
		$(this).find(".jnNav").hide();
	});
});

//热门品牌
$(function(){
	var spannode=$("<span class='hot'></span>");
	$(".promoted").append(spannode);
})

//中间图片轮播

function showImg(index){
	var rolllist=$("#imageScroll div a");
	var newhref=rolllist.eq(index).attr("href");
	$("#JS_imgWrap").attr("href",newhref)
					.find("img").eq(index).stop(true,true).fadeIn()
					.siblings().fadeOut();
	rolllist.eq(index).addClass("chos")
			.siblings().removeClass("chos");
}
$(function(){
	var index=0;
	var imgroll=$("#imageScroll div a");
	var len=imgroll.length;
	var adTimer=null;
	imgroll.mouseover(function(){
		index=imgroll.index(this);
		showImg(index);
	}).eq(0).mouseover();
	$("#imageScroll").hover(function(){
		if(adTimer){
			clearInterval(adTimer);
		}
	},function(){
		adTimer=setInterval(function(){
			showImg(index);
			index++;
			if(index==len){index=0;}
		},3000);
	}).trigger("mouseleave");
})


//最新动态添加提示
$(function(){
	$("#noticeInfo a").hover(function(e){
		var myTitle=this.title;
		this.title="";
		var tooltip="<div class='tooltip'>"+myTitle+"</div>";
		$("body").append(tooltip);
		$(".tooltip").css({
			"top":(e.pageY+20)+"px",
			"left":(e.pageX+10)+"px"
		}).show("fast");
	},function(){
		this.title=$(this).text();
		$(".tooltip").remove();
	}).mousemove(function(e){
		$(".tooltip").css({
			"top":(e.pageY+20)+"px",
			"left":(e.pageX+10)+"px"
		});
	});
})

//图片滚动效果
$(function(){
	$("#brandTab li a").click(function(){
		$(this).parent().addClass("chos")
			   .siblings().removeClass("chos");
		var idx=$("#brandTab li a").index(this);
		showBrandList(idx);
		return false;
	}).eq(0).click();
})
function showBrandList(index){
	var rollobj=$("#brandList");
	var rollWidth=(rollobj.find("li").width()+10)*4;
	rollobj.stop(true,false).animate({left:-rollWidth*index},1000);
}