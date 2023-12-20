var langs = ['刪除後無法回復，是否確定刪除?', '個檔案'],
    body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
(function($) {
    $.fn.textWidth = function () {
        if (!$.fn.textWidth.fakeEl) {
            $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
        }
        $.fn.textWidth.fakeEl.text(this.val() || this.text()).css('font', this.css('font'));
        return $.fn.textWidth.fakeEl.width();
    };
	$.ciaoyu = {
		init:function() {
            this.btnEvents();
            this.imgEvents();
            this.inputEvents();
        },
        btnEvents:function() {
            // 點擊確認
            $(document).on('click', '.btn-confirm:not(.btn-disable)', function() {
                return btnConfirm(this);
            });
            // 點擊鎖定
            $(document).on('click', '.btn-disable:not(.btn-confirm)', function() {
                btnDisable(this);
            });
            // 點擊確認後鎖定
            $(document).on('click','.btn-confirm.btn-disable', function() {
                var r = btnConfirm(this);
                if ( r ) btnDisable(this);
                return r;
            });
            function btnConfirm(e){
                var $s = encodeForJS($(e).data('confirm'));
                return confirm($s ? $s : langs[0]);
            };
            function btnDisable(e){
                var $v = $(e).prop('tagName').toLowerCase();
                if ($v == 'a') {
                    $(e).addClass('disabled').attr({tabindex: '-1', 'aria-disabled': 'true'});
                } else {
                    $(e).prop('disabled', true);
                }
            };
            // 點擊確認後鎖定
            $(document).on('click','.btn-countdown',
                function() {
                    var e = $(this), origin = encodeForJS(e.text()), text = encodeForJS(e.data('text')), num = parseInt(e.data('num'), 10) || 10;
                    e.data('origin',origin);
                    if ( !text ) {
                        text = origin;
                    };
                    countdown(e, num, text);
                }
            );
            function countdown(e,s,t) {
                s -= 1;
                if (s >= 0) {
                    e.prop('disabled', true).html(t+' (' + (s+1) + ')');
                    setTimeout(function() {
                        countdown(e,s,t);
                    },1000);
                } else e.prop('disabled', false).html(encodeForJS(e.data('origin')));
            }
            // 返回頂端
            $(document).on('click','.btn-spytop',
                function() {
                    body.stop().animate({
                        scrollTop:0,
                    },800);
                    return false;
                }
            );
        },
        imgEvents:function() {
            $('.img-setbg').each(function(index, el) {
                var e = $(el),
                    s = $(el).attr('src');
                if ( e.hasClass('lazyload') && e.data('src') ) {
                    s = e.data('src');
                };
                e.parent().css('background-image','url("'+encodeForJS(s)+'")');
                e.remove();
            });
        },
        inputEvents:function() {
            // 檔案上傳顯示檔名
            $('.input-upload > [type=file]').on('change',function() {
                var files = Array.from(this.files),
                    fileName = files.map((f) => {return f.name;}).join(', '),
                    btn = $(this).next('span');
                if (!btn.data('text')) {
                    btn.data('text',encodeForJS(btn.html()));
                }
                if (!fileName) {
                    fileName = btn.data('text');
                }
                btn.html(encodeForJS(fileName));
                if (files.length > 1 && btn.textWidth() > btn.width()) {
                    btn.html(files.length + langs[1]);
                }
            });
            // 是否顯示欄位所鍵入的文字，如使用者代號
            $(document).on('click', '[data-ciao="input-eye"]', function() {
                inputEye($(this));
                return false;
            });
            function inputEye(e) {
                var target = encodeForJS(e.data('target'));
                if (typeof target !== 'undefined') {
                    var t = $(target), mode = t.attr('type');
                    if ('password' == mode) {
                        t.attr("type", "text");
                    }
                    else {
                        t.attr("type", "password");
                    };
                    if (e.hasClass('fa-eye') ||
                        e.hasClass('fa-eye-slash')) {
                        e.toggleClass('fa-eye fa-eye-slash');
                    };
                    if (0 < e.find('.fa-eye').length ||
                        0 < e.find('.fa-eye-slash').length) {
                        var c = 0 < e.find('.fa-eye').length ? e.find('.fa-eye') : e.find('.fa-eye-slash');
                        c.toggleClass('fa-eye fa-eye-slash');
                    };
                };
            }
        }
	};

	$(function() {
        if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
            var e = ["%c %c %c CiaoYu Web UI Kit ✰ Love You Always Forever ✰  %c  ", "background: #ff66a5; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff66a5; background: #030307; padding:5px 0;", "background: #ff66a5; padding:5px 0;"];
            window.console.log.apply(console, e);
        };
        $.ciaoyu.init();
	});
})(jQuery);
function encodeForJS(s){
   return $('<span>',{text:s}).text();
}
// responsiveTabs
!function(n){function i(i,e){i.each(function(){var i=n(this).outerWidth(!0);n(this).find("a").data("width",i)}),i.prependTo(e),i.find("a").unwrap().removeClass("nav-link").addClass("dropdown-item")}function e(e){var t=e.find("li"),o=t.first(),r=o.outerHeight();if(e.outerHeight()>r){var a=o.offset();t.each(function(){var t=n(this);if(t.offset().top>a.top){var o=e.find(".responsivetabs-more");if(!o.length){o=n('<li class="nav-item dropdown responsivetabs-more"><a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">…</a><div class="dropdown-menu dropdown-menu-right"></div></li>'),e.append(o)}var r=t.prev(),d=t.nextAll().not(".dropdown"),s=n(".dropdown-menu",o);return t.hasClass("dropdown")||(i(d,s),i(t,s)),void i(r,s)}})}else{var d,s=e.parent().width(),f=0;e.children("li").each(function(){f+=n(this).outerWidth(!0)}),d=s-f,e.find(".dropdown-menu a").each(function(){if(!(n(this).data("width")<=d))return!1;n(this).removeClass("dropdown-item").addClass("nav-link"),n(this).insertBefore(e.find(".responsivetabs-more")).wrap('<li class="nav-item"></li>'),d-=n(this).data("width")}),e.find(".dropdown-menu a").length||e.find(".responsivetabs-more").remove()}}n.fn.responsiveTabs=function(){return this.each(function(){var i=n(this);e(i),n(window).resize(function(){e(i)})}),this}}(jQuery);
// rPage
!function(e){jQuery.fn.rPage=function(){for(var i=e(this),t=0,s=i.length;t<s;t++)new n(e(i[t]));function n(i){var t;this.label=function(){var i=this.els.filter(".active").index(),t=this;this.els.each(function(){0==t.isNextOrPrevLink(e(this))?e(this).addClass("page-away-"+Math.abs(i-e(this).index()).toString()):e(this).index()>i?e(this).addClass("right-etc"):e(this).addClass("left-etc")})},this.makeResponsive=function(){this.reset();for(var e=this.calculateWidth();e>this.els.parent().parent().width()-10;){if(0==this.removeOne())break;e=this.calculateWidth()}},this.isNextOrPrevLink=function(e){return e.hasClass("pagination-prev")||e.hasClass("pagination-next")||"»"==e.text()||"«"==e.text()},this.isRemovable=function(e){if(this.isNextOrPrevLink(e))return!1;var t=this.els.filter(e).index();return 1!=t&&!this.isNextOrPrevLink(i.find("li").eq(t+1))&&"..."!=e.text()},this.removeOne=function(){for(var e=this.els.filter(".active").index(),t=i.find("li").length-1,s=t-1;s>0;s--){var n=this.els.filter(".page-away-"+s.toString()).filter(function(){return"none"!=this.style.display});if(n.length>0)for(var a=0;a<n.length;a++){var r=n.eq(a);if(this.isRemovable(r))return r.css("display","none"),this.needsEtcSign(e,t-1)&&this.els.eq(t-2).before("<li class='page-item disabled removable'><span class='page-link'>...</span></li>"),this.needsEtcSign(1,e)&&this.els.eq(1).after("<li class='page-item disabled removable'><span class='page-link'>...</span></li>"),!0}}return!1},this.needsEtcSign=function(e,t){if(t-e<=1)return!1;for(var s=!1,n=!1,a=e+1;a<t;a++){var r=i.find("li").eq(a);"none"==r.css("display")&&(n=!0),"..."==r.text()&&(s=!0)}return 1==n&&0==s},this.reset=function(){for(var e=0;e<this.els.length;e++)this.els.eq(e).css("display","inline");i.find("li").filter(".removable").remove()},this.calculateWidth=function(){for(var e=0,t=0;t<i.find("li").length;t++)"none"!=i.find("li").eq(t).css("display")&&(i.find("li").eq(t).children("a").eq(0).length>0&&(e+=i.find("li").eq(t).children("a").eq(0).outerWidth()),i.find("li").eq(t).children("span").eq(0).length>0&&(e+=i.find("li").eq(t).children("span").eq(0).outerWidth()));return e},this.els=i.find("li"),this.label(),this.makeResponsive(),e(window).resize(e.proxy(function(){clearTimeout(t),t=setTimeout(e.proxy(function(){this.makeResponsive()},this),100)},this))}}}(jQuery);
// rCrumbs
!function(t,i,s,e){"use strict";var n,r=(n=s.getElementsByTagName("html")[0],function(){return parseInt(i.getComputedStyle(n).fontSize)}),a="rcrumbs",o={version:"@@version",callback:{preCrumbsListDisplay:t.noop,preCrumbDisplay:t.noop,postCrumbsListDisplay:t.noop,postCrumbDisplay:t.noop},ellipsis:!0,windowResize:!0,nbUncollapsableCrumbs:2,nbFixedCrumbs:1,animation:{activated:!0,speed:400}};function h(i,s){this.element=i,this.$element=t(i),this.options=t.extend(!0,{},o,s),this._defaults=o,this._name=a,h.prototype.plugin=this,this._init()}h.prototype={version:function(){return this.options.version},_init:function(){if(this.$element.hasClass("rcrumbs")||this.$element.addClass("rcrumbs"),this.nbCrumbDisplayed=0,this.$crumbsList=t("ol",this.element),this.$crumbs=t("li",this.$crumbsList),this.$lastCrumb=this.$crumbs.last(),this.reversedCrumbs=t("li",this.$crumbsList).get().reverse(),this.lastNbCrumbDisplayed=0,this.totalCrumbsWidth=0,this.fixedCrumbsWidth=0,this._initCrumbs(),this.options.nbFixedCrumbs>0){var i=this.$crumbs.length;this.$crumbs=t("li",this.$crumbsList).slice(this.options.nbFixedCrumbs,i),this.reversedCrumbs=t("li",this.$crumbsList).slice(this.options.nbFixedCrumbs,i).get().reverse();var s=this;t("li",this.$crumbsList).slice(0,this.options.nbFixedCrumbs).each(function(i,e){s.totalCrumbsWidth+=t(e).data("width"),t(e).addClass("d-inline")})}this._showOrHideCrumbsList(!0),this.options.windowResize&&this._showOrHideCrumbsListOnWindowResize()},_getHiddenElWidth:function(i){var s,e=t(i).clone(!1);return e.css({visibility:"hidden",position:"absolute"}),e.appendTo(this.$crumbsList),s=e.width(),e.remove(),s},_initCrumbs:function(){var i=this;t(this.$crumbsList).contents().filter(function(){return 3===this.nodeType}).remove(),t.each(this.$crumbs,function(s,e){var n=t(this);i._storeCrumbWidth(n)}),this.options.nbFixedCrumbs>0&&t(this.$crumbs).slice(0,this.options.nbFixedCrumbs).each(function(s,e){i.fixedCrumbsWidth+=t(e).data("width")})},_storeCrumbWidth:function(t){var i=this._getHiddenElWidth(t);return t.data("width",i),i},_showOrHideCrumbsList:function(i){var s=this;this.remainingSpaceToDisplayCrumbs=this.$element.width(),this.nbCrumbDisplayed=0,this.totalCrumbsWidth=0,this.options.nbFixedCrumbs>0&&(this.remainingSpaceToDisplayCrumbs-=this.fixedCrumbsWidth,t("li",this.$crumbsList).slice(0,this.options.nbFixedCrumbs).each(function(i,e){s.totalCrumbsWidth+=t(e).data("width")})),this.nextCrumbToShowWidth=void 0,this.options.callback.preCrumbsListDisplay(this),t.each(this.reversedCrumbs,function(e,n){var r=t(this),a=t(s.reversedCrumbs[e+1]);s._showOrHideCrumb(r,a,e,i)}),this.lastNbCrumbDisplayed=this.nbCrumbDisplayed,this.options.callback.postCrumbsListDisplay(this)},_showOrHideCrumb:function(t,i,s,e){this.options.callback.preCrumbDisplay(t);var n=this;function a(){t.addClass("d-inline"),n.lastNbCrumbDisplayed<n.nbCrumbDisplayed+1&&n.options.animation.activated&&!e?(t.width(0),t.animate({width:t.data("width")+1*r()},n.options.animation.speed,function(){n.options.callback.postCrumbDisplay(t)})):n.options.callback.postCrumbDisplay(t),n.nbCrumbDisplayed+=1}this.remainingSpaceToDisplayCrumbs-=t.data("width")+1*r(),s<this.options.nbUncollapsableCrumbs?(a(),this.remainingSpaceToDisplayCrumbs<0&&function(t){t.css({width:n.remainingSpaceToDisplayCrumbs+t.data("width")-1*r()+"px"}),t.addClass("text-truncate")}(this.$lastCrumb),this.totalCrumbsWidth+=t.data("width")):this.remainingSpaceToDisplayCrumbs>=0?(a(),this.totalCrumbsWidth+=t.data("width")):(this.lastNbCrumbDisplayed>this.nbCrumbDisplayed-1&&this.options.animation.activated?t.animate({width:0},n.options.animation.speed,function(){t.removeClass("d-inline")}):t.removeClass("d-inline"),this.nextCrumbToShowWidth||(this.nextCrumbToShowWidth=t.data("width")))},_showOrHideCrumbsListOnWindowResize:function(){var s=this;t(i).resize(function(){var i=s.$element.find("ol.breadcrumb").width();(i<s.totalCrumbsWidth||s.totalCrumbsWidth+s.nextCrumbToShowWidth<i)&&(t.each(s.reversedCrumbs,function(i,s){t(this).stop(!0,!0)}),s._showOrHideCrumbsList()),i>=s.totalCrumbsWidth&&s.$lastCrumb.hasClass("text-truncate")&&s._disableEllipsis(s.$lastCrumb)})},_disableEllipsis:function(t){t.css({width:"auto"}),t.removeClass("text-truncate")}},t.fn[a]=function(i){if(h.prototype[i]&&-1===i.indexOf("_")){var s=t.data(this[0],"plugin_"+a);if(s)return h.prototype[i].apply(s,Array.prototype.slice.call(arguments,1));t.error("jquery."+a+" plugin must be initialized first on the element")}else{if("object"==typeof i||!i)return this.each(function(){t.data(this,"plugin_"+a)?t.error("jquery."+a+" plugin cannot be instantiated multiple times on same element"):t.data(this,"plugin_"+a,new h(this,i))});t.error("Method "+i+" does not exist on jquery."+a)}}}(jQuery,window,document),"undefined"!=typeof document&&function(t,i){var s=t.createElement("style");if(t.getElementsByTagName("head")[0].appendChild(s),s.styleSheet)s.styleSheet.disabled||(s.styleSheet.cssText=i);else try{s.innerHTML=i}catch(t){s.innerText=i}}(document,'@charset "UTF-8";.rcrumbs li{display:none}');

$(function() {
    var ciaoyu = setTimeout(CiaoyuGo(), 500);
    function CiaoyuGo(){
        $(".breadcrumb").parent('nav').rcrumbs();
        $('[data-ciao="tabs-group"]').responsiveTabs();
        $('.pagination').rPage();
    }
});

$(function () {
    $('[data-ciao="toast"]').on('click', function() {
        var e = $(this),
            type  = e.data('type'),
            title = e.data('title'),
            text  = e.data('text'),
            position = e.data('position'),
            timer = e.data('timer');
        Swal.fire({
            toast: true,
            position: position?position:"top-end",
            showConfirmButton: false,
            timer: timer?timer:'3000',
            type: type?type:null,
            title: title?title:null,
            text: text?text:null
        });
    });
    $('[data-ciao="alert"]').on('click', function() {
        var e = $(this),
            type  = e.data('type'),
            title = e.data('title'),
            text  = e.data('text'),
            position = e.data('position');
        Swal.fire({
            type: type?type:null,
            title: title?title:null,
            text: text?text:null,
            position: position?position:"center"
        });
    });
    $('[data-ciao="confirm"]').on('click', function(event) {
        return swalcheck(this, event);
    });
    function swalcheck(element, event){
        var type  = $(element).data('type'),
            title = $(element).data('title'),
            text  = $(element).data('text');
        if ( element.dataset.confirmed === 'true' ) {
            element.dataset.confirmed = 'false';
            return true;
        }
        else {
            event.preventDefault();
            Swal.fire({
                title: title?title:null,
                type: type?type:null,
                text: text?text:null,
                showCancelButton: true,
                confirmButtonText: "是",
                cancelButtonText: "否"
            }).then(function(result) {
                if (result.value) {
                    element.dataset.confirmed = 'true';
                    element.click();
                };
            })
        };
    }
});

$(function () {
    if (typeof $.magnificPopup !== 'undefined') {
        $('[data-ciao="lightbox-image"]').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            fixedContentPos: false,
            mainClass: 'mfp-with-zoom mfp-img-mobile',
            image: {
                verticalFit: true
            },
            zoom: {
                enabled: true,
                duration: 300 // don't foget to change the duration also in CSS
            }
        });
        $('[data-ciao="lightbox-gallery"]').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: '讀取圖片 #%curr%...',
            fixedContentPos: false,
            mainClass: 'mfp-with-zoom mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                verticalFit: true,
                titleSrc: function(item) {
                    return item.el.attr('title');
                }
            },
            zoom: {
                enabled: true,
                duration: 300, // don't foget to change the duration also in CSS
                opener: function(element) {
                    return element.find('img');
                }
            }
        });
        $('[data-ciao="lightbox-video"]').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade mfp-img-mobile',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }
});
