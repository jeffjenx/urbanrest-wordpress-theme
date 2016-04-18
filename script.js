jQuery.fn.sortElements=function(){var a=[].sort;return function(b,c){c=c||function(){return this};var d=this.map(function(){var a=c.call(this),b=a.parentNode,d=b.insertBefore(document.createTextNode(""),a.nextSibling);return function(){if(b===this)throw new Error("You can't sort elements if any one is a descendant of another.");b.insertBefore(this,d),b.removeChild(d)}});return a.call(this,b).each(function(a){d[a].call(c.call(this))})}}(),function(a,b,c,d){"use strict";function e(b,c){this.element=b,this.settings=a.extend({},g,c),this._defaults=g,this._name=f,this.init()}var f="urbModal",g={};a.extend(e.prototype,{init:function(){var b=a(this.element).addClass("modal-shade"),c=a('<div class="modal-content" />'),d=a('<button class="modal-close" type="button" />'),e=function(d){var e=a(d.target);return e.is(".modal-content")||e.closest(".modal-content").length?!0:(c.removeClass("animated fadeInDown").addClass("animated fadeOutDown"),b.removeClass("modal-opened animated fadeIn").addClass("modal-closing animated fadeOut"),void setTimeout(function(){a("body").removeClass("no-scroll"),b.removeClass("modal-closing animated fadeOut")},500))};b.on("click",e),b.wrapInner(c),b.append(d)},show:function(){var b=a(this.element),c=a(".modal-content",b);c.removeClass("fadeOutDown").addClass("animated fadeInDown"),b.addClass("modal-opened animated fadeIn"),a("body").addClass("no-scroll")}}),a.fn[f]=function(b){return this.each(function(){a.data(this,f)||a.data(this,f,new e(this,b))})}}(jQuery,window,document),jQuery(function(a){window.Urb={$document:a(document),$window:a(window),$body:a("body"),$html:a("html").removeClass("no-javascript").addClass("javascript"),$wpadminbar:a("#wpadminbar"),$logo:a(".site .site-header .site-title .site-logo"),$menuLogo:a('<img src="/wp-content/themes/urbanrest-wordpress-theme/images/logo-urbanrest-text-inverted-min.png" />'),$siteNavigation:a(".site .site-header .site-navigation"),$mainNavigation:a(".site .site-header .site-navigation .main-navigation"),$pageNavigation:a(".site .site-header .site-navigation .page-navigation"),$socialNavigation:a(".site .site-header .site-navigation .social-navigation"),$communityEvents:a(".site .site-community .site-events .events"),$businessHours:a(".site .site-company .site-location .business-hours"),$map:a(".site .site-company .site-map"),$mapLink:a(".site .site-company .site-map .map-link"),$mapContainer:a(".site .site-company .site-map .map-container"),$mapCanvas:a('<div class="map-canvas" />'),$contactForm:a(".site .site-company .site-contact .contact-form"),$address:a(".site .site-footer .site-address"),$viewport:a('<div id="viewport" />'),scrollPosition:document.body.scrollTop,API:"http://testapi.urbanrest.com/"},Urb.loading=function(a,b){if(void 0!==b){var c=a.data("loading");a.data("loading",a.text()).text(c),a.removeClass("loading").addClass(b?"success":"failure").removeAttr("disabled")}else{var d=a.data("loading");a.data("loading",a.text()).text(d),a.addClass("loading").attr("disabled",!0)}},Urb.setScrollPosition=function(){Urb.scrollPosition=Urb.$document.scrollTop()},Urb.updateViewport=function(){var a=Urb.$window.outerWidth();Urb.$viewport.toggleClass("phone",768>=a),Urb.$viewport.toggleClass("tablet",a>768&&1024>=a),Urb.$viewport.toggleClass("desktop",a>1024)},Urb.setupViewport=function(){Urb.$body.append(Urb.$viewport),Urb.updateViewport()},Urb.$window.on("load",Urb.setupViewport),Urb.$window.on("resize orientationchange",Urb.updateViewport),Urb.$window.on("scroll",Urb.setScrollPosition)}),jQuery(function(a){Urb.setupModal=function(){a(".modal").urbModal(),a('[data-action="modal"]').on("click",Urb.showModal)},Urb.showModal=function(b){"string"!=typeof b&&(b=a(this).data("target")),a(b).data("urbModal").show()},Urb.$window.on("ajaxload load",Urb.setupModal)}),jQuery(function(a){var b=Urb.$wpadminbar?Urb.$wpadminbar.outerHeight():0,c=Urb.$pageNavigation.outerHeight()+b,d=a("main"),e={"#company":a("#company"),"#specials":a("#specials")};d.length&&(e[d.attr("id")]=d),Urb.highlightCurrentSection=function(){a("a.active",Urb.$pageNavigation).removeClass("active");for(var b in e){var c=e[b];Urb.scrollPosition>c.offset().top-.5*Urb.$window.height()&&Urb.scrollPosition<c.offset().top+c.outerHeight()-.5*Urb.$window.height()&&a('a[href*="'+b+'"]',Urb.$pageNavigation).addClass("active")}},Urb.loadPage=function(b){var c=a("main"),d=a('<main class="page loading row around-xs"><span class="loading text">Loading<span class="dot"></span><span class="dot"></span><span class="dot"></span></span></main>');if("/"===b||""===b)return a("html,body").animate({scrollTop:0},f),void setTimeout(function(){c.remove()},f+250);c.length>0?c.before(d):a(".site-posts").after(d);var e=a(".site-posts").offset().top+a(".site-posts").outerHeight(),f=Math.round(500*(Math.abs(Urb.$window.scrollTop()-e)/Urb.$window.height()));c.remove(),a("html,body").animate({scrollTop:e},f),a.ajax({type:"POST",url:_URB.url,data:{action:"getmaincontent",nonce:_URB.nonce,slug:b},dataType:"json",success:function(b){if(b.success){var c=a(b.data);d.replaceWith(c),Urb.$window.trigger("ajaxload");var e=0;a(".page-header > *, .page-content > *, .page-footer > *",c).each(function(){var b=a(this);b.hide(),setTimeout(function(){b.fadeIn(250)},e),e+=213})}else console.log(b.data)}})},Urb.performHistoryNavigation=function(a){a.preventDefault();var b=(a.state,document.location.pathname);Urb.loadPage(b)},Urb.setupInternalLinks=function(){a("a").not('[href^="#"]').not(':not([href^="http://'+window.location.host+'"]):not([href^="https://'+window.location.host+'"])').each(function(){var b=a(this);b.unbind("click").click(function(b){if(window.history){b.preventDefault(),Urb.$menuToggle.toggleClass("open",!1),Urb.$mainNavigation.toggleClass("open",!1);var c=a(this),d=c.attr("href").replace(window.location.protocol+"//"+window.location.host,"");window.history.pushState({},c.text(),d),Urb.loadPage(d)}})})},Urb.setupExternalLinks=function(){a('a[href^="http"]:not([href*="'+window.location.host+'"])').attr("target","_blank")},Urb.setupFragmentAnchors=function(){Urb.$document.on("click",'a[href^="#"]',function(b){b.preventDefault();var d=a.attr(this,"href"),e=0,f=a(d);"#"!==d&&0!==f.length?e=f.offset().top:d="/";var g=f.innerHeight()-f.height()>c;return a("html,body").animate({scrollTop:Math.ceil(e-(g?0:1.5*c))},Math.round(500*(Math.abs(Urb.$window.scrollTop()-e)/Urb.$window.height()))),!1})},Urb.setupPageNavigation=function(){Urb.$pageNavigation.find(".menu-item a").click(function(){a(this).blur()}),Urb.$menuToggle=a("#menu-toggle"),Urb.$menuToggle.on("click",function(){var b=!1;Urb.scrollPosition>0&&(Urb.scrollPosition<Urb.$window.height()/2?b=0:Urb.scrollPosition<Urb.$window.height()&&(b=Urb.$window.height())),b!==!1?a("html,body").animate({scrollTop:b},{duration:250,easing:"swing"}).promise().done(function(){Urb.$menuToggle.toggleClass("open"),Urb.$mainNavigation.toggleClass("open")}):(Urb.$menuToggle.toggleClass("open"),Urb.$mainNavigation.toggleClass("open"))})};var f=Urb.$window.height()-Urb.$pageNavigation.outerHeight()-b;Urb.scrollPageNavigation=function(){Urb.scrollPosition>=f?Urb.$siteNavigation.addClass("stuck-top"):Urb.$siteNavigation.removeClass("stuck-top"),Urb.highlightCurrentSection()},Urb.scrollSocialNavigation=function(){Urb.$socialNavigation.is(":visible")?Urb.scrollPosition>Urb.$window.height()?Urb.$socialNavigation.addClass("hidden"):Urb.$socialNavigation.css({opacity:(1-Urb.scrollPosition/(Urb.$window.height()/15)).toFixed(2),"margin-top":(-1*Urb.scrollPosition/5).toFixed()+"px",transform:"scale("+(1-.2*Urb.scrollPosition/(Urb.$window.height()/5)).toFixed(2)+")"}):Urb.scrollPosition<Urb.$window.height()&&Urb.$socialNavigation.removeClass("hidden")},Urb.scrollToContent=function(){if(Urb.$body.hasClass("home")||0!=Urb.$window.scrollTop()){if(location.hash){var d=a(location.hash),e=5;Urb.$window.scrollTop()>d.offset().top-(c+e)&&Urb.$window.scrollTop()<d.offset().top+e&&Urb.$window.scrollTop(d.offset().top-c)}}else Urb.$window.scrollTop(a("main").offset().top-b)},Urb.$window.on("ajaxload load",Urb.setupExternalLinks),Urb.$window.on("load",Urb.setupFragmentAnchors),Urb.$window.on("ajaxload load",Urb.setupInternalLinks),Urb.$window.on("load",Urb.setupPageNavigation),Urb.$window.on("load scroll",Urb.scrollPageNavigation),Urb.$window.on("load scroll",Urb.scrollSocialNavigation),Urb.$window.on("load",function(){setTimeout(Urb.scrollToContent,1)}),Urb.$window.on("popstate",Urb.performHistoryNavigation)}),jQuery(function(a){Urb.$searchForm=a("#search"),Urb.$search=a("input",Urb.$searchForm),Urb.$searchButton=a('[href="#search"]',Urb.$socialNavigation),Urb.$searchLabel=a(".search-label",Urb.$searchForm),Urb.$searchSubmit=a("button",Urb.$searchForm),Urb.cancelSearching=function(){setTimeout(function(){Urb.$searchForm.toggleClass("searching",!1)},250)},Urb.changeSearch=function(){Urb.$searchLabel.toggleClass("visible",!Urb.$search.is(":valid"))},Urb.search=function(){return Urb.$search.is(":invalid")?(event.preventDefault(),!1):void 0},Urb.setupSearch=function(){},Urb.showSearchBox=function(){Urb.startSearching(),Urb.$search.focus()},Urb.startSearching=function(){Urb.changeSearch(),Urb.$searchForm.toggleClass("searching",!0)},Urb.$searchButton.on("click",Urb.showSearchBox),Urb.$searchSubmit.on("click",function(){Urb.$searchForm.submit()}),Urb.$searchForm.on("submit",Urb.search),Urb.$search.on("blur",Urb.cancelSearching),Urb.$search.on("input",Urb.changeSearch),Urb.$window.on("load",Urb.setupSearch)}),jQuery(function(a){Urb.hideTooltip=function(){var b=a(this),c=b.data("tooltip");c&&(c.removeClass("active"),setTimeout(function(){c.hasClass("active")||(b.data("tooltip",!1),b.attr("title",b.attr("data-title")),b.removeAttr("data-title"),c.remove())},1e3))},Urb.positionTooltip=function(a,b){var c=b.offset().top-1.25*a.outerHeight()<Urb.scrollPosition;a.toggleClass("above",!c),a.toggleClass("below",c),c?a.css({left:b.offset().left+b.width()/2-a.outerWidth()/2,top:b.offset().top+b.outerHeight()+.25*a.outerHeight()}):a.css({left:b.offset().left+b.width()/2-a.outerWidth()/2,top:b.offset().top-1.25*a.outerHeight()});var d=a.offset().left<0,e=a.offset().left+a.outerWidth()>Urb.$window.width();a.toggleClass("left",d),a.toggleClass("right",e),d?a.css({left:b.offset().left+b.width()/2-a.outerWidth()/2+-1*a.offset().left}):e&&a.css({left:b.offset().left+b.width()/2-a.outerWidth()/2-(a.offset().left+a.outerWidth()-Urb.$window.width())})},Urb.showTooltip=function(){var b=a(this),c=b.data("tooltip"),d=b.attr("title");b.parents(".map-canvas")||(c?(Urb.positionTooltip(c,b),c.addClass("active")):(c=a("<div />"),c.addClass("tooltip"),c.text(d),Urb.$body.append(c),Urb.positionTooltip(c,b),b.data("tooltip",c),c.addClass("active"),b.attr("data-title",d),b.removeAttr("title")))},Urb.setupTooltips=function(){Urb.$body.on("mouseleave","[title], [data-title]",Urb.hideTooltip),Urb.$body.on("mouseenter","[title], [data-title]",Urb.showTooltip)},Urb.$window.on("ajaxload load",Urb.setupTooltips)}),jQuery(function(a){var b,c=Urb.$wpadminbar?Urb.$wpadminbar.outerHeight():0,d=(Urb.$pageNavigation.outerHeight()+c,a('<button class="next"><span class="fa fa-angle-right"></span></button>')),e=a('<button class="previous"><span class="fa fa-angle-left"></span></button>'),f=a(".site-posts .latest-posts .blog-post h4");Urb.automaticNavigation=function(){Urb.showNextPost()},Urb.showPreviousPost=function(){var b=a(".site-posts .latest-posts .blog-post.active"),c=b.prev(".previous.blog-post");0===Urb.scrollPosition&&c.length&&e.trigger("click")},Urb.showNextPost=function(){var b=a(".site-posts .latest-posts .blog-post.active"),c=b.next(".next.blog-post");0===Urb.scrollPosition&&c.length&&d.trigger("click")},Urb.scrollHeader=function(){f.each(function(){var b=a(this);b.parents(".blog-post").is(".active")&&(Urb.scrollPosition>0&&Urb.scrollPosition<Urb.$window.height()?b.css({height:(100-25*Urb.scrollPosition/Urb.$window.height()).toFixed(2)+"%",transform:"scale("+(1-.15*Urb.scrollPosition/Urb.$window.height()).toFixed(3)+")"}):b.removeAttr("style"))})},Urb.setupHeaderNavigation=function(){d.on("click",function(c){var f=a(".site-posts .latest-posts .blog-post.active"),g=f.next(".next.blog-post"),h=a(".site-posts .latest-posts .blog-post:first-child");f.length?(e.addClass("active"),f.removeClass("active").addClass("previous"),g.length&&(g.removeClass("previous next").addClass("active"),Urb.getNextPost()),g.next(".next.blog-post").length||d.removeClass("active")):h.removeClass("previous next").addClass("active"),void 0!=c.which&&b&&clearInterval(b)}),e.on("click",function(c){var f=a(".site-posts .latest-posts .blog-post.active"),g=f.prev(".previous.blog-post"),h=a(".site-posts .latest-posts .blog-post:last-child");f.length?(d.addClass("active"),f.removeClass("active").addClass("next"),g.length&&g.removeClass("previous next").addClass("active"),g.prev(".previous.blog-post").length||e.removeClass("active")):h.removeClass("previous next").addClass("active"),void 0!=c.which&&b&&clearInterval(b)}),a(".site-posts .latest-posts").after(d).after(e),a(".site-posts .latest-posts .blog-post > a").on("dragstart",function(){return!1});var c=document.getElementById("latest-posts"),f=new Hammer(c);f.on("swiperight",function(){Urb.showPreviousPost(),Urb.stopAutomaticNavigation()}),f.on("swipeleft",function(){Urb.showNextPost(),Urb.stopAutomaticNavigation()}),setTimeout(Urb.getNextPost,500)},Urb.startAutomaticNavigation=function(){b&&clearInterval(b),b=setTimeout(function(){Urb.automaticNavigation()},5e3)},Urb.stopAutomaticNavigation=function(){b&&clearInterval(b),Urb.$window.off("scroll",Urb.stopAutomaticNavigation)},Urb.getNextPost=function(){a.ajax({type:"POST",url:_URB.url,data:{action:"getnext",id:a(".site-posts .latest-posts .blog-post:last-child").data("post-id")},success:function(b){if(b.success){var c=a("<li />");c.addClass("blog-post next"),c.attr("data-post-id",b.data.ID);var e=a("<a />");if(e.attr("href",b.data.permalink),e.on("dragstart",function(){return!1}),c.append(e),b.data.thumbnail){var f=a("<span />");f.addClass("blog-post-image"),b.data.image_src&&f.css({"background-image":"url("+b.data.image_src+")"}),f.append(b.data.thumbnail),e.append(f)}if(b.data.post_title){var g=a("<h4 />");g.text(b.data.post_title),e.append(g)}if(b.data.excerpt){var h=a("<div />");h.addClass("blog-post-intro"),h.html(b.data.excerpt),c.append(h)}a(".site-posts .latest-posts").append(c),d.addClass("active"),Urb.startAutomaticNavigation()}}})},Urb.$window.on("scroll",Urb.stopAutomaticNavigation),Urb.$window.on("load scroll",Urb.scrollHeader),Urb.$window.on("load",Urb.setupHeaderNavigation)}),jQuery(function(a){Urb.$specials=a(".site-specials"),Urb.$currentBeerTaps=a(".current-beer .taps",Urb.$specials),Urb.$currentBeerDeck=a(".upcoming-beer .decks",Urb.$specials),Urb.setupTapSorting=function(){a("th",Urb.$currentBeerTaps).click(Urb.sortTap)},Urb.sortTap=function(){var b=a(this);Urb.$currentBeerTaps.find("td").filter(function(){return a(this).index()===b.index()}).sortElements(function(b,c){return a.text([b])==a.text([c])?0:a.text([b])>a.text([c])?1:-1},function(){return this.parentNode}),Urb.$currentBeerDeck.find("td").filter(function(){return a(this).index()===b.index()}).sortElements(function(b,c){return a.text([b])==a.text([c])?0:a.text([b])>a.text([c])?1:-1},function(){return this.parentNode})},Urb.$window.on("load",Urb.setupTapSorting)}),jQuery(function(a){Urb.setupEventLinks=function(){a(".event",Urb.$communityEvents).each(function(){var b=a(this);b.on("click",function(b){location.href=a(this).children(".event-what").attr("href")})})},Urb.$window.on("load",Urb.setupEventLinks)}),jQuery(function(a){var b=Urb.$wpadminbar?Urb.$wpadminbar.outerHeight():0,c=Urb.$pageNavigation.outerHeight()+b;Urb.centerMap=function(){Urb.$map.data("map")&&setTimeout(function(){Urb.$map.data("map").setCenter(Urb.$map.data("marker").getPosition()),Urb.$map.data("map").panTo(Urb.$map.data("marker").getPosition())},250)},Urb.scrollMap=function(){if(Urb.$map.hasClass("open")&&!Urb.$map.hasClass("animating")&&Urb.$mapCanvas.offset().top>Urb.scrollPosition+Urb.$window.height()&&(Urb.$map.removeClass("open"),a(".map-container, .map-canvas",Urb.$map).removeAttr("style")),!Urb.$map.data("map")&&Urb.$window.scrollTop()>a("#company").offset().top){var b=a("<script />");b.attr("type","text/javascript"),b.attr("async",!0),b.attr("src","http://maps.google.com/maps/api/js?callback=Urb.setupMap"),Urb.$body.append(b),Urb.$map.data("map",!0)}},Urb.setupBusinessHours=function(){var b=new Date,c=b.getDay()+1;a("dt:nth-of-type("+c+"), dd:nth-of-type("+c+")",Urb.$businesHours).addClass("today"),a("dt",Urb.$businessHours).hover(function(){a(this).toggleClass("hover").next("dd").toggleClass("hover")}),a("dd",Urb.$businessHours).hover(function(){a(this).toggleClass("hover").prev("dt").toggleClass("hover")})},Urb.setupContactForm=function(){Urb.$contactForm.attr("novalidate",!0),Urb.$contactForm.on("submit",Urb.submitContactForm);var a=Urb.$contactForm.find("#contact_email_address");Urb.$contactForm.data("email_address",a),a.on("keyup",function(){a.closest(".field").removeClass("error").removeAttr("title")})},Urb.setupMap=function(){google||a(".site-map").remove(),Urb.$mapCanvas.appendTo(Urb.$mapContainer);var b={disableDefaultUI:!0,draggable:!1,mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:!1,overviewMapControl:!0,rotateControl:!1,scaleControl:!1,scrollwheel:!1,streetViewControl:!1,zoom:14,zoomControl:!0,zoomControlOptions:{position:google.maps.ControlPosition.RIGHT_BOTTOM}};Urb.$map.data("latitude")&&Urb.$map.data("longitude")&&(b.center=new google.maps.LatLng(Urb.$map.data("latitude"),Urb.$map.data("longitude")),a.getJSON("/wp-content/themes/urbanrest-wordpress-theme/styles/map.json",function(a){b.styles=a;var c=new google.maps.Map(Urb.$mapCanvas.get(0),b),d=new google.maps.Marker({icon:{labelOrigin:{x:30,y:19},url:"http://maps.google.com/mapfiles/kml/paddle/grn-blank.png"},label:{fontFamily:"FontAwesome",fontSize:"22px",text:""},map:c,position:b.center}),e=new google.maps.InfoWindow({content:Urb.$address.html()});Urb.$map.data("map",c),Urb.$map.data("marker",d),Urb.$map.data("infoWindow",e),google.maps.event.addListener(d,"click",function(){e.open(c,d)}),e.open(c,d)})),a("#menu-map-icons a").each(function(){a(this).attr("title",this.textContent)})},Urb.handleContactFormResponse=function(b){console.log(b),console.log(b.responseText),b&&b.success&&Urb.loading(a('button[type="submit"]',Urb.$contactForm),!0)},Urb.submitContactForm=function(b){b.preventDefault(),Urb.validateContactForm()&&(Urb.loading(a('button[type="submit"]',Urb.$contactForm)),a.ajax({url:Urb.$contactForm.attr("action"),data:Urb.$contactForm.serialize(),dataType:"json",method:Urb.$contactForm.attr("method"),complete:Urb.handleContactFormResponse}))},Urb.toggleMap=function(b){if(b.preventDefault(),Urb.$map.data("map")||Urb.setupMap(),Urb.$map.toggleClass("open"),Urb.$map.hasClass("open")){Urb.$map.addClass("animating");var d=(Urb.$window.outerHeight()-c-a("h3",Urb.$map).outerHeight()).toFixed(0);a(".map-container, .map-canvas",Urb.$map).css("height",d+"px"),a("html,body").animate({scrollTop:Urb.$window.scrollTop()+d},666,function(){Urb.$map.removeClass("animating")})}else a(".map-container, .map-canvas",Urb.$map).removeAttr("style")},Urb.validateContactForm=function(){var a=Urb.$contactForm.data("email_address");return a.val().length<3||a.val().indexOf("@")<0?(a.closest(".field").addClass("error").attr("title","Valid email address required."),!1):!0},Urb.$window.on("scroll",Urb.scrollMap),Urb.$window.on("load",Urb.setupBusinessHours),Urb.$mapLink.on("click",Urb.toggleMap),Urb.$window.on("load",Urb.setupContactForm),Urb.$window.on("resize",Urb.centerMap)}),jQuery(function(a){Urb.rateBeer=function(){var b=a(".rating-actions"),c=a(this);return b.addClass("rated"),c.addClass("rated"),c.prevAll(".rate-button").addClass("rated"),c.nextAll(".rate-button").removeClass("rated"),a.ajax({type:"POST",url:_URB.url,data:{action:"post-rate",nonce:_URB.nonce,post_rating:c.val(),post_id:c.data("id")},dataType:"json",success:function(a){a.success?Urb.$aggregateRating.attr("data-user-rating",c.val()):console.log(a),Urb.shareRating(c.val())}}),!1},Urb.setupRatingPoll=function(){Urb.$aggregateRating=a('[itemprop="aggregateRating"]'),Urb.$beerCheckinModal=a(".beer-checkin.modal");var b=a('<div class="rating-actions" />');Number(Urb.$aggregateRating.data("user-rating"))>0&&b.addClass("rated");for(var c=1;5>=c;c++){var d=a('<button class="rate-button" />');d.val(c),d.data("id",Urb.$aggregateRating.data("beer-id")),d.text(1===c?"1 Star":c+" Stars"),d.toggleClass("rated",c<=Number(Urb.$aggregateRating.data("user-rating"))),b.append(d),d.on("click",Urb.rateBeer)}Urb.$aggregateRating.after(b)},Urb.setupRatingsFrom3rdParties=function(){a.ajaxSetup({beforeSend:function(a){a.setRequestHeader("Authorization","Basic "+btoa("urbanrest:Greensleeves"))}}),a.ajax({type:"get",url:Urb.API+"untappd/beer/info/",data:{postId:a('[itemprop="aggregateRating"]').data("beer-id")},dataType:"json",success:function(b){var c=Number(a('[itemprop="ratingValue"]',Urb.$aggregateRating).text()),d=Number(a('[itemprop="reviewCount"]',Urb.$aggregateRating).text()),e=c*d;if(b.response.beer){var f=b.response.beer.rating_score,g=b.response.beer.rating_count,h=f*g,i=e+h,j=d+g,k=i/j;Urb.$aggregateRating.attr("data-overall-rating",k.toFixed(1)),a('[itemprop="ratingValue"]',Urb.$aggregateRating).text(k.toFixed(1)),a('[itemprop="reviewCount"]',Urb.$aggregateRating).text(j.toFixed(0))}}}),a.ajax({type:"get",url:Urb.API+"ratebeer/beer/info/",data:{postId:a('[itemprop="aggregateRating"]').data("beer-id")},dataType:"json",success:function(b){var c=Number(a('[itemprop="ratingValue"]',Urb.$aggregateRating).text()),d=Number(a('[itemprop="reviewCount"]',Urb.$aggregateRating).text()),e=c*d;if(b){var f=Number(b.rating_value)/Number(b.best_rating)*5,g=Number(b.review_count),h=f*g,i=e+h,j=d+g,k=i/j;Urb.$aggregateRating.attr("data-overall-rating",k.toFixed(1)),a('[itemprop="ratingValue"]',Urb.$aggregateRating).text(k.toFixed(1)),a('[itemprop="reviewCount"]',Urb.$aggregateRating).text(j.toFixed(0))}}}),a.ajax({type:"get",url:Urb.API+"beeradvocate/beer/info/",data:{postId:a('[itemprop="aggregateRating"]').data("beer-id")},dataType:"json",success:function(b){var c=Number(a('[itemprop="ratingValue"]',Urb.$aggregateRating).text()),d=Number(a('[itemprop="reviewCount"]',Urb.$aggregateRating).text()),e=c*d;if(b){var f=Number(b.rating_value)/Number(b.best_rating)*5,g=Number(b.review_count),h=f*g,i=e+h,j=d+g,k=i/j;Urb.$aggregateRating.attr("data-overall-rating",k.toFixed(1)),a('[itemprop="ratingValue"]',Urb.$aggregateRating).text(k.toFixed(1)),a('[itemprop="reviewCount"]',Urb.$aggregateRating).text(j.toFixed(0))}}})},Urb.shareRating=function(b){var c=a(".message",Urb.$beerCheckinModal);0==c.length&&(c=a('<div class="message" />'),a(".modal-content",Urb.$beerCheckinModal).prepend(c));var d="Thanks.";switch(Number(b)){case 5:d="Wow, Thank You!";break;case 4:d="Glad You Enjoyed It!";break;case 3:d="Thanks!";break;case 2:d="Thank you.";break;case 1:d="We can do better."}c.text(d),Urb.showModal(".beer-checkin.modal")},Urb.$window.on("ajaxload load",Urb.setupRatingPoll)}),jQuery(function(a){}),jQuery(function(a){}),jQuery(function(a){}),jQuery(function(a){}),function(a,b,c,d,e,f,g){a.GoogleAnalyticsObject=e,a[e]=a[e]||function(){(a[e].q=a[e].q||[]).push(arguments)},a[e].l=1*new Date,f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=d,g.parentNode.insertBefore(f,g)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-54926068-6","auto"),ga("require","linkid","linkid.js"),ga("set","anonymizeIp",!0),ga("send","pageview");