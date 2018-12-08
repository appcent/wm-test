import $ from 'jquery';
import Inputmask from "inputmask/dist/inputmask/inputmask.numeric.extensions";
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

$(document)
    .ready(() => {
		/* Active */
        const $field = $('.js-field');
        if ($field.length) {
            $field.each(function () {
                isActive($(this));
            });
        }
		/* Mask */
		const $phone = $('[type="tel"]');
		if ($phone.length) {
			const im = new Inputmask('+7(999)999-99-99');
			$phone.each((index, elem) => im.mask(elem));
		}
		/* Range */
        const $range = $('.b-range__slider');
        if ($range.length) {
			$range.each(function (index, elem) {
				let $this = $(this);
				noUiSlider.create(elem, {
					start: [40, 60],
					connect: [false, true, false],
					step: 1,
					range: {
						min: 0,
						max: 100
					},
					cssPrefix: 'b-range-',
					format: wNumb({decimals: false})
				}).on('update', (values, handle) => {
					const $input = $this.siblings('.b-range__result').find('.js-range-field');
					$input[handle].value = values[handle];
					$input[handle].setAttribute('data-range', handle);
				});
			});
		}

    })
	/* Number */
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
	/* Active */
    .on('input', '.js-field', e => {
        const $field = $(e.target).closest('.js-field');
        isActive($field);
    })
	/* Range */
    .on('change keyup', '.js-range-field', e => {
		const $target = $(e.target).closest('.js-range-field');
		const slider = $target.parents('.b-range__result').siblings('.b-range__slider')[0];
		slider.noUiSlider.setHandle($target.attr('data-range'), $target.val());
    })
	.on('change', '.b-file__field', e => {
		const $target = $(e.target).closest('.b-file__field');
		const $name = $target.siblings('.b-file__name');
		if ($target.val()) {
			$name.text($target.val().split('\\').pop());
			$name.addClass('is-active');
		} else {
			$name.text('');
			$name.removeClass('is-active');
		}
	});
/* Active */
const isActive = $field => {
    const $input = $field.parent('.b-form__elem');
    $field.val().length && !$field.hasClass('is-active') ? $input.addClass('is-active') : $input.removeClass('is-active');
};