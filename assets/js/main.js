(function ($) {

	var $window = $(window),
		$body = $('body'),
		$menu = $('#menu'),
		$sidebar = $('#sidebar'),
		$main = $('#main');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Menu.
	$menu
		.appendTo($body)
		.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'right',
			target: $body,
			visibleClass: 'is-menu-visible'
		});

	// Search (header).
	var $search = $('#search'),
		$search_input = $search.find('input');

	$body
		.on('click', '[href="#search"]', function (event) {

			event.preventDefault();

			// Not visible?
			if (!$search.hasClass('visible')) {

				// Reset form.
				$search[0].reset();

				// Show.
				$search.addClass('visible');

				// Focus input.
				$search_input.focus();

			}

		});

	$search_input
		.on('keydown', function (event) {

			if (event.keyCode == 27)
				$search_input.blur();

		})
		.on('blur', function () {
			window.setTimeout(function () {
				$search.removeClass('visible');
			}, 100);
		});

	// Intro.
	var $intro = $('#intro');

	// Move to main on <=large, back to sidebar on >large.
	breakpoints.on('<=large', function () {
		$intro.prependTo($main);
	});

	breakpoints.on('>large', function () {
		$intro.prependTo($sidebar);
	});

})(jQuery);

// Move2Top
(function ($) {
	$(document).ready(function () {
		"use strict";
		var progressPath = document.querySelector('.progress-wrap path');
		var pathLength = progressPath.getTotalLength();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
		progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
		progressPath.style.strokeDashoffset = pathLength;
		progressPath.getBoundingClientRect();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
		var updateProgress = function () {
			var scroll = $(window).scrollTop();
			var height = $(document).height() - $(window).height();
			var progress = pathLength - (scroll * pathLength / height);
			progressPath.style.strokeDashoffset = progress;
		}
		updateProgress();
		$(window).scroll(updateProgress);
		var offset = 50;
		var duration = 550;
		jQuery(window).on('scroll', function () {
			if (jQuery(this).scrollTop() > offset) {
				jQuery('.progress-wrap').addClass('active-progress');
			} else {
				jQuery('.progress-wrap').removeClass('active-progress');
			}
		});
		jQuery('.progress-wrap').on('click', function (event) {
			event.preventDefault();
			jQuery('html, body').animate({ scrollTop: 0 }, duration);
			return false;
		})
	});
})(jQuery);

// saveDarkMode
function saveDarkMode() {
	if (!window.BCTheme || typeof window.BCTheme.applyTheme !== 'function') {
		return;
	}

	var currentTheme = window.BCTheme.getStoredTheme() || window.BCTheme.getPreferredTheme();
	var nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
	window.BCTheme.applyTheme(nextTheme, { persist: true });
}

// footerYeaer
document.getElementById('footerYear').innerHTML = new Date().getFullYear() + '';
