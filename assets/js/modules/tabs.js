import $ from 'jquery';

$(document).
    on('click', '.b-tabs__tab', e => {
        e.preventDefault();

        const $this = $(e.target).closest('.b-tabs__tab');
        const $content = $($this.attr('data-tab'));

        $this.siblings('.b-tabs__tab').removeClass('is-active');
        $content.siblings('.b-tabs__content').removeClass('is-active');

        $this.addClass('is-active');
        $content.addClass('is-active');
    });