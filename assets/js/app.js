import $ from 'jquery';
import './_form';
import './_select';
import './_polyfills';

$(document)
    .ready(() => {


    })
	.on('click', '.b-hamburger, .b-header__link', e => {
		e.preventDefault();

		const active = 'is-active';

		$('.b-hamburger').toggleClass(active);
		$('.b-header').toggleClass(active);
	})
	.on('click', '.b-header__link', e => {
		e.preventDefault();

		const href = $(e.currentTarget).attr('href');

		$('html, body').animate(
			{ scrollTop: $(href).offset().top },
			500,
			() => (window.location.hash = href),
		);
	});

