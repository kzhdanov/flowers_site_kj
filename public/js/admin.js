$(function () {
    $(window).bind('hashchange', function() {
        HashChangeEvent();
    });


	function HashChangeEvent() {
		if(window.location.hash === '#new') {
			CreateNew();
		} else {
			console.log(window.location.hash);
		}
	}

	function CreateNew () {
		$.ajax({
			method: "GET",
			async: true,
			url: '/flowers_admin/save',
		}).done( function (res) {
			$('.js-container').html(res);
		}).fail(function(ex) {
			toastr.error('Oh, something went wrong...');
		});
	}

	function SaveNew (form) {
		$.ajax({
			method: "POST",
			async: true,
			url: '/flowers_admin/save',
			data: form,
		}).done( function (res) {
			if(res && res.type === 'success') {
				toastr.success('Изменения успешно внесены')
			}
		}).fail(function(ex) {
			toastr.error('Oh, something went wrong...');
		});
	}

	$(document).off('click', '#sub');
	$(document).on('click', '#sub', function () {
		var c = $('#content').val(),
			p = $('#price').val(),
			s = $('#src').val();

		if(c.length === 0 || p.length === 0 || s.length === 0 ) {
			toastr.warning('Внимание! Для добавления букета необходимо заполнить поля: Описание, Цена и Путь к картинке.');
			return false;
		} else {
			SaveNew ($('form').serialize());
		}
	})
})