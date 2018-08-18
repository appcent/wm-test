import $ from 'jquery';
import 'slick-carousel';

import './vendor/iziModal';
import './vendor/jquery.magnific-popup';
import WOW from 'wowjs';

$(() => {

    //vendors
    $('.slider').slick();
    new WOW().init();

});

$(document)
    .ready(() => {

        //functions init
        myFunction();


    })

    //events
    .on('click', 'btn', e => { e.preventDefault() });

$(window)
    .resize(() => {

    });

//functions
function myFunction() {

};
