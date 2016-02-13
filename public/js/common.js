/* common */

// global event click or touch
if ('ontouchend' in window) {
  /* browser with Touch Events running on touch-capable device */
    CLICK_OR_TOUCH = "touchend";
}else{
	CLICK_OR_TOUCH = "click";
}


$(function(){

	var $customList = $(".custom-list"),
	$targetCustomList = $(".custom-list .open-list-js");
    
    /* init menu list click */
  	initDropDowns($customList);
	
	// menu list action selection	
	$(".custom-list ul").on("click", "li", function(e){
		var txtVal = $(this).text(),
		id = $(this).attr("data-id"),
		$refTarget = $(this).closest(".custom-list").find(".ref"),
		$list = $(this).closest(".custom-list");
		
		$refTarget.text(txtVal);
		$list.find("input").val(id); /* id is passed in hidden input */
		$list.removeClass("open"); /* close list */
	});

	// footer position
	checkFooterPosition();

	/* tooltip show / hide */
	var tooltipContainer = "body";
	$(tooltipContainer).on(CLICK_OR_TOUCH, ".tooltip-js", function(e){
		console.log(e)
		$(this).toggleClass("active");
	});

	/* show popin big img */
	var popinContainer = "body";
	$(popinContainer).on(CLICK_OR_TOUCH, ".popin-js", function(){
		showPopIn();
	});

	/* show / hide bloc result */
	$(".dropdown").on(CLICK_OR_TOUCH, ".open-detail-js", function(e){
		if(e.target.nodeName!=="IMG"){
			$(this).toggleClass("active");
			checkFooterPosition();
		}
	});


	/* common functions */
	function initDropDowns(allMenus) {

	    allMenus.children(".open-list-js").on(CLICK_OR_TOUCH, function() {
	        
	        var thisTrigger = $(this),
	            thisMenu = thisTrigger.parent(),
	            thisPanel = thisTrigger.next();

	        if (thisMenu.hasClass("open")) {
	            thisMenu.removeClass("open"); 
	            $(document).off(CLICK_OR_TOUCH);                                 
	            thisPanel.off(CLICK_OR_TOUCH);
	        } else {                 
	            allMenus.removeClass("open");   
	            thisMenu.addClass("open"); 
	            $(document).on(CLICK_OR_TOUCH, function() {
	                allMenus.removeClass("open");
	            });
	            thisPanel.on(CLICK_OR_TOUCH, function(e) {
	                e.stopPropagation();
	            });
	        }
	        return false;
	    });
	}

	function showPopIn(){
		var modalImg = "<div class='popin'><div class='popin-cnt'><span class='ico ico-uEA01-cross-close'></span></div></div>";
		$("body").append(modalImg);
		setTimeout(function(){ $(".popin").css("opacity", "1"); },500);
		
		$(".popin").on(CLICK_OR_TOUCH, function(e){
			console.log(e.target.className);
			if( (e.target.className=="popin") || (e.target.className=="ico ico-uEA01-cross-close") ){
				$(this).remove();
			}
		});
	}

	function checkFooterPosition(){
		var windowHeight = $(window).height();
		var bodyHeight = $("body").height();
		if(windowHeight>bodyHeight){
			$("footer").addClass("fixed");
		}else{
			$("footer").removeClass("fixed");
		}
	}


	// event resize
	$(window).resize(function(){
		// position footer
		checkFooterPosition();
	});


});



