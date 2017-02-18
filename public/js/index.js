$(function () {
	var State = {
		decoreBig: false,
		bouquetBig: false,
		menu_l: true,
		sliderPosition: 0,
		sliderStep: 50,
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
		if($(this).attr('data-side') == 0) {
			if(!State.decoreBig)
				$(this).find('.overlay').css({
					'height': $('.img-left').css('height')
				});
		}
		else {
			if(!State.bouquetBig)
				$(this).find('.overlay').css({
					'height': $('.img-right').css('height')
				});
		}
	})
	
	$('.address-map').click(function () {
		$('.address-big div').css({'opacity': .7});
		$('.address-big div').hide();
		$('.address').hide();

		$('.address-big').show(1000, function () {
			$('.address-big div').show(1, function () {
				$('.address-big div').css({'opacity': 1});
			})
		});
	});

	$('.close_block').click(function () {
		$('.address-big').hide();
		$('.address').show();
	});

	$('.hovereffect').click(function(e) {
		var _self = $(this);
		if ($(this).attr('data-side') === '0') {
			if(!State.decoreBig) {
				var size = $('.block-right').find('.hovereffect').css('height');

				$('.img-left').css('margin-top', Number(-1 * $('.img-left').css('height')
												 .substring(0, size.length - 2) / 2) + 'px');

				$('.spacer').hide();
				$('.block-left').hide();
				$('.block-right').css('width', '100%');
				$('.block-right').find('.hovereffect').removeClass('hovereffect')
				.addClass('hovereffectactive');

				$('.hovereffectactive').css('height', size);
				$(this).find('.overlay').css('opacity', '0');
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
					_self.find('.overlay').css( {'height': size, 'opacity': '1'} );
					State.decoreBig = true;
				}, 1000)
			} else {
				if(e.target.className === 'decor' || e.target.id === 'closeX') {
					$('.img-left').css('margin-top', 0);
					$(this).find('.overlay').css('opacity', '0');
					$('.spacer').show();
					$('.decor').css( 'display', 'none' );
					$('.block-right').css('width', '50%');
					$('.block-right').find('.hovereffectactive').removeClass('hovereffectactive')
					.addClass('hovereffect');
					GlobFunction.leftUnActive();

					setTimeout(function () {
						var img = $('.hovereffect').eq(0).find('img').css('height');
						$('.decor svg').remove();
						$('.decor').css( 'right', '109px' );
						$('.decor').css( 'display', '' );
						$('.block-left, .text_content').show();

						$('.hovereffect').css('height', '');
						_self.find('.overlay').css( {'height': img,'opacity':''} );
						State.decoreBig = false;
					}, 1000);
				}	
			}
		} else {
			if(!State.bouquetBig) {
				var size = $('.block-right').find('.hovereffect').css('height');

				$('.img-right').css('margin-top', Number(-1 * $('.img-right').css('height')
												 .substring(0, size.length - 2) / 2) + 'px');

				$('.block-left').css('width', '100%');
				$('.block-left').find('.hovereffect').removeClass('hovereffect')
				.addClass('hovereffectactive');

				$('.hovereffectactive').css('height', size);
				$(this).find('.overlay').css('opacity', '0');

				$('.bouquet, .f_m, .text_content, .block-right, .Wallop').hide();

				setTimeout(function () {
					if($('.right_active').length === 0) {
						GlobFunction.rightActive();
					} else {
						GlobFunction.rightShow();
					}

					var coord = $('.instagram').eq(0).offset();
					$('.f_m').show().addClass('active').css({'margin-top': '0'});
					var lng = $('.img-right').css('width').length;
					var centerDecor = Number($('.img-right').css('width').substring(0, lng-2) / 2) + 'px';
					$('.bouquet').css( 'left', centerDecor );
					$('.bouquet').css( 'display', '' ).append(closeX);
					_self.find('.overlay').css( {'height': size, 'opacity': '1'} );
					State.bouquetBig = true;
				}, 1000)
			} else {
				if(e.target.className === 'bouquet' || e.target.id === 'closeX') {
					$('.img-right').css('margin-top', 0);
					$(this).find('.overlay').css('opacity', '0');
					$('.right_active').hide();
					$('.bouquet').css( 'display', 'none' );
					$('.block-left').css('width', '50%');
					$('.block-left').find('.hovereffectactive').removeClass('hovereffectactive')
					.addClass('hovereffect');
					
					$('.f_m').hide().removeClass('active').css({'right': 0, 'margin-top': '-80px'});

					setTimeout(function () {
						var img = $('.hovereffect').eq(0).find('img').css('height');
						$('.Wallop, .f_m, .text_content').show();
						$('.bouquet svg').remove();
						$('.bouquet').css( 'left', '109px' );
						$('.bouquet').css( 'display', '' );
						$('.block-right').show();

						$('.hovereffect').css('height', '');
						_self.find('.overlay').css({'height': img,'opacity':''});
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

	/* ИНПУТЫ */
	$('#fm_phone, #fm_phone2').inputmask("+7 (999) 999 99 99");
	$('#fm_mail, #fm_mail2').inputmask({ alias: "email"});
	$('#fm_data, #fm_data2').inputmask({ alias: "date"});
	$('#fm_time, #fm_time2').inputmask("99:99");

	$('.fm_btn').click(function () {
		InputError.call($('#fm_name'));
		InputError.call($('#fm_phone'));
		InputError.call($('#fm_mail'));
		InputError.call($('#fm_address'));
		InputError.call($('#fm_data'));
		//InputError.call($('#fm_time'));

		if($('input.error').length === 0) {
			SendEmail();
		}
	});

	//ОТПРАВИМ ПИСЬМО С ЗАКАЗОМ
	function SendEmail() {
		$.ajax({
			method: "POST",
			async: true,
			url: '/sendemail',
			data: { 
				fio: $('#fm_name').val(), 
				phone: $('#fm_phone').val(),
				mail: $('#fm_mail').val(),
				address: $('#fm_address').val(),
				date: $('#fm_data').val(),
				time: $('#fm_time').val(),
			}
		}).done( function (answer) {
			if(answer && answer.type === 'success') {
				alert('Заказ сформирован');
			} else {
				alert('Не удалось сформировать заказ...');
			}	 
		}).fail(function(ex) {
			alert('Oh, something went wrong...');
		});
	}

	function InputError() {
		if(!$(this).val()) 
			$(this).addClass('error');
	}

	$(document).off('keyup', 'input.error');
	$(document).on('keyup', 'input.error', function () {
		if($(this).val())
			$(this).removeClass('error');
	});

	//Слайдер
	var wallopEl = document.querySelector('.Wallop');
  	var slider = new Wallop(wallopEl);

  	//bouquet 
  	function GetBouquetsMain () {
		$.ajax({
			method: "GET",
			async: true,
			url: '/getbouquets',
		}).done( function (res) {
			$('.bouquet_container_main').html(res);
		}).fail(function(ex) {
			toastr.error('Oh, something went wrong...');
		});
	}
	GetBouquetsMain();

	//flowers
	function GetFlowersMain () {
		$.ajax({
			method: "GET",
			async: true,
			url: '/getflowers',
		}).done( function (res) {
			$('.flowers_container_slider').html(res);
		}).fail(function(ex) {
			toastr.error('Oh, something went wrong...');
		});
	}
	GetFlowersMain();

	$(document).off('click','.flowers_nextbtn');
	$(document).on('click','.flowers_nextbtn', function () {
		var lng = $('.flowers_container_slider div').length;
		if(!$('.flowers_prevbtn').is(':visible')) {
			$('.flowers_prevbtn').show();
		}

		if(Number($('.flowers_container_slider div').eq(lng - 1).position().left + State.sliderStep) > 
			$('.flowers_nextbtn').position().left) {
				State.sliderPosition += Number(-1 * State.sliderStep);
				$('.flowers_container_slider div').eq(0).css('margin-left', State.sliderPosition + 'px');
		} else {
			$(this).hide();
		}
	});

	$(document).off('click','.flowers_prevbtn');
	$(document).on('click','.flowers_prevbtn', function () {
		if(!$('.flowers_nextbtn').is(':visible')) {
			$('.flowers_nextbtn').show();
		}

		if($('.flowers_container_slider div').eq(0).css('margin-left') != '0px') {
				State.sliderPosition += Number( State.sliderStep);
				$('.flowers_container_slider div').eq(0).css('margin-left', State.sliderPosition + 'px');
		} else {
			$(this).hide();
		}
	});

	$(document).off('click', '.bouquet_container_main div');
	$(document).on('click','.bouquet_container_main div', function () {
		var src = $(this).find('img').attr('src');
		$('.js-popUp-content').text($(this).attr('data-content'));
		$('.js-popUp-price').text($(this).attr('data-price') + '₽');

		$('.popUp-img').attr('src', src);
		$('.popUp').show();
	});

	$(document).off('click', '.popUp-cross');
	$(document).on('click','.popUp-cross', function () {
		$('.popUp').hide();
	});

	$(document).off('click', 'input[type="radio"]');
	$(document).on('click','input[type="radio"]', function () {
		if($(this).val() === '1')
			$('.popUp-delivery').show();
		else 
			$('.popUp-delivery').hide();
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
