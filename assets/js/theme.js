(function () {
	var STORAGE_KEY = 'theme';

	var DEFAULT_THEME_STYLES = {

		light: `
		:root {
			--theme-color: #B98A5A;
			--theme-color-pale: #FCDBB6;
			--body-color: #F4F4F4;
			--text-color: #646464;
			--text-color-select: #333333;
			--b-h-color: #3C3B3B;
			--button-color: #3C3B3B;
			--label-color: #3C3B3B;
			--select-color: #3C3B3B;
			--input-bg: #3C3B3B;
			--mini-post-bg: #FFFFFF;
			--post-bg: #FFFFFF;
			--post-header-color: #3C3B3B;
			--table-th-color: #3C3B3B;
			--header-bg-color: #FFFFFF80;
			--menu-bg: #FFFFFF;
			--scrollbar-color: #FFFFFF;
			--scrollbar-bg-color: #FFFFFF;
			--scrollbar-solid: #F0F4F5;
			--progress-wrap-content: url('data:image/svg+xml;base64,PHN2ZyB0PSIxNjI3NzEzNjI3MzEzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5OTUiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PHBhdGggZD0iTTg3Ny4yMTYgNDkxLjgwOCIgcC1pZD0iMTk5NiIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjxwYXRoIGQ9Ik02OTQuNjg4IDQ1Ny43NmwtMTU5LjM2LTE2MS4xMmMtOS40MDgtOS41MzYtMjMuMjk2LTExLjkwNC0zNC45NzYtNy4xNjgtMC43MzYgMC4yODgtMS4zMTIgMC45OTItMi4wMTYgMS4zNDQtMi45NzYgMS40NzItNS45ODQgMy4wNzItOC40OCA1LjU2OC0wLjAzMiAwLjAzMi0wLjAzMiAwLjA2NC0wLjA2NCAwLjA5Ni0wLjAzMiAwLjAzMi0wLjA2NCAwLjAzMi0wLjA5NiAwLjA2NGwtMTYwLjIyNCAxNTkuNzc2Yy0xMi41NzYgMTIuNTQ0LTEyLjYwOCAzMi44OTYtMC4wNjQgNDUuNTA0IDYuMjcyIDYuMzA0IDE0LjU2IDkuNDcyIDIyLjc4NCA5LjQ3MiA4LjIyNCAwIDE2LjQ0OC0zLjEwNCAyMi43Mi05LjM3NmwxMDQuMTkyLTEwMy44NzIgMCAzMDYuNzJjMCAxNy43OTIgMTQuNCAzMi4xOTIgMzIuMTYgMzIuMTkyIDE3Ljc2IDAgMzIuMTkyLTE0LjQgMzIuMTkyLTMyLjE5MmwwLTMwOC40MTYgMTA1LjUzNiAxMDYuNjg4YzYuMjcyIDYuMzY4IDE0LjU2IDkuNTY4IDIyLjg4IDkuNTY4IDguMTYgMCAxNi4zNTItMy4wNzIgMjIuNjI0LTkuMzEyQzcwNy4wNzIgNDkwLjc4NCA3MDcuMiA0NzAuNCA2OTQuNjg4IDQ1Ny43Nkw2OTQuNjg4IDQ1Ny43NnpNOTk1LjI2NCA1OTkuMiIgcC1pZD0iMTk5NyIgZmlsbD0iIzVBNDEzMSIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC43NzgxMDY5LjAuaTAiIGNsYXNzPSJzZWxlY3RlZCI+PC9wYXRoPjwvc3ZnPg==');
		}`,

		dark: `
		:root {
			--theme-color: #FCDBB6;
			--theme-color-pale: #B98A5A;
			--body-color: #252526;
			--text-color: #999999;
			--text-color-select: #BBBBBB;
			--b-h-color: #EFEFEF;
			--button-color: #EFEFEF;
			--label-color: #EFEFEF;
			--select-color: #EFEFEF;
			--input-bg: #EFEFEF;
			--mini-post-bg: #1E1E1E;
			--post-bg: #1E1E1E;
			--post-header-color: #EFEFEF;
			--table-th-color: #EFEFEF;
			--header-bg-color: #1E1E1EB0;
			--menu-bg: #1E1E1E;
			--scrollbar-color: #1E1E1E;
			--scrollbar-bg-color: #1E1E1E;
			--scrollbar-solid: #111;
			--progress-wrap-content: url('data:image/svg+xml;base64,PHN2ZyB0PSIxNjI3NzEzNjI3MzEzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5OTUiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PHBhdGggZD0iTTg3Ny4yMTYgNDkxLjgwOCIgcC1pZD0iMTk5NiIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjxwYXRoIGQ9Ik02OTQuNjg4IDQ1Ny43NmwtMTU5LjM2LTE2MS4xMmMtOS40MDgtOS41MzYtMjMuMjk2LTExLjkwNC0zNC45NzYtNy4xNjgtMC43MzYgMC4yODgtMS4zMTIgMC45OTItMi4wMTYgMS4zNDQtMi45NzYgMS40NzItNS45ODQgMy4wNzItOC40OCA1LjU2OC0wLjAzMiAwLjAzMi0wLjAzMiAwLjA2NC0wLjA2NCAwLjA5Ni0wLjAzMiAwLjAzMi0wLjA2NCAwLjAzMi0wLjA5NiAwLjA2NGwtMTYwLjIyNCAxNTkuNzc2Yy0xMi41NzYgMTIuNTQ0LTEyLjYwOCAzMi44OTYtMC4wNjQgNDUuNTA0IDYuMjcyIDYuMzA0IDE0LjU2IDkuNDcyIDIyLjc4NCA5LjQ3MiA4LjIyNCAwIDE2LjQ0OC0zLjEwNCAyMi43Mi05LjM3NmwxMDQuMTkyLTEwMy44NzIgMCAzMDYuNzJjMCAxNy43OTIgMTQuNCAzMi4xOTIgMzIuMTYgMzIuMTkyIDE3Ljc2IDAgMzIuMTkyLTE0LjQgMzIuMTkyLTMyLjE5MmwwLTMwOC40MTYgMTA1LjUzNiAxMDYuNjg4YzYuMjcyIDYuMzY4IDE0LjU2IDkuNTY4IDIyLjg4IDkuNTY4IDguMTYgMCAxNi4zNTItMy4wNzIgMjIuNjI0LTkuMzEyQzcwNy4wNzIgNDkwLjc4NCA3MDcuMiA0NzAuNCA2OTQuNjg4IDQ1Ny43Nkw2OTQuNjg4IDQ1Ny43NnpNOTk1LjI2NCA1OTkuMiIgcC1pZD0iMTk5NyIgZmlsbD0iI2ZmZiIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC43NzgxMDY5LjAuaTAiIGNsYXNzPSJzZWxlY3RlZCI+PC9wYXRoPjwvc3ZnPg==');
		}`

	};

	function normalizeTheme(theme) {
		return theme === 'light' || theme === 'dark' ? theme : null;
	}

	function getStoredTheme() {
		try {
			return normalizeTheme(localStorage.getItem(STORAGE_KEY));
		} catch (err) {
			return null;
		}
	}

	function getPreferredTheme() {
		var storedTheme = getStoredTheme();
		if (storedTheme) {
			return storedTheme;
		}

		return 'dark';
	}

	function getThemeStyles() {
		var customStyles = window.BC_THEME_STYLES;
		if (customStyles && customStyles.light && customStyles.dark) {
			return customStyles;
		}
		return DEFAULT_THEME_STYLES;
	}

	function applyTheme(theme, options) {
		var normalizedTheme = normalizeTheme(theme) || getPreferredTheme();
		var opts = options || {};
		var styles = getThemeStyles();

		if (opts.persist) {
			try {
				localStorage.setItem(STORAGE_KEY, normalizedTheme);
			} catch (err) {
				// Ignore localStorage failures.
			}
		}

		var loader = document.getElementById('loader');
		if (loader) {
			loader.className = normalizedTheme === 'dark' ? 'loader-dark' : 'loader';
		}

		var themeToggle = document.getElementById('theme');
		if (themeToggle) {
			themeToggle.className = normalizedTheme === 'dark'
				? 'icon solid fa-toggle-on'
				: 'icon solid fa-toggle-off';
		}

		var styleElement = document.getElementById('switch-theme-color');
		if (styleElement && styles[normalizedTheme]) {
			if (normalizedTheme === 'light') {
				styleElement.textContent = styles.light;
			} else {
				styleElement.textContent = styles.dark;
			}
		}

		return normalizedTheme;
	}

	function bcLoading() {
		var storedTheme = getStoredTheme();
		if (storedTheme === 'light') {
			applyTheme('light', { persist: false });
		}
	}

	function bcOnLoad() {
		var loader = document.getElementById('loader');
		if (!loader) {
			return;
		}

		setTimeout(function () {
			if (window.jQuery && typeof window.jQuery.fn.fadeOut === 'function') {
				window.jQuery(loader).fadeOut('slow');
				return;
			}

			loader.style.transition = 'opacity 0.3s ease';
			loader.style.opacity = '0';
			setTimeout(function () {
				if (loader.parentNode) {
					loader.parentNode.removeChild(loader);
				}
			}, 300);
		}, 1000);
	}

	window.BCTheme = {
		applyTheme: applyTheme,
		getPreferredTheme: getPreferredTheme,
		getStoredTheme: getStoredTheme
	};

	window.bcLoading = bcLoading;
	window.bcOnLoad = bcOnLoad;

})();