import $ from 'jquery';
import '@fancyapps/fancybox';

$(document).ready(() => {

	const $modal = $('.js-modal-open');

	if ( $modal.length ) {

		$modal.fancybox({
			autoFocus: false,
			baseClass: 'b-modal',
			btnTpl: {
				smallBtn: false
			}
		})

	}

	})
	.on('click', '.b-modal__close', e => $.fancybox.close());