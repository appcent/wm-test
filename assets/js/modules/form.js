import $ from 'jquery';

$(document)
    .ready(() => {

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
    });