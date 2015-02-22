document.addEventListener('DOMContentLoaded', function() {
	var App = function() {};
	var p = App.prototype;
	
	// ------------------------------
	// @function init()
	// ------------------------------
	p.init = function() {
		console.log('%c Hi developers! %c  http://nicolasdaniel.fr  ', 'background: #121212; color: #fff;', 'background: #EEEEEE; color: #121212;');
		
		p.dot = new Dot();
	};

	window.app = new App();
	app.init();
})