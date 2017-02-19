$(function () {
	$(document).off('click', '.weddings-item');
	$(document).on('click', '.weddings-item', function (e) {
		e.preventDefault();
		var _self = $(this);

		$('.popUpWhite').show(); 
		
		$.ajax({
			method: "POST",
			async: true,
			url: '/geteventbyid',
    		data: { 
				id: _self.attr('data-id'),
			}
		}).done( function (res) {
			if(res.type === 'success') {
				$('.pw-title').text(res.data.title);
				$('.pw-content').text(res.data.content);

				var imagePath = '../Downloads/Events/' + res.data.imagesFolderSrc + '/';
				var images = ''; 

				res.data.imagesArray.map(function (el) {
					images += CreateImage(imagePath + el) + '<br/> ';
				});
				$('.pw-images').html(images);
				hideAll();
			} else {
				toastr.error('Oh, something went wrong...');
			}
		}).fail(function(ex) {
			toastr.error('Oh, something went wrong...');
		});

		$('html, body').animate({ scrollTop: $('.popUpWhite').offset().top - 50 }, 1000);
	});

	function CreateImage(src) {
		return '<img src="'+ src + '" name="events" />';
	}

	function hideAll() {
		$('.instagram,.instagram_fetch,.footer').hide();
	}
	function showAll() {
		$('.instagram,.instagram_fetch,.footer').show();
	}

	$(document).off('click', '.popUpWhite-cross');
	$(document).on('click', '.popUpWhite-cross', function (e) {
		e.preventDefault();
		showAll();
		$(this).parent().hide(); 
	});

	$(document).off('click', '.backto');
	$(document).on('click', '.backto', function (e) {
		e.preventDefault();
		showAll();
		$('.popUpWhite').hide();
	});
})