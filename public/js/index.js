var isMob = false;
$(function () {
	var State = {
		decoreBig: false,
		bouquetBig: false,
		menu_l: true,
		sliderPosition: 0,
		sliderStep: 0,
		isMobile: false,
	}

	State.isMobile = window.matchMedia('only screen and (min-width: 320px) and (max-device-width: 960px), all and (max-width: 960px)').matches;
	isMob = State.isMobile;
	
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

	if(!State.isMobile) {
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
						var centerDecor = Number($('.img-left').css('width').substring(0, lng-2) / 2);
						var dLng = $('.decor').css('width').length;
						var selfSize = Number($('.decor').css('width').substring(0, dLng-2) / 2);
						_self.find('.overlay').css( {'height': size, 'opacity': '1'} );
						$('.decor').css( 'display', '' ).append(closeX);
						$('.decor').css( 'right', centerDecor - selfSize );
						State.decoreBig = true;
					}, 1000)
				} else {
					if(e.target.className === 'decor' || e.target.id === 'closeX') {
						if( $('.popUpWhite').is(':visible') ) 
							$('.popUpWhite').hide();

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
						//if($('.right_active').length === 0) {
							GlobFunction.rightActive();
						//} else {
						//	GlobFunction.rightShow();
						//}

						var coord = $('.instagram').eq(0).offset();
						$('.f_m').show().addClass('active').css({'margin-top': '0'});
						var lng = $('.img-right').css('width').length;
						var centerDecor = Number($('.img-right').css('width').substring(0, lng-2) / 2);
						var bLng = $('.bouquet').css('width').length;
						var selfSize = Number($('.bouquet').css('width').substring(0, bLng-2) / 2);
						
						_self.find('.overlay').css( {'height': size, 'opacity': '1'} );
						$('.bouquet').css( 'left', centerDecor - selfSize );
						$('.bouquet').css( 'display', '' ).append(closeX);

						State.bouquetBig = true;
					}, 1000)
				} else {
					if(e.target.className === 'bouquet' || e.target.id === 'closeX') {
						$(document).off('scroll');
						$('.right_active').remove();
						
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
	} else {
		$(document).on('touchstart', '.hovereffect', function() {
			var _self = $(this);

			if (_self.attr('data-side') === '0') {
				if(!State.decoreBig) {
					$('.decor').addClass('cross');
					$('.text_content, .block-left').hide();
					_self.find('.overlay').addClass('mobileactive');

					if($('.left_active').length === 0) {
						GlobFunction.leftActive();
					} else {
						GlobFunction.leftShow();
					}

					State.decoreBig = true;
				} else {
					$('.decor').removeClass('cross');
					$('.left_active').hide();
					$('.text_content, .block-left').show();
					_self.find('.overlay').removeClass('mobileactive');
					State.decoreBig = false;
				}
			} else {
				if(!State.decoreBig) {
					GlobFunction.rightActive();
					$('.bouquet').addClass('cross');	
					_self.find('.overlay').addClass('mobileactive');

					$('html, body').animate({
					    "scrollTop": $(".Wallop").offset().top
					 }, 1500);

					State.decoreBig = true;
				} else {
					$('.bouquet').removeClass('cross');	
					$('.right_active').remove();
					_self.find('.overlay').removeClass('mobileactive');
					State.decoreBig = false;
				}
			}
		});
	}
	
	$('.address-map').click(function () {
		$('.address-big div').css({'opacity': .7});
		$('.address-big div').hide();
		$('.address').hide();

		$('.address-big').show(1000, function () {
			$('.address-big div').show(1, function () {
				$('.address-big div').css({'opacity': 1});

				if($(this).attr('id') === 'mapContainer') 
					MapInit();
			})
		});
		
	});

	function MapInit () {
		if(!$('#mapContainer').text()) {
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
		}
	}

	$('.close_block').click(function () {
		$('.address-big').hide();
		$('.address').show();
	});

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

	$(document).off('click', '.fm_btn');
	$(document).on('click', '.fm_btn', SendEmailFn);

	$(document).off('click', '.fm_btn2');
	$(document).on('click', '.fm_btn2', SendEmail2Fn);

	function SendEmailFn() { 
		$(document).off('click', '.fm_btn');

		InputError.call($('#fm_name'));
		InputError.call($('#fm_phone'));
		InputError.call($('#fm_mail'));
		InputError.call($('#fm_address'));
		InputError.call($('#fm_data'));

		if($('input.error').length === 0) {
			SendEmail();
		} else {
			$(document).on('click', '.fm_btn', SendEmailFn);
		}
	}

	function SendEmail2Fn() {
		$(document).off('click', '.fm_btn2');

		InputError.call($('#fm_name2'));
		InputError.call($('#fm_phone2'));
		InputError.call($('#fm_mail2'));
		///Доставка
		if($('input[type="radio"]:checked').val() === '1') { 
			InputError.call($('#fm_address2'));
			InputError.call($('#fm_data2'));
		} else {
			$('#fm_address2').removeClass('error');
			$('#fm_data2').removeClass('error');
		}

		if($('input.error').length === 0) {
			SendEmail2();
		} else {
			$(document).on('click', '.fm_btn2', SendEmail2Fn);
		}
	}

	//ОТПРАВИМ ПИСЬМО С ЗАКАЗОМ ДОСТАВКА
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
			$(document).on('click', '.fm_btn', SendEmail2Fn);
			if(answer && answer.type === 'success') {
				$('.fm_btn').hide();
				$('.fm_btn').prev().css('width','100%').text('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
			} else {
				alert('Не удалось сформировать заказ...');
			}	 
		}).fail(function(ex) {
			alert('Oh, something went wrong...');
		});
	}

	function SendEmail2() { 
		$.ajax({
			method: "POST",
			async: true,
			url: '/sendemail2',
			data: { 
				fio: $('#fm_name2').val(), 
				phone: $('#fm_phone2').val(),
				mail: $('#fm_mail2').val(),
				isChecked: $('input[type="radio"]:checked').val(),
				address: $('#fm_address2').val(),
				date: $('#fm_data2').val(),
				time: $('#fm_time2').val(),
				content: $('.popUp .js-popUp-content').text(),
			}
		}).done( function (answer) {
			$(document).on('click', '.fm_btn2', SendEmail2Fn);
			if(answer && answer.type === 'success') {
				$('.fm_btn2').hide();
				$('.fm_btn2').prev().css('width','100%').text('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
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

  	if(State.isMobile) {
  		var touchPositionS, touchPositionE;
  		$('.Wallop').on('touchstart', function (e) {
  			touchPositionS = e.touches[0].clientX;
  		});
  		$('.Wallop').on('touchend', function (e) {
  			 touchPositionE = e.changedTouches[0].clientX;
  			 if(touchPositionS > touchPositionE) 
  			 	slider.next();
  			 else if (touchPositionE > touchPositionS)
  			 	slider.previous();
  		});
  	}

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
		FlowerSliderNext();
	});

	function FlowerSliderNext() { 
		var lng = $('.flowers_container_slider div').length;
		var singleWidth = $('.flowers_container_slider div').eq(0).css('width');
		var margin = $('.flowers_container_slider div').eq(0).css('margin-left');
		var containerSize = $('.flowers_container_slider').css('width');
		var mS = Number(margin.substring(0, margin.length - 2));
		var iS = Number(singleWidth.substring(0, singleWidth.length - 2)) + 10;
		var cS = Number(containerSize.substring(0, containerSize.length - 2));
		var allS = Number(lng * iS);
		var commonSize = cS + (-1*mS) + iS/2; 

		if(!$('.flowers_prevbtn').is(':visible')) {
			$('.flowers_prevbtn').show();
		}
		
		State.sliderStep = Number(iS/2);

		if(allS > commonSize) {		
				State.sliderPosition += Number(-1 * State.sliderStep);
				$('.flowers_container_slider div').eq(0).css('margin-left', State.sliderPosition + 'px');
		} else {
			$('.flowers_nextbtn').hide();
			$('.flowers_container_slider div').eq(0).css('margin-left', Number(-1*(allS - 5 - cS)) + 'px');
		}
	}

	$(document).off('click','.flowers_prevbtn');
	$(document).on('click','.flowers_prevbtn', function () {
		FlowerSliderPrev();
	});

	function FlowerSliderPrev() {
		var lng = $('.flowers_container_slider div').length;
		var singleWidth = $('.flowers_container_slider div').eq(0).css('width');
		var iS = Number(singleWidth.substring(0, singleWidth.length - 2)) + 10;
		var margin = $('.flowers_container_slider div').eq(0).css('margin-left'); 
		var mS = Number(margin.substring(0, margin.length - 2));

		if(!$('.flowers_nextbtn').is(':visible')) {
			$('.flowers_nextbtn').show();
		}

		State.sliderStep = Number(iS/2);

		if(Number(mS + State.sliderStep) < 0) {
				State.sliderPosition += Number( State.sliderStep);
				$('.flowers_container_slider div').eq(0).css('margin-left', State.sliderPosition + 'px');
		} else {
			$('.flowers_prevbtn').hide();
			$('.flowers_container_slider div').eq(0).css('margin-left',0);
		}
	}

	if(State.isMobile) {
		var touchPositionStart, touchPositionEnd;
  		$('.flowers_container_slider').on('touchstart', function (e) {
  			touchPositionStart = e.touches[0].clientX;
  		});
  		$('.flowers_container_slider').on('touchend', function (e) {
  			 touchPositionEnd = e.changedTouches[0].clientX;
  			 if(touchPositionStart > touchPositionEnd) 
  			 	FlowerSliderNext();
  			 else if (touchPositionEnd > touchPositionStart)
  			 	FlowerSliderPrev();
  		});
	}

	$(document).off('click', '.bouquet_container_main div');
	$(document).on('click','.bouquet_container_main div', function () {
		var src = $(this).find('img').attr('src');
		$('.js-popUp-content').text($(this).attr('data-content'));
		$('.js-popUp-price').html($(this).attr('data-price') + '<span class="rub">p</span>');

		$('.popUp-img').attr('src', src);
		$('.popUp').show();
		var h = $('.popUp').css('height')
						   .substring(0, $('.popUp').css('height').length-2);
		
		$('.hellSpacer').css('height', h/3+190);
	});

	$(document).off('click', '.popUp-cross');
	$(document).on('click','.popUp-cross', function () {
		$(this).parent().hide();
		$('.hellSpacer').css('height', 0);

		if(!$('.fm_btn2').is(':visible')) {
			$('.fm_btn2').prev().text('');
			$('.fm_btn2').show();
		}
	});

	$(document).off('click', 'input[type="radio"]');
	$(document).on('click','input[type="radio"]', function () {
		if($(this).val() === '1')
			$('.popUp-delivery').show();
		else 
			$('.popUp-delivery').hide();
	});

	$(document).off('click', '.flowers_container_slider div');
	$(document).on('click','.flowers_container_slider div', function () {
		var src = $(this).find('img').attr('src');
		var text =  $(this).find('img').attr('data-text');
		$('.js-popUp-content').text( text );
		
		$('.popUp-img').attr('src', src);
		$('.popUp2').show();
	});
})