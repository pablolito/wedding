/* main */
var displayNavigationBtn = function(index, targetForm, nbFieldset){
	var parentForm = $(targetForm).parent(),
		prevBtn = parentForm.find(".prev-step"),
		nextBtn = parentForm.find(".next-step"),
		subBtn = parentForm.find("input[type=submit]");
	if(index==0){
		prevBtn.hide();
		subBtn.hide();
		setTimeout(function(){
			$("#activationForm").fadeIn();
		}, 3000);
		
	}else if(index==nbFieldset-1){
		nextBtn.hide();
		subBtn.show();
	}else{
		nextBtn.show();
		prevBtn.show();
		subBtn.hide();
		$("#activationForm").hide();
	}
}

var decal = 0,
	targetForm = "",
	formWidth = "",
	index = 0,
	computedStyle = "";
var registrationStepByStep = {
	containerForm: "#form-track",
	nbFieldset : 5,
	fieldsetWidth : 648,
	init : function(){
		targetForm = document.querySelector(this.containerForm);
		$("fieldset").css("width", this.fieldsetWidth);
		formWidth = this.nbFieldset*this.fieldsetWidth;
		targetForm.style.width = formWidth+"px";
		displayNavigationBtn(index, this.containerForm, this.nbFieldset);
	},
	nextStep : function(){

		decal = decal - this.fieldsetWidth;
		targetForm.style.marginLeft = decal+"px";
		index++;

		$(this.containerForm+" fieldset").removeClass("current");
		$(this.containerForm+" fieldset:eq("+index+")").addClass("current");

		displayNavigationBtn(index, this.containerForm, this.nbFieldset);
		
	},
	prevStep : function(){
		
		decal = decal + this.fieldsetWidth;
		targetForm.style.marginLeft = decal+"px";
		index--;
		$(this.containerForm).find("fieldset").removeClass("current");
		$(this.containerForm).find("fieldset:eq("+index+")").addClass("current");

		displayNavigationBtn(index, this.containerForm, this.nbFieldset);

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

	/* event resize */
	$(window).resize(function(){
		/*var fieldSetWidth = $("fieldset").outerWidth();
			console.log(fieldSetWidth);
	        registrationStepByStep.fieldsetWidth = fieldSetWidth;
	        registrationStepByStep.init();*/
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

	





