$(function () {
    $(window).bind('hashchange', function() {
        HashChangeEvent();
    });

	function HashChangeEvent() {
		switch(window.location.hash) {
			case '#new':
				CreateNewBouquet();
			break;
			case '#list':
				GetListBouquet();
			break;
			case '#newFlower':
				CreateNewFlower();
			break;
			case '#listFlowers':
				GetListFlowers();
			break;
			case '#newEvent':
				CreateNewEvent();
			break;
			case '#listEvents':
				GetListEvents();
			break;
		}
	}

	function CreateNewBouquet () {
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

	function SaveNewBouquet (form) {
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

	function GetListBouquet() {
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
			SaveNewBouquet ($('form').serialize());
		}
	});

	/* ЦВЕТЫ */
	function CreateNewFlower () {
		$.ajax({
			method: "GET",
			async: true,
			url: '/flowers_admin/newflower',
		}).done( function (res) {
			$('.js-container').html(res);
		}).fail(function(ex) {
			toastr.error('Oh, something went wrong...');
		});
	}

	function SaveNewFlower(form) {
		$.ajax({
			method: "POST",
			async: true,
			url: '/flowers_admin/newflower',
			data: form,
		}).done( function (res) {
			if(res && res.type === 'success') {
				toastr.success('Изменения успешно внесены')
			}
		}).fail(function(ex) {
			toastr.error('Oh, something went wrong...');
		});
	}

	function GetListFlowers() {
		$.ajax({
			method: "GET",
			async: true,
			url: '/flowers_admin/getFlowers'
		}).done(function (data) {
			$('.js-container').html(data);
		}).fail(function(ex) {
			toastr.error('Oh, something went wrong...');
		});
	}

	$(document).off('click', '#subFlower');
	$(document).on('click', '#subFlower', function () {
	var c = $('#content').val(),
		s = $('#src').val();

		if(c.length === 0 || s.length === 0 ) {
			toastr.warning('Внимание! Для добавления цветка необходимо заполнить поля: Описание и Путь к картинке.');
			return false;
		} else {
			SaveNewFlower ($('form').serialize());
		}
	});

	/* СОБЫТИЯ */
	function CreateNewEvent () {
		$.ajax({
			method: "GET",
			async: true,
			url: '/flowers_admin/newevent',
		}).done( function (res) {
			$('.js-container').html(res);
		}).fail(function(ex) {
			toastr.error('Oh, something went wrong...');
		});
	}

	$(document).off('click', '#subE');
	$(document).on('click', '#subE', function () {
		var c = $('#content').val(),
			s = $('#imagesFolderSrc').val();
			t = $('#title').val();
			p = $('#previewSrc').val();

		if(c.length === 0 || s.length === 0 || t.length === 0 || p.length === 0 ) {
			toastr.warning('Внимание! Для добавления цветка необходимо заполнить поля: ' + 
						   'Заголовок, Описание, Путь к папке с событием и Путь к картинке предпросмотра');
			return false;
		} else {
			SaveNewEvent ($('form').serialize());
		}
	});

	function SaveNewEvent(form) {
		$.ajax({
			method: "POST",
			async: true,
			url: '/flowers_admin/newevent',
			data: form,
		}).done( function (res) {
			if(res && res.type === 'success') {
				toastr.success('Изменения успешно внесены')
			}
		}).fail(function(ex) {
			toastr.error('Oh, something went wrong...');
		});
	}

	function GetListEvents() {
		$.ajax({
			method: "GET",
			async: true,
			url: '/flowers_admin/getEvents'
		}).done(function (data) {
			$('.js-container').html(data);
		}).fail(function(ex) {
			toastr.error('Oh, something went wrong...');
		});
	}

});

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

function SaveClickFlower(e, id) {
	e.preventDefault();
	if(e.target.parentNode.previousElementSibling.previousElementSibling.childNodes[0].checked)
		isActive = 1;
	else 
		isActive = 0;

	$.ajax({
		method: "POST",
		async: true,
		url: '/flowers_admin/savechangeflower',
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

function DeleteClickFlower (e, id){
	e.preventDefault();

	$.ajax({
		method: "POST",
		async: true,
		url: '/flowers_admin/deleteflower',
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

function SaveClickEvent(e, id) {
	e.preventDefault();
	if(e.target.parentNode.previousElementSibling.previousElementSibling.childNodes[0].checked)
		isActive = 1;
	else 
		isActive = 0;

	$.ajax({
		method: "POST",
		async: true,
		url: '/flowers_admin/savechangeevent',
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

function DeleteClickEvent(e, id){
	e.preventDefault();

	$.ajax({
		method: "POST",
		async: true,
		url: '/flowers_admin/deleteevent',
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

