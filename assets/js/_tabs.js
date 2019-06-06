import $ from 'jquery';
import { getSiblings } from "./_functions";

$(document)
    .ready(() => {

        const tabs = document.querySelectorAll('.b-tabs__btn.is-active');

        if ( tabs.length ) [].forEach.call(tabs, tab => changeInnerLegend(tab));

    })
    .on('click', '.b-tabs__btn', e => {

        const target = e.currentTarget;

		changeActiveStatus(target);
		changeActiveStatus(document.getElementById(JSON.parse(target.getAttribute('data-tab')).id));
		changeInnerLegend(target);

		if ( !window.matchMedia('(min-width: 768px)').matches )
			target.closest('.b-tabs').querySelector('.b-tabs__legend').click();

    })
    .on('click', '.b-tabs__legend', e => {

		const target = e.currentTarget;

		if (target.matches('.is-active') ) {

			target.classList.remove('is-active');

		} else {

			[].forEach.call(document.querySelectorAll('.b-tabs__legend'), legend => legend.classList.remove('is-active'));
			target.classList.add('is-active');

		}

	})
	.on('click', e => {

		const legends = document.querySelectorAll('.b-tabs__legend');

		if ( e.target.closest('.b-tabs__legend') || e.target.closest('.b-tabs__nav') ) return e;

		[].forEach.call(legends, legend => legend.classList.remove('is-active'));

	});

const changeActiveStatus = target => {

	[].forEach.call(getSiblings(target), elem => elem.classList.remove('is-active'));
	target.classList.add('is-active');

};

const changeInnerLegend = tab => {

	tab.closest('.b-tabs').querySelector('.b-tabs__legend')
		.innerHTML = JSON.parse(tab.getAttribute('data-tab')).title;

};




