$(document).ready(function(){function e(){f=d.width(),u=d.height()}function i(){p=d.scrollTop(),T||d.trigger("updateautoscroll",[!1])}function t(e){var i=e instanceof jQuery?e:$(e),t=Math.floor(u/4),a=p+t,n=i.offset().top,o=n+i.height()-2*t;return a>=n&&o>=a}FastClick.attach(document.body),$("a.youtube").colorbox({iframe:!0,innerWidth:640,innerHeight:390,maxWidth:"80%"});var a=$(".panel"),n=$(".next-panel",a),o=a.length,s=0,l=0,r=$("#display").find(".colspan"),d=$(window),c=$(document),f=d.width(),u=d.height(),p=d.scrollTop(),h=($("html").is(".lt-ie10"),Modernizr.touch||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0),g="click",v=platform.name.toLowerCase(),m="iOS"==platform.os.family,w="iOS"==platform.os.family&&7==parseInt(platform.os.version,10)?" iOS7 ":"",x="iOS"==platform.os.family&&parseInt(platform.os.version,10)>=8?" iOS8 ":"",b=$("#floatNav"),y=$("#toggler"),C=($(".flyout > a"),null),O=!1,T=!1,A=function(e){e.preventDefault()};document.documentElement.className+=" "+v,m&&(document.documentElement.className+=" iOS "+w+x+platform.product.toLowerCase()),d.on("orientationchange resize",e).on("scroll",i),c.on("touchmovetoggle",function(e,i){e.stopPropagation(),i?c.bind("touchmove",A):c.unbind("touchmove",A)}),d.on("updateautoscroll",function(e,i){O=i?!0:!1}),$(document).foundation(),y.on(g,function(e){return e.stopPropagation(),b.toggleClass("open"),!1}),n.each(function(e){var i=$(this);i.on(g,function(i){return i.stopPropagation(),d.trigger("updateautoscroll",[!0]),T=!0,s=e+1,l=e+1==o?0:a.eq(e+1)[0].offsetTop,$("html,body").animate({scrollTop:l},{duration:500,queue:!1,done:function(){d.trigger("updateautoscroll",[!1]),T=!1}}),!1})}),$(".lavanav").lavanav();!function(){function e(){t(i)&&!o&&h&&!O&&(s.addClass("loading"),o=!0,$.get("slides.html").done(function(e){$(e).children().each(function(){r.data("flexslider").addSlide(this)}),$(document).foundation("interchange","reflow"),n.css("opacity",1),s.addClass("loaded"),l.fadeIn(450),d.off(".loadslides"),$("#mainslider .flex-direction-nav a").off(".loadslides")}))}var i=$("#driveoflife"),a=$("#mainslider"),n=$(".slides",a).css("opacity",0),o=!1,s=i.find(".preloader"),l=i.find(".cue"),r=a.flexslider({animation:"slide",animationLoop:!0,slideshow:!1,allowOneSlide:!1,useCSS:!0,start:function(){o||$(document).foundation("interchange","reflow")},after:function(){l.is(":visible")&&l.fadeOut(450)}});h&&e(),d.on("updateautoscroll.loadslides",e),$("#mainslider .flex-direction-nav").on(g+".loadslides","a",function(e){e.stopPropagation();var i=$(this);return o||(s.addClass("loading"),o=!0,$.get("slides.html").done(function(e){$(e).children().each(function(){r.data("flexslider").addSlide(this)});var t=i.hasClass("flex-next")?1:$(e).children().length;$(document).foundation("interchange","reflow"),n.css("opacity",1),s.addClass("loaded"),r.data("flexslider").flexAnimate(t,!0)}),$(this).off(".loadslides"),d.off(".loadslides")),!1})}();if(h){(function(){function e(){t(i)||(n.fadeOut(450),c.trigger("touchmovetoggle",[!1]))}var i=$("#display"),a=$(".overlay",i),n=$(".popup",i),o=$(".card",n).css("visibility","hidden"),s=$(".close",n),l=s.add(n),r=$(".cue",n),f=$(".popupslider",i),u=0,p=null;e(),d.on("scroll",e),a.each(function(e){var i=$(this);i.on(g,function(){if(u=e,n.fadeIn(450),c.trigger("touchmovetoggle",[!0]),null==p)p=f.flexslider({animation:"slide",controlNav:!1,directionNav:!1,animationLoop:!0,slideshow:!1,startAt:u,start:function(){o.css("visibility","visible");var e=f.find("ul.slides"),i=e.height()/2;e.css("margin-top","-"+i+"px"),s.css({"margin-top":"-"+(i-10)+"px","margin-right":"-"+(e.find(".dis-pane:first").width()/2-10)+"px"})},after:function(){r.fadeOut(250)}});else{p.data("flexslider").flexAnimate(u,!0);var i=f.find("ul.slides"),t=i.height()/2;i.css("margin-top","-"+t+"px"),s.css({"margin-top":"-"+(t-10)+"px","margin-right":"-"+(i.find(".dis-pane:first").width()/2-10)+"px"})}})}),l.on(g,function(e){return e.stopPropagation(),($(e.target).is("span.close")||$(e.target).is("div.flex-viewport"))&&(n.fadeOut(450),c.trigger("touchmovetoggle",[!1])),!1})})()}else r.each(function(){var e=$(this),i=$(".text-wrap",e);e.hover(function(){TweenLite.to(i,.4,{css:{opacity:0,scale:1.5},ease:Power2.easeInOut})},function(){TweenLite.to(i,.4,{css:{opacity:1,scale:1},ease:Power2.easeInOut})})});!function(){function e(e){c.slider("disable"),n.addClass("loading"),l=e,i?(r.removeClass("active").invisible(),r=$("."+e,a).visible().eq(d).addClass("active").end(),c.slider("enable")):(i=!0,$.get("cars.html").done(function(i){var t=$("<div>"+i+"</div>");r=$("img",t).appendTo(a).invisible().filter("."+e).visible().eq(0).addClass("active").end(),n.addClass("loaded"),c.slider("enable"),c.slider({value:0}),$(document).foundation("interchange","reflow")}))}var i=!1,t=$("#cars"),a=$("#carpark"),n=t.find(".preloader"),o=$("#modelSwitch").find("a.carswitch"),s="hatch",l="",r=$(),d=0,c=$("#viewSlider").slider({max:99}).on("slide",function(e,i){d=Math.floor(i.value/25),r.removeClass("active").eq(d).addClass("active")}).on("slidestart",function(){i||e(s)});o.on(g,function(){return s=this.hash.slice(1),s!=l&&e(s),!1})}(),function(){function e(){m=!0}function i(){this.timeScale(1)}function a(){O?(C.isActive()||1==C.progress())&&C.kill():t(n)?m||C.play():m&&(s.fadeOut(450),c.trigger("touchmovetoggle",[!1]),m=!1)}var n=$("#dashboard"),o=n.find(".bubble"),s=n.find(".popup"),l=s.find(".card").css("visibility","hidden"),r=s.find(".close"),f=r.add(s),u=s.find(".cue"),p=n.find(".popupslider"),h=0,v=null,m=!1;C=new TimelineLite({paused:!0,onComplete:e,onReverseComplete:i}),C.staggerTo(o,.5,{autoAlpha:1,scale:1.15,ease:Elastic.easeIn},.3),C.staggerTo(o,.1,{scale:1,ease:Elastic.easeOut},.3,"-=0.6"),a(),d.on("updateautoscroll",a),o.each(function(e){var i=$(this);i.on(g,function(){if(h=e,s.fadeIn(450),c.trigger("touchmovetoggle",[!0]),null==v)v=p.flexslider({animation:"slide",controlNav:!1,directionNav:!0,animationLoop:!0,slideshow:!1,startAt:h,start:function(){l.css("visibility","visible");var e=p.find("ul.slides"),i=e.height()/2;e.css("margin-top","-"+i+"px"),r.css({"margin-top":"-"+(i-10)+"px","margin-right":"-"+(e.find(".dis-pane:first").width()/2-10)+"px"})},after:function(){u.fadeOut(250)}});else{v.data("flexslider").flexAnimate(h,!0);var i=p.find("ul.slides"),t=i.height()/2;i.css("margin-top","-"+t+"px"),r.css({"margin-top":"-"+(t-10)+"px","margin-right":"-"+(i.find(".dis-pane:first").width()/2-10)+"px"})}return!1})}),f.on(g,function(e){e.stopPropagation(),($(e.target).is("span.close")||$(e.target).is("div.flex-viewport"))&&(s.fadeOut(450),c.trigger("touchmovetoggle",[!1]))})}(),function(){function e(e){e.addClass("active"),v=!0}function i(){this.timeScale(1),this.kill(),"undefined"!=typeof n&&s.removeClass("active").eq(n).addClass("active"),P[n].play()}function a(){if(O)for(var e=0,i=P.length;i>e;e++)(P[e].isActive()||1==P[e].progress())&&P[e].kill();else t($("#skyactiv"))?v||P[l].play():v&&(b.fadeOut(450),c.trigger("touchmovetoggle",[!1]),v=!1)}var n,o=$("#hardwareSwitch").find("a"),s=$("#hardware").find(".item"),l=0,r="",u="",p=$("#extra"),v=!1,w=$("#skyactiv"),x=w.find(".bubble"),b=w.find(".popup"),y=b.find(".card").css("visibility","hidden"),C=b.find(".close"),T=C.add(b),A=b.find(".cue"),L=w.find(".popupslider"),S=0,k=null,P=[];s.each(function(){var t=$(this),a=t.find("img.base"),n=a.length,o=t.find(".bubble"),s=o.length,l=t.find(".infograph"),r=new TimelineLite({paused:!0,onComplete:e,onCompleteParams:[o],onReverseComplete:i});m&&7==parseInt(platform.os.version,10)&&"iphone"==platform.product.toLowerCase()||(n>1?r.staggerTo(a,.4,{autoAlpha:1,scale:1},.3):r.to(a,.4,{autoAlpha:1,scale:1})),s>1?(r.staggerTo(o,.4,{autoAlpha:1,scale:1.15,ease:Elastic.easeIn},.3),r.staggerTo(o,.1,{scale:1,ease:Elastic.easeOut},.3),(!h||f>=768)&&r.staggerTo(l,.2,{autoAlpha:1},.3)):(r.add(TweenLite.to(o,.4,{autoAlpha:1,scale:1.15,ease:Elastic.easeIn})),r.add(TweenLite.to(o,.1,{scale:1,ease:Elastic.easeOut,delay:.3})),(!h||f>=768)&&r.add(TweenLite.to(l,.2,{autoAlpha:1},.3))),P.push(r)}),a(),d.on("updateautoscroll",a),o.each(function(e){var i=$(this),t=this.hash.slice(1);i.on(g,function(i){return i.stopPropagation(),r=void 0==$("#"+t).data("disclaimer")?"":$("#"+t).data("disclaimer"),u=void 0==$("#"+t).data("disclaimer-more")?"":$("#"+t).data("disclaimer-more"),n=e,n!=l&&(P[l].timeScale(3),P[l].reverse(),l=n,p.empty().append(r),""!=u&&(u="<br />"+u,p.append(u))),!1})}),h&&(x.each(function(e){var i=$(this);i.on(g,function(i){switch(i.stopPropagation(),e){case 0:S=0;break;case 1:S=1;break;case 2:S=2;break;case 3:S=3;break;case 4:S=4;break;case 5:S=6;break;default:S=0}if(1024>f)if(b.fadeIn(450),c.trigger("touchmovetoggle",[!0]),null==k)k=L.flexslider({animation:"slide",controlNav:!1,directionNav:!1,animationLoop:!0,slideshow:!1,startAt:S,start:function(){y.css("visibility","visible");var e=L.find("ul.slides"),i=e.height()/2;e.css("margin-top","-"+i+"px"),C.css({"margin-top":"-"+(i-10)+"px","margin-right":"-"+(e.find(".dis-pane:first").width()/2-10)+"px"})},after:function(){A.fadeOut(250)}});else{k.data("flexslider").flexAnimate(S,!0);var t=L.find("ul.slides"),a=t.height()/2;t.css("margin-top","-"+a+"px"),C.css({"margin-top":"-"+(a-10)+"px","margin-right":"-"+(t.find(".dis-pane:first").width()/2-10)+"px"})}return!1})}),T.on(g,function(e){return e.stopPropagation(),($(e.target).is("span.close")||$(e.target).is("div.flex-viewport"))&&(b.fadeOut(450),c.trigger("touchmovetoggle",[!1])),!1}))}(),function(){function e(){p=!0}function i(){this.timeScale(1),this.kill(),"undefined"!=typeof s&&r.removeClass("active").eq(s).addClass("active"),I[s].play()}function a(){this.timeScale(1),this.kill(),"undefined"!=typeof s&&r.removeClass("active").eq(s).addClass("active"),E[s].play()}function n(){if(O)if(h)for(var e=0,i=E.length;i>e;e++)(E[e].isActive()||1==E[e].progress())&&E[e].kill();else for(var e=0,i=I.length;i>e;e++)(I[e].isActive()||1==I[e].progress())&&I[e].kill();else t(w)?p||(v||m&&7==parseInt(platform.os.version,10)&&"iphone"==platform.product.toLowerCase()||(P=TweenLite.to(f,.4,{autoAlpha:1,scale:1,ease:Power2.easeInOut})),h?E[u].play():I[u].delay(1).play()):p&&(null!=P&&1==P.progress()&&P.kill(),b.fadeOut(450),c.trigger("touchmovetoggle",[!1]),p=!1)}function o(e){if(b.fadeIn(450),c.trigger("touchmovetoggle",[!0]),null==k)k=L.flexslider({animation:"slide",controlNav:!1,directionNav:!1,animationLoop:!0,slideshow:!1,startAt:e,start:function(){y.css("visibility","visible");var e=L.find("ul.slides"),i=e.height()/2;e.css("margin-top","-"+i+"px"),C.css({"margin-top":"-"+(i-10)+"px","margin-right":"-"+(e.find(".dis-pane:first").width()/2-10)+"px"})},after:function(){A.fadeOut(250)}});else{k.data("flexslider").flexAnimate(e,!0);var i=L.find("ul.slides"),t=i.height()/2;i.css("margin-top","-"+t+"px"),C.css({"margin-top":"-"+(t-10)+"px","margin-right":"-"+(i.find(".dis-pane:first").width()/2-10)+"px"})}}var s,l=$("#techSwitch").find("a"),r=$("#technology").find(".item"),f=$("#technology").find("img.base"),u=0,p=!1,v=!1,w=$("#activsense"),x=w.find(".bubble"),b=w.find(".popup"),y=b.find(".card").css("visibility","hidden"),C=b.find(".close"),T=C.add(b),A=b.find(".cue"),L=w.find(".popupslider"),S=0,k=null,P=null,I=[],E=[];r.each(function(){var t=$(this);if(h){var n=t.find(".bubble"),o=n.length,s=new TimelineLite({paused:!0,onComplete:e,onReverseComplete:a});o>1?(s.staggerTo(n,.4,{autoAlpha:1,scale:1.15,ease:Elastic.easeIn},.3),s.staggerTo(n,.1,{scale:1,ease:Elastic.easeOut},.3)):(s.add(TweenLite.to(n,.4,{autoAlpha:1,scale:1.15,ease:Elastic.easeIn})),s.add(TweenLite.to(n,.1,{scale:1,ease:Elastic.easeOut,delay:.3}))),E.push(s)}else{var l=t.find(".infograph"),r=new TimelineLite({paused:!0,onComplete:e,onReverseComplete:i});r.staggerTo(l,.4,{autoAlpha:1},.3),I.push(r)}}),n(),d.on("updateautoscroll",n),l.each(function(e){{var i=$(this);this.hash.slice(1)}i.on(g,function(t){return t.stopPropagation(),S=i.parent().index(),s=e,s!=u&&(h?(E[u].timeScale(2),E[u].reverse()):(I[u].timeScale(2),I[u].reverse()),u=s),!1})}),T.on(g,function(e){return e.stopPropagation(),($(e.target).is("span.close")||$(e.target).is("div.flex-viewport"))&&(b.fadeOut(450),c.trigger("touchmovetoggle",[!1])),!1}),h&&x.each(function(e){var i=$(this);i.on(g,function(i){return i.stopPropagation(),o(e),!1})})}()}),$.fn.lavanav=function(){return this.each(function(){var e,i,t,a=$(this),n=$("a",a);a.append('<li class="lava" />');var o=$(".lava",a);if($("a.active",a).length>0){var s=$("a.active",a).parent();o.width(s.width()).css("left",s.position().left).data("origLeft",s.position().left).data("origWidth",s.width())}else o.width(0).css("left",0).data("origLeft",0).data("origWidth",0);n.on("click",function(a){return a.stopPropagation(),n.removeClass("active").filter($(this)).addClass("active"),e=$(this).parent(),i=e.position().left,t=e.width(),o.stop().animate({left:i,width:t},250),!1})})},$.fn.visible=function(){return this.css("visibility","visible")},$.fn.invisible=function(){return this.css("visibility","hidden")};
//# sourceMappingURL=app.js.map