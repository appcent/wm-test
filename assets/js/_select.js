import $ from 'jquery';

$(document)
	.ready(() => {

		const selects = document.querySelectorAll('.b-custom-select');

		if ( selects.length ) {

			[].forEach.call(selects, (select) => {

				const options = select.getElementsByTagName('option');
				const selected = document.createElement('div');
				const list = document.createElement('ul');

				// create / append selected elem
				selected.className = 'b-custom-select__selected';
				selected.innerHTML = getSelectedOption(options).innerHTML;
				select.appendChild(selected);

				// create / append options list
				list.className = 'b-custom-select__list';
				select.appendChild(list);

				// create / append list item
				[].forEach.call(options, (option) =>  {

					const item = document.createElement('li');

					if ( option.selected ) item.className = 'b-custom-select__item is-hide';
					else item.className = 'b-custom-select__item';

					item.innerHTML = option.innerHTML;
					list.appendChild(item);

				});

			});

		}

	})
	.on('click', '.b-custom-select__selected', e => {

		const target = e.currentTarget;
		const selecteds = document.querySelectorAll('.b-custom-select__selected');

		if ( target.matches('.is-active') ) {

			target.classList.remove('is-active');

		} else {

			[].forEach.call(selecteds, (selected) => selected.classList.remove('is-active'));
			target.classList.add('is-active');

		}

	})
	.on('click', '.b-custom-select__item', e => {

		const target = e.currentTarget;
		const parent = target.closest('.b-custom-select');
		const select = parent.querySelector('select');
		const selected = parent.querySelector('.b-custom-select__selected');

		// change hide target status
		target.classList.add('is-hide');
		$(target).siblings('.b-custom-select__item').removeClass('is-hide');
		// change selected text
		selected.innerHTML = e.currentTarget.innerHTML;
		// change selected value to original select
		select.selectedIndex = $(e.currentTarget).index() + 1;
		// triggered selected for change active status
		selected.click();

	});

const getSelectedOption = options => {

	for (let o = 0; o < options.length; o++) if ( options[o].selected ) return options[o];

};


