jQuery.fn.sortElements=function(){var a=[].sort;return function(b,c){c=c||function(){return this};var d=this.map(function(){var a=c.call(this),b=a.parentNode,d=b.insertBefore(document.createTextNode(""),a.nextSibling);return function(){if(b===this)throw new Error("You can't sort elements if any one is a descendant of another.");b.insertBefore(this,d),b.removeChild(d)}});return a.call(this,b).each(function(a){d[a].call(c.call(this))})}}(),function(a,b,c,d){"use strict";function e(b,c){this.element=b,this.settings=a.extend({},g,c),this._defaults=g,this._name=f,this.init()}var f="urbModal",g={};a.extend(e.prototype,{init:function(){var b=a(this.element).addClass("modal-shade"),c=a('<div class="modal-content" />'),d=a('<button class="modal-close" type="button" />'),e=function(d){var e=a(d.target);return e.is(".modal-content")||e.closest(".modal-content").length?!0:(c.removeClass("animated fadeInDown").addClass("animated fadeOutDown"),b.removeClass("modal-opened animated fadeIn").addClass("modal-closing animated fadeOut"),void setTimeout(function(){a("body").removeClass("no-scroll"),b.removeClass("modal-closing animated fadeOut")},500))};b.on("click",e),b.wrapInner(c),b.append(d)},show:function(){var b=a(this.element),c=a(".modal-content",b);c.removeClass("fadeOutDown").addClass("animated fadeInDown"),b.addClass("modal-opened animated fadeIn"),a("body").addClass("no-scroll")}}),a.fn[f]=function(b){return this.each(function(){a.data(this,f)||a.data(this,f,new e(this,b))})}}(jQuery,window,document),jQuery(function(a){window.Urb={$document:a(document),$window:a(window),$body:a("body"),$html:a("html").removeClass("no-javascript").addClass("javascript"),$wpadminbar:a("#wpadminbar"),$logo:a(".site .site-header .site-title .site-logo"),$menuLogo:a('<img src="/wp-content/themes/urbanrest-wordpress-theme/images/logo-urbanrest-text-inverted-min.png" />'),$mainNavigation:a(".site .site-header .site-navigation .main-navigation"),$socialNavigation:a(".site .site-header .site-navigation .social-navigation"),$communityEvents:a(".site .site-community .site-events .events"),$businessHours:a(".site .site-company .site-location .business-hours"),$map:a(".site .site-company .site-map"),$mapLink:a(".site .site-company .site-map .map-link"),$mapContainer:a(".site .site-company .site-map .map-container"),$mapCanvas:a('<div class="map-canvas" />'),$contactForm:a(".site .site-company .site-contact .contact-form"),$address:a(".site .site-footer .site-address"),$viewport:a('<div id="viewport" />'),scrollPosition:document.body.scrollTop,API:"http://testapi.urbanrest.com/"},Urb.loading=function(a,b){if(void 0!==b){var c=a.data("loading");a.data("loading",a.text()).text(c),a.removeClass("loading").addClass(b?"success":"failure").removeAttr("disabled")}else{var d=a.data("loading");a.data("loading",a.text()).text(d),a.addClass("loading").attr("disabled",!0)}},Urb.setScrollPosition=function(){Urb.scrollPosition=Urb.$document.scrollTop()},Urb.updateViewport=function(){var a=Urb.$window.outerWidth();Urb.$viewport.toggleClass("phone",768>=a),Urb.$viewport.toggleClass("tablet",a>768&&1024>=a),Urb.$viewport.toggleClass("desktop",a>1024)},Urb.setupViewport=function(){Urb.$body.append(Urb.$viewport),Urb.updateViewport()},Urb.$window.on("load",Urb.setupViewport),Urb.$window.on("resize orientationchange",Urb.updateViewport),Urb.$window.on("scroll",Urb.setScrollPosition)}),jQuery(function(a){Urb.setupModal=function(){a(".modal").urbModal(),a('[data-action="modal"]').on("click",Urb.showModal)},Urb.showModal=function(){a(a(this).data("target")).data("urbModal").show()},Urb.$window.on("load",Urb.setupModal)}),jQuery(function(a){var b=Urb.$wpadminbar?Urb.$wpadminbar.outerHeight():0,c=Urb.$mainNavigation.outerHeight()+b;Urb.setupFragmentAnchors=function(){Urb.$document.on("click",'a[href^="#"]',function(b){b.preventDefault();var d=a.attr(this,"href"),e=0,f=a(d);"#"!==d&&0!==f.length?e=f.offset().top:d="/";var g=f.innerHeight()-f.height()>c;return a("html,body").animate({scrollTop:Math.ceil(e-(g?0:1.5*c))},Math.round(500*(Math.abs(Urb.$window.scrollTop()-e)/Urb.$window.height()))),!1})},Urb.setupMainNavigation=function(){Urb.$mainNavigation.find(".menu-item a").click(function(){a(this).blur()})};var d=Urb.$window.height()-Urb.$mainNavigation.outerHeight()-b;Urb.scrollMainNavigation=function(){Urb.scrollPosition>=d?Urb.$mainNavigation.addClass("stuck-top"):Urb.$mainNavigation.removeClass("stuck-top")},Urb.scrollSocialNavigation=function(){Urb.$socialNavigation.is(":visible")?Urb.scrollPosition>Urb.$window.height()?Urb.$socialNavigation.addClass("hidden"):Urb.$socialNavigation.css({opacity:(1-Urb.scrollPosition/(Urb.$window.height()/15)).toFixed(2),"margin-top":(-1*Urb.scrollPosition/5).toFixed()+"px",transform:"scale("+(1-.2*Urb.scrollPosition/(Urb.$window.height()/5)).toFixed(2)+")"}):Urb.scrollPosition<Urb.$window.height()&&Urb.$socialNavigation.removeClass("hidden")},Urb.scrollToContent=function(){if(Urb.$body.hasClass("home")||0!=Urb.$window.scrollTop()){if(location.hash){var d=a(location.hash),e=5;Urb.$window.scrollTop()>d.offset().top-(c+e)&&Urb.$window.scrollTop()<d.offset().top+e&&Urb.$window.scrollTop(d.offset().top-c)}}else Urb.$window.scrollTop(a("main").offset().top-b)},Urb.$window.on("load",Urb.setupFragmentAnchors),Urb.$window.on("load",Urb.setupMainNavigation),Urb.$window.on("load scroll",Urb.scrollMainNavigation),Urb.$window.on("load scroll",Urb.scrollSocialNavigation),Urb.$window.on("load",function(){setTimeout(Urb.scrollToContent,1)})}),jQuery(function(a){Urb.$searchForm=a("#search"),Urb.$search=a("input",Urb.$searchForm),Urb.$searchButton=a('[href="#search"]',Urb.$socialNavigation),Urb.$searchLabel=a(".search-label",Urb.$searchForm),Urb.$searchSubmit=a("button",Urb.$searchForm),Urb.cancelSearching=function(){setTimeout(function(){Urb.$searchForm.toggleClass("searching",!1)},250)},Urb.changeSearch=function(){Urb.$searchLabel.toggleClass("visible",!Urb.$search.is(":valid"))},Urb.search=function(){return Urb.$search.is(":invalid")?(event.preventDefault(),!1):void 0},Urb.setupSearch=function(){},Urb.showSearchBox=function(){Urb.startSearching(),Urb.$search.focus()},Urb.startSearching=function(){Urb.changeSearch(),Urb.$searchForm.toggleClass("searching",!0)},Urb.$searchButton.on("click",Urb.showSearchBox),Urb.$searchSubmit.on("click",function(){Urb.$searchForm.submit()}),Urb.$searchForm.on("submit",Urb.search),Urb.$search.on("blur",Urb.cancelSearching),Urb.$search.on("input",Urb.changeSearch),Urb.$window.on("load",Urb.setupSearch)}),jQuery(function(a){var b=Urb.$wpadminbar?Urb.$wpadminbar.outerHeight():0,c=(Urb.$mainNavigation.outerHeight()+b,a('<button class="next"><span class="fa fa-angle-right"></span></button>')),d=a('<button class="previous"><span class="fa fa-angle-left"></span></button>'),e=setInterval(function(){Urb.automaticNavigation()},5e3),f=a(".site-posts .latest-posts .blog-post h4");Urb.automaticNavigation=function(){var b=a(".site-posts .latest-posts .blog-post.active"),d=b.next(".next.blog-post");d.length&&c.trigger("click")},Urb.scrollHeader=function(){f.each(function(){var b=a(this);b.parents(".blog-post").is(".active")&&(Urb.scrollPosition>0&&Urb.scrollPosition<Urb.$window.height()?b.css({height:(100-25*Urb.scrollPosition/Urb.$window.height()).toFixed(2)+"%",transform:"scale("+(1-.15*Urb.scrollPosition/Urb.$window.height()).toFixed(3)+")"}):b.removeAttr("style"))})},Urb.setupHeaderNavigation=function(){c.on("click",function(b){var f=a(".site-posts .latest-posts .blog-post.active"),g=f.next(".next.blog-post"),h=a(".site-posts .latest-posts .blog-post:first-child");f.length?(d.addClass("active"),f.removeClass("active").addClass("previous"),g.length&&g.removeClass("previous next").addClass("active"),g.next(".next.blog-post").length||c.removeClass("active")):h.removeClass("previous next").addClass("active"),void 0!=b.which&&e&&clearInterval(e)}),d.on("click",function(b){var f=a(".site-posts .latest-posts .blog-post.active"),g=f.prev(".previous.blog-post"),h=a(".site-posts .latest-posts .blog-post:last-child");f.length?(c.addClass("active"),f.removeClass("active").addClass("next"),g.length&&g.removeClass("previous next").addClass("active"),g.prev(".previous.blog-post").length||d.removeClass("active")):h.removeClass("previous next").addClass("active"),void 0!=b.which&&e&&clearInterval(e)}),a(".site-posts .latest-posts").after(c).after(d),setTimeout(Urb.showNavigation,500)},Urb.stopAutomaticNavigation=function(){e&&clearInterval(e),Urb.$window.off("scroll",Urb.stopAutomaticNavigation)},Urb.showNavigation=function(){c.addClass("active")},Urb.$window.on("scroll",Urb.stopAutomaticNavigation),Urb.$window.on("load scroll",Urb.scrollHeader),Urb.$window.on("load",Urb.setupHeaderNavigation)}),jQuery(function(a){Urb.$specials=a(".site-specials"),Urb.$currentBeerTaps=a(".current-beer .taps",Urb.$specials),Urb.$currentBeerDeck=a(".upcoming-beer .decks",Urb.$specials),Urb.setupTapSorting=function(){a("th",Urb.$currentBeerTaps).click(Urb.sortTap)},Urb.sortTap=function(){var b=a(this);Urb.$currentBeerTaps.find("td").filter(function(){return a(this).index()===b.index()}).sortElements(function(b,c){return a.text([b])==a.text([c])?0:a.text([b])>a.text([c])?1:-1},function(){return this.parentNode}),Urb.$currentBeerDeck.find("td").filter(function(){return a(this).index()===b.index()}).sortElements(function(b,c){return a.text([b])==a.text([c])?0:a.text([b])>a.text([c])?1:-1},function(){return this.parentNode})},Urb.$window.on("load",Urb.setupTapSorting)}),jQuery(function(a){Urb.setupEventLinks=function(){a(".event",Urb.$communityEvents).each(function(){var b=a(this);b.on("click",function(b){location.href=a(this).children(".event-what").attr("href")})})},Urb.$window.on("load",Urb.setupEventLinks)}),jQuery(function(a){var b=Urb.$wpadminbar?Urb.$wpadminbar.outerHeight():0,c=Urb.$mainNavigation.outerHeight()+b;Urb.centerMap=function(){Urb.$map.data("map")&&setTimeout(function(){Urb.$map.data("map").setCenter(Urb.$map.data("marker").getPosition()),Urb.$map.data("map").panTo(Urb.$map.data("marker").getPosition())},250)},Urb.scrollMap=function(){Urb.$map.hasClass("open")&&!Urb.$map.hasClass("animating")&&Urb.$mapCanvas.offset().top>Urb.scrollPosition+Urb.$window.height()&&(Urb.$map.removeClass("open"),a(".map-container, .map-canvas",Urb.$map).removeAttr("style")),!Urb.$map.data("map")&&Urb.$window.scrollTop()>a("#company").offset().top&&Urb.setupMap()},Urb.setupBusinessHours=function(){var b=new Date,c=b.getDay()+1;a("dt:nth-of-type("+c+"), dd:nth-of-type("+c+")",Urb.$businesHours).addClass("today"),a("dt",Urb.$businessHours).hover(function(){a(this).toggleClass("hover").next("dd").toggleClass("hover")}),a("dd",Urb.$businessHours).hover(function(){a(this).toggleClass("hover").prev("dt").toggleClass("hover")})},Urb.setupContactForm=function(){Urb.$contactForm.attr("novalidate",!0),Urb.$contactForm.on("submit",Urb.submitContactForm);var a=Urb.$contactForm.find("#contact_email_address");Urb.$contactForm.data("email_address",a),a.on("keyup",function(){a.closest(".field").removeClass("error").removeAttr("title")})},Urb.setupMap=function(){Urb.$map.data("map",!0),Urb.$mapCanvas.appendTo(Urb.$mapContainer);var b={disableDefaultUI:!0,mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:!1,overviewMapControl:!0,rotateControl:!1,scaleControl:!1,scrollwheel:!1,streetViewControl:!1,zoom:14,zoomControl:!0,zoomControlOptions:{position:google.maps.ControlPosition.RIGHT_BOTTOM}};Urb.$map.data("latitude")&&Urb.$map.data("longitude")&&(b.center=new google.maps.LatLng(Urb.$map.data("latitude"),Urb.$map.data("longitude")),a.getJSON("/wp-content/themes/urbanrest-wordpress-theme/styles/map.json",function(a){b.styles=a;var c=new google.maps.Map(Urb.$mapCanvas.get(0),b),d=new google.maps.Marker({icon:{labelOrigin:{x:30,y:19},url:"http://maps.google.com/mapfiles/kml/paddle/grn-blank.png"},label:{fontFamily:"FontAwesome",fontSize:"22px",text:""},map:c,position:b.center}),e=new google.maps.InfoWindow({content:Urb.$address.html()});Urb.$map.data("map",c),Urb.$map.data("marker",d),Urb.$map.data("infoWindow",e),google.maps.event.addListener(d,"click",function(){e.open(c,d)}),e.open(c,d)}))},Urb.handleContactFormResponse=function(b){console.log(b),console.log(b.responseText),b&&b.success&&Urb.loading(a('button[type="submit"]',Urb.$contactForm),!0)},Urb.submitContactForm=function(b){b.preventDefault(),Urb.validateContactForm()&&(Urb.loading(a('button[type="submit"]',Urb.$contactForm)),a.ajax({url:Urb.$contactForm.attr("action"),data:Urb.$contactForm.serialize(),dataType:"json",method:Urb.$contactForm.attr("method"),complete:Urb.handleContactFormResponse}))},Urb.toggleMap=function(b){if(b.preventDefault(),Urb.$map.data("map")||Urb.setupMap(),Urb.$map.toggleClass("open"),Urb.$map.hasClass("open")){Urb.$map.addClass("animating");var d=(Urb.$window.outerHeight()-c-a("h3",Urb.$map).outerHeight()).toFixed(0);a(".map-container, .map-canvas",Urb.$map).css("height",d+"px"),Urb.$body.animate({scrollTop:Urb.$body.scrollTop()+d},666,function(){Urb.$map.removeClass("animating")})}else a(".map-container, .map-canvas",Urb.$map).removeAttr("style")},Urb.validateContactForm=function(){var a=Urb.$contactForm.data("email_address");return a.val().length<3||a.val().indexOf("@")<0?(a.closest(".field").addClass("error").attr("title","Valid email address required."),!1):!0},Urb.$window.on("scroll",Urb.scrollMap),Urb.$window.on("load",Urb.setupBusinessHours),Urb.$mapLink.on("click",Urb.toggleMap),Urb.$window.on("load",Urb.setupContactForm),Urb.$window.on("resize",Urb.centerMap)}),jQuery(function(a){Urb.$aggregateRating=a('[itemprop="aggregateRating"]'),Urb.rateBeer=function(){var b=a('<div class="rating-actions" />'),c=a(this);return a.ajax({type:"post",url:_URB.url,data:"action=post-rate&nonce="+_URB.nonce+"&post_rating="+c.val()+"&post_id="+c.data("id"),dataType:"json",success:function(a){a.success?(b.addClass("rated"),c.addClass("rated"),c.prevAll(".rate-button").addClass("rated"),Urb.$aggregateRating.attr("data-user-rating",c.val())):(console.log(a),alert(a.message))}}),!1},Urb.setupRatingPoll=function(){var b=a('<div class="rating-actions" />');Number(Urb.$aggregateRating.data("user-rating"))>0&&b.addClass("rated");for(var c=1;5>=c;c++){var d=a('<button class="rate-button" />');d.val(c),d.data("id",Urb.$aggregateRating.data("beer-id")),d.text(1===c?"1 Star":c+" Stars"),d.toggleClass("rated",c<=Number(Urb.$aggregateRating.data("user-rating"))),b.append(d),d.on("click",Urb.rateBeer)}Urb.$aggregateRating.after(b)},Urb.setupRatingsFrom3rdParties=function(){a.ajaxSetup({beforeSend:function(a){a.setRequestHeader("Authorization","Basic "+btoa("urbanrest:Greensleeves"))}}),a.ajax({type:"get",url:Urb.API+"untappd/beer/info/",data:{postId:a('[itemprop="aggregateRating"]').data("beer-id")},dataType:"json",success:function(b){var c=Number(a('[itemprop="ratingValue"]',Urb.$aggregateRating).text()),d=Number(a('[itemprop="reviewCount"]',Urb.$aggregateRating).text()),e=c*d;if(b.response.beer){var f=b.response.beer.rating_score,g=b.response.beer.rating_count,h=f*g,i=e+h,j=d+g,k=i/j;Urb.$aggregateRating.attr("data-overall-rating",k.toFixed(1)),a('[itemprop="ratingValue"]',Urb.$aggregateRating).text(k.toFixed(1)),a('[itemprop="reviewCount"]',Urb.$aggregateRating).text(j.toFixed(0))}}}),a.ajax({type:"get",url:Urb.API+"ratebeer/beer/info/",data:{postId:a('[itemprop="aggregateRating"]').data("beer-id")},dataType:"json",success:function(b){var c=Number(a('[itemprop="ratingValue"]',Urb.$aggregateRating).text()),d=Number(a('[itemprop="reviewCount"]',Urb.$aggregateRating).text()),e=c*d;if(b){var f=Number(b.rating_value)/Number(b.best_rating)*5,g=Number(b.review_count),h=f*g,i=e+h,j=d+g,k=i/j;Urb.$aggregateRating.attr("data-overall-rating",k.toFixed(1)),a('[itemprop="ratingValue"]',Urb.$aggregateRating).text(k.toFixed(1)),a('[itemprop="reviewCount"]',Urb.$aggregateRating).text(j.toFixed(0))}}}),a.ajax({type:"get",url:Urb.API+"beeradvocate/beer/info/",data:{postId:a('[itemprop="aggregateRating"]').data("beer-id")},dataType:"json",success:function(b){var c=Number(a('[itemprop="ratingValue"]',Urb.$aggregateRating).text()),d=Number(a('[itemprop="reviewCount"]',Urb.$aggregateRating).text()),e=c*d;if(b){var f=Number(b.rating_value)/Number(b.best_rating)*5,g=Number(b.review_count),h=f*g,i=e+h,j=d+g,k=i/j;Urb.$aggregateRating.attr("data-overall-rating",k.toFixed(1)),a('[itemprop="ratingValue"]',Urb.$aggregateRating).text(k.toFixed(1)),a('[itemprop="reviewCount"]',Urb.$aggregateRating).text(j.toFixed(0))}}})},Urb.$body.is(".single-beer")&&(Urb.$window.on("load",Urb.setupRatingPoll),Urb.$window.on("load",Urb.setupRatingsFrom3rdParties))}),jQuery(function(a){}),jQuery(function(a){}),jQuery(function(a){}),jQuery(function(a){});