/* main */
var ui = {

	popin:function(){
		width: "380px"

	},
	tooltip: function(){

	},
	navfix: function(){

	}
}

$(function(){
	var $header = $("header"),
	headerHeight = $header.outerHeight();

	/* event click */
	$(".open-nav-js").on("click", function(){
		$("#mainNav").toggleClass("active");
	});
	/* event scroll */
	$(window).scroll(function(e) {
		var scrollPos = $(window).scrollTop();
		if(scrollPos>0){
			$("body").css("padding-top", headerHeight);
			$header.addClass("fixed");
		}else{
			$header.removeClass("fixed");
			$("body").css("padding-top", 0);
		}
	});
});