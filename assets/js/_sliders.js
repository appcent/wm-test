import $ from 'jquery';
import 'owl.carousel';
import 'owl.carousel2.thumbs';

$(document)
	.ready(() =>{

		const $slider = $('.js-slider');
		const $navSlider = $('.js-nav-slider');
		const $timelineSlider = $('.js-timeline-slider');
		/* Default */
		if($slider.length) {
			$slider.owlCarousel({
				items: 1,
				loop: true,
				dotsContainer: '.b-slider-dots',
				margin: 15,
				autoHeight: true,
				smartSpeed: $slider.attr('data-speed'),
				autoplay: $slider.attr('data-delay')
			});
		}
		/* Nav */
		if($navSlider.length) {
			$navSlider.owlCarousel({
				items: 1,
				dots: false,
				margin: 15,
				autoHeight: true,
				smartSpeed: $navSlider.attr('data-speed'),
				autoplay: $navSlider.attr('data-delay'),
				thumbs: true,
				thumbsPrerendered: true
			});
		}
		/* Timeline */
		if($timelineSlider.length) {
			$timelineSlider.owlCarousel({
				items: 1,
				dots: false,
				margin: 15,
				autoHeight: true,
				smartSpeed: $timelineSlider.attr('data-speed'),
				autoplay: $timelineSlider.attr('data-delay'),
				onInitialized: changeCount,
				onChanged: changeCount,
				loop: false,
				rewind: true,
			});
		}
	})
	/* Arrow */
	.on('click', '.b-slider-arrow', e => {
		e.preventDefault();

		let $target = $(e.target).closest('.b-slider-arrow'),
			owlSelector = $target.attr('data-slider'),
			delay = $(owlSelector).attr('data-delay'),
			speed = $(owlSelector).attr('data-speed');

		if ($target.hasClass('b-slider-arrow__next')) {
			$(owlSelector).trigger('next.owl.carousel', [speed]);
		} else if ($target.hasClass('b-slider-arrow__prev')) {
			$(owlSelector).trigger('prev.owl.carousel', [speed]);
		}

		$(owlSelector).trigger('stop.owl.autoplay');
		$(owlSelector).trigger('play.owl.autoplay', [delay, speed]);

	});
/* Timeline */
const changeCount = e => {
	const $line = $(e.currentTarget).siblings('.b-slider-count').find('.b-slider-count__line span');

	$line
		.stop()
		.css({ width: 0 });

	$line.animate(
		{ width: '100%' },
		{
			duration: +e.currentTarget.dataset.delay,
			easing: 'linear',
		}
	);
};
