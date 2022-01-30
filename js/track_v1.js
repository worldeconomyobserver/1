( function() {
    var Cookie={
        get:function(key){
            var ary=document.cookie.split(";");
            for(var i=0;i<ary.length;i++){
                if(ary[i].split("=")[0].replace(/(^\s+)|(\s+$)/g, "")===key){
                    return ary[i];
                }
            }
            return "";
        },
        set:function(key,value,exdays){
            var d = new Date();
            d.setTime(d.getTime() + ((exdays||0)*24*60*60*1000));
            var expiress= "expires="+d.toUTCString();
            document.cookie=key+"="+(value||"")+";"+expiress+"; path=/";
        }
    };

  var track = function() {
        // CCPA configuration
        let purrCookie = Cookie.get("nyt-purr") ? Cookie.get("nyt-purr").split("=")[1] : null;
        let enabledTracks = ["ga", "chartbeat", "comscore"];
        if(purrCookie) {
          const trackAcceptable = purrCookie.charAt(4);
          switch (trackAcceptable) {
          case "e":
            enabledTracks = [];
            break;
          case "p":
            enabledTracks = ["ga", "chartbeat"];
            break;
          case "c":
            enabledTracks = ["ga", "chartbeat", "comscore"];
            break;
          default:
            enabledTracks = ["ga", "chartbeat", "comscore"];
          }
        }
        if (enabledTracks.indexOf("ga") > -1) {
            (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                                     m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                                    })(window,document,"script","//www.google-analytics.com/analytics.js","ga");

            ga("create", "UA-31857435-1", "auto", {"allowLinker": true});
            ga("require", "linkid");
            ga("require", "linker");
            ga("linker:autoLink", ["cloudfront.net", "nytimes.com", "nytchina.com"] );

            let timeZone = jstz.determine().name();
            if ( typeof dimensionValue !== "undefined" ) {
                ga('set', 'dimension1', dimensionValue);
            }
            ga('set', 'dimension4', timeZone);
            ga("send", "pageview");
        }

        if (enabledTracks.indexOf("chartbeat") > -1) {
              //chartbeat
            var _sf_async_config = window._sf_async_config = (window._sf_async_config || {});
            /** CONFIGURATION START **/
            _sf_async_config.uid = 16698;
            _sf_async_config.domain = 'cn.nytimes.com';
            _sf_async_config.useCanonical = true;
            _sf_async_config.sections = cbSectionName;
            _sf_async_config.authors = cbByline;
            /** CONFIGURATION END **/
            (function(){
                function loadChartbeat() {
                    window._sf_endpt=(new Date()).getTime();
                    var e = document.createElement('script');
                    e.setAttribute('language', 'javascript');
                    e.setAttribute('type', 'text/javascript');
                    e.setAttribute('src', '//static.chartbeat.com/js/chartbeat.js');
                    document.body.appendChild(e);
                }
                var oldonload = window.onload;
                window.onload = (typeof window.onload != 'function') ?
                    loadChartbeat : function() { oldonload(); loadChartbeat(); };
            })();
        }

        /**
         *
         * Track comScore
         *
         **/
        if (enabledTracks.indexOf("comscore") > -1) {
            var _comscore = _comscore || [];
            _comscore.push({ c1: "2", c2: "3005403", c3: "", c4: window.location.protocol + '//' + window.location.host + window.location.pathname, c5: NYTCN.getMetaTagByName('WT.cg_n'), c6: '', c15: ''});
            (function() { var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true; s.src = (document.location.protocol === "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js"; el.parentNode.insertBefore(s, el); }());

            if (window.location.href.indexOf('/slideshow') > -1) {
                $.ajax({
                    url: '/static/comscore.json',
                    dataType: 'json',
                    type: 'get'
                });
            }
        }
    };

    window.track = track;

    track();
} )();
