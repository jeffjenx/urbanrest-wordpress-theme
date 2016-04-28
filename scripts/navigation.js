jQuery( function( $ ) {
	var wpAdminBarHeight = (Urb.$wpadminbar && Urb.$window.outerWidth() > 600) ? Urb.$wpadminbar.outerHeight() : 0;
	var navBarWithAdminBarHeight = Urb.$pageNavigation.outerHeight() + wpAdminBarHeight;
	var $main = $('main');
	var contentAreas = {
		'#contact' : $('#contact'),
		'#beer' : $('#beer')
	};
	if($main.length){
		contentAreas[$main.attr('id')] = $main;
	}

	Urb.highlightCurrentSection = function() {
		$('a.active', Urb.$pageNavigation).removeClass('active');

		for(var i in contentAreas) {
			var $contentArea = contentAreas[i];
			//if(Urb.contentAreas[i] > Urb.scrollPosition && Urb.contentAreas[i] < Urb.scrollPosition + Urb.$window.height()) {
			if(
				Urb.scrollPosition > $contentArea.offset().top - Urb.$window.height() * 0.5 && 
				Urb.scrollPosition < $contentArea.offset().top + $contentArea.outerHeight() - Urb.$window.height() * 0.5
			) {
				$('a[href*="' + i + '"]', Urb.$pageNavigation).addClass('active');
			}
		}
	};

	Urb.loadPage = function(slug) {
		var $currentPage = $('main');
		//var $nextPage = $('<main class="page loading row around-xs"><span class="loading text">Loading<span class="dot"></span><span class="dot"></span><span class="dot"></span></span></main>');
		
		// Homepage
		if(slug === '/' || slug === '') {
			var targetOffset = 0;
			var duration = Math.round( 500 * (Math.abs(Urb.$window.scrollTop() - targetOffset) / Urb.$window.height()) );
			
			//Urb.$body.animate(
			$('html,body').animate(
				{ scrollTop: targetOffset },
				duration
			);
			$currentPage.animate({height:0}, duration);
			setTimeout(function(){
				$currentPage.remove();
			}, duration + 250);
			return;
		}

		// Fragment Anchors
		var fragmentAnchors = [];
		$('a[href^="#"]').each(function() {
			var anchor = this.href.substring( this.href.indexOf('#') );
			fragmentAnchors.push(anchor);
		});
		
		var fragmented = slug.replace('/','#');
		if($.inArray(fragmented, fragmentAnchors) !== -1){
			var targetOffset = $( slug.replace('/','#') ).offset().top - wpAdminBarHeight;
			var duration = Math.round( 500 * (Math.abs(Urb.$window.scrollTop() - targetOffset) / Urb.$window.height()) );
			
			//Urb.$body.animate(
			$('html,body').animate(
				{ scrollTop: targetOffset },
				duration
			);
			$currentPage.animate({height:0}, duration);
			setTimeout(function(){
				$currentPage.remove();
			}, duration + 250);
			return;
		}
		
		var targetOffset = $('.site-posts').offset().top + $('.site-posts').outerHeight();
		//var targetHasPadding = ($currentPage.innerHeight() - $currentPage.height()) > navBarWithAdminBarHeight;
		var duration = Math.round( 500 * (Math.abs(Urb.$window.scrollTop() - targetOffset) / Urb.$window.height()) );
		
		if($currentPage.length > 0) {
			//$currentPage.before($nextPage);
		} else {
			//$nextPage.insertAfter($('section'));
			//$('.site-posts').after($nextPage);
			$currentPage = $('<main class="page row around-xs" />');
			$('.site-posts').after($currentPage);
		}

		
		//$('> *', $currentPage).fadeOut(duration, function() {
			//$currentPage.prepend('<span class="loading">Loading</span>');
		//});
		//$nextPage.slideDown(duration);

		//$currentPage.slideUp(duration, function() {
		//	$currentPage.remove();
			$currentPage.append('<span class="loading-text"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>').addClass('loading');
			setTimeout(function(){
				$currentPage.animate({height:0},500);
			},duration);
		//});

		//Urb.$window.scrollTop( $currentPage.offset().top );
		//Urb.$body.animate(
		$('html,body').animate(
			{ scrollTop: targetOffset - wpAdminBarHeight },
			duration
		);

		$.ajax({
			type: 'POST',
			url: _URB.url,
			data: {
				'action': 'getmaincontent',
				'nonce': _URB.nonce,
				'slug': slug
			},
			dataType: 'json',
			success: function(response){
				if(response.success) {
					var $content = $(response.data);
					//$nextPage.replaceWith($content);
					$currentPage.replaceWith($content);
					Urb.$window.trigger('ajaxload');
					var timeout = 0;
					$('.page-header > *, .page-content > *, .page-footer > *, .post-header > *, .post-content > *, .post-footer > *', $content).each(function() {
						var $this = $(this);
						$this.hide();
						setTimeout(function(){
							$this.fadeIn(250);
						}, timeout);
						timeout += 213;
					});
				} else {
					console.log(response.data);
				}
			}
		});
	};

	Urb.performHistoryNavigation = function(e) {
		e.preventDefault();
		
		var state = e.state;
		var slug = document.location.pathname;

		Urb.loadPage(slug);
	};

	Urb.setupInternalLinks = function() {
		$('a').not('[href^="#"]')
			.not(':not([href^="http://' + window.location.host + '"]):not([href^="https://' + window.location.host + '"])')
			.each(function() {
				var $anchor = $(this);
				//if($anchor.closest('.menu-item').length == 1) {
				//	return;
				//}

				// Ignore WordPress navbar links
				if($anchor.closest($('#wpadminbar')).length > 0) {
					return;
				}

				$anchor.unbind('click').click(function(e) {
					if(window.history) {
						e.preventDefault();
					} else {
						return;
					}

					Urb.$menuToggle.toggleClass('open', false);
					Urb.$mainNavigation.toggleClass('open', false);

					var $this = $(this);
					var slug = $this.attr('href').replace(window.location.protocol + '//' + window.location.host, '');

					window.history.pushState({}, $this.text(), slug);
		
					Urb.loadPage(slug);

					$('body').trigger('click');
				});
			});
	};

	Urb.setupExternalLinks = function() {
		$('a[href^="http"]:not([href*="' + window.location.host + '"])').attr('target', '_blank');
	};

	Urb.setupFragmentAnchors = function() {
		Urb.$document.on('click', 'a[href^="#"]', function(e) {
			e.preventDefault();

			var fragmentIdentifier = $.attr(this, 'href');
			var targetOffset = 0;
			var $fragment = $(fragmentIdentifier);
			if(fragmentIdentifier !== '#' && $fragment.length !== 0) {
				targetOffset = $fragment.offset().top;
			} else {
				fragmentIdentifier = '/';
			}

//			if(window.history){
//				window.history.pushState({}, $(this).text(), fragmentIdentifier.replace('#','/'));
//			}

			//var targetHasPadding = ($fragment.innerHeight() - $fragment.height()) > navBarWithAdminBarHeight;

			//Urb.$body.animate(
			$('html,body').animate(
				{ scrollTop: Math.ceil(targetOffset - wpAdminBarHeight/*(targetHasPadding ? 0 : navBarWithAdminBarHeight * 1.5)*/ ) },
				Math.round( 500 * (Math.abs(Urb.$window.scrollTop() - targetOffset) / Urb.$window.height()) )
			);

			return false;
		});
	};

	Urb.setupPageNavigation = function() {
		// After clicking a menu item, automatically lose :focus styles
		Urb.$pageNavigation.find('.menu-item a').click(function() {
			var $this = $(this);
			$this.blur();
			/*
			if(window.history){
				var slug = $this.attr('href').replace('#', '');
				
				window.history.pushState({}, $this.text(), slug);
			}
			*/
		});

		Urb.$menuToggle = $('#menu-toggle');//$('<div id="menu-toggle"><div id="hamburger"><span></span><span></span><span></span></div><div id="cross"><span></span><span></span></div></div>');
		Urb.$menuToggle.on('click', function() {
			var targetPosition = false;

			if(Urb.scrollPosition > 0 ) {
				if( Urb.scrollPosition < Urb.$window.height() / 2 ) {
					targetPosition = 0;
				} else if( Urb.scrollPosition < Urb.$window.height() ) {
					targetPosition = Urb.$window.height();
				}
			}

			if( targetPosition !== false ) {
				$('html,body').animate(
					{
						scrollTop: targetPosition - wpAdminBarHeight
					},
					{
						duration: 250,
						easing: 'swing'
					}
				).promise()
				.done( function () {
					Urb.$menuToggle.toggleClass('open');
					Urb.$mainNavigation.toggleClass('open');
				});
			} else {
				Urb.$menuToggle.toggleClass('open');
				Urb.$mainNavigation.toggleClass('open');
			}
		});
		//Urb.$pageNavigation.find('.main-menu [href="#main-menu"]').replaceWith(Urb.$menuToggle);
	};

	var windowHeightMinusWPHeaderHeight = Urb.$window.height() - Urb.$pageNavigation.outerHeight() - wpAdminBarHeight;
	Urb.scrollPageNavigation = function() {
		if(Urb.scrollPosition >= windowHeightMinusWPHeaderHeight) {
			Urb.$siteNavigation.addClass('stuck-top');
		} else {
			Urb.$siteNavigation.removeClass('stuck-top');
		}
		/*
		if(Urb.scrollPosition < windowHeightMinusWPHeaderHeight) {
			Urb.$mainNavigation.removeClass('stuck-top').css({
				'bottom': 'auto',
				'top': (Urb.$window.height() - Urb.$mainNavigation.outerHeight() - Urb.scrollPosition).toFixed(2) + 'px',
			});
		} else {
			Urb.$mainNavigation.addClass('stuck-top');
		}
		*/
		Urb.highlightCurrentSection();
	};

	Urb.scrollSocialNavigation = function() {
		if(Urb.$socialNavigation.is(':visible')) {
			if( Urb.scrollPosition > Urb.$window.height() ) {
				Urb.$socialNavigation.addClass('hidden');
			} else {
				Urb.$socialNavigation.css({
					'opacity'    : (1 - Urb.scrollPosition / (Urb.$window.height() / 15)).toFixed(2),
					'margin-top' : (-1 * Urb.scrollPosition / 5).toFixed() + 'px',
					'transform'  : 'scale(' + (1 - 0.2 * Urb.scrollPosition / (Urb.$window.height() / 5)).toFixed(2) + ')'
				});
			}
		} else if( Urb.scrollPosition < Urb.$window.height() ) {
			Urb.$socialNavigation.removeClass('hidden');
		}
	};

	Urb.scrollToContent = function() {
		if( !Urb.$body.hasClass('home') && Urb.$window.scrollTop() == 0 ) {
			Urb.$window.scrollTop( $('main').offset().top - wpAdminBarHeight );
		} else if( location.hash ) {
			var $anchor = $(location.hash);
			var anchorProximityThreshold = 5; // pixels

			if( Urb.$window.scrollTop() > $anchor.offset().top - (navBarWithAdminBarHeight + anchorProximityThreshold)
			 && Urb.$window.scrollTop() < $anchor.offset().top + anchorProximityThreshold )
			{
				Urb.$window.scrollTop( $anchor.offset().top - navBarWithAdminBarHeight );
			}
		}
	};

	// Fix for scroll flicker on history navigation [http://stackoverflow.com/a/33004917/1028949]
	if ('scrollRestoration' in history) {
		history.scrollRestoration = 'manual';
	}

	Urb.$window.on('ajaxload load', Urb.setupExternalLinks);
	Urb.$window.on('load', Urb.setupFragmentAnchors);
	Urb.$window.on('ajaxload load', Urb.setupInternalLinks);
	Urb.$window.on('load', Urb.setupPageNavigation);
	Urb.$window.on('load scroll', Urb.scrollPageNavigation);
	Urb.$window.on('load scroll', Urb.scrollSocialNavigation);
	Urb.$window.on('load', function() { setTimeout(Urb.scrollToContent, 1); }); // TODO: figure out why setTimeout has to be used here
	Urb.$window.on('popstate', Urb.performHistoryNavigation);
} );