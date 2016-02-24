/* main */
var decal = 0,
	targetForm = "",
	formWidth = "",
	index = 0,
	computedStyle = "",
	cpt = 0,
	rtime,
	timeout = false,
	delta = 200;


function initMdeInput(){
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
}

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
		console.log($(".prog .cnt-center").width());
        registrationStepByStep.fieldsetWidth = $("#registrationFormYes").width();
        registrationStepByStep.init();
        mapPosition = $("#map").offset();
    }               
}


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


var addGuest = function(){
	cpt++;
	var htmlGuestField = "<div class='field mt1'><label for='guestFirstName"+cpt+"' class='field-label'>Prénom</label><input type='text' name='guestFirstName"+cpt+"' id='guestFirstName"+cpt+"' class='field-input'></div><div class='field'><label for='guestName"+cpt+"' class='field-label'>Nom</label><input type='text' name='guestName"+cpt+"' id='guestName"+cpt+"' class='field-input'></div>";
	$("fieldset.current").append(htmlGuestField);

	
}

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
		
		// decal adaptation on resize
		if(index!==0){
			var newMarginLeftVal = -(this.fieldsetWidth*index);
			targetForm.style.marginLeft = newMarginLeftVal+"px";
			decal = newMarginLeftVal;
		}

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


/* google map init */
var map,
bezardiereCoord = {lat: 47.414042, lng: 0.876497},
mairieCoord = {lat: 47.404745, lng: 0.710967},
centerCoord = {lat: 47.4092033, lng: 0.7890192},
contentString1 = '<span class="txtb">Mairie annexe de Sainte Radegonde</span>,<br /> Place Alexandre Rousseau, Tours',
contentString2 = '<span class="txtb">Domaine La Bézardière</span>,<br />Rue de la Bézardière, 37210 Noizay';

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	center: centerCoord,
	zoom: 12,
	scrollwheel: false
	});

	var marker1 = new google.maps.Marker({
	    position: mairieCoord,
	    map: map,
	    icon: {
      		path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      		scale: 5,
      		strokeColor: "#aa8bbe"
    	},
	    title: 'La mairie de Sainte-Radegonde !!'
  	});
  	marker1.addListener('click', function() {
    	infowindow1.open(map, marker1);
  	});
  	document.getElementById("location1").onclick=function() {
    	infowindow1.open(map, marker1);
    	//var mapPosition = document.getElementById('map').offsetTop;
    	document.body.scrollTop = mapPosition.top;
  	};

  	var marker2 = new google.maps.Marker({
	    position: bezardiereCoord,
	    map: map,
	    title: 'La bézardière !!',
	    icon: {
      		path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      		scale: 5,
      		strokeColor: "#aa8bbe"
    	}
  	});
  	marker2.addListener('click', function() {
    	infowindow2.open(map, marker2);
  	});
  	document.getElementById("location2").onclick=function() {
    	infowindow2.open(map, marker2);
    	document.body.scrollTop = mapPosition.top;
  	};

  	var infowindow1 = new google.maps.InfoWindow({
    	content: contentString1
	});
	var infowindow2 = new google.maps.InfoWindow({
    	content: contentString2
	});
}

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

	/* event form */
	$(".add-guest-js").on("click", function(){
		//console.log("event add guest");
		addGuest();
		initMdeInput();
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
    });
    $(".prev-step").on("click", function(){
    	registrationStepByStep.prevStep();
    });

    /* google map event */
    mapPosition = $("#map").offset();
	
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
	    rtime = new Date();
	    if (timeout === false) {
	        timeout = true;
	        setTimeout(resizeend, delta);
    	}
	});

	
	/* Material design effect on field */
	initMdeInput();


});

	





