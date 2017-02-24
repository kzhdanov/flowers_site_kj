$(function () {
	if(!isMob) {
		var position = 0;
		var index = 1;
		$(document).off('scroll');
		$(document).on('scroll', function (e) {
			var st = $(this).scrollTop();
			if(st+800 > $('.foto_ex').position().top) {
				if($(".foto_ex img").eq(0).css('opacity') === '0') {
					$(".foto_ex img").eq(0).css('opacity', 1);
				}
			}
	   		if(st+700 > $(".foto_ex img").eq(index).position().top) {
	   			$(".foto_ex img").eq(index).css('opacity', 1);
	   			index+=1;
	   		}
	   		if(index === 5)	{
	   			$(document).off('scroll');
	   			return false;
	   		}
		})
	}
});