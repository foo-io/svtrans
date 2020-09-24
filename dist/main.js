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
$('[data-portal]').each(function(){
  let name = $(this).attr('data-popup');
  $(this).html('<title>'+name+'</title>');
})
// map
if (document.querySelector('#map')) {
    var map = new Vue({
        el: "#map",
        data: {
			regions: [
				{
					id: 548,
					name: 'Якутск'
				},
				{
					id: 113,
					name: 'Абыйский'
				},
				{
					id: 119,
					name: 'Алданский'
				},
				{
					id: 126,
					name: 'Аллаиховский'
				},
				{
					id: 132,
					name: 'Амгинский'
				},
				{
					id: 147,
					name: 'Анабарский'
				},
				{
					id: 150,
					name: 'Булунский'
				},
				{
					id: 158,
					name: 'Верхневилюйский'
				},
				{
					id: 180,
					name: 'Верхнеколымский'
				},
				{
					id: 187,
					name: 'Верхоянский'
				},
				{
					id: 203,
					name: 'Вилюйский'
				},
				{
					id: 225,
					name: 'Горный'
				},
				{
					id: 235,
					name: 'Жиганский'
				},
				{
					id: 240,
					name: 'Кобяйский'
				},
				{
					id: 253,
					name: 'Ленский'
				},
				{
					id: 265,
					name: 'Мегино-Кангаласский'
				},
				{
					id: 297,
					name: 'Мирнинский'
				},
				{
					id: 306,
					name: 'Момский'
				},
				{
					id: 313,
					name: 'Намский'
				},
				{
					id: 333,
					name: 'Нерюнгринский'
				},
				{
					id: 341,
					name: 'Нижнеколымский'
				},
				{
					id: 346,
					name: 'Нюрбинский'
				},
				{
					id: 366,
					name: 'Оймяконский'
				},
				{
					id: 398,
					name: 'Оленекский'
				},
				{
					id: 374,
					name: 'Олекминский'
				},
				{
					id: 403,
					name: 'Среднеколымский'
				},
				{
					id: 414,
					name: 'Сунтарский'
				},
				{
					id: 441,
					name: 'Таттинский'
				},
				{
					id: 456,
					name: 'Томпонский'
				},
				{
					id: 466,
					name: 'Усть-Алданский'
				},
				{
					id: 487,
					name: 'Усть-Майский'
				},
				{
					id: 498,
					name: 'Усть-Янский'
				},
				{
					id: 509,
					name: 'Хангаласский'
				},
				{
					id: 550,
					name: 'Чурапчинский'
				},
				{
					id: 544,
					name: 'Эвено-Бытантайский'
				}
			],
            isActive: 548,
            percentage: 0,
        },
		mounted() {
			document.querySelector('path[data-portal="548"]').classList.add('map-current');
		},
        methods: {
			change: (id) => {
				oldId = map.$data.isActive;
				map.$data.isActive = id;
				document.querySelector('path[data-portal="'+oldId+'"]').classList.remove('map-current');
				document.querySelector('path[data-portal="'+id+'"]').classList.add('map-current');
			},
            onScroll: function(evt) {
                let post = evt.target;
                let st = post.scrollTop;
                let sh = post.scrollHeight;
                let ch = post.clientHeight;

                let percent = Math.floor((st / (sh - ch)) * 100);
                this.percentage = percent;
            },
            scrollByDown: function(e) {
                var el = $("#map-select").scrollTop() + 300;
                $("#map-select").animate({
                    scrollTop: el
                }, 300);
            },
            scrollByUp: function(e) {
                var el = $("#map-select").scrollTop() - 300;
                $("#map-select").animate({
                    scrollTop: el
                }, 300);
            },
        },
    });}
