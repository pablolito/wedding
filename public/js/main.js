/* main */
var ui = {};

$(function(){
	var $header = $("header"),
	$mainNavOpener = $(".open-nav-js"),
	$body = $("body"),
	$mainNav = $("#mainNav"),
	headerHeight = $header.outerHeight();

	/* event click */
	$mainNavOpener.on("click", function(){
		$mainNav.toggleClass("active");
	});

	$("#mainNav a").on("click", function(e){
		if(! $(this).hasClass("deco")){
			e.preventDefault();
			$mainNav.removeClass("active");
			var sectionId = $(this).attr("href");
			var posSectionId = $(sectionId).offset().top;
			posSectionId = posSectionId - headerHeight;
			$('html, body').animate({
				scrollTop : posSectionId
			}, "slow");
		}
	});
	
	/* event scroll */
	$(window).scroll(function(e) {
		var scrollPos = $(window).scrollTop();
		if(scrollPos>0){
			$body.css("padding-top", headerHeight);
			$header.addClass("fixed");
		}else{
			$header.removeClass("fixed");
			$body.css("padding-top", 0);
		}
	});
});