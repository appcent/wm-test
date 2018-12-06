import $ from 'jquery';

$(document)
    .ready(() => {

        const $field = $('.js-field');
        if ($field.length) {
            $field.each(function () {
                isActive($(this));
            });
        }

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
        console.log('event field');
        const $field = $(e.target).closest('.js-field');
        isActive($field);
    });

const isActive = $field => {
    const $input = $field.parent('.b-form__elem');
    $field.val().length && !$field.hasClass('is-active') ? $input.addClass('is-active') : $input.removeClass('is-active');
};