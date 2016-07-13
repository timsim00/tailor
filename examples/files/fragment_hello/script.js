define (['word'], function (word) {
		return function initFragment (element) {
				element.className += ' fragment-hello-initialised';
				element.innerHTML += word;
		};
});
