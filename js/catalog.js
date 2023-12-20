$(function () {
  // 滑動選單固定
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) { // 要滑動到選單的距離
      $('.sidebar-offcanvas').addClass('affix-top')
    } else {
      $('.sidebar-offcanvas').removeClass('affix-top')
    }
  })
  // 左側選單點選，頁面滑動
  // 參考 https://tt5.org/%e5%a6%82%e4%bd%95%e8%ae%93%e7%b6%b2%e9%a0%81%e4%b8%8a%e7%9a%84%e9%8c%a8%e9%bb%9e%ef%bc%8c%e7%94%a2%e7%94%9f%e5%b9%b3%e6%bb%91%e9%81%8e%e6%b8%a1%e7%9a%84%e6%95%88%e6%9e%9c%ef%bc%9f/
  // 參考 https://css-tricks.com/snippets/jquery/smooth-scrolling/
  //   $('a[href*="#"]:not([href="#"])').click(function () {
  //     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
  //       var target = $(this.hash)
  //       target = target.length ? target : $('[id=' + this.hash.slice(1) + ']')
  //       if (target.length) {
  //         $('html, body').animate({
  //           scrollTop: target.offset().top - 100
  //         }, 1000)
  //         return false
  //       }
  //     }
  //   })
  // https://jsnwork.kiiuo.com/archives/282/jquery-%E6%8D%B2%E8%BB%B8%E6%BB%BE%E5%8B%95%E5%88%B0%E6%8C%87%E5%AE%9A%E7%9A%84%E9%8C%A8%E9%BB%9E/


  // $('nav ul li a').click(function () {
  //   // console.log($(this).attr('href'))
  //   // var $body = (window.opera) ? (document.compatMode == 'CSS1Compat' ? $('html') : $('body')) : $('html,body')
  //   var $body = $('html,body')
  //   $body.animate({
  //     scrollTop: $($(this).attr('href')).offset().top - 100 + 'px'
  //   }, {
  //     duration: 750,
  //     easing: 'swing'
  //   })
  //   return false
  // })


    $('nav ul li a').click(function () {
    var href = $(this).attr('href');
    $('.section-nav ul li a').each(function (i, value) {
      var hrefs = $(this).attr('href');
      if (hrefs == href) {
        $($('section .mb-0 .btn-link')[i]).attr('aria-expanded', 'true');
        $($('section .collapse')[i]).addClass('show').css('height', '');
        $(this).addClass('active');
      } else {
        //$('section .collapse')[i].removeClass('show')
        //$('.section-nav .btn-link')[i].attr('aria-expanded', 'false');
        $(this).removeClass('active');
      }
    });

    var $body = $('html,body')
    $body.animate({
      scrollTop: $($(this).attr('href')).offset().top - 100 + 'px'
    }, {
      duration: 750,
      easing: 'swing'
    })

    return false
    })
// 右側滑動到section區塊，左側相對應選單呈現active
//  var sections = $('section'),
//    nav = $('nav')
//
  // $(window).on('scroll', function () {
  //   var cur_pos = $(this).scrollTop() + 50

  //   sections.each(function () {
  //     var top = $(this).offset().top - 100,
  //       bottom = top + $(this).outerHeight(),
  //       first_top = 100

  //     if (cur_pos >= top && cur_pos <= bottom) {
  //       nav.find('a').removeClass('active')
  //       sections.removeClass('active')
  //       $(this).addClass('active')
  //       nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active')
  //     }
  //     if (cur_pos <= first_top) {
  //       $('.section-nav li:first-child a').addClass('active')
  //     }
  //   })
  // })

    var sections = $('section'),
      nav = $('nav.section-nav')

    $(window).on('scroll', function () {
      var cur_pos = $(this).scrollTop() + 150;

      sections.each(function () {
        var top = $(this).offset().top - 100;
        bottom = top + $(this).outerHeight();
        first_top = 100;

        if (cur_pos >= top && cur_pos <= bottom) {
          nav.find('a').removeClass('active')
          sections.removeClass('active')
          $(this).addClass('active')
          nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active')
        }
        if (cur_pos <= first_top) {
          $('.section-nav li:first-child a').addClass('active')
        }
      })
      // 已經捲到底部，指定最後一個
      if (Math.round($(window).scrollTop() + $(window).height()) == $(document).height()) {

        $('nav ul li a').each(function (index) {
          if (index === $('nav ul li a').length - 1) {
            $(this).addClass('active');
          } else {
            $(this).removeClass('active');
          }
        })
      }

    })


//  // collapse
  // $('#btn-expand-sec').hide()
  // $('#btn-collapse-sec').click(function () {
  //   $('section .collapse').removeClass('show')
  //   $('#btn-expand-sec').show()
  //   $('#btn-collapse-sec').hide()
  //   $('.btn-link').attr('aria-expanded', 'false')
  // })
  // $('#btn-expand-sec').click(function () {
  //   $('section .collapse').addClass('show').css('height', '')
  //   $('#btn-expand-sec').hide()
  //   $('#btn-collapse-sec').show()
  //   $('.btn-link').attr('aria-expanded', 'true')
  // })

//   // offcanvas
//   $('[data-toggle="offcanvas"]').click(function () {
//     $('.row-offcanvas').toggleClass('active')
//   })
// })


  // collapse
  $('#btn-expand-sec').hide()

  $('#btn-collapse-sec').click(function () {
    $('section .collapse').removeClass('show');
    $('#btn-expand-sec').show();
    $('#btn-collapse-sec').hide();
    $('section .btn-link').attr('aria-expanded', 'false')
  })

  //全部打開
  $('#btn-expand-sec').click(function () {
    $('section .collapse').addClass('show').css('height', '')
    $('#btn-expand-sec').hide()
    $('#btn-collapse-sec').show()
    $('section .btn-link').attr('aria-expanded', 'true')
  })
  $('.section-header .btn-link').click(function () {
    $('.collapse').each(function (index) {
      if ($(this).hasClass('show')) {
        // $('#btn-expand-sec').show()
        // $('#btn-collapse-sec').hide()
        $(this).parent().find('section .btn-link').attr("aria-expanded", "true")
      }
    })
  })

})