import $ from 'jquery';
import Inputmask from "inputmask/dist/inputmask/inputmask.numeric.extensions";

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
    });

const isActive = $field => {
    const $input = $field.parent('.b-form__elem');
    $field.val().length && !$field.hasClass('is-active') ? $input.addClass('is-active') : $input.removeClass('is-active');
};