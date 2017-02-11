$(function () {
	//Появление срелки height
	$('.hovereffect').mouseenter(function () {
		$(this).find('.overlay').css('height', $('.img-left').css('height'));
	})

	$('.address-map').click(function () {
		$('.js-sa').hide();
		$('.address-big').show();
	});

	$('.close_block').click(function () {
		$('.address-big').hide();
		$('.js-sa').show(1000);
	});

	ymaps.ready(init);
		var myMap,
		    myPlacemark;

    function init() {     
        myMap = new ymaps.Map("mapContainer", {
            center: [59.955701, 30.304585],
            zoom: 16,
            controls: ['zoomControl']
        });

        myPlacemark = new ymaps.Placemark([59.955701, 30.304585], { 
            hintContent: 'Мастерская Desire event', 
            balloonContent: 'Мастерская Desire event' 
        });

        myMap.geoObjects.add(myPlacemark);
    }
})
