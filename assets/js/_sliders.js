import $ from 'jquery';
import 'owl.carousel';

$(document)
	.ready(() =>{

		const $slider = $('.b-slider');

		if($slider.length) {
			$slider.owlCarousel({
				items: 1,
				loop: true,
				dotsClass: 'b-slider-dots',
				margin: 15,
				smartSpeed: $('.b-slider').attr('data-speed'),
				onInitialized: addCount,
				autoplay: $('.b-slider').attr('data-delay'),
				onChanged: startCount
			});
		}

	})
	.on('click', '.b-slider-arrow', e => {
		e.preventDefault();

		let $target = $(e.target).closest('.b-slider-arrow'),
			owlSelector = $target.attr('data-slider');

		if ($target.hasClass('b-slider-arrow__next')) {
			$(owlSelector).trigger('next.owl.carousel', [700]);
		} else if ($target.hasClass('b-slider-arrow__prev')) {
			$(owlSelector).trigger('prev.owl.carousel', [700]);
		}
	})
	.on('click', '.b-slider-count__num', e => {
		e.preventDefault();

		let $target = $(e.target).closest('.b-slider-count__num'),
			countIndex = $target.parent().index(),
			speed = $('.b-slider').attr('data-speed');
		//console.log(countIndex);
		$('.b-slider').trigger('to.owl.carousel', [countIndex, speed]);
	});

const addCount = (e) => {

	for (let i=1; i<=e.item.count; i++) {
		$('.b-slider-count').append(`<div class="b-slider-count__item">
                                        <a href='#' class="b-slider-count__num">${((i/100).toFixed(2)+'').split(".")[1]}</a>
                                        <div class="b-slider-count__line">
                                            <div class="b-slider-count__line-width"></div>
                                        </div>
                                    </div>`);
	}

	startCount(e);

	//console.log(e)

};
const startCount = (e) => {

	let delay = $('.b-slider').attr('data-delay'),
		speed = $('.b-slider').attr('data-speed'),
		currentSlideIndex = e.item.index - (e.relatedTarget.clones().length / 2),
		currentCountItem = $('.b-slider-count__item')[currentSlideIndex];

	//console.log(e.relatedTarget.current());

	$('.b-slider-count__line-width').stop().css({width:0});
	$('.b-slider-count__item').removeClass('is-active');

	//restart autoplay
	$('.b-slider').trigger('stop.owl.autoplay');
	$('.b-slider').trigger('play.owl.autoplay', [delay, speed]);

	$(currentCountItem).find('.b-slider-count__line-width').animate(
		{width:'100%'},
		{
			duration: +delay,
			easing: 'linear'
		});
	$(currentCountItem).addClass('is-active');

};