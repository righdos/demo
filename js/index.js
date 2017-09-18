/* su  tian  bin   2016-01-08  start*/
var GLOBLE = GLOBLE || {};
$(function(){
	
	$("#header").load("header.html");
	$("#footer").load("footer.html");
	
	//banner轮播
	//为了避免和其他代码之间变量的影响，这里将轮播的js写成函数自执行的形式
	(function(){
		var oDiv = $('.banner_wrap');
		var oPrev = oDiv.find(".prev");
		var oNext = oDiv.find(".next");
		var aSpan = oDiv.find(".middle span");
		var animateFater = null;
		var nowIndex = 0;

		oNext.click(function(){
			if( nowIndex < ($(".banner_change .middle span").length-1) ){
				nowIndex++;
			}else{
				nowIndex = 0;
			}
			bannerAnimate();
		});
		
		oPrev.click(function(){
			if( nowIndex >0 ){
				nowIndex--;
			}else{
				nowIndex = ($(".banner_change .middle span").length-1)
			}
			bannerAnimate();
		});
		
		aSpan.click(function(){
			nowIndex = $(this).index();
			bannerAnimate();
		})

		function bannerAnimate(){
			
			$(".banner_change .middle span").removeClass("now");
			$(".banner_change .middle span").eq(nowIndex).addClass("now");
			$(".banner_one").fadeOut(200);
			animateFater = $(".banner_one").eq(nowIndex);
			animateFater.fadeIn(200);
			animateImage()
		}
		
		function animateImage(){
			animateFater.find(".image01").show().addClass("animated  fadeInLeft");
			setTimeout(function(){
				animateFater.find(".image02").show().addClass("animated  bounceInRight");
				animateFater.find(".image03").show().addClass("animated  fadeIn");
			},300);
		}
		
		//进来的时候先运动一下第一页(这里只需要将banner内部的image运动，所以把image运动单独提出来放一个函数)
		animateFater = $(".banner_one").eq(0);
		animateImage();
	})();
	
	
	/*产品介绍左侧步骤线点击*/
	(function(){
		var nowIndex = 0;
		$("#chanping01 .now_line span").click(function(){
			var index = $("#chanping01 .now_linebtn_one").index($(this).parent());
			var action = (nowIndex>index)?"fadeInLeft":"fadeInRight";
			nowIndex = index;
			doFade(action);
		});
		$("#chanping01 .change_line .next").click(function(){
			nowIndex++;
			if(nowIndex>=$("#chanping01 .now_linebtn_one").length){
				nowIndex = 0;
			}
			doFade("fadeInRight");
		});
		$("#chanping01 .change_line .prev").click(function(){
			nowIndex--;
			if(nowIndex<0){
				nowIndex = $("#chanping01 .now_linebtn_one").length-1;
			}
			doFade("fadeInLeft");
		});
		
		function doFade(action){
			$("#chanping01 .now_linebtn_one").removeClass("now").eq(nowIndex).addClass("now");
			$("#chanping01 .content_one").fadeOut(0).eq(nowIndex).fadeIn(200);
			$("#chanping01 .content_one").eq(nowIndex).find("h1, p, img").attr("class","").addClass("animated "+action);
		}
	})();
	
	
	/*公司简介只有一页时，让所有的切换点击不可用*/
	$(".jianjie .now_line, .jianjie .change_line span").css("opacity",'0')
	
	/*业务范围展开收起js*/
	$(".yewu .centerimg, .yewu .shousuo_icon").hover(function(){
		$(this).addClass("animated tada");
	},function(){
		$(this).removeClass("animated tada");
	});
	
	$(".yewu .centerimg").each(function(index){
		$(this).click(function(){
			if($(".yewu .shousuo_icon").eq(index).hasClass("zhankai")){
				$(".yewu .yewucontent_ditail").slideUp(300);
				$(".yewu .shousuo_icon").removeClass("zhankai");
			}else{
				$(".yewu .yewucontent_ditail").slideUp(300).delay(300).eq(index).slideDown(300);
				$(".yewu .shousuo_icon").removeClass("zhankai").eq(index).addClass("zhankai");
			}
			
			
		})
	})
	$(".yewu .shousuo_icon").click(function(){
		if($(this).hasClass("zhankai")){
			$(".yewu .yewucontent_ditail").slideUp(300);
			$(".yewu .shousuo_icon").removeClass("zhankai");
		}else{
			var index = $(".yewu .shousuo_icon").index($(this));
			$(".yewu .yewucontent_ditail").slideUp(300).delay(300).eq(index).slideDown(300);
			$(".yewu .shousuo_icon").removeClass("zhankai").eq(index).addClass("zhankai");
		}
	})
	
	//团队介绍头像鼠标移入效果
	$(".team_box .headimg").hover(function(){
		$(this).find("a").stop().fadeIn(400);
	},function(){
		$(this).find("a").stop().fadeOut(400);
	})
	
	//联系我们的输入框focus效果
	$(".lianxi input, .lianxi textarea").focus(function(){
		$(this).closest(".input_box").addClass("focus_input_box");
	}).blur(function(){
		$(this).closest(".input_box").removeClass("focus_input_box");
	});
	
	
	
	
	//团队介绍轮播
	(function(){
		var oDiv = $('.teamcontent_wrap');
		var oPrev = oDiv.find(".prev");
		var oNext = oDiv.find(".next");
		var moveDiv = oDiv.find(".team_move");
		var timer = null;
		var nextTimer = null;
		var prevTimer = null;
		var nowIndex = 0;
		
		oPrev.click(function(){
			clearInterval( prevTimer );
			prevTimer = setTimeout(function(){
				doPrev();
			},200)
			
		});
		oNext.click(function(){
			clearInterval( nextTimer );
			nextTimer = setTimeout(function(){
				doNext();
			},200)
			
		});
		oDiv.hover(function(){
				clearInterval( timer );
		}, autoMove)
		
		function autoMove(){
			clearInterval( timer );
			timer = setInterval(function(){
					doNext();
				},5500)
			
		}
		autoMove();
		
		function doPrev(){
			if(moveDiv.find(".twoteam_wrap").length>2){
				
				moveDiv.find(".twoteam_wrap:last").insertBefore(moveDiv.find(".twoteam_wrap:first"));
				moveDiv.animate({"left": "-1100px"},0);
				moveDiv.animate({"left": "0px"},1000,'backOut');
				
				nowIndex--;
				if(nowIndex < 0){
					nowIndex = oDiv.find(".middle_points").find("span").length -1;
				}
				oDiv.find(".middle_points").find("span").removeClass("now").eq(nowIndex).addClass("now");
				
			}else{
				oDiv.find(".prev, .next").css("opacity","0.3");
			}
			
		}
		function doNext(){
			if(moveDiv.find(".twoteam_wrap").length>2){
				moveDiv.animate({"left": "-1100px"},1000,'backIn',function(){
					moveDiv.find(".twoteam_wrap:first").appendTo(moveDiv);
					moveDiv.animate({"left": "0px"},0);
				});
				
				nowIndex++;
				if(nowIndex >= oDiv.find(".middle_points").find("span").length){
					nowIndex = 0;
				}
				oDiv.find(".middle_points").find("span").removeClass("now").eq(nowIndex).addClass("now");
			}else{
				oDiv.find(".prev, .next").css("opacity","0.3");
			}
		}
	})();
	

	
	
		
	
	
})

