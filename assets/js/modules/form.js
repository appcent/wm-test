import $ from 'jquery';

$(document)
    .ready(() => {

        const $field = $('.b-input__field');
        if ($field.length) {
            $field.each(function () {
                isActive($(this));
            });
        }

    })
    .on('click', '.b-form__number-btn', e => {
       e.preventDefault();

       const $btn = $(e.target).closest('.b-form__number-btn');
       const $input = $('#'+ $btn.attr('data-form-num'));
       let count = $input.val();

       if ($btn.hasClass('b-form__number-up')) {
           count++;
           $input.val(count);
       } else if (count > 0) {
           count--;
           $input.val(count);
       }
    })
    .on('input', '.b-input__field', e => {
        const $field = $(e.target).closest('.b-input__field');

        isActive($field);
        isValidity($field);
    })
    .on('click', '[type="submit"]', e => {
        const $form = $(e.target).closest('form');
        const $field = $form.find('.b-input__field');

        $field.each( function () {
           isValidity($(this))
        });

        if ($form.find('.is-error').length) e.preventDefault();
    });

const isValidity = $field => {
    const $error = $field.parent().siblings('.b-input__error');
    const validityOn = $field.parents('.b-input').attr('data-error-mes');

    if ($field[0].validity.valid) {
        $field.removeClass('is-error');
        $field.addClass('is-valid');
        if (validityOn === 'true') {
            $error.text('');
        }
    } else {
        $field.removeClass('is-valid');
        $field.addClass('is-error');
        if (validityOn === 'true') {
            $error.text($field[0].validationMessage);
        }
    }
};

const isActive = $field => {
    const $input = $field.parents('.b-input');

    $field.val().length ? $input.addClass('is-active') : $input.removeClass('is-active');
};
