(function() {
	'use strict';

	var Dot = function() { this.init(); };
	var p = Dot.prototype;

	/**
	 * DOM elements
	 */

	/**
	 * Parameters
	 */
	
	/**
	 * Initialisation
	 */
	p.init = function() {
		p.initPixi();
	};

	/**
	 * Initialisation of pixi
	 */
	p.initPixi = function() {
		p.stage = new PIXI.Stage(0xF0F0F0, true);
		p.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {antialias: true});
		p.renderer.view.id = "canvas";
		document.body.appendChild(p.renderer.view);
		
		requestAnimFrame(p.animate);
	};

	/**
	 * Animate
	 */
	p.animate = function() {
		requestAnimFrame(p.animate);

		p.renderer.render(p.stage);
	};

	window.Dot = Dot;
})();