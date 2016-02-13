/* main */
var ui = {

}


$(function(){
	/* event */
	$(".open-nav-js").on("click", function(){
		$(this).siblings().toggleClass("active");
	});
});