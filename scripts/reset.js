jQuery( function( $ ) {
	window.Urb = {
		$document : $(document),
		$window   : $(window),

		$body : $('body'),
		$html : $('html').removeClass('no-javascript').addClass('javascript'),

		$wpadminbar       : $('#wpadminbar'),
		$logo             : $('.site .site-header .site-title .site-logo'),
		$menuLogo         : $('<img src="/wp-content/themes/urbanrest-wordpress-theme/images/logo-urbanrest-text-inverted-min.png" />'),
		$mainNavigation   : $('.site .site-header .site-navigation .main-navigation'),
		$socialNavigation : $('.site .site-header .site-navigation .social-navigation'),
		$communityEvents  : $('.site .site-community .site-events .events'),
		$businessHours    : $('.site .site-company .site-location .business-hours'),
		$map              : $('.site .site-company .site-map'),
		$mapLink          : $('.site .site-company .site-map .map-link'),
		$mapContainer     : $('.site .site-company .site-map .map-container'),
		$mapCanvas        : $('<div class="map-canvas" />'),
		$contactForm      : $('.site .site-company .site-contact .contact-form'),
		$address          : $('.site .site-footer .site-address'),
		$viewport         : $('<div id="viewport" />'),

		scrollPosition : document.body.scrollTop,
		API : 'http://localapi.urbanrest.com/'
	};

	Urb.loading = function( $element, completionSuccess ) {
		if(undefined !== completionSuccess) {
			var originalText = $element.data('loading');
			$element.data( 'loading', $element.text() ).text( originalText );
			$element.removeClass('loading').addClass( completionSuccess ? 'success' : 'failure').removeAttr('disabled');
		} else {
			var loadingText = $element.data('loading');
			$element.data( 'loading', $element.text() ).text( loadingText );
			$element.addClass('loading').attr('disabled', true);
		}
	};

	Urb.setupMenuLogo = function() {
		var $menuLogoItem = $('<li class="menu-item menu-item-logo"></li>');
		$('<a href="#"></a>').append(Urb.$menuLogo).appendTo($menuLogoItem);
		$('.main-menu li:nth-child(2)', Urb.$mainNavigation).after($menuLogoItem);
	};

	Urb.setScrollPosition = function() {
		Urb.scrollPosition = Urb.$document.scrollTop();
	};

	Urb.updateViewport = function() {
		var viewportWidth = Urb.$window.outerWidth();
		Urb.$viewport.toggleClass('phone', viewportWidth <= 768);
		Urb.$viewport.toggleClass('tablet', viewportWidth > 768 && viewportWidth <= 1024);
		Urb.$viewport.toggleClass('desktop', viewportWidth > 1024);
	};

	Urb.setupViewport = function() {
		Urb.$body.append(Urb.$viewport);
		Urb.updateViewport();
	};
	
	Urb.$window.on('load', Urb.setupMenuLogo);
	Urb.$window.on('load', Urb.setupViewport);
	Urb.$window.on('resize orientationchange', Urb.updateViewport);
	Urb.$window.on('scroll', Urb.setScrollPosition);
});