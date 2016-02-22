/* main */
var decal = 0;
var registrationStepByStep = {
	containerForm: ".form-track",
	nbFieldset : 4,
	fieldsetWidth : 648,
	init : function(){
		var containerForm = document.querySelectorAll(this.containerForm);
		for (var i = 0; i < containerForm.length; i++) {
			$("fieldset").css("width", this.fieldsetWidth);
		  containerForm[i].style.width = this.nbFieldset*this.fieldsetWidth+"px";
		}
	},
	nextStep : function(){
		decal = decal + this.fieldsetWidth;
		var myForm = document.querySelectorAll(this.containerForm);
		myForm[0].style.margin = "0 0 0 -"+decal+"px";
	}
};

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


	$('input:radio[name="goingBottom"]').change(function(){
		var formIndex = $(this).val();
		$(".hidden").hide();
        $(".hidden").eq(formIndex).show("normal", function(){
        	if(formIndex==1){
        		var fieldSetWidth = $(".form-track").outerWidth();
	        	registrationStepByStep.fieldsetWidth = fieldSetWidth;
	        	registrationStepByStep.init();
        	}
        });
    });
    $(".next-step").on("click", function(){
    	registrationStepByStep.nextStep();
    })
	
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

	
	/* Material design field */
	$('.field-input').focus(function(){
		$(this).parent().addClass('is-focused has-label');
	})

	$('.field-input').blur(function(){
		$parent = $(this).parent();

		if($(this).val() == ''){
			$parent.removeClass('has-label');
		}

		$parent.removeClass('is-focused');
	});
});

	





