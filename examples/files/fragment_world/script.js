define (['word'], function (word) {
		return function initFragment (element) {
				element.className += ' fragment-world-initialised';
				element.innerHTML += 'is '+word;
		};
});
