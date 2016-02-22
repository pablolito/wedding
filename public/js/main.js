/* main */
var addNavigationBtn = function(marginLeft, limit){
	var limit = limit-446;
	limit = "-"+limit+"px";
	if(marginLeft=="0px"){
		console.log("first");
	}
	console.log(marginLeft+" "+limit);
	if(marginLeft==limit){
		console.log("last");
	}
}
var decal = 0,
	targetForm = "",
	formWidth = "",
	computedStyle = "";
var registrationStepByStep = {
	containerForm: "#form-track",
	nbFieldset : 5,
	fieldsetWidth : 648,
	init : function(){
		targetForm = document.querySelector(this.containerForm);
		$("fieldset").css("width", this.fieldsetWidth);
		//console.log(this.containerForm);
		formWidth = this.nbFieldset*this.fieldsetWidth;
		targetForm.style.width = formWidth+"px";
		computedStyle = getComputedStyle(targetForm) || targetForm.currentStyle;
		addNavigationBtn(computedStyle.marginLeft, formWidth);
	},
	nextStep : function(){
		decal = decal - this.fieldsetWidth;
		targetForm.style.marginLeft = decal+"px";
		setTimeout(function(){ addNavigationBtn(computedStyle.marginLeft, formWidth); },1000)
	},
	prevStep : function(){
		decal = decal + this.fieldsetWidth;
		targetForm.style.marginLeft = decal+"px";
		addNavigationBtn(computedStyle.marginLeft, formWidth);
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
        		var fieldSetWidth = $("fieldset").outerWidth();
	        	registrationStepByStep.fieldsetWidth = fieldSetWidth;
	        	registrationStepByStep.init();
        	}
        });
    });
    $(".next-step").on("click", function(){
    	registrationStepByStep.nextStep();
    })
    $(".prev-step").on("click", function(){
    	registrationStepByStep.prevStep();
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

	





