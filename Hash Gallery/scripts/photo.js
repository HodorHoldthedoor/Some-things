/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-07-03 15:13:34
 * @version $Id$
 */

window.onload=function(){
    	var num=random([0,data.length]);
    	addPhoto();
    	rsort(num);
}

    //1.翻面控制
    	function turn(elem){
    		var cls=elem.className;
            if(/photo_center/.test(cls)){
        		if(/photo_front/.test(cls)){          //检测cls中是否有photo_front字符串
        			cls=cls.replace(/photo_front/,'photo_back');
        		} 
        		else {
        			cls=cls.replace(/photo_back/,'photo_front');
        		}
                return elem.className=cls;
            }
            else{
                    var idname = elem.id;
                    var idnum=idname.split('_')[1];
                    rsort(idnum);
                }
    }

    //2.通用函数
    	function g(selector){
    		var method=selector.substr(0,1)=='.'? 'getElementsByClassName' : 'getElementById';
    		return document[method](selector.substr(1))     //substr(i,l)   字符串从第i位开始，取l位字符；l不写，直接取到最后
    	}

    //随机生成数值(随机数生成器)  random([min,max])
    	function random(range){
    		var max=Math.max(range[0],range[1]);
    		var min=Math.min(range[0],range[1]);
    		var diff=max-min;
    		var number=Math.floor(Math.random()*diff+min);
    		return number;
    	}

    //3.输出所有海报
    	var data=data;
    	function addPhoto(){
    		var template=g('#wrap').innerHTML;
    		var html=[];
            var nav=[];

    		for(var s=0;s<data.length;s++){
    			var _html=template
    						.replace('{{index}}',s)
    						.replace('{{img}}',data[s].img)
    						.replace('{{caption}}',data[s].caption)
    						.replace('{{desc}}',data[s].desc);
    			html.push(_html);
                nav.push('<span id="nav_'+s+'" class="i" onclick="turn(g(\'#photo_'+s+'\'))">&nbsp;</span>')
    		}
            html.push('<div class="nav">'+nav.join('')+'</div>')
    		g('#wrap').innerHTML=html.join('');
    	}


    //5.计算左右分区的范围
        function range(){
             var range={left:{x:[],y:[]},right:{x:[],y:[]}};

             var wrap={
                w:g('#wrap').clientWidth,
                h:g('#wrap').clientHeight
             }
             var photo={
                w:g('.photo')[0].clientWidth,
                h:g('.photo')[0].clientHeight
             }
             range.left.x=[0,wrap.w/2-photo.w];
             range.left.y=[0,wrap.h];
             range.right.x=[wrap.w/2+photo.w/2,wrap.w+photo.w];
             range.right.y=[0,wrap.h];
             return range;
        }

    //4.排序海报
		function rsort(n){

			var _photo=g('.photo');
            var photos=[];
			for(var s=0; s<_photo.length; s++)
			{
				_photo[s].className='photo photo_front';
                //\s*是去除所有空格
                _photo[s].style.left='';
                _photo[s].style.top='';
                _photo[s].style['-webkit-transform']='rotate(0deg) scale(1.2)';
			     photos.push(_photo[s]);

            }
			var photos_center=g('#photo_'+n);
			photos_center.className +=' photo_center';
            photos_center=photos.splice(n,1)[0];
            //a=[1 2 3],b=a.splice(2,1),b得到3，代表从第2个元素开始删除一位，此操作后a=[1,2]

            //把海报分为左、右两个部分
            var photos_left=photos.splice(0,Math.ceil(photos.length/2));
            var photos_right=photos;
            var ranges=range();
            for(s in photos_left){
                var photo=photos_left[s];
                //photo.style.left='10px';
                //photo.style.top='10px';
                photo.style.left=random(ranges.left.x)+'px';
                photo.style.top=random(ranges.left.y)+'px';
                photo.style['-webkit-transform']='rotate('+random([-60,60])+'deg) scale(.9)';
            }
            for(s in photos_right){
                var photo=photos_right[s];
                photo.style.left=random(ranges.right.x)+'px';
                photo.style.top=random(ranges.right.y)+'px';
                photo.style['-webkit-transform']='rotate('+random([-60,60])+'deg) scale(.9)';
            }

            //控制按钮处理
            var navs=g('.i');
            for(var s=0;s<navs.length;s++){
                navs[s].className=navs[s].className.replace(/\s*i_current\s*/,' ');
            }
            g('#nav_'+n).className += ' i_current ';
		}
