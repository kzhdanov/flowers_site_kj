$(function () {
	var State = {
		decoreBig: false,
		bouquetBig: false,
	}
	var closeX = '<svg id="closeX" data-name="closeX" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><polygon points="16 14 28 2 26 0 26 0 14 12 2 0 0 2 12 14 0 26 2 28 14 16 26 28 28 26 28 26 16 14"></polygon></svg>';

	//Появление срелки height
	$('.hovereffect').mouseenter(function () {
		$(this).find('.overlay').css('height', $('.img-left').css('height'));
	})

	$('.address-map').click(function () {
		$('.js-sa').hide();
		$('.address-big').show(1000);
	});

	$('.close_block').click(function () {
		$('.address-big').hide();
		$('.js-sa').show(1000);
	});

	$('.hovereffect').click(function(e) {
		var _self = $(this);
		if ($(this).attr('data-side') === '0') {
			if(!State.decoreBig) {
				$('.block-left').hide(1000);
				$('.block-right').css('width', '100%');
				$('.block-right').find('.hovereffect').removeClass('hovereffect').addClass('hovereffectactive');

				$(this).find('.overlay').css('height', '100%');
				$('.decor').css( 'display', 'none' );
				setTimeout(function () {
					 var lng = $('.img-left').css('width').length;
					 var centerDecor = Number($('.img-left').css('width').substring(0, lng-2) / 2) + 'px';
					 $('.decor').css( 'right', centerDecor );
					 $('.decor').css( 'display', '' ).append(closeX);
					_self.find('.overlay').css( 'height', $('.img-left').css('height') );
					State.decoreBig = true;
				}, 1000)
			} else {
				if(e.target.className === 'decor' || e.target.id === 'closeX') {
					$('.decor').css( 'display', 'none' );
					$('.block-right').css('width', '50%');
					$('.block-right').find('.hovereffectactive').removeClass('hovereffectactive').addClass('hovereffect');
					
					setTimeout(function () {
						$('.decor svg').remove();
						$('.decor').css( 'right', '109px' );
						$('.decor').css( 'display', '' );
						$('.block-left').show();
						_self.find('.overlay').css( 'height', $('.img-left').css('height') );
						State.decoreBig = false;
					}, 1000);
				}	
			}
		} else {
			console.log('right');
		}
	})

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
