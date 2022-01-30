// Generated by CoffeeScript 1.5.0
(function() {
  var NYTCN;
  NYTCN = NYTCN || {};
  NYTCN.meta = NYTCN.meta || {};
  NYTCN.meta['page_url'] = document.location.href;
  NYTCN.meta['page_title'] = document.title;
  NYTCN.meta['page_referrer'] = document.referrer;

  NYTCN.getMetaTags = function() {
    var metas, mt, _i, _len;
    metas = document.getElementsByTagName('meta');
    for (_i = 0, _len = metas.length; _i < _len; _i++) {
      mt = metas[_i];
      if (mt.name.length) {
        NYTCN.meta[mt.name] = mt.content;
      }
    }
  };

  NYTCN.getMetaTagByName = function(name) {
    var metas, mt, ret, _i, _len;
    metas = document.getElementsByTagName('meta');
    for (_i = 0, _len = metas.length; _i < _len; _i++) {
      mt = metas[_i];
      if (mt.name === name) {
        ret = mt.content;
      }
    }
    return ret;
  };

  NYTCN.getSectionIndex = function() {
    var index, sections;
    sections = ['home page', 'sports', 'washington', 'business', 'international', 'new york region', 'national', 'real estate', 'opinion', 'movies', 'arts', 'job market', 'search', 'fashion & style', 'magazine', 'authentication', 'technology', 'health', 'travel', 'books', 'science', 'opinion timesselect', 'dining & wine', 'timesselect', 'e-mail this', 'e-commerce', 'member center', 'education', 'theater', 'home & garden', 'readers\' opinions', 'automobiles', 'obituaries', 'week in review', 'registration', 'learning', 'nyt front page', 'weather', 'most popular', 'reference', 'ap', 'premium crosswords', 'cartoons', 'crosswords & games', 'college', 'home delivery', 'classifieds', 'sports timesselect', 'style', 'business timesselect', 'great homes', 'video'];
    index = section.indexOf((NYTCN.meta['WT.cg_n'] || NYTCN.getMetaTagByName('WT.cg_n')).toLowerCase());
    return index = index === -1 ? 0 : index + 1;
  };

  NYTCN.getPageType = function() {
    var group, ret;
    group = (NYTCN.meta['WT.z_gpt'] || NYTCN.getMetaTagByName('WT.z_gpt')).toLowerCase;
    switch (group) {
      case 'article':
        ret = 2;
        break;
      case 'section front':
        ret = window.location.pathname === '/' ? 1 : 3;
        break;
    }
    return ret;
  };

  NYTCN.getCookieByName = function(name) {
    var ret;
    ret = '';
    document.cookie.replace(new RegExp(name+'=([a-zA-Z0-9\\-]*);?'), function(match, p1) {
      return ret = p1;
    });
    return ret;
  };

  NYTCN.subNav = function() {
    return $('.navList').on('click', 'a', function(event) {
      //return event.preventDefault();
    }).on('mouseover', 'li.mainSection', function(event) {
      return $('>ul', this).show();
    }).on('mouseout', 'li.mainSection', function(event) {
      return $('>ul', this).hide();
    });
  };


  /*Template space*/
  NYTCN.Template={};

  /*shareList*/
  (function(Template){
		var list=[
			{"name":"weibo","url":"//v.t.sina.com.cn/share/share.php?&title=MAPTITLE&url=MAPURL"}
			,{"name":"weixin","url":""}
			,{"name":"twitter","url":"https://twitter.com/intent/tweet?source=tweetbutton&text=MAPTITLE&url=MAPURL&via=nytchinese"}
			,{"name":"facebook","url":"https://www.facebook.com/sharer.php?t=MAPTITLE&u=MAPURL"}
			,{"name":"googleplus","url":"https://plus.google.com/share?t=MAPTITLE&url=MAPURL"}
			,{"name":"qrcode","url":""}
		];
		function parseUrl(jsonData){
			var title = document.title || 42;
		    var url = location.href || '//cn.nytimes.com';

			return jsonData.url.replace(/(.+)MAPTITLE(.+)MAPURL(.*)/g, function(match, p1, p2, p3) {
				return (p1 + encodeURIComponent(title) + p2 + encodeURIComponent(url) + p3);
			});
		}
		function tempList(parentTag){
			var ui=this.initUI();
			parentTag.append(ui);
		};
        var overflowDiv;
        function createQrcodeDiv(){
           var d=$("<div/>",{class:"qrcodeDiv"});

           var articleId=$("#uuid").attr("content");
           var qrcodeUrl="https://d1ufrdf8zi36yr.cloudfront.net/text/?txt=";
           //var articlePath="http://wx.graylady.us/article/";
           var articlePath="https://d1jtxk88c5taod.cloudfront.net/article/";

           var img=$("<img/>",{"class":"qrcode_img",
               "src":qrcodeUrl+articlePath+articleId
               });
           d.append(img,"<span class='qrcode_reminder'>扫一扫分享文章</span>");
           overflowDiv=$("<div/>",{class:"overflowDiv"});
           $("body").append(overflowDiv);
           overflowDiv.click(function(){
               $(this).remove();
               d.remove();
               overflowDiv=null;
               });
           return d;
            }
		tempList.prototype.initUI=function(){
			var box=$("<ul/>",{"class":"shareBox"});
			for(var i=0,l=list.length;i<l;i++){
				var li=$("<li/>",{"class":list[i].name+" share","style":"position:relative;overflow:visible;"});
				var a=$("<a/>",{"class":list[i].name,"rel":"nofollow"});
					li.append(a);
					(function(){
						var index=i;
						li.click(function(){
                            if(list[index].name=="qrcode"||list[index].name=="weixin"){
                                if(!overflowDiv){
                                    $(this).append(createQrcodeDiv());
                                }
                            }else{
							    window.open(parseUrl(list[index]),'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
                            }
							return false;
						});
					})();
					box.append(li);
			}
			return box;
		};
		Template.createShareList=function(parentTag){
			parentTag.each(function(){
				new tempList($(this));
			});
		}
  })(NYTCN.Template);
  /* tabUI*/
  (function(Template){
	var tab={};
		tab.init=function(tag,index){
			tag.each(function(){
				var tg=$(this);
				tg.find(".tabs a").click(function(){
                    changeTab($(this));
                    return false;
				});
                if(index>-1){
                    changeTab(tg.find(".tabs a").eq(index));
                }
                function changeTab(tag){
					var tabId=tag.attr("href");
						tabId=tabId.substr(1);
						tg.find(".active").removeClass("active").addClass("inactive");
						tag.removeClass("inactive").addClass("active");
						tg.find(".tab-content .active").removeClass("active").addClass("inactive");
                        tg.find("#"+tabId).removeClass("inactive").addClass("active");
                        tab.afterChanged.call(this);
                    return false;
                }
			});
	    };
        tab.active=function(){

        };
      tab.afterChanged = function() {

      };

		tab.AutoPlay=function(tag,time){
			var tg=tag;
				var T;
				function createS(index){
					T=setInterval(function(){
                        index==3?index=0:"";
                        var temp=tg.find(".tabs a").eq(index);
                        if ( temp.length <= 0 ) { index++; return false; }
                        tabId=temp.attr("href").substr(1);
                        tg.find(".active").removeClass("active").addClass("inactive");
                        temp.removeClass("inactive").addClass("active");
                        tg.find(".tab-content .active").removeClass("active").addClass("inactive");
                        tg.find("#"+tabId).removeClass("inactive").addClass("active");
                        tab.afterChanged.call(this);
                        index++;
				},time);
			};
				createS(0);
				tg.hover(function(){
					clearInterval(T);
					},function(){
					var ii=tg.find(".tabs .active").index();
					createS(ii);
				});
		}
	Template.tabUI=tab;
  })(NYTCN.Template);

	/* mothUI */
  (function(Template){
	var moth={};
		moth.init=function(tag,json){
			var that=this;
			tag.each(function(){
				var tg=$(this);
				var mothlist=$(this).find(".mothList");
				var m=new mothBox({
					"mothList":mothlist,
					"prev":tg.find(".pointPrev"),
					"next":tg.find(".pointNext"),
					"showCount":parseInt(json.showCount||$(".moth .storyWindow")[0].clientWidth/mothlist.find(".story")[0].clientWidth),
					"tdWidth":mothlist.find("td").eq(1)[0].clientWidth,
          "clientWidth": $(".moth .storyWindow")[0].clientWidth,
					"liCount":tg.find(".story").length
				});
			});
		}

	var lens={};
		lens.init=function(tag,json){
			var that=this;
			tag.each(function(){
				var tg=$(this);
				var lenslist=$(this).find(".lensList");
				var m=new mothBox({
					"mothList":lenslist,
					"prev":tg.find(".pointPrev"),
					"next":tg.find(".pointNext"),
					"showCount":parseInt(json.showCount||$(".lens .storyWindow")[0].clientWidth/lenslist.find(".story")[0].clientWidth),
          "clientWidth": $(".lens .storyWindow")[0].clientWidth,
					"tdWidth":lenslist.find("td").eq(1)[0].clientWidth,
					"liCount":tg.find(".story").length
				});
			});
		}

		/* nothBox entity */
			function mothBox(json){
				this.tdWidth=json.tdWidth;
				this.mothList=json.mothList;
				this.prev=json.prev,this.next=json.next;
				this.prevStatus=0,this.nextStatus=0;
				this.showCount=json.showCount;
				this.clientWidth=json.clientWidth;
				this.liCount=json.liCount;
				this.maxIndex=this.liCount-this.showCount;
				this.index=0;
				this._changeButton();
				this.bindEvent();
			}
			mothBox.prototype.bindEvent=function(){
				var that=this;
				this.prev.click(function(){
					if(that.prevStatus){
						that.index--;
            var moves = that.index*-(that.tdWidth)-2;
						if(that.index == 0) {
              moves = 0;
            }
						that.mothList.animate({"margin-left":(moves)+"px"});
						that._changeButton();
					};
				});
				this.next.click(function(){
					if(that.nextStatus){
						that.index++;
            var moves = that.index*-(that.tdWidth)-2;
            if(that.index == that.maxIndex) {
              // moves += that.clientWidth % that.tdWidth;
              moves = that.clientWidth - that.mothList.width();
            }
						that.mothList.animate({"margin-left":(moves)+"px"});
						that._changeButton();
					}
				});
			}
			mothBox.prototype._changeButton=function(){
				var that=this;
				if(that.index==that.maxIndex){
					that.nextStatus=0;
					that.next.removeClass("nextOk").addClass("nextOff");
				}else{
					that.nextStatus=1;
					that.next.removeClass("nextOff").addClass("nextOk");
				}
				if(that.index==0){
					that.prevStatus=0;
					that.prev.removeClass("prevOk").addClass("prevOff");
				}else{
					that.prevStatus=1;
					that.prev.removeClass("prevOff").addClass("prevOk");
				}
			}
			Template.mothUI=moth;
			Template.lensUI=lens;
  })(NYTCN.Template);


  NYTCN.Template.OverDiv=(function(){
		var divTemp=null;
		function _createOverDiv(){
			if(divTemp){
				return divTemp;
			}
			var div=$("<div/>",{"class":"overDiv"});
				div.close=function(){
					divTemp=null;
					div.remove();
				}
			$("body").append(div);
			divTemp=div;
			return div;
		};

		return {
			createOverDiv:_createOverDiv
		};
  })();

  NYTCN.FormValidation=(function(){
    return {
        email:function(str){
            var z=/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
                return z.test(str);
        }
    }
  })();


  /* Launchers
  */


  NYTCN.getMetaTags();

  window.NYTCN = window.NYTCN || NYTCN;

}).call(this);

//the whole site main;
(function(){
    function checkMySite(tage){
        var str=tage.attr("href");
        if(!str){return false;}
        var hp=str.indexOf("http://");
        var my=str.indexOf("cn.nytimes.com");
        if(hp>-1&&!((my<20)&&my>-1)){
            return true;
        }
        return false;
    }
    function noNewWindow(tage){
        var mark=tage.attr("rel");
        if(mark!="no_new_window"){
            return true;
        }else{
            return false;
        }

    }

    function checkArticle(tage){
        var str=tage.attr("href");
        if(!str){return false;}
        var date=str.split("/")[2];
        if(date&&date.indexOf("2")==0){
            return true;
            }
            return false;
    }
    function _getGroup(){
            function getCookie(key){
              var ary=document.cookie.split(";");
              for(var i=0;i<ary.length;i++){
                if(ary[i].split("=")[0].replace(/(^\s+)|(\s+$)/g, "")==key){
                  return ary[i];
                }
              };
              return "";
            }
            var kv=getCookie("RMID");
            var RMID=kv.split("=")[1];
            if(!RMID){
                return "none";
            }
            var index=RMID.substring(RMID.length-1,RMID.length);
            if(("0x0"+index)>7){
                return "b";
            }else{
                return "a";
            }
        }

    var lib={
        "addBlank":function(){
            $("a").each(function(){
                if(checkMySite($(this))&&noNewWindow($(this))){
                    $(this).attr("target","_blank");
                };
                if("a"==_getGroup()&&checkArticle($(this))){
                    $(this).attr("target","_blank");
                }
            });
        },
        Cookie:{
          get:function(key){
            var ary=document.cookie.split(";");
            for(var i=0;i<ary.length;i++){
              if(ary[i].split("=")[0].replace(/(^\s+)|(\s+$)/g, "")==key){
                return ary[i];
              }
            };
            return "";
          }
        },
        "getGroup":_getGroup
    }
    window.NYTLib=lib;
    $(document).ready(function(){
        lib.addBlank();
    });
})();
