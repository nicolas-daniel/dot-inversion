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
	p.colors = {white: 0xF0F0F0, indigo: 0x3F51B5};
	
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
		p.stage = new PIXI.Stage(p.colors.white, true);
		p.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {antialias: true});
		p.renderer.view.id = "canvas";
		document.body.appendChild(p.renderer.view);

		p.dotContainer = new PIXI.DisplayObjectContainer();
		p.dotContainer.x = window.innerWidth/2;
		p.dotContainer.y = window.innerHeight/2;
		p.stage.addChild(p.dotContainer);

		p.dot = new PIXI.Graphics();
		p.dot.beginFill(p.colors.indigo, 1);
		p.dot.drawCircle(0, 0, 25);
		p.dotContainer.addChild(p.dot);

		p.initTimeline();
		p.tl.play();
		
		requestAnimFrame(p.animate);
	};

	/**
	 * Timeline initialization
	 */
	p.initTimeline = function() {
		p.tl = new TimelineMax({paused:true, delay: 1, repeat: -1});
		p.tl.to(p.dot.position, 1, {x: 25*20, ease: Expo.easeIn});
		p.tl.to(p.dot.scale, 0.5, {x: 20, y: 20, ease: Expo.easeIn}, 0.5);
		p.tl.set(p.dot.position, {x: -(p.dot.width*20)/2, ease: Expo.ease});
		p.tl.to(p.dot.scale, 0.5, {x: 1, y: 1, ease: Expo.easeOut}, 1);
		p.tl.to(p.dot.position, 1, {x: 0, ease: Expo.easeOut}, 1);
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