jQuery(document).ready(function(){
	$('[data-quantity="plus"]').on("click",function(e){
				// Stop acting like a button
				e.preventDefault();
				// Get the field name
				fieldName = $(this).attr('data-field');
				// Get its current value
				var currentVal = parseInt($('input[name='+fieldName+']').val());
				// If is not undefined
				if (!isNaN(currentVal)) {
						// Increment
						$('input[name='+fieldName+']').val(currentVal + 1);
				} else {
						// Otherwise put a 0 there
						$('input[name='+fieldName+']').val(1);
				}
				if (currentVal == 0) {
					$(this).parents(".plus-minus-input").find(".minus").removeClass("disabled");
				}
		});
		// This button will decrement the value till 0
		$('[data-quantity="minus"]').click(function(e) {
				// Stop acting like a button
				e.preventDefault();
				// Get the field name
				fieldName = $(this).attr('data-field');
				// Get its current value
				var currentVal = parseInt($('input[name='+fieldName+']').val());


				if (currentVal == 1) {
					$(".minus").addClass("disabled");
				}
				// If it isn't undefined or its greater than 0
				if (!isNaN(currentVal) && currentVal > 1) {
						// Decrement one
						$('input[name='+fieldName+']').val(currentVal - 1);
				} else {
						// Otherwise put a 0 there
						if (fieldName == 'quantity1') {
							$('input[name='+fieldName+']').val(1);
						} else {
							$('input[name='+fieldName+']').val(0);
						}
				}
		});
		if (document.querySelector('.slider')) {
			// slick slider
		    let time = 2;
		    let $slick, isPause, tick, percentTime = 0;

		    $slick = $('.slider-content');
		    $slick.slick({
		      draggable: true,
		      arrows: false,
		      adaptiveHeight: false,
		      dots: true,
		      //appendDots: '.slider__dots',

		      mobileFirst: true,
		      pauseOnDotsHover: true,
		    //speed: 500,
		    //autoplay: true,
		    //autoplayspeed: 2000,

		    });
		    $slick.on({
		      mouseenter: function() {
		        isPause = true;
		      },
		      mouseleave: function() {
		        isPause = false;
		        startProgressbar();
		      },
		      mousedown: function() {
		        $rbar.fadeOut('slow');
		        percentTime = 0;
		      },
		    });

		    function startProgressbar() {
		      clearTimeout(tick);
		      isPause = false;
		      tick = setInterval(interval, 20);
		      $rbar.fadeIn('slow');
		    }
		    let $rbar = $('.circle-go');
		    let rlen = 2 * Math.PI * $rbar.attr('r');

		    function interval() {
		      if (isPause === false) {
		        percentTime += 1 / (time + 0.1);
		        $rbar.css({
		          strokeDasharray: rlen,
		          strokeDashoffset: rlen * (1 - percentTime / 100)
		        });
		        if (percentTime >= 100) {
		          $slick.slick('slickNext');
		          percentTime = 0;
		          startProgressbar();
		        }
		      }
		    }
		    startProgressbar();
		}
});
$('img[src$=".svg"]').each(function() {
	var $img = jQuery(this);
	var imgURL = $img.attr('src');
	var attributes = $img.prop("attributes");

	$.get(imgURL, function(data) {
		var $svg = jQuery(data).find('svg');

		$svg = $svg.removeAttr('xmlns:a');

		$.each(attributes, function() {
			$svg.attr(this.name, this.value);
		});

		$img.replaceWith($svg);
	}, 'xml');
});

// Изменение меню при ресайзе
// window.addEventListener('resize', event => {
// 	let windowWidth = screen.width;
// 	let isResize = false;
//
//
// 	if (windowWidth < 1136 && !isResize) {
// 		let menuSelector = document.querySelector('.dropdown.menu');
//
// 		isResize = true;
// 	}
// }, false);

// Открытие/закрытие бургера
$('#mobile-menu').on('show.zf.dropdown', () => {
	$('.header').css({position: 'fixed'});
	$('body').css({overflow: 'hidden'});
    $('.mobile-menu__burger-open').hide();
    $('.mobile-menu__burger-close').show();
});
$('#mobile-menu').on('hide.zf.dropdown', () => {
	$('.header').css({position: ''});
	$('body').css({overflow: ''});
    $('.mobile-menu__burger-open').show();
    $('.mobile-menu__burger-close').hide();
});

// if (document.querySelector('.readmore'))
// {
// 	$(function(){
// 		$('.readmore').readmore({
// 			speed: 111111,
// 			lessLink: '<div class="readmore__button"><a href="#">Скрыть</a></div>',
// 			moreLink: '<div class="readmore__button"><a href="#">Подробнее...</a></div>',
// 			collapsedHeight: 150,
// 		});
// 	});
// }

let isResize = false;
let windowWidth = screen.width;

if (document.querySelector('.readmore') && windowWidth < 846)
{
	$(function(){
		$('.readmore').readmore({
			lessLink: '<div class="readmore__button"><a href="#">Скрыть</a></div>',
			moreLink: '<div class="readmore__button"><a href="#">Подробнее...</a></div>',
			collapsedHeight: 100,
		});
	});
}

window.addEventListener('resize', () => {
	let windowWidth = screen.width;

	if (windowWidth < 846 && !isResize) {

		if (document.querySelector('.readmore'))
		{
			$(function(){
				$('.readmore').readmore({
					speed: 111111,
					lessLink: '<div class="readmore__button"><a href="#">Скрыть</a></div>',
					moreLink: '<div class="readmore__button"><a href="#">Подробнее...</a></div>',
					collapsedHeight: 150,
				});
			});
		}

		isResize = true;
	}
	if (windowWidth > 846 && isResize) {
		if (document.querySelector('.readmore'))
		{
			$('.readmore').readmore('destroy');
		}

		isResize = false;
	}
}, false);
