$(document).ready(function(){

// Stagger animation
var t = $(".js-stagger-delay");
t.each(function(t) {
    var n, i = $(this),
        o = i.data("stagger-selector"),
        r = i.data("stagger-property"),
        s = i.data("stagger-interval"),
        a = i.data("stagger-direction");
    n = i.find(o), "reverse" === a && (n = $(n.get().reverse())), "random" === a && n.sort(function() {
        return .5 - Math.random()
    }), n.each(function(t) {
        var n = $(this),
            i = t * s;
        n.hasClass("is-staggered") || n.addClass("is-staggered").css(r + "-delay", i + "s")
    })
})

$(".js-add-class-in-view").each(function(t) {
    var n, i = $(this),
        o = i.data("in-view-count"),
        r = i.data("in-view-offset"),
        s = "is-in-view";
    n = new Waypoint({
        element: i[0],
        handler: function($) {
            "down" === $ && i.addClass(s), "up" === $ && "infinite" === o && i.removeClass(s)
        },
        offset: r
    })
})

// Parallax scroll
  var hasParallax = $('.js-stagger-delay-parallax-panel-1, .js-stagger-delay-parallax-panel-2, .js-stagger-delay-parallax-panel-3').length > 0;
  if (hasParallax) {
      var rellax1 = new Rellax('.js-stagger-delay-parallax-panel-1');
      var rellax2 = new Rellax('.js-stagger-delay-parallax-panel-2');
      var rellax3 = new Rellax('.js-stagger-delay-parallax-panel-3');

      if ($(window).width() < 750) {
          // rellax1.destroy();
          // rellax2.destroy();
          // rellax3.destroy();
      }

      $(window).resize(function () {
          if ($(window).width() > 750) {
              rellax1.refresh();
              rellax2.refresh();
              rellax3.refresh();
          } else {
              // rellax1.destroy();
              // rellax2.destroy();
              // rellax3.destroy();
          }
      });
  }

// Parallax mousehover
	$('.parallax-viewport').mousemove(
		function(e){
			/* Detecta a posição do mouse */
			var offset = $(this).offset();
			var xPos = e.pageX - offset.left;
			var yPos = e.pageY - offset.top;

			/* Pega a posição em porcentagem */
			var mouseXPercent = Math.round(xPos / $(this).width() * 50);
			var mouseYPercent = Math.round(yPos / $(this).height() * 50);

			/* Posiciona cada camada */
			$(this).find('.parallax-layer').each(
				function(){
					var diffX = $('.parallax-viewport').width() - $(this).width();
					var diffY = $('.parallax-viewport').height() - $(this).height();

					var myX = diffX * (mouseXPercent / 200); //) / 100) / 2;

					var myY = diffY * (mouseYPercent / 200);

					var cssObj = {
						'left': myX + 'px',
						'top': myY + 'px'
					}
					//$(this).css(cssObj);
					$(this).animate({
						left: myX,
						top: myY
					},
					{
						duration: 150,
						queue: false,
						easing: 'linear'
					});

				}
			);

		}
	);



// Team
	$(window).resize(function(){
		$('.team-member--with-bio.active').each(function(){
			var pushdown_height = $(this).find('.biography').outerHeight();
			$(this).children().css('padding-bottom', pushdown_height);
		});
	});

	$('.team-member--with-bio').each(function(){
		var $member = $(this);
		var $members = $('.team-member').not($member);

		$member.find('.close-biography').click(function(e){
			e.preventDefault();
			$member.removeClass('active');
			$members.removeClass('not-active');
			$member.children().css('padding-bottom', 0);
			$members.children().css('padding-bottom', 0);
		});

		$member.find('.headshot').click(function(e){
			var pushdown_height = $member.find('.biography').outerHeight();

			if( $member.hasClass('not-active') ){

				$member.removeClass('not-active');
				$member.addClass('active');
				$members.removeClass('active');
				$members.addClass('not-active');
				$members.children().css('padding-bottom', 0);
				$member.children().css('padding-bottom', pushdown_height);

			}
			else if( $member.hasClass('active') ){

				$member.removeClass('active');
				$members.removeClass('not-active');
				$member.children().css('padding-bottom', 0);
				$members.children().css('padding-bottom', 0);

			}
			else {

				$member.addClass('active');
				$members.addClass('not-active');
				$members.children().css('padding-bottom', 0);
				$member.children().css('padding-bottom', pushdown_height);

			}

		});
	});

	$("#portfolio-contant-active").mixItUp();


	$("#testimonial-slider").owlCarousel({
	    paginationSpeed : 500,
	    singleItem:true,
	    autoPlay: 6000,
	});

	$("#clients-logo").owlCarousel({
		autoPlay: 3000,
		items : 5,
		itemsDesktop : [1199,5],
		itemsDesktopSmall : [979,5],
	});

	$("#works-logo").owlCarousel({
		autoPlay: 3000,
		items : 5,
		itemsDesktop : [1199,5],
		itemsDesktopSmall : [979,5],
	});


	// google map
		var map;
		function initMap() {
		  map = new google.maps.Map(document.getElementById('map'), {
		    center: {lat: -34.397, lng: 150.644},
		    zoom: 8
		  });
		}


	// Counter

	$('.counter').counterUp({
        delay: 10,
        time: 1000
    });


});




