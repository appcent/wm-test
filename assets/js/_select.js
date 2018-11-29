import $ from 'jquery';

$(document)
    .ready(() => {
        const $customSelect = $('.b-custom-select');
        $customSelect.each( function () {
            const $select = $(this).children('select');
            const $option = $select.children('option');
            // add selected element
            $(this).append('<div class="b-custom-select__selected">' + $select.children('option:selected').text() + '</div>');
            // add new select list
            $(this).append('<div class="b-custom-select__list"></div>');
            const $list = $(this).children('.b-custom-select__list');
            // add options to new select list
            $option.each( function () {
                // all but the default
                if ($(this).index() > 0) {
                    $list.append('<div class="b-custom-select__item">' + $(this).text() + '</div>');
                }
            });
        });
    })
    .on('click', '.b-custom-select__selected', e => {
        $(e.target).closest('.b-custom-select__selected').toggleClass('is-active');
    })
    .on('click', '.b-custom-select__item', e=> {
        const $customSelect = $(e.target).closest('.b-custom-select');
        const $selected = $customSelect.children('.b-custom-select__selected');
        const $item = $(e.target).closest('.b-custom-select__item');
        //change selected elem text
        $selected.text($item.text());
        //change selected option in select
        $customSelect.children('select')[0].selectedIndex = $item.index() + 1; //but the default
        //close new select list
        $selected.trigger('click');
    });