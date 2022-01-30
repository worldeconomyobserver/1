var privateSpace=window.privateSpace||{};
require.config({
  waitSections:0,
	paths:{
            "letter":"lib/letter",
            "promotion": "lib/promotion",
            "babel": js_static_path + "/libs/babel-helpers",
            "Lazyload": js_static_path +"/lazyload/app.min",
            "template": js_static_path + "/libs/template",
            "slideshow_plugin": js_static_path + "/slideshow/app.min",
            "purrCore": js_static_path + "/purr/app.min",
            "easing":"vendor/jquery.easing.1.3"
		  },
	shim:{
		'letter':['jquery','commonnew','jquery.cookie'],
        'promotion': ['jquery'],
        'track_v1':['jquery','commonnew','jquery.cookie'],
        'Lazyload': ['babel', 'template'],
        "slideshow_plugin": ['babel'],
        "purrCore": ["babel"],
        "slideshow_lib":["jquery"]
         }
});
requirejs(["jquery", "template", "promotion", "commonnew","jquery.cookie","letter","easing","slideshow_lib","slideshow_plugin","track_v1", "Lazyload", "purrCore"], function($, template, promotion) {
    var imgLazyload = new Lazyload('.img-lazyload', {
        type: 'img',
        threshold: 60
    });

    if ( typeof adConfList !== "undefined" ) {
        promotion.init( adConfList, target );
        $( ".dfp_ad_container" ).each( function() {
            var id = $( this ).attr( "id" );
            promotion.show( id );
        } );
    }

    function lazyloadError(el, callback) {
        var randomNum = Math.floor(Math.random() * 100000000);
        var html = '<div class="refresh_lazyload_cont" id="refreshLazyload' + randomNum + '">' +
                '<i class="refresh_lazyload_icon"></i>' +
                '网络错误，点击重新加载</div>';
        el.html(html);
        $('#refreshLazyload' + randomNum).on('click', function() {
            el.html('<i class="lazyload-loading"></i>');
            callback.call(this);
        });
    }

    function renderHotStory(data) {
        template.config('openTag', '{#');
        template.config('closeTag','#}');
        var html = template('hotStoryTpl', data);
        return html;
    }

    var hotStoryLazyload = new Lazyload('#hotStory', {
        type: 'dom',
        threshold: 60,
        onLoaded: function(data, el, index) {
            if (parseInt(data.code) !== 0) {
                lazyloadError(el, function() {
                    hotStoryLazyload.refresh(index);
                });
            } else {
                var html = renderHotStory(data);
                el.html(html);
                NYTCN.Template.tabUI.init($("#hotStory"));
            }
        },
        onError: function(el, index) {
            lazyloadError(el, function() {
                hotStoryLazyload.refresh(index);
            });
        }
    });

    function renderLensColumnA( data ) {
        template.config('openTag', '{#');
        template.config('closeTag','#}');
        var strVar = "";
        strVar += "<ul class=\"regularSummaryList\">";
        strVar += "{# each list as item index#}";
        strVar += "<li class=\"{# if index === 0 #} first {# else if index >= list.length - 1#} last {#/if#}\"> ";
        strVar += "<h3 class=\"regularSummaryHeadline\"><a href=\"{#item.web_url#}\" title=\"{# item.sf_headline #}\">{# item.sf_headline #}<\/a><\/h3>";
        strVar += "<h6 class=\"byline\">{# item.byline #}<span class=\"time\">{# item.publication_date #}<\/span> <\/h6>";
        strVar += "{# if item.photo && item.photo.type !== \"slideshow\"\ #}";
        strVar += "<div class=\"thumbnail\">";
        strVar += "	<a href=\"{# item.web_url #}\" title=\"{# item.sf_headline #}\">";
        strVar += "		<img src=\"{# item.photo.url #}\" alt=\"\" width=\"{# item.photo.width #}\" height=\"{# item.photo.height #}\">";
        strVar += "	<\/a>";
        strVar += "<\/div>";
        strVar += "{# /if #}";
        strVar += "<p class=\"summary\">{# item.summary #}<\/p>";
        strVar += "{# if item.refer_list #}";
        strVar += "";
        strVar += "<ul class=\"referList\">";
        strVar += "{# each item.refer_list as refer refer_index #}";
        strVar += "    <li class=\"{# refer.type #}_refer {# if refer_index === 0 #} first {# else if refer_index >= item.refer_list.length - 1#} last {#/if#}\"><h3 class=\"referListHeadline\">";
        strVar += "{# if refer.type === \"link\"\ #}";
        strVar += "	<a href=\"{# refer.link #}\" title=\"{# refer.text #}\">{# refer.text #}<\/a>";
        strVar += "{# else #}";
        strVar += "	<a href=\"{# refer.web_url #}\" title=\"{# refer.headline #}\">{# refer.headline #}<\/a>";
        strVar += "{# /if #}";
        strVar += "<\/h3>";
        strVar += "<\/li>";
        strVar += "{# /each #}";
        strVar += "<\/ul>";
        strVar += "{# /if #}";
        strVar += " <\/li>{# /each #}";
        strVar += "<\/ul>";

        var render = template.compile(strVar);
        var html = render({
            "list": data.assets
        });

        return html;
    }

    var lensColumnALazyload = new Lazyload('.sectionAutoList.columnA .regular_summary', {
        type: 'dom',
        threshold: 60,
        onLoaded: function(data, el, index) {
            if (parseInt(data.code) !== 0) {
                lazyloadError(el, function() {
                    lensColumnALazyload.refresh(index);
                });
            } else {
                var html = renderLensColumnA(data);
                el.html(html);
            }
        },
        onError: function(el, index) {
            lazyloadError(el, function() {
                lensColumnALazyload.refresh(index);
            });
        }
    });

    function initSlideshow(){
        if($(".photospot-slideshow").length <=0 || $(".photospot-slideshow-600px") <= 0) {
            return false;
        }

        $("head").append("<meta id='WT.slideshow' name='WT.slideshow' content=''> ");
        var slideshowFlag = false;
        function sendTrack(s, type) {
            var uri = window.location.protocol + '//' + window.location.hostname + s.slideData.web_url;
            ga('set', 'page', s.slideData.web_url);
            ga('set', 'title', s.slideData.headline);
            ga('send', 'pageview');
            if (slideshowFlag) {
                ga('send', 'event', 'slideshow', type, s.slideData.web_url, s.options.currentPage);
                var slideshowUrl = window.location.protocol + '//' + window.location.host + s.slideData.web_url;
                var slideshowPageUrl = slideshowUrl + "#" + s.options.currentPage;
                $.ajax({
                    url: '/static/comscore.json',
                    dataType: 'json',
                    type: 'get'
                });
                self.COMSCORE && COMSCORE.beacon({ c1: "2", c2: "3005403", c3: "", c4: slideshowUrl, c7: slideshowPageUrl, c8: s.slideData.headline});
            } else {
                ga('send', 'event', 'slideshow', 'open', s.slideData.web_url, s.options.currentPage);
                slideshowFlag = true;
            }
            $("meta[id='WT.slideshow']").attr("content","page"+(s.options.currentPage));
            NYTCN.meta.page_url = uri;
        }
        function bindEvent(el, s) {
            var prevBtn, nextBtn;
            prevBtn = el.find('.previous_button');
            nextBtn = el.find('.next_button');
            prevBtn.on('click', function(){
                s.prev();
            });
            nextBtn.on('click', function(){
                s.next();
            });
            el.hover(function(){
                s.pauseAutoplay();
            }, function() {
                if(s.options.autoPlay) {
                    s.autoplayPaused = false;
                    s.autoPlaySlide();
                }
            });
        }
        function openModal (el, s) {
            el.find('.pageBoxCount').text(s.options.currentPage + ' / ' + s.slideData.photos.length);
            el.find('.slider_navigation').show();
            var imgs = el.find('.picBox');
            var lang = $.cookie('langkey') || 'zh-hans';
            imgs.on('click', function(){
                slideshowFlag = false;
                var slideshowUrl = window.location.protocol + '//' + window.location.host + s.slideData.web_url;
                var slideshowPageUrl = slideshowUrl + "#" + s.options.currentPage;
                $.ajax({
                    url: '/static/comscore.json',
                    dataType: 'json',
                    type: 'get'
                });
                self.COMSCORE && COMSCORE.beacon({ c1: "2", c2: "3005403", c3: "", c4: slideshowUrl, c7: slideshowPageUrl, c8: s.slideData.headline});
                var modalS = new SlideshowModal({
                    "data": s.slideData,
                    "sliderOptions": {
                        "currentPage": s.options.currentPage,
                        "dfp_namespace": dfpNameSpace,
                        "endPageDataUrl": "/async/mostviewed/?lang=" + lang,
                        "changedSlide": function( type ){
                            sendTrack(this, type);
                        }
                    }
                });
            });
        }
        function changedSlide(el, s, type) {
            var prev,next;
            prev = el.find('.previous_button')[0];
            next = el.find('.next_button')[0];

            if(s.options.currentPage === 1) {
                if(prev.className.indexOf('disabled') <= -1) {
                    prev.className += ' disabled';
                }
            } else {
                prev.className = prev.className.replace(' disabled', '');
            }

            if(s.options.currentPage >= s.slideData.photos.length) {
                 if(next.className.indexOf('disabled') <= -1) {
                    next.className += ' disabled';
                }
                if(s.options.autoPlay) {
                    s.options.autoPlay = false;
                    setTimeout(function(){
                        s.options.currentPage = 1;
                        s.autoPlayedSlide = true;
                        s.changeSlide();
                    }, 3000);
                }
            } else {
                next.className = next.className.replace(' disabled', '');
            }
            el.find('.pageBoxCount').text(s.options.currentPage + ' / ' + s.slideData.photos.length);
            if(!s.autoPlayedSlide) {
                sendTrack(s, type);
            }
        }
      if($('.photospot-slideshow').length > 0){
          $('.photospot-slideshow').each(function(index){
            var id = 'photospot-slideshow-' + index;
            $(this).find('.slider_container').attr('id', id);
            var url=$(this).attr("data_jsonpurl");
            if(location.hostname.indexOf('preview') > -1 && url.indexOf('mode=preview') < 0) {
                url += url.indexOf('?') > -1 ? '&mode=preview' : '?mode=preview';
            }
            var self = $(this);
            var slide = new Slideshow(id, {
                "url": "//d3lar09xbwlsge.cloudfront.net/" + url,
                "dataType": "jsonp",
                "type" : "sectionpage",
                "dfp_namespace": dfpNameSpace,
                "autoPlay": true,
                "loading_class": "slider_loading_cont",
                "afterInit": function(){
                    openModal(self, slide);
                },
                "changedSlide": function( type ) {
                    changedSlide(self, slide, type);
                }
            });
            bindEvent(self, slide);
        });
      }else{
        $('.photospot-slideshow-600px').each(function(index){
            var id = 'photospot-slideshow-600px-' + index;
            $(this).find('.slider_container').attr('id', id);
            var url=$(this).attr("data_jsonpurl");
            if(location.hostname.indexOf('preview') > -1 && url.indexOf('mode=preview') < 0) {
                url += url.indexOf('?') > -1 ? '&mode=preview' : '?mode=preview';
            }
            var self = $(this);
            var slide = new Slideshow(id, {
                "url": "//d3lar09xbwlsge.cloudfront.net/" + url,
                "dataType": "jsonp",
                "type" : "sectionpage",
                "dfp_namespace": dfpNameSpace,
                "autoPlay": true,
                "loading_class": "slider_loading_cont",
                "afterInit": function(){
                    openModal(self, slide);
                },
                "changedSlide": function( type ) {
                    changedSlide(self, slide, type);
                }
            });
            bindEvent(self, slide);
        });
      }
    }


    $(document).ready(function(){
        if($('.photospot-slideshow').length > 0) {
            initSlideshow();
        } else if($('.photoList').length > 0){
            var ss=SS.initArticleSlide($("#sectionLeadPackage"));
        }
        // page.ajaxlogin();
        /*jshint ignore:start*/
        /*eslint-disable */
        const purrCore = new PurrCore("web", ".purr-content");
        purrCore.init(function(showUI) {
            if (showUI) {
              $(".purr-content").parent().find(".last").removeClass("last");
              $(".purr-content").addClass("footerLink last");
            } else {
              $(".purr-content").hide();
            }
        });
        /*jshint ignore:end*/
        /*eslint-enable */
    });
});

