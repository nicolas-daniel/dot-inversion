(function() {
	'use strict';

	var Dot = function() { this.init(); };
	var p = Dot.prototype;

	/**
	 * DOM elements
	 */
	p._left = null;
	p._top = null;
	p._right = null;
	p._bottom = null;
	p._currentArrow = null;

	/**
	 * Parameters
	 */
	p.colors = {white: 0xF0F0F0, indigo: 0x3F51B5};
	p.iteration = 1;
	p.isLooping = false;
	p.previousTimeline = null;
	p.currentTimeline = null;
	p.hasChange = false;

	/**
	 * Initialisation
	 */
	p.init = function() {
		p.initParameters();

		p.initPixi();

		// p._dot.addEventListener('click', p.loopAnimation);
		document.addEventListener('keydown', p.playAnimation);
	};

	/**
	 * Init parameters
	 */
	p.initParameters = function() {
		p._left = document.getElementById('left');
		p._top = document.getElementById('top');
		p._right = document.getElementById('right');
		p._bottom = document.getElementById('bottom');
		p._currentArrow = p._right;
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
		p.initTimelines();
		p.currentTimeline = p.tlEast;
		p.currentTimeline.play();
		
		requestAnimFrame(p.animate);
	};

	p.loopAnimation = function() {
		if ( !p.isAnimated ) {
			if ( p.isLooping ) {
				p.isLooping = false;
			} else {
				p.hasChange = false;
				p.iteration++;
				p.isLooping = true;
				p.currentTimeline.repeat(-1);
				p.currentTimeline.restart();
			}
		}
	};

	/**
	 * Play animation
	 */
	p.playAnimation = function(e) {
		/* update direction */
		if ( !p.hasChange ) {
			if ( e.keyCode == 37 ) {
				p._currentArrow.classList.remove('is-enabled');
				p._left.classList.add('is-enabled');
				p.previousTimeline = p.currentTimeline;
				p.currentTimeline = p.tlWest;
				p._currentArrow = p._left;
			}
			if ( e.keyCode == 38 ) {
				p._currentArrow.classList.remove('is-enabled');
				p._top.classList.add('is-enabled');
				p.previousTimeline = p.currentTimeline;
				p.currentTimeline = p.tlNorth;
				p._currentArrow = p._top;
			}
			if ( e.keyCode == 39 ) {
				p._currentArrow.classList.remove('is-enabled');
				p._right.classList.add('is-enabled');
				p.previousTimeline = p.currentTimeline;
				p.currentTimeline = p.tlEast;
				p._currentArrow = p._right;
			}
			if ( e.keyCode == 40 ) {
				p._currentArrow.classList.remove('is-enabled');
				p._bottom.classList.add('is-enabled');
				p.previousTimeline = p.currentTimeline;
				p.currentTimeline = p.tlSouth;
				p._currentArrow = p._bottom;
			}
			if (p.previousTimeline != p.currentTimeline ) p.hasChange = true;
		}
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
	 * Init timelines
	 */
	p.initTimelines = function() {
		p.initEastTimeline();
		p.initWestTimeline();
		p.initNorthTimeline();
		p.initSouthTimeline();
	};

	/**
	 * Init East timeline
	 */
	p.initEastTimeline = function() {
		p.tlEast = new TimelineMax({paused: true, repeat: -1, onRepeat: p.onAnimationRepeat, onComplete: function(){
			p.isAnimated = false;
		}});
		p.initTimeline(p.tlEast, 'x', 1);
	};

	/**
	 * Init West timeline
	 */
	p.initWestTimeline = function() {
		p.tlWest = new TimelineMax({paused: true, repeat: -1, onRepeat: p.onAnimationRepeat, onComplete: function(){
			p.isAnimated = false;
		}});
		p.initTimeline(p.tlWest, 'x', -1);
	};

	/**
	 * Init North timeline
	 */
	p.initNorthTimeline = function() {
		p.tlNorth = new TimelineMax({paused: true, repeat: -1, onRepeat: p.onAnimationRepeat, onComplete: function(){
			p.isAnimated = false;
		}});
		p.initTimeline(p.tlNorth, 'y', -1);
	};

	/**
	 * Init South timeline
	 */
	p.initSouthTimeline = function() {
		p.tlSouth = new TimelineMax({paused: true, repeat: -1, onRepeat: p.onAnimationRepeat, onComplete: function(){
			p.isAnimated = false;
		}});
		p.initTimeline(p.tlSouth, 'y', 1);
	};

	/**
	 * Timeline initialization
	 */
	p.initTimeline = function(tl, axe, direction) {
		if ( axe == 'x' ) tl.to(p.dot.position, 1, {x: direction*25*20, ease: Expo.easeIn});
		else tl.to(p.dot.position, 1, {y: direction*25*20, ease: Expo.easeIn});
		tl.to(p.dot.scale, 0.5, {x: 20, y: 20, ease: Expo.easeIn, onComplete: changeSideRightColor}, 0.5);
		if ( axe == 'x' ) tl.set(p.dot.position, {x: -direction*(p.dot.width*20)/2, ease: Expo.ease, onComplete: changeColors});
		else tl.set(p.dot.position, {y: -direction*(p.dot.width*20)/2, ease: Expo.ease, onComplete: changeColors});
		tl.to(p.dot.scale, 0.5, {x: 1, y: 1, ease: Expo.easeOut}, 1);
		if ( axe == 'x' ) tl.to(p.dot.position, 1, {x: 0, ease: Expo.easeOut}, 1);
		else tl.to(p.dot.position, 1, {y: 0, ease: Expo.easeOut}, 1);

		function changeSideRightColor() {
			if ( p.iteration%2 == 0 ) {
				p.sideRight.clear();
				p.sideRight.beginFill(p.colors.white, 1);
				p.sideRight.drawRect(window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight);
				p.sideContainer.addChild(p.sideRight);
			} else {
				p.sideRight.clear();
				p.sideRight.beginFill(p.colors.indigo, 1);
				p.sideRight.drawRect(window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight);
				p.sideContainer.addChild(p.sideRight);
			}
		}

		function changeColors() {
			if ( p.iteration%2 == 0 ) {
				p.dot.clear();
				p.dot.beginFill(0x3F51B5, 1);
				p.dot.drawCircle(0, 0, 25);
				p.dotContainer.addChild(p.dot);

				p.sideLeft.clear();
				p.sideLeft.beginFill(0xF0F0F0, 1);
				p.sideLeft.drawRect(0, 0, window.innerWidth/2, window.innerHeight);
				p.sideContainer.addChild(p.sideLeft);
			} else {
				p.dot.clear();
				p.dot.beginFill(0xF0F0F0, 1);
				p.dot.drawCircle(0, 0, 25);
				p.dotContainer.addChild(p.dot);

				p.sideLeft.clear();
				p.sideLeft.beginFill(0x3F51B5, 1);
				p.sideLeft.drawRect(0, 0, window.innerWidth/2, window.innerHeight);
				p.sideContainer.addChild(p.sideLeft);
			}
		}
	};

	/**
	 * Update animation iteration count
	 */
	p.onAnimationRepeat = function() {
		// if ( !p.isLooping ) {
		// 	p.currentTimeline.pause();
		// 	p.currentTimeline.repeat(0);
		// } else {
			p.iteration++;
			if ( p.previousTimeline && p.hasChange ) {
				p.hasChange = false;
				p.previousTimeline.pause();
				p.previousTimeline.repeat(0);
				p.currentTimeline.repeat(-1);
				p.currentTimeline.restart();
			}
		// }
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