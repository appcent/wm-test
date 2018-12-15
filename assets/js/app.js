import $ from 'jquery';
import './vendor/iziModal';
import './_tabs';
import './_form';
import './_select';
import './_sliders';
import './_material';

$(document)
    .ready(() => {

        ymaps.ready(mapInit);

        $('.b-modal').iziModal({
            width: 820,
            overlayColor: 'rgba(0, 0, 0, 0.4)',
            padding: 15
        });

    })
    .on('click', '.b-header-nav__burger', e => {
        $(e.target).closest('.b-header-nav__burger').toggleClass('is-active');

        $('.b-header-mob-nav').toggleClass('is-open');

        $('body').toggleClass('b-body-hidden');
    });

//ymap
const mapInit = () => {
    let myMap = new ymaps.Map(
        'map',
        {
            center: [58.602104, 49.670547], // Порядок по умолчнию: «широта, долгота».
            zoom: 15, // от 0 (весь мир) до 19.
            //controls: [],
        },
        {
            searchControlProvider: 'yandex#search',
        }
        ),
        //общий шаблон балуна
        myBalloonLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="b-map-layout">' +
            '<a href="#" class="b-map-layout__close-btn"></a>' +
            '<div class="b-map-layout__arrow"></div>' +
            '<div class="b-map-layout-inner">' +
            '$[[options.contentLayout]]' +
            '</div>' +
            '</div>', {
                build: function() {
                    this.constructor.superclass.build.call(this);

                    this._$element = $('.b-map-layout', this.getParentElement());

                    this.applyElementOffset();

                    this._$element
                        .find('.b-map-layout__close-btn')
                        .on('click', $.proxy(this.onCloseClick, this));
                },
                clear: function() {
                    this._$element.find('.b-map-layout__close-btn').off('click');
                    this.constructor.superclass.clear.call(this);
                },
                onSublayoutSizeChange: function() {
                    myBalloonLayout.superclass.onSublayoutSizeChange.apply(
                        this,
                        arguments
                    );

                    if (!this._isElement(this._$element)) {
                        return;
                    }

                    this.applyElementOffset();

                    this.events.fire('shapechange');
                },
                applyElementOffset: function() {
                    this._$element.css({
                        left: -(this._$element[0].offsetWidth / 2),
                        top: -(
                            this._$element[0].offsetHeight +
                            this._$element.find('.b-map-layout__arrow')[0].offsetHeight
                        ),
                    });
                },
                onCloseClick: function(e) {
                    e.preventDefault();

                    this.events.fire('userclose');
                },
                getShape: function() {
                    if (!this._isElement(this._$element)) {
                        return myBalloonLayout.superclass.getShape.call(this);
                    }

                    let position = this._$element.position();

                    return new ymaps.shape.Rectangle(
                        new ymaps.geometry.pixel.Rectangle([
                            [position.left, position.top],
                            [
                                position.left + this._$element[0].offsetWidth,
                                position.top +
                                this._$element[0].offsetHeight +
                                this._$element.find('.b-map-layout__arrow')[0].offsetHeight,
                            ],
                        ])
                    );
                },
                _isElement: function(element) {
                    return element && element[0] && element.find('.b-map-layout__arrow')[0];
                },
            }
        ),
        //шаблон контента балуна
        myBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="b-map-layout__title">Заголовок</div>' +
            '<div class="b-map-layout__description">$[properties.balloonHeader]</div>' +
            '<div class="b-map-layout__title">Описание</div>' +
            '<div class="b-map-layout__description">$[properties.balloonContent]</div>'
        ),
        //метки
        spasskaya = new ymaps.Placemark([58.602104, 49.670547], {
            balloonHeader: 'Подзаголовок',
            balloonContent: 'Текст описания',
        }, {
            balloonContentLayout: myBalloonContentLayout,
            iconLayout: 'default#image',
            iconImageHref: '../images/icon-map.png',
            iconImageSize: [90, 99],
            iconImageOffset: [-29, -53],
            balloonLayout: myBalloonLayout,
            balloonShadow: false,
            balloonPanelMaxMapArea: 0,
            hideIconOnBalloonOpen: false,
            balloonOffset: [-200, 80],
        });

    myMap.geoObjects.add(spasskaya);
    myMap.behaviors.disable('scrollZoom');
};

