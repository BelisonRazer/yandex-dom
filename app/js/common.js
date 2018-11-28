$(function() {

	$(document).ready(function(){
        $('.header__menu a').each(function () {
            if (this.href == location.href) $(this).parent().addClass('active');
        });
    });

});