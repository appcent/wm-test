import $ from 'jquery';

$(document)
	.ready(() => {



	})
	.on('click', '.b-dropdown__toggle', e => {

		let $target = $(e.currentTarget),
			$menu = $target.siblings('.b-dropdown__menu'),
			active = 'is-active';

		// если меню не найдено ищем используя дата атрибут
		if ( !$menu.length ) $menu = $($target.attr('data-dropdown'));

		if ( $menu.hasClass(active) ) {

			$menu.removeClass(active)

		} else {

			$('.b-dropdown__menu').removeClass(active);
			$menu.addClass(active)

		}

	})
	.on('click', '.b-dropdown__close', e => {

		$(e.currentTarget).closest('.b-dropdown__menu').removeClass('is-active');

	})
	.on('click', e => { // закроем dropdown при клике по документу вне элемента

		if ($(e.target).closest('.b-dropdown').length > 0) return e;

		$('.b-dropdown__menu').removeClass('is-active');

	});