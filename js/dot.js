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
	p.iteration = 0;
	
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

		p.initBackground();
		p.initDot();
		p.initTimeline();
		p.tl.play();
		
		requestAnimFrame(p.animate);
	};

	/**
	 * Dot initialization
	 */
	p.initDot = function() {
		p.dotContainer = new PIXI.DisplayObjectContainer();
		p.dotContainer.x = window.innerWidth/2;
		p.dotContainer.y = window.innerHeight/2;
		p.stage.addChild(p.dotContainer);

		p.dot = new PIXI.Graphics();
		p.dot.beginFill(p.colors.indigo, 1);
		p.dot.drawCircle(0, 0, 25);
		p.dotContainer.addChild(p.dot);
	};

	/**
	 * Background sides initialization
	 */
	p.initBackground = function() {
		p.sideContainer = new PIXI.DisplayObjectContainer();
		p.stage.addChild(p.sideContainer);

		p.sideLeft = new PIXI.Graphics();
		p.sideLeft.beginFill(p.colors.white, 1);
		p.sideLeft.drawRect(0, 0, window.innerWidth/2, window.innerHeight);
		p.sideContainer.addChild(p.sideLeft);

		p.sideRight = new PIXI.Graphics();
		p.sideRight.beginFill(p.colors.white, 1);
		p.sideRight.drawRect(window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight);
		p.sideContainer.addChild(p.sideRight);
	};

	/**
	 * Timeline initialization
	 */
	p.initTimeline = function() {
		p.tl = new TimelineMax({paused:true, delay: 1, repeat: -1, onRepeat: onAnimationRepeat});
		p.tl.to(p.dot.position, 1, {x: 25*20, ease: Expo.easeIn});
		p.tl.to(p.dot.scale, 0.5, {x: 20, y: 20, ease: Expo.easeIn, onComplete: changeSideRightColor}, 0.5);
		p.tl.set(p.dot.position, {x: -(p.dot.width*20)/2, ease: Expo.ease, onComplete: changeColors});
		p.tl.to(p.dot.scale, 0.5, {x: 1, y: 1, ease: Expo.easeOut}, 1);
		p.tl.to(p.dot.position, 1, {x: 0, ease: Expo.easeOut}, 1);

		function changeSideRightColor() {
			if ( p.iteration%2 == 0 ) {
				p.sideRight.clear();
				p.sideRight.beginFill(p.colors.indigo, 1);
				p.sideRight.drawRect(window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight);
				p.sideContainer.addChild(p.sideRight);
			} else {
				p.sideRight.clear();
				p.sideRight.beginFill(p.colors.white, 1);
				p.sideRight.drawRect(window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight);
				p.sideContainer.addChild(p.sideRight);
			}
		}

		function changeColors() {
			if ( p.iteration%2 == 0 ) {
				p.dot.clear();
				p.dot.beginFill(0xF0F0F0, 1);
				p.dot.drawCircle(0, 0, 25);
				p.dotContainer.addChild(p.dot);

				p.sideLeft.clear();
				p.sideLeft.beginFill(0x3F51B5, 1);
				p.sideLeft.drawRect(0, 0, window.innerWidth/2, window.innerHeight);
				p.sideContainer.addChild(p.sideLeft);
			} else {
				p.dot.clear();
				p.dot.beginFill(0x3F51B5, 1);
				p.dot.drawCircle(0, 0, 25);
				p.dotContainer.addChild(p.dot);

				p.sideLeft.clear();
				p.sideLeft.beginFill(0xF0F0F0, 1);
				p.sideLeft.drawRect(0, 0, window.innerWidth/2, window.innerHeight);
				p.sideContainer.addChild(p.sideLeft);
			}
		}

		function onAnimationRepeat() {
			p.iteration++;
		}
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