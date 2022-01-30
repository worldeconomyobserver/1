var privateSpace={};
require.config({
	paths:{
          }
});
require(["jquery", "commonnew", "track_v1","jquery.cookie"], function($) {
//    NYTCN.subNav();
    $(document).ready(function(){
		NYTCN.Template.mothUI.init($(".mothBox"),{});
		/*
		NYTCN.Template.tabUI.init($(".videoPocketLeft"));
		*/
		NYTCN.Template.tabUI.init($("#hotStory"));
		privateSpace.getHostStory();
		privateSpace.bindLetterEvent();
    });
});


privateSpace.bindLetterEvent=function(){
	$("#kampylink").click(function(){
		var kampyleLang = function() {
				return ($.cookie('langkey') || '').replace(/hk/, 'tw') || 'zh-cn';
			};
		window.open("http://www.kampyle.com/feedback_form/ff-feedback-form.php?"+"site_code=9660743&form_id=82542&lang="+kampyleLang(),"","menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=584,width=447");
return false;
	});
}

/*get hotStory data and render  DOM*/
privateSpace.getHostStory=function(){
	var lang = $("meta[property='lang']").attr("content");//.toLowerCase();
       if (lang == 'zh-hans') { 
			// when we met the english article page, override the langkey to the one in cookie.
			lang = 'zh-cn';
           // if there is no langkey in cookie, fallback to 'zh-cn' 
        }else{
			lang= 'zh-hk';
		};

		$.ajax({
			"type":"get",
			"url":"/static/jsonData/mostViewedWeek."+lang+".json",
			"dataType":"json",
			"success":function(data){
				createTabMostViewedWeek(data);
			}
		});

		$.ajax({
			"type":"get",
			"url":"/static/jsonData/mostViewed."+lang+".json",
			"dataType":"json",
			"success":function(data){
				createTabMostViewed(data);
			}
		});

		function createTabMostViewed(Ary){
			var mostViewed=$("<ol/>",{"class":"hotStoryList"});
			for(var i=0,l=Ary.length;i<l;i++){
				var li=$("<li/>",{"class":""});
				var a=$("<a/>",{
						"href":Ary[i].link,
						"text":Ary[i].headline
					});
					li.append(a);	
				mostViewed.append(li);
			}
			$("#tabC_mostView").append(mostViewed);
		}

		function createTabMostViewedWeek(Ary){
			var mostViewed=$("<ol/>",{"class":"hotStoryList"});
			for(var i=0,l=Ary.length;i<l;i++){
				var li=$("<li/>",{"class":""});
				var a=$("<a/>",{
						"href":Ary[i].link,
						"text":Ary[i].headline
					});
					li.append(a);	
				mostViewed.append(li);
			}
			$("#tabC_mostViewedWeek").append(mostViewed);

		}

}
$(function(){

$("img[src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=']").each(function (i) {

                            $(this).attr("src", $(this).attr("data-url"));
                            $(".dual-btn li:last").remove();
                        });
                        
                        
  $(".autoListStory").each(function () {
    var ss=$(this).find("a:first-child");
    if(ss.attr("href").startsWith("http"))$(this).remove();
    if(ss.attr("href").startsWith("#http"))$(this).remove();

    var aa=$(this).find("a:last-child");
    if(aa.attr("href").startsWith("http"))$(this).remove();
    if(aa.attr("href").startsWith("#http"))$(this).remove();

    });
    
  $("#alternativeHeader a:first-child").attr("href","/");
  
  $("#sectionLeadPackage a").each(function () {
    if($(this).attr("href").startsWith("http"))$("#sectionLeadPackage").remove();

    });
  if($("#sectionLeadPackage a:first-child").attr("href").startsWith("http"))$("#sectionLeadPackage").remove();
  

});

