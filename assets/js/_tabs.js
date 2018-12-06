import $ from 'jquery';

$(document)
    .ready(() => {

        const $activeTab = $('.b-tabs__active-tab');

        if ($activeTab.length) {
           setActiveTab($activeTab);
        }

    })
    .on('click', '.b-tabs__tab', e => {
        e.preventDefault();

        const $this = $(e.target).closest('.b-tabs__tab');
        const $parent = $(e.target).closest('.b-tabs');
        const $activeTab = $this.parent().siblings('.b-tabs__active-tab');
        const $content = $($this.attr('data-tab'));

        $this.siblings('.b-tabs__tab').removeClass('is-active');
        $content.siblings('.b-tabs__content').removeClass('is-active');

        $this.addClass('is-active');
        $content.addClass('is-active');

        if ($parent[0].hasAttribute('data-tab-mobile')) {
            setActiveTab($activeTab);
            $activeTab.trigger('click');
        }
    })
    .on('click', '.b-tabs__active-tab', e => {
        e.preventDefault();

        const $this = $(e.target).closest('.b-tabs__active-tab');

        if ($this.hasClass('is-active')) {
            $this.removeClass('is-active');
        } else {
            $this.addClass('is-active');
        }
    });

const setActiveTab = ($activeTab) => {
    $activeTab.each(function () {
        $(this).text($(this).siblings('.b-tabs__links').find('.is-active').text())
    });
};