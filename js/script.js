(function($){
	$(document).ready(function(){

		// Fixed header
		//-----------------------------------------------
		$(window).scroll(function() {
			if (($(".header").length > 0)) { 
				if(($(this).scrollTop() > 0)) {
					$(".header").addClass("fixed-header-on");
					$(".menu__item, .socials__item").addClass("fixed-header-on-font");
				} else {
					$(".header").removeClass("fixed-header-on");
					$(".menu__item, .socials__item").removeClass("fixed-header-on-font");
				}
			};
		});

		// Submenu
		$(".menu__item")
			.on("mouseover", function(){
				$(this).children(".submenu").css({"visibility":"visible","opacity":"1"});
			})
			.on("mouseout", function(){
				$(this).children(".submenu").css({"visibility":"hidden","opacity":"0"});
			});

		// Slider
		//-------------------------------------------------------------

		// Slider content fade In
		$(".slider__header").fadeIn(2000); 

		// show slide
		function showSlide(){ 
			var currentWidth = $(".slider__slide").width();
			$(".slider__slides").animate({
	            left: - currentWidth
	        }, 'slow', function () {
	            $('.slider__slide:first-child').appendTo('.slider__slides');
	            $('.slider__slides').css('left', '');
	        });
		}

		// pause
		var pause = false; 
		$(".slider").click(function(){
			console.log(this);
			pause = !pause;
		});

		// set interval for showing slide
		setInterval(function(){
			if(!pause){
				showSlide();
			};
		}, 2000);

		// Show add post
		$(".settings__button").click(function(){
			$(".create-post").stop().slideToggle(200);
		});

		// Trigger a file button
		$(".create-post__img-btn").click(function(event){
	    	event.preventDefault();
			$(".create-post__file-btn").trigger("click");
		});

	
	}); // End document ready
})(this.jQuery);


// Google map
function init_map(){
	var myOptions = {
		zoom:5, 
		center: new google.maps.LatLng(50.4501,30.523400000000038),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false
	};

	map = new google.maps.Map(document.getElementById('google-map__map'), myOptions);

	// create a marker and set its position
	marker = new google.maps.Marker({
		map: map,
		animation: google.maps.Animation.DROP,
		title: "Киев",
		position: new google.maps.LatLng(50.4501,30.523400000000038)
	});
	marker.addListener('click', toggleBounce);
}

// Bounce the marker
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}