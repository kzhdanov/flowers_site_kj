$(function () {
	var State = {
		decoreBig: false,
		bouquetBig: false,
		menu_l: true,
	}
	var closeX = '<svg id="closeX" data-name="closeX" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><polygon points="16 14 28 2 26 0 26 0 14 12 2 0 0 2 12 14 0 26 2 28 14 16 26 28 28 26 28 26 16 14"></polygon></svg>';

	var GlobFunction = {
		leftActive: function() {
			$.ajax({
					method: "GET",
					async: true,
					url: '/leftActive',
				}).done( function (html) {
					$('.block-right').append(html);
				}).fail(function(ex) {
					toastr.error('Oh, something went wrong...');
			});
		},
		leftUnActive: function() { 
			$('.left_active').hide();
		},
		leftShow: function () {
			$('.left_active').show();
		},
		rightActive: function() {
			$.ajax({
					method: "GET",
					async: true,
					url: '/rightActive',
				}).done( function (html) {
					$('.block-left').append(html);
				}).fail(function(ex) {
					toastr.error('Oh, something went wrong...');
			});
		},
		rightShow: function () {
			$('.right_active').show();
		},
	}

	//Появление срелки height
	$('.hovereffect').mouseenter(function () {
		if($(this).attr('data-side') == 0)
			$(this).find('.overlay').css('height', $('.img-left').css('height'));
		else 
			$(this).find('.overlay').css('height', $('.img-right').css('height'));
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
				$('.spacer').hide();
				$('.block-left').hide();
				$('.block-right').css('width', '100%');
				$('.block-right').find('.hovereffect').removeClass('hovereffect').addClass('hovereffectactive');

				$(this).find('.overlay').css('height', '100%');
				$('.decor').hide();
				$('.text_content').hide();
				setTimeout(function () {
					if($('.left_active').length === 0) {
						GlobFunction.leftActive();
					} else {
						GlobFunction.leftShow();
					}
					var lng = $('.img-left').css('width').length;
					var centerDecor = Number($('.img-left').css('width').substring(0, lng-2) / 2) + 'px';
					$('.decor').css( 'right', centerDecor );
					$('.decor').css( 'display', '' ).append(closeX);
					_self.find('.overlay').css( 'height', $('.img-left').css('height') );
					State.decoreBig = true;
				}, 1000)
			} else {
				if(e.target.className === 'decor' || e.target.id === 'closeX') {
					$('.spacer').show();
					$('.decor').css( 'display', 'none' );
					$('.block-right').css('width', '50%');
					$('.block-right').find('.hovereffectactive').removeClass('hovereffectactive').addClass('hovereffect');
					GlobFunction.leftUnActive();

					setTimeout(function () {
						$('.decor svg').remove();
						$('.decor').css( 'right', '109px' );
						$('.decor').css( 'display', '' );
						$('.block-left').show();
						_self.find('.overlay').css( 'height', $('.img-left').css('height') );
						$('.text_content').show();
						
						State.decoreBig = false;
					}, 1000);
				}	
			}
		} else {
			if(!State.bouquetBig) {
				$('.block-right').hide();
				$('.block-left').css('width', '100%');
				$('.block-left').find('.hovereffect').removeClass('hovereffect').addClass('hovereffectactive');

				$(this).find('.overlay').css({'height': '100%'});
				$('.bouquet').hide();
				$('.f_m').hide();
				$('.text_content').hide();

				setTimeout(function () {
					if($('.right_active').length === 0) {
						GlobFunction.rightActive();
					} else {
						GlobFunction.rightShow();
					}

					var coord = $('.instagram').eq(0).offset();
					$('.f_m').show().addClass('active');
					var lng = $('.img-right').css('height').length;
					var imgBottomPosition = Number($('.img-right').css('height').substring(0, lng-2));
					$('.f_m').css({ 'right': coord.left, 'top': imgBottomPosition + 'px' });

					var lng = $('.img-right').css('width').length;
					var centerDecor = Number($('.img-right').css('width').substring(0, lng-2) / 2) + 'px';
					$('.bouquet').css( 'left', centerDecor );
					$('.bouquet').css( 'display', '' ).append(closeX);
					_self.find('.overlay').css( 'height', $('.img-right').css('height') );
					State.bouquetBig = true;
				}, 1000)
			} else {
				if(e.target.className === 'bouquet' || e.target.id === 'closeX') {
					$('.right_active').hide();
					$('.bouquet').css( 'display', 'none' );
					$('.block-left').css('width', '50%');
					$('.block-left').find('.hovereffectactive').removeClass('hovereffectactive').addClass('hovereffect');
					
					$('.f_m').hide().removeClass('active').css({'right': 0, 'top': '83%'});

					setTimeout(function () {
						$('.f_m').show();
						$('.text_content').show();
						$('.bouquet svg').remove();
						$('.bouquet').css( 'left', '109px' );
						$('.bouquet').css( 'display', '' );
						$('.block-right').show();
						_self.find('.overlay').css( 'height', $('.img-right').css('height') );
						State.bouquetBig = false;
					}, 1000);
				}	
			}
		}
	})

	$('.f_m-left').click(function () {
		if(!State.menu_l) {
			$('.f_m-right').removeClass('active');
			$('.f_m-left').removeClass('unactive');
			$('.f_m_nowAvailable').show();
			$('.f_m_delivery').hide();
			State.menu_l = true;
		} 
	});

	$('.f_m-right').click(function () {
		if(State.menu_l) {
			$('.f_m-right').addClass('active');
			$('.f_m-left').addClass('unactive');
			$('.f_m_nowAvailable').hide();
			$('.f_m_delivery').show();
			State.menu_l = false;
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
