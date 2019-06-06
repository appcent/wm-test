import $ from 'jquery';
import 'owl.carousel';
import 'owl.carousel2.thumbs';

$(document)
	.ready(() =>{

		const $slider = $('.b-slider__slider');

		if( $slider.length ) {

			$slider.owlCarousel({
				items: 1,
				loop: true,
				dots: false,
				margin: 15,
				autoHeight: true,
				smartSpeed: 450,
			});

		}

	})
	.on('click', '.b-slider__arrow', e => {

		const $target = $(e.currentTarget);
		const owlSelector = $target.attr('data-slider');

		if ( $target.hasClass('b-slider__arrow_next') ) $(owlSelector).trigger('next.owl.carousel');
			else $(owlSelector).trigger('prev.owl.carousel');


	});
