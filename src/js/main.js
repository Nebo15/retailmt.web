$(function() {
	'use strict';

	// Selectors
	var $window = $(window);
	var $sections = $('.section');
	var $navs = $('.scrollhelp');
	var $nav_prev = $navs.filter('.scrollhelp-prev');
	var $nav_next = $navs.filter('.scrollhelp-next');
	var $first_section = $sections.first();
	var $last_section = $sections.last();
	var $container_fixed = $sections.find('.container-fixed');

	var userAgent = window.navigator.userAgent;
	var isMobile = userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i);

	// Params
	var section_height = $first_section.height();
	var first_section_offset = 0;
	var last_section_offset = $last_section.offset().top;

	// Offset top calculating only once
	var windowScrollTop = $window.pageYOffset || $window.scrollTop();
	function updateWindowScrollTop() {
		windowScrollTop = $window.pageYOffset || $window.scrollTop();
	}

	// Methods
	function rescaleSections() {
		section_height = $first_section.outerHeight();
		first_section_offset = 0;
		last_section_offset = $last_section.offset().top;

		$container_fixed.each(function() {
			var $this = $(this);
			$this.data('parent-offset-top', $this.parent().offset().top);
			$this.data('parent-offset-bottom', $this.parent().offset().top + $this.parent().height());
		});
	}

	function getCurrentSection(viewport_offset) {
		var offset = windowScrollTop + (viewport_offset ? viewport_offset : 0);
		var section;
		$sections.each(function() {
			var $this = $(this);
			if($this.offset().top > offset) {
				return false;
			}
			section = $this;
		});
		return section;
	}

	function getSectionId(section) {
		var $section = $(section);
		var section_classes = $section.attr('class').split(' ');
		for (var i = 0; i < section_classes.length; i++) {
			var matches = /^slide(.+)/.exec(section_classes[i]);
			if (matches !== null) {
				return matches[1];
			}
		}
	}

	function scrollSpy() {
		updateWindowScrollTop();

		// Scrollspy
		(function() {
			// Top nav element
			var nav_prev_offset = section_height > windowScrollTop ? section_height - windowScrollTop : 0;
			$nav_prev.css('top', nav_prev_offset + 'px');

			var nav_prev_opacity = section_height > windowScrollTop ? windowScrollTop/section_height : 1;
			if(nav_prev_opacity >= 1) {
				$nav_prev.addClass('fixed');
				$nav_prev.css('opacity', '');
			} else {
				$nav_prev.removeClass('fixed');
				$nav_prev.css('opacity', nav_prev_opacity);
			}

			// Bottom nav element
			var nav_next_offset = last_section_offset - section_height - windowScrollTop;
			if(nav_next_offset >= 0) {
				$nav_next.css('bottom', 0);
			} else {
				$nav_next.css('bottom', -1 * nav_next_offset + 'px');
			}

			var nav_next_opacity = 1 + nav_next_offset / section_height;
			if(nav_next_opacity >= 1) {
				$nav_next.addClass('fixed');
				$nav_next.css('opacity', '');
			} else if(nav_next_opacity >= 0) {
				$nav_next.removeClass('fixed');
				$nav_next.css('opacity', nav_next_opacity);
			} else {
				$nav_next.removeClass('fixed');
				$nav_next.css('opacity', 0);
			}

			var current_section = getCurrentSection(60);
			if(current_section && current_section.length > 0) {
				$('.menu-list__item').filter(':has(a[href=#slide' + getSectionId(current_section) + '])').each(function() {
					var $this = $(this);
					if(!$this.hasClass('active')) {
						$('.menu-list__item').removeClass('active');
						$this.addClass('active');
					}
				});
			}
		})();

		// Main page animation
		(function() {
			$container_fixed.each(function() {
				var $this = $(this);
				var clip_top, clip_bottom;
				clip_bottom   = $this.data('parent-offset-bottom') - windowScrollTop;

				if($this.parent().is($first_section)) {
					clip_top = 0;
				} else {
					clip_top = $this.data('parent-offset-top') - windowScrollTop;
					if(clip_top < 0) {
						clip_top = 0;
					}

					if(clip_top > section_height) {
						clip_top = section_height;
					}
				}

				if($this.parent().is($last_section)) {
					clip_bottom = section_height;
				} else {
					if(clip_bottom < 0) {
						clip_bottom = 0;
					}

					if(clip_bottom > section_height) {
						clip_bottom = section_height;
					}
				}

				$this.css({
					'clip': 'rect(' + clip_top + 'px auto ' + clip_bottom + 'px 0px)'
				});
			});
		})();
	}

	function scrollToOffset(offset) {
		$('body,html').stop(true, false).animate({scrollTop: offset + 'px'}, 800);
	}

	function scrollToSection(section) {
		scrollToOffset($(section).offset().top);
	}

	// Fix widths
	rescaleSections();
	$window.resize(rescaleSections);
	$window.load(rescaleSections);

	// Scroll spy
	(function() {
		$(window).load(function() {
			if($window.scrollTop() === 0) {
				scrollToOffset(20);
			}
		});

		if(isMobile) {
			$nav_prev.add($nav_next).remove();
			$sections.css('background-attachment', 'scroll');
		} else {
			// Init animations
			(function() {
				$container_fixed.css({
					'position': 'fixed',
					'top': 0
				});
				$sections.css({
					'position': 'static'
				});
			})();

			// Navigation
			(function() {
				$nav_prev.find('.scrollhelp-btn').click(function() {
					var prev_section = getCurrentSection($window.height()/2).prev('.section');
					var prev_section_offset = prev_section.length > 0 ? prev_section.offset().top : first_section_offset;
					scrollToOffset(prev_section_offset);
				});

				$nav_next.find('.scrollhelp-btn').click(function() {
					var next_section = getCurrentSection().next('.section');
					var next_section_offset = next_section.length > 0 ? next_section.offset().top : last_section_offset;
					scrollToOffset(next_section_offset);
				});

				$(window).keydown(function(event) {
					if (event.which == 38) {
						event.preventDefault();
						$nav_prev.find('.scrollhelp-btn').click();
					} else if (event.which == 40 || event.which == 40 || event.which == 32) {
						event.preventDefault();
						$nav_next.find('.scrollhelp-btn').click();
					} else if (event.which == 37) {
						scrollToOffset(0);
					} else if (event.which == 39) {
						event.preventDefault();
						scrollToOffset(last_section_offset);
					}
				});
			})();

			$nav_prev.css({
				'top': section_height + 'px',
				'opacity': 0
			});

			setTimeout(function() {
				scrollSpy();
				// Fix weird bug
				$window.scrollTop(windowScrollTop+2);
				setTimeout(function() {
					$window.scrollTop(windowScrollTop);
				}, 30);
			}, 30);
			$window.load(scrollSpy);
			$window.scroll(scrollSpy);
			$window.resize(scrollSpy);
		}
	})();

	// Menu
	(function() {
		$('.menu-list__item').click(function(event) {
			event.preventDefault();
			scrollToSection($(this).find('a').attr('href'));
		});
	})();
});
