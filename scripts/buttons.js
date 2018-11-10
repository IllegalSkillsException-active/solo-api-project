$(document).ready(function () {
    $("li").click(function () {
        $('li > ul').not($(this).children("ul")).hide();
        $(this).children("ul").toggle();
        // $('.submit-rating').on('click', function(){
        //     $(this).children("ul").hide();
        //     $(this).children("ul").toggle();
        // })
    });
});
