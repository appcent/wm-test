import $ from 'jquery';
// renage
import noUiSlider from 'nouislider';

$(document)
    .ready(() => {

        const fields = document.querySelectorAll('.js-focusing');
        const ranges = document.querySelectorAll('.b-range__slider');

        if (fields.length) for (let i=0; i<fields.length; i++) moveLabel(fields[i]);

		if (ranges.length) {

			const range = [
				'Не владею',
				'Использую готовые решения',
				'Использую готовые решения и умею и переделывать',
				'Пишу сложный JS с нуля'
			];

			for (let i=0; i<ranges.length; i++) {

				noUiSlider.create(ranges[i], {

					start: 2,
					connect: [true, false],
					step: 1,
					cssPrefix: 'b-range-',
					range: {
						'min' : [0, 1],
						'25%' : [1, 1],
						'50%' : [2, 1],
						'max' : [3, 1],
					},
					pips: {
						mode: 'range',
						density: 100
					}

				})
					.on('update', (values, handle) => {
						document.getElementById('range-input').value = range[parseInt(values[handle])];
						//console.log(`range value: ${document.getElementById('range-input').value}`);
					});

			}
		}

    })
    .on('input change', '.js-focusing', e => moveLabel(e.currentTarget));

const moveLabel = (field) => {

    const elem = field.parentElement;

    field.value ? elem.classList.add('is-focus') : elem.classList.remove('is-focus');

};