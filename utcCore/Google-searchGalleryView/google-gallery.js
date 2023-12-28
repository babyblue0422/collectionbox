$(function () {

    gallerfy();
    var curPicPos = 0;
    //Pictures details view

    $(".picflex .resultitem > .box > a").click(function (e) {
        console.log('opn');
        $(this).parent().parent().find('.addToOrder').children().attr('title', $(this).parent().find('.cart-add').attr('title'));
        $(".picflex .resultitem").removeClass("open");
        $(this).parent().parent().addClass("open");
        curPicPos = $(this).parent().attr('data-pos');
        $(window).scrollTop(curPicPos);
        e.preventDefault();
    });
    $(".picflex .resultitem").find(".detailNext").click(function () {
        $(this).parent().parent().find('.addToOrder').children().attr('title', $(this).parent().find('.cart-add').attr('title'));
        $(this).parent().parent().parent().parent().next().addClass("open").prev().removeClass("open");
        curPicPos = $(this).parent().parent().parent().parent().next().find('.box').attr('data-pos');
        $(window).scrollTop(curPicPos);
        return false;
    });
    $(".picflex .resultitem").find(".detailPrev").click(function () {
        $(this).parent().parent().find('.addToOrder').children().attr('title', $(this).parent().find('.cart-add').attr('title'));
        $(this).parent().parent().parent().parent().prev().addClass("open").next().removeClass("open");
        curPicPos = $(this).parent().parent().parent().parent().prev().find('.box').attr('data-pos');
        $(window).scrollTop(curPicPos);
        return false;
    });
    $(".picflex .resultitem").find(".detailClose").click(function () {
        $(".picflex .resultitem").removeClass("open");
        return false;
    });

    $(".open #orderClick").click(function () {
        var picId = $(this).parent().parent().parent().parent().parent().find('.iconlinks').children().eq(0).attr('id')
        $("#" + picId).trigger('click');
    });
    //Pictures details view

    //gallry to list to gallery view
    $('.toggleView > span').click(function () {
        $('.toggleView span').removeClass('active');
        var view = $(this).data('view');
        $(this).addClass('active');
        if (view != "picflex") {
            $('.viewchange').removeClass('picflex listview').addClass(view).find('.resultitem').removeAttr('style').find('.thumbMeta').toggleClass('col-sm-6 col-sm-12');
        } else {
            $('.viewchange').removeClass('picflex listview').addClass(view).find('.thumbMeta').toggleClass('col-sm-6 col-sm-12');
            gallerfy();
        }
    });

    //Mouse over popup
    $(".viewchange .resultitem .box").on("mouseenter", function () {

        var imgpop = $(this).parent().find('.thumbnail_popup'),
            poppos = imgpop.offset(),
            imgover = $(this).offset(),
            screnWidth = $(window).width() / 2,
            screnHeight = ($(window).height() - 320) / 2,
            imgoverHeight = $(this).outerHeight();

        if (imgover.left < screnWidth) {
            imgpop.addClass('popposLeft');
            //imgpop.css({ 'left': 110 });
        } else if (imgover.left > screnWidth) {
            imgpop.addClass('popposRight');
            // imgpop.css({ 'left': -435 });
        }
        if (imgover.top < screnHeight) {
            imgpop.removeClass('popposBottom').addClass('popposTop');
            //imgpop.css({ 'top': 0 });
        } else if (imgover.top > screnHeight) {
            imgpop.removeClass('popposTop').addClass('popposBottom');
            //imgpop.css({ 'bottom': 0 });
        }

        imgpop.show();

    }).on("mouseleave", function () {
        $('.thumbnail_popup').hide();
    });

    /*scroll to top start*/
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $('a[href="#top"]').show();
        } else {
            $('a[href="#top"]').hide();
        }
    });

    // scroll body to 0px on click
    $('a[href="#top"]').click(function () {
        $(window).animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    /*scroll to top ends*/

    /*Date Picker from to */
    $.getScript('https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.7.1/js/bootstrap-datepicker.js', function () {
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        var daysback = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 30);

        $('#date-from').datepicker({
            autoclose: true,
            format: 'dd MM yyyy'
        }).datepicker('setDate', daysback);
        $('#date-to').datepicker({
            autoclose: true,
            endDate: new Date(),
            format: 'dd MM yyyy'
        }).datepicker('setDate', today);

        $('.icon-arrow-left').addClass('glyphicon glyphicon-chevron-left');
        $('.icon-arrow-right').addClass('glyphicon glyphicon-chevron-right');
    });

});



//$.getScript('//cdn.rawgit.com/xremix/xGallerify/master/dist/jquery.xgallerify.min.js', function () {
function gallerfy() {
    $('.picflex .box').each(function () {
        var boxWidth = $(this).attr('data-imgWidth'),
            boxHeight = $(this).attr('data-imgHeight');
        (boxWidth > boxHeight) ? $(this).parent().attr('style', "width:" + parseInt(boxWidth * 200 / boxHeight) + "px"): $(this).parent().attr('style', "width:" + parseInt(180 / boxHeight * boxWidth) + "px");
        $(this).attr('data-pos', parseInt($(this).offset().top) - 65);
    });
    //var gallery = $('.picflex').gallerify({
    //    mode: {
    //        maxHeight: screen.height * 0.5,
    //        breakPoints: [
    //      {
    //          minWidth: 1170,
    //          columns: 5,
    //      }, {
    //          minWidth: 970,
    //          columns: 4,
    //      }, {
    //          minWidth: 750,
    //          columns: 3,
    //      }, {
    //          maxWidth: 750,
    //          columns: 2,
    //      }
    //        ]
    //    },
    //    lastRow: 'adjust'
    //});
}
//});
