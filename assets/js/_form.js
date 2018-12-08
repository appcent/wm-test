import $ from 'jquery';
import Inputmask from "inputmask/dist/inputmask/inputmask.numeric.extensions";
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

$(document)
    .ready(() => {

        const $field = $('.js-field');
        if ($field.length) {
            $field.each(function () {
                isActive($(this));
            });
        }

        const im = new Inputmask('+7(999)999-99-99');
        im.mask($('[type="tel"]')[0]);

        const $range = $('.b-range__slider')[0];
        const $rangeRes = $('.b-range__input input');
		noUiSlider.create($range, {
			start: [20, 60],
			connect: [false, true, false],
            step: 1,
			range: {
				min: 0,
				max: 100
			},
			cssPrefix: 'b-range-',
			format: wNumb({decimals: false})
		});
		$range.noUiSlider.on('update', (values, handle) => {
			$rangeRes[handle].value = values[handle];
        });

    })
    .on('click', '.b-input-number__btn', e => {
       e.preventDefault();
       const $btn = $(e.target).closest('.b-input-number__btn'),
           $input = $('#' + $btn.attr('data-id-number')),
           number = $input[0];
       if ($btn.hasClass('b-input-number__up')) {
           number.stepUp();
       } else if (number.value > 0) {
           number.stepDown();
       }
		isActive($input);
    })
    .on('input', '.js-field', e => {
        const $field = $(e.target).closest('.js-field');
        isActive($field);
    })
    .on('change keyup', '.b-range__input input', e => {
		const $target = $(e.target).closest('.b-range__input input');
		console.log($target);
		$('.b-range__slider')[0].noUiSlider.setHandle($target.index(), $target.val());
    });

const isActive = $field => {
    const $input = $field.parent('.b-form__elem');
    $field.val().length && !$field.hasClass('is-active') ? $input.addClass('is-active') : $input.removeClass('is-active');
};