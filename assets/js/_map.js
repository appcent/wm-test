import $ from "jquery";

$(document)
	.ready(() => {



	})
	.on('mouseover', '.b-map', e => {

		const target = e.currentTarget;
		const data = target.getAttribute('data-map-init');
		// если карта еще не инициализирована
		if ( !data ) {

			target.setAttribute('data-map-init', 'true');
			target.querySelector('.b-map__loader').classList.add('is-active');

			loadScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1', function(){
				ymaps.ready(init);
			});

		}


	});

/**
 * Инициализация карты */
const init = () => {

	let map = new ymaps.Map('map', {

		center: [55.730138, 37.594238],
		zoom: 7, // от 0 (весь мир) до 19
		controls: ['zoomControl']

	}), placemark = new ymaps.Placemark([55.730138, 37.594238], {}, { // настройки балуна

		iconLayout: 'default#image',
		iconImageHref: './assets/images/icon-map.png',
		iconImageSize: [90, 99], // x, y
		iconImageOffset: [-29, -53], // x, y

	});

	map.geoObjects.add(placemark);
	map.behaviors.disable('scrollZoom'); // отключим зум скролом мышки

	// Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
	const layer = map.layers.get(0).get(0);

	// Решение по callback-у для определения полной загрузки карты
	waitForTilesLoad(layer).then(function() {
		// Скрываем индикатор загрузки после полной загрузки карты
		$('.b-map__loader').removeClass('is-active');
	});

};

/**
 * Определяем полную загрузку карты (тайлов) */
const waitForTilesLoad = layer => {

	return new ymaps.vow.Promise(function (resolve, reject) {

		let tc = getTileContainer(layer),
			readyAll = true;

		tc.tiles.each((tile, number) => {

			if ( !tile.isReady() ) readyAll = false;

		});

		if ( readyAll ) resolve();
			else tc.events.once('ready', () => resolve());

	});

};

const getTileContainer = layer => {

	for (var k in layer) {
		if (layer.hasOwnProperty(k)) {
			if (
				layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
				|| layer[k] instanceof ymaps.layer.tileContainer.DomContainer
			) {
				return layer[k];
			}
		}
	}

	return null;

};

/**
 * Загрузка API Яндекс.Карт по требованию */
const loadScript = (url, callback) => {

	let script = document.createElement('script');

	if ( script.readyState ){  // IE

		script.onreadystatechange = function(){
			if (script.readyState == 'loaded' ||
				script.readyState == 'complete'){
				script.onreadystatechange = null;
				callback();
			}
		};

	} else {  // Другие браузеры

		script.onload = function(){
			callback();
		};

	}

	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);

};