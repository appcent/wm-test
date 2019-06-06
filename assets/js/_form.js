import $ from 'jquery';
import '../node_modules/jquery.maskedinput/src/jquery.maskedinput';
import '../node_modules/@chenfengyuan/datepicker/dist/datepicker.esm';
import '../node_modules/@chenfengyuan/datepicker/i18n/datepicker.ru-RU';
/* Range */
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

$(document)
    .ready(() => {

        const fields = document.querySelectorAll('.js-focusing');
        const ranges = document.querySelectorAll('.b-range__slider');
		const $phone = $('[type="tel"]');
		const $date = $('.js-date');

		/* Active */
        if (fields.length) for (let i=0; i<fields.length; i++) moveLabel(fields[i]);
		/* Mask */
		if ($phone.length) $phone.mask('+7(999)999-99-99');

		if ($date.length) {

			$date.datepicker({
				language: 'ru-RU',
				autoHide: true
			});
			$date.mask('99.99.9999');

		}
		/* Range */
        if (ranges.length) {

        	for (let i=0; i<ranges.length; i++) {

				noUiSlider.create(ranges[i], {

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
					const result = document.getElementById(ranges[i].getAttribute('data-id-input'));
					const inputs = result.getElementsByClassName('b-number__field');

					inputs[handle].value = values[handle];
					inputs[handle].setAttribute('data-range', handle);
				});

			}
		}

    })
	/* Number */
    .on('click', '.b-number__btn', e => {
       e.preventDefault();

       const btn = e.currentTarget;
       const input = document.getElementById(btn.getAttribute('data-id-number'));

       if ( btn.matches('.b-number__btn_up') ) input.stepUp();
       else if ( input.value > 0 ) input.stepDown();

       if ( input.value ) moveLabel(input);
    })
	/* Active */
    .on('input change', '.js-focusing', e => moveLabel(e.currentTarget))
	/* Range */
    .on('change keyup wheel', '.b-range__field', e => {
		const $target = $(e.target).closest('.js-range-field');
		const slider = $target.parents('.b-range__result').siblings('.b-range__slider')[0];
		slider.noUiSlider.setHandle($target.attr('data-range'), $target.val());
    })
	/* File */
	.on('change', '.b-file__field', e => {

		const input = e.currentTarget;
		const name = document.querySelectorAll(`[data-id-input="${input.getAttribute('id')}"]`)[0];

		name.innerHTML = input.value.split('\\').pop();
	})
	/* Search */
	.on('click', '.js-clear', e => {
		e.preventDefault();

		const btn = e.currentTarget;
		const input = document.getElementById(btn.getAttribute('data-id-input'));

		input.value = '';

		moveLabel(input);
	});
/* Active */
const moveLabel = field => {

    const elem = field.parentElement;

    field.value ? elem.classList.add('is-focus') : elem.classList.remove('is-focus');

};