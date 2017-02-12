$(function () {
    $(window).bind('hashchange', function() {
        HashChangeEvent();
    });


	function HashChangeEvent() {
		if(window.location.hash === '#new') {
			CreateNew();
		} else {
			GetList();
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

	function GetList() {
		$.ajax({
			method: "GET",
			async: true,
			url: '/flowers_admin/get'
		}).done(function (data) {
			$('.js-container').html(data);
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

function ActiveClick(e) {
	e.target.parentNode.nextElementSibling.nextElementSibling.children[0].style.display = '';
}

function SaveClick(e, id) {
	e.preventDefault();
	if(e.target.parentNode.previousElementSibling.previousElementSibling.childNodes[0].checked)
		isActive = 1;
	else 
		isActive = 0;

	$.ajax({
		method: "POST",
		async: true,
		url: '/flowers_admin/savechange',
		data: { 'isActive': isActive, 'id': id }
	}).done(function (data) {
		if(data && data.type === 'success') {
			toastr.success('изменения сохранены');
			e.target.style.display = 'none';
		} else {
			toastr.error('ошибка сохранения');
		}
	}).fail(function(ex) {
		toastr.error('Oh, something went wrong...');
	});
}

function DeleteClick (e, id){
	e.preventDefault();

	$.ajax({
		method: "POST",
		async: true,
		url: '/flowers_admin/delete',
		data: { 'id': id }
	}).done(function (data) {
		if(data && data.type === 'success') {
			if(data && data.type === 'success') {
				e.target.parentNode.parentNode.remove()
			}
		} else {
			toastr.error('ошибка удаления записи');
		}
	}).fail(function(ex) {
		toastr.error('Oh, something went wrong...');
	});
}