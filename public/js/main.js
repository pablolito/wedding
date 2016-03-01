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
		//console.log($(".prog .cnt-center").width());
        if($('input:radio[name="goingBottom"]').is(":checked")){
        	registrationStepByStep.fieldsetWidth = $(".prog .cnt-center").width();
        	registrationStepByStep.init();
        }
        mapPosition = $("#map").offset();
    }               
}


var beurk = function(index, targetForm){
	var parentForm = $(targetForm).parent();
	if(index==0){
		parentForm.css("height", "auto");
		setTimeout(function(){
			$("#activationForm").fadeIn();
		}, 1000);
	}else{
		parentForm.css("height", "400px");
		$("#activationForm").hide("fast");
	}
}

var checkValideStep = function(){
	var isValid = true;
	$(".error").removeClass("error");
	$("fieldset.current .required").each(function(e){
		var $this = $(this);
		if($this.val()==""){
			$this.closest(".field").addClass("error");
			isValid = false;
		}
	});
	return isValid;
}

var checkEmail = function(){
	var emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
	var isValid = true;
	$("fieldset.current .email").each(function(e){
		var $this = $(this);
		if(! $this.val()==""){
			console.log("email not ok");
			if(! emailPattern.test( $this.val() )){
				isValid = false;
				$this.closest(".field").addClass("error");
			}
		}
	});
	return isValid;
}


var liveFieldRequired = function(){
	$("input.required").on("keyup", function(){
    	if( $(this).val()=="" ){
    		$(this).closest(".field").addClass("error");
    	}else{
    		$(this).closest(".field").removeClass("error");
	}
	});
}


var addGuest = function($targetBtn){
	cpt++;
	var htmlGuestField = "<div class='guestGrp'>";
	htmlGuestField += "<div class='field mt1'><label class='field-label'>Prénom *</label><input type='text' name='guestFirstName"+cpt+"' id='guestFirstName"+cpt+"' class='field-input required'></div>";
	htmlGuestField += "<div class='field'><label class='field-label'>Nom *</label><input type='text' name='guestLastName"+cpt+"' id='guestLastName"+cpt+"' class='field-input required'></div>"
	htmlGuestField += "<div class='mb4'><input type='checkbox' name='guestVege"+cpt+"' id='guestVege"+cpt+"''><label for='guestVege"+cpt+"'>Je ne mange pas les animaux</label></div>";
	htmlGuestField += "<div class='remove-item-js icon icon-cross'></div>";
	htmlGuestField += "</div>";
	$(htmlGuestField).insertBefore(".add-guest-js");
	$("input[name=nbGuest]").val(cpt);
	liveFieldRequired();
	$(".remove-item-js").on("click", function(){
		$(this).closest(".guestGrp").remove();
		// re organised guest list
		var cptGuest = 0;
		$(".guestGrp").each(function(){
			cptGuest++;
			var guestFirstName = $(this).find("input[name^=guestFirstName]");
			var guestLastName = $(this).find("input[name^=guestLastName]");
			var guestVege = $(this).find("input[name^=guestVege]");
			var guestVegeLabel = $(this).find("input[name^=guestVege] + label");
			guestFirstName.attr({"name": "guestFirstName"+cptGuest, "id": "guestFirstName"+cptGuest});
			guestLastName.attr({"name": "guestLastName"+cptGuest, "id": "guestLastName"+cptGuest});
			guestVege.attr({"name": "guestVege"+cptGuest, "id": "guestVege"+cptGuest});
			guestVegeLabel.attr("for", "guestVege"+cptGuest);
		});
		cpt = cptGuest;
	});
}

/* registration form step by step */
var registrationStepByStep = {
	containerForm: "#form-track",
	nbFieldset : 5,
	fieldsetWidth : 648,
	init : function(){
		targetForm = document.querySelector(this.containerForm);
		$("fieldset").css("width", this.fieldsetWidth);
		formWidth = this.nbFieldset*this.fieldsetWidth;
		targetForm.style.width = formWidth+"px";
		beurk(index, this.containerForm);
		
		// decal adaptation on resize
		if(index!==0){
			var newMarginLeftVal = -(this.fieldsetWidth*index);
			targetForm.style.marginLeft = newMarginLeftVal+"px";
			decal = newMarginLeftVal;
		}

	},
	nextStep : function(){
		$(".btn-area").hide("fast");
		decal = decal - this.fieldsetWidth;
		setTimeout(function(){ targetForm.style.marginLeft = decal+"px"; }, 500);
		index++;
		$(this.containerForm+" fieldset").removeClass("current");
		$(this.containerForm+" fieldset:eq("+index+")").addClass("current");
		setTimeout(function(){ $(".btn-area").show("slow"); }, 1000);
		beurk(index, this.containerForm);
	},
	prevStep : function(){
		$(".btn-area").hide("fast");
		decal = decal + this.fieldsetWidth;
		setTimeout(function(){ targetForm.style.marginLeft = decal+"px"; }, 500);
		index--;
		$(this.containerForm+" fieldset").removeClass("current");
		$(this.containerForm+" fieldset:eq("+index+")").addClass("current");
		setTimeout(function(){ $(".btn-area").show("slow"); }, 1000);
		beurk(index, this.containerForm);
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
	headerHeight = $header.height();

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
		addGuest($(".add-guest-js"));
		initMdeInput();
	});

	$(".goto-form-js").on("click", function(){
		var posForm = $("section.form").offset();
		var headerHeight = $("header").height();
		posForm = posForm.top - headerHeight;
		$('html, body').animate({
				scrollTop : posForm
		}, "slow");
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
    	if( checkValideStep() && checkEmail() ){
    		registrationStepByStep.nextStep();
    	}
    });
    $(".prev-step").on("click", function(){
    	registrationStepByStep.prevStep();
    });

    // popin
    $(".popin").on("click", function(e){
		console.log(e.target.className);
		if( (e.target.className=="popin") || (e.target.className=="icon icon-cross") ){
			$(this).parent().remove();
		}
	});

    liveFieldRequired();


    /* shit */
    mapPosition = $("#map").offset();
	
	/* event scroll */
	$(window).scroll(function(e) {
		var scrollPos = $(window).scrollTop();
		if(scrollPos>0){
			//$body.css("padding-top", headerHeight);
			$header.addClass("fixed");
		}else{
			$header.removeClass("fixed");
			//$body.css("padding-top", 0);
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

	





