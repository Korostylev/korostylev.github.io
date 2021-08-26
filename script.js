let center = [47.709237, 40.215401];

function init() {
	let map = new ymaps.Map('map-test', {
		center: center,
		zoom: 15
	});

    // Создание метки
	let placemark1 = new ymaps.Placemark(center, {
        hintContent: 'Собственный значок метки',
        balloonContent: 'Это красивая метка',
    }, {
		iconLayout: 'default#image',
		iconImageHref: 'https://image.flaticon.com/icons/png/512/64/64113.png',
		iconImageSize: [40, 40],
		iconImageOffset: [-19, -44]
	});

    // Метка с контентом
    var placemark2 = new ymaps.Placemark([47.715900, 40.220953], {
        // Зададим содержимое заголовка балуна.
        balloonContentHeader: '<a href = "#">Преисподняя</a><br>' +
            '<span class="description">Но это не точно</span>',
        // Зададим содержимое основной части балуна.
        balloonContentBody: 'А сюда можно html код. Ссылку на сайт, например <a href="http://mousosh5.ucoz.net/">5 школа</a><br>'+
        'или картинку<br><img src="http://mousosh5.ucoz.net/_tbk/tbh/sbory.jpeg" height="150" width="200"',
        // Зададим содержимое нижней части балуна.
        balloonContentFooter: 'А это подпись',
        // Зададим содержимое всплывающей подсказки.
        hintContent: 'Адище'
    });

	map.controls.remove('geolocationControl'); // удаляем геолокацию
  map.controls.remove('searchControl'); // удаляем поиск
  map.controls.remove('trafficControl'); // удаляем контроль трафика
  map.controls.remove('typeSelector'); // удаляем тип
  map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
  map.controls.remove('zoomControl'); // удаляем контрол зуммирования
  map.controls.remove('rulerControl'); // удаляем контрол правил
  // map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

  // Добавление метки
	map.geoObjects.add(placemark1);
    map.geoObjects.add(placemark2);

    // Откроем балун на метке.
    //placemark2.balloon.open();
}

ymaps.ready(init);