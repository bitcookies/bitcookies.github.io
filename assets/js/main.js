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
	let lightstyle = ":root {--body-color: #f4f4f4;--text-color: #646464;--b-h-color: #3c3b3b;--button-color: #3c3b3b;--label-color: #3c3b3b;--select-color: #3c3b3b;--input-bg: #3c3b3b;--mini-post-bg: #fff;--post-bg: #fff;--post-header-color: #3c3b3b;--table-th-color: #3c3b3b;--header-bg-color: #fff;--menu-bg: #fff;--scrollbar-color: #fff;--scrollbar-bg-color: #fff;--scrollbar-solid: #f0f4f5;--progress-wrap-content: url('data:image/svg+xml;base64,PHN2ZyB0PSIxNjI3NzEzNjI3MzEzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5OTUiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PHBhdGggZD0iTTg3Ny4yMTYgNDkxLjgwOCIgcC1pZD0iMTk5NiIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjxwYXRoIGQ9Ik02OTQuNjg4IDQ1Ny43NmwtMTU5LjM2LTE2MS4xMmMtOS40MDgtOS41MzYtMjMuMjk2LTExLjkwNC0zNC45NzYtNy4xNjgtMC43MzYgMC4yODgtMS4zMTIgMC45OTItMi4wMTYgMS4zNDQtMi45NzYgMS40NzItNS45ODQgMy4wNzItOC40OCA1LjU2OC0wLjAzMiAwLjAzMi0wLjAzMiAwLjA2NC0wLjA2NCAwLjA5Ni0wLjAzMiAwLjAzMi0wLjA2NCAwLjAzMi0wLjA5NiAwLjA2NGwtMTYwLjIyNCAxNTkuNzc2Yy0xMi41NzYgMTIuNTQ0LTEyLjYwOCAzMi44OTYtMC4wNjQgNDUuNTA0IDYuMjcyIDYuMzA0IDE0LjU2IDkuNDcyIDIyLjc4NCA5LjQ3MiA4LjIyNCAwIDE2LjQ0OC0zLjEwNCAyMi43Mi05LjM3NmwxMDQuMTkyLTEwMy44NzIgMCAzMDYuNzJjMCAxNy43OTIgMTQuNCAzMi4xOTIgMzIuMTYgMzIuMTkyIDE3Ljc2IDAgMzIuMTkyLTE0LjQgMzIuMTkyLTMyLjE5MmwwLTMwOC40MTYgMTA1LjUzNiAxMDYuNjg4YzYuMjcyIDYuMzY4IDE0LjU2IDkuNTY4IDIyLjg4IDkuNTY4IDguMTYgMCAxNi4zNTItMy4wNzIgMjIuNjI0LTkuMzEyQzcwNy4wNzIgNDkwLjc4NCA3MDcuMiA0NzAuNCA2OTQuNjg4IDQ1Ny43Nkw2OTQuNjg4IDQ1Ny43NnpNOTk1LjI2NCA1OTkuMiIgcC1pZD0iMTk5NyIgZmlsbD0iIzVBNDEzMSIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC43NzgxMDY5LjAuaTAiIGNsYXNzPSJzZWxlY3RlZCI+PC9wYXRoPjwvc3ZnPg==');}";
	let darkstyle = ":root {--body-color: #252526;--text-color: #fff;--b-h-color: #efefef;--button-color: #efefef;--label-color: #efefef;--select-color: #efefef;--input-bg: #efefef;--mini-post-bg: #111;--post-bg: #1E1E1E;--post-header-color: #efefef;--table-th-color: #efefef;--header-bg-color: #111;--menu-bg: #1e1e1e;--scrollbar-color: #111;--scrollbar-bg-color: #252526;--scrollbar-solid: #111;--progress-wrap-content: url('data:image/svg+xml;base64,PHN2ZyB0PSIxNjI3NzEzNjI3MzEzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5OTUiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PHBhdGggZD0iTTg3Ny4yMTYgNDkxLjgwOCIgcC1pZD0iMTk5NiIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjxwYXRoIGQ9Ik02OTQuNjg4IDQ1Ny43NmwtMTU5LjM2LTE2MS4xMmMtOS40MDgtOS41MzYtMjMuMjk2LTExLjkwNC0zNC45NzYtNy4xNjgtMC43MzYgMC4yODgtMS4zMTIgMC45OTItMi4wMTYgMS4zNDQtMi45NzYgMS40NzItNS45ODQgMy4wNzItOC40OCA1LjU2OC0wLjAzMiAwLjAzMi0wLjAzMiAwLjA2NC0wLjA2NCAwLjA5Ni0wLjAzMiAwLjAzMi0wLjA2NCAwLjAzMi0wLjA5NiAwLjA2NGwtMTYwLjIyNCAxNTkuNzc2Yy0xMi41NzYgMTIuNTQ0LTEyLjYwOCAzMi44OTYtMC4wNjQgNDUuNTA0IDYuMjcyIDYuMzA0IDE0LjU2IDkuNDcyIDIyLjc4NCA5LjQ3MiA4LjIyNCAwIDE2LjQ0OC0zLjEwNCAyMi43Mi05LjM3NmwxMDQuMTkyLTEwMy44NzIgMCAzMDYuNzJjMCAxNy43OTIgMTQuNCAzMi4xOTIgMzIuMTYgMzIuMTkyIDE3Ljc2IDAgMzIuMTkyLTE0LjQgMzIuMTkyLTMyLjE5MmwwLTMwOC40MTYgMTA1LjUzNiAxMDYuNjg4YzYuMjcyIDYuMzY4IDE0LjU2IDkuNTY4IDIyLjg4IDkuNTY4IDguMTYgMCAxNi4zNTItMy4wNzIgMjIuNjI0LTkuMzEyQzcwNy4wNzIgNDkwLjc4NCA3MDcuMiA0NzAuNCA2OTQuNjg4IDQ1Ny43Nkw2OTQuNjg4IDQ1Ny43NnpNOTk1LjI2NCA1OTkuMiIgcC1pZD0iMTk5NyIgZmlsbD0iI2ZmZiIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC43NzgxMDY5LjAuaTAiIGNsYXNzPSJzZWxlY3RlZCI+PC9wYXRoPjwvc3ZnPg==');}";
	var checked = localStorage.getItem("theme");

	if (checked == "light") {
		localStorage.setItem("theme", "dark");
		document.getElementById("loader").className = "loader-dark";
		document.getElementById("theme").className = "icon solid fa-toggle-on";
		document.getElementById("switch-theme-color").innerHTML = darkstyle;
	} else if (checked == "dark") {
		localStorage.setItem("theme", "light");
		document.getElementById("loader").className = "loader";
		document.getElementById("theme").className = "icon solid fa-toggle-off";
		document.getElementById("switch-theme-color").innerHTML = lightstyle;
	} else {
		localStorage.setItem("theme", "dark");
		document.getElementById("loader").className = "loader-dark";
		document.getElementById("theme").className = "icon solid fa-toggle-on";
		document.getElementById("switch-theme-color").innerHTML = darkstyle;
	}
}

// footerYeaer
document.getElementById('footerYear').innerHTML = new Date().getFullYear() + '';