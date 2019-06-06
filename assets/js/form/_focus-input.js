/*
**** Vanilla JS Version (not work) ****
(function (factory) {

	// проверим какая система модулей используется
	// и в зависиомсти от этого объявим плагин
	if (typeof define === "function" && define.amd) {
		// AMD
		define([], factory);
	} else if (typeof exports === "object") {
		// Node/CommonJS
		module.exports = factory();
	} else {
		// Browser globals
		window.FocusInput = factory();
	}

}(function () {

	let defaults = {

		selector 	: '.js-focus',
		wrapper 	: '.b-form__elem',
		activeClass : 'is-focus'

	};

	let FocusInput = function (opts) {

		this.options = Object.assign(defaults, opts);
		this.fields = document.querySelectorAll(this.options.selector);

		init(this.fields);

	};

	function addEvent(field) {

		let wrapper = FocusInput.options.wrapper;

		field.addEventListener('change input', e => moveLabel(e.currentTarget, wrapper))

	}

	function init(fields) {

		[].forEach.call(fields, field => {

			addEvent(field);
			moveLabel(field);

		});

	}

	function moveLabel(field) {

		let wrapper = FocusInput.options.wrapper,
			activeClass = FocusInput.options.activeClass;

		if ( field.value ) wrapper.classList.add(activeClass);
			else wrapper.classList.remove(activeClass);

	}

	return FocusInput;

})); */


/*
**** ES 2015 Version ****
*
* import { FocusInput } from "./form/_focus-input";
* const myFocus = new FocusInput();
*
export class FocusInput {

	constructor(opts = {}) {

		this._options = {

			selector 	: opts.selector 	? opts.selector 	: '.js-focus',
			wrapper 	: opts.wrapper 		? opts.wrapper 		: '.b-form__elem',
			activeClass : opts.activeClass 	? opts.activeClass 	: 'is-focus'

		};
		this._fields = document.querySelectorAll(this._options.selector);

		this.init();

	}

	init () {

		[].forEach.call(this._fields, field => {

			this.moveLabel(field);
			field.addEventListener('input', e => this.moveLabel(e.currentTarget));
			field.addEventListener('change', e => this.moveLabel(e.currentTarget))

		});

	}

	moveLabel (field) {

		const wrapper = field.closest(this._options.wrapper);

		if ( field.value ) wrapper.classList.add(this._options.activeClass);
		else wrapper.classList.remove(this._options.activeClass);

	}

}*/

/*
**** jQuery Version ****
* $('.js-focus').myPlugin();
* import "./form/_focus-input";

(function($) {

	var defaults = {

		wrapper     : '.b-form__elem',
		activeClass : 'is-focus'

	}, methods = {

		init : function ( options ) {

			var settings = $.extend({}, defaults, options),
				$this = $(this);

			return this.each(function() {

				$this.on('change input', function (e) {
					// move label
					methods.moveLabel(this)
				})

			});

		},

		moveLabel : function ( field ) {



		}

	};

	$.fn.myPlugin = function ( method ) {


		if ( methods[method] ) {
			//если передан метод и он существует в объекте с methods то добавим его в прототип и выполним
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));

		} else if ( typeof method === 'object' || ! method ) {
			//если ни какого метода не передано выполним метод инициализации
			return methods.init.apply( this, arguments );

		} else {
			//если переданный метод не существует в объекте methods выведем ошибку
			$.error( 'Метод с именем ' +  method + ' не существует для jQuery.myPlugin' );
		}

	};

})(jQuery); */