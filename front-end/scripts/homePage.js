/**
 * Created by petrovaliev95 on 01-Dec-14.
 */
$(function () {
    $('.slider').slick({
        rtl: false,
        autoplay: true,
        autoplaySpeed: 2000,
        centerPadding: "150px"
    });

    var prevButton = $('<span class="glyphicon glyphicon-chevron-left">');
    var nextButton = $('<span class="glyphicon glyphicon-chevron-right">');

    $('button.slick-prev').removeClass('slick-prev').addClass('button-prev').text('').append(prevButton);
    $('button.slick-next').removeClass('slick-next').addClass('button-next').text('').append(nextButton);
    
});