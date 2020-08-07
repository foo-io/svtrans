$(document).foundation();

function closeOutsideClick(element, button, closeElement) {
    $(document).mouseup(function (e){ // событие клика по веб-документу
        var div = $(element); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0
            && !$(button).is(e.target)) { // и не по его дочерним элементам
                $(closeElement).foundation('close');
                //
        }
    });
}
jQuery(document).ready(function($) {
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
});
$(document).ready(function() {
    $('.addcart input[name="actionADD2BASKET"]').click(function (e) {
        e.preventDefault();
        $('.addcart').hide();
        $('.product__card-button.added').show();

        setTimeout(function(){
            $('.product__card-button.added').hide();
            $('.addcart').show();
        }, 2000);
    });

    //! card/table button in catalog
        $('#showTable').click(function () {
            $('#catalogue').addClass('large-up-1 medium-up-1 grid-table').removeClass('large-up-3 medium-up-2');
            $(this).addClass('filter-active');
            $('#showCard').removeClass('filter-active');
        });
        $('#showCard').click(function () {
            $('#catalogue').addClass('large-up-3 medium-up-2').removeClass('large-up-1 medium-up-1 grid-table');
            $(this).addClass('filter-active');
            $('#showTable').removeClass('filter-active');
        });

        $('.card-section__button.compare').click(function() {
            $(this).parents(".card .card-section").find('.card-section__warning').fadeIn(150).addClass('show compare-add').delay(1500).fadeOut(150).promise().done(function() {
                $(this).parents(".card .card-section").find('.card-section__warning').removeClass('show compare-add');
            });
        })
        $('.card-section__button.favorite').click(function() {
            $(this).parents(".card .card-section").find('.card-section__warning').fadeIn(150).addClass('show favorite-add').delay(1500).fadeOut(150).promise().done(function() {
                $(this).parents(".card .card-section").find('.card-section__warning').removeClass('show favorite-add');
            });
        })
        $('.card-section__button.plus').click(function() {
            $(this).parents(".card .card-section").find('.card-section__warning').fadeIn(150).addClass('show cart-add').delay(1500).fadeOut(150).promise().done(function() {
                $(this).parents(".card .card-section").find('.card-section__warning').removeClass('show cart-add');
            });
            //? $(this).children('i').removeClass('icon-plus').addClass('icon-check')
        })

    //! �������
        // ������ ��������� ������� ���������
        $('.title').text(function() {
            var text = $(this).parent().attr('id');
            if( /\_map/.test(text) ){
                $(this).text($(this).parent().attr('id').slice(0,-4));
            } else {
                $(this).text($(this).parent().attr('id'));
            }

        });
        // var text = $('.title').text();
        // if( /\_map/.test(text) ){
        //     $(this).text($(this).parent().attr('id'));
        // } else {
        //     $(this).text($(this).parent().attr('id'));
        // }

    //! выпадашка мобменю
        $('.menu__mobile>button').click(function (e) {
            $('body').toggleClass('modal-active');
            if ($(this).html() == '<i class="icon-burger"></i> Меню')
                $(this).html('<i class="icon-close"></i> Закрыть')
            else
                $(this).html('<i class="icon-burger"></i> Меню');
        });

        $(document).mouseup(function (e){ // событие клика по веб-документу
            var div = $('div.dropdown-pane.is-open'); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0
                && !$('.menu__mobile>button').is(e.target)) { // и не по его дочерним элементам
                    $('#mobile-menu').foundation('close');
                    if ($('.menu__mobile div.dropdown-pane.is-open')) {
                        $('body').removeClass('modal-active');
                    }
                    if ($('.menu__mobile>button').html() == '<i class="icon-close"></i> Закрыть')
                        $('.menu__mobile>button').html('<i class="icon-burger"></i> Меню')


            }
        });

        closeOutsideClick('.dropdown-pane.is-open', '.header__sign>button', '#sign-up');
        closeOutsideClick('.dropdown-pane.is-open', '.header__sign>button', '#sign-in');

        // slick slider
        slick_slider();
        $(window).resize(slick_slider);


        function slick_slider() {
            var wrapper = $(".slider-tabs");
            if ($(".slider-tabs.slick-initialized").length) {
                wrapper.slick('unslick');
            }
            wrapper.slick({
                mobileFirst: true,
                infinite: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: false,
                prevArrow: '<button type="button" class="slick-prev"><i class="icon-slider-left"></button>',
                nextArrow: '<button type="button" class="slick-next"><i class="icon-slider-right"></i></button>',
                responsive: [{
                    breakpoint: 640,
                    settings: "unslick"
                },
                {
                    breakpoint: 540,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: true,
                    }
                },
                {
                    breakpoint: 320,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true,
                    }
                }
                ]
            });
        }

        $('.news__slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.news__slider-nav'
        });
        $('.news__slider-nav').slick({
            slidesToShow: 7,
            slidesToScroll: 1,
            asNavFor: '.news__slider-for',
            infinite: false,
            //dots: true,
            //centerMode: true,
            focusOnSelect: true,
            arrows: false,
            responsive: [{
                breakpoint: 9999,
                slidesToShow: 2,
                slidesToScroll: 1,
        },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            ]
        });

    var time = 2;
    var $slick, isPause, tick, percentTime = 0;

    $slick = $('.banner-slider');
    $slick.slick({
      draggable: true,
      arrows: false,
      adaptiveHeight: false,
      dots: true,
      //appendDots: '.slider__dots',

      mobileFirst: true,
      pauseOnDotsHover: true,
    //speed: 500,
    fade: true,
    cssEase: 'linear',
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
    var $rbar = $('.circle-go');
    var rlen = 2 * Math.PI * $rbar.attr('r');

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
  });
