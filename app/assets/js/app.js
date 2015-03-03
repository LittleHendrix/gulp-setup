$(document).ready(function(){

	// document.addEventListener("touchmove", function(e){ e.preventDefault(); }, false);
	FastClick.attach(document.body);
	
	$('a.youtube').colorbox({
		iframe: true,
		innerWidth: 640,
		innerHeight: 390,
		maxWidth: '80%'
	});

	var $panels = $('.panel'),
		$forwardlinks = $('.next-panel', $panels),
		panelTotal = $panels.length,
		curPanel = 0,
		scrollPos = 0,
		startY = 0,
		deltaY = 0,
		$displayPanes = $('#display').find('.colspan'),
		curCarPos = 0,
		$myWindow = $(window),
		$myDocument = $(document),
		vWidth = $myWindow.width(),
		vHeight = $myWindow.height(),
		vScrollTop = $myWindow.scrollTop(),
		oldIE = $('html').is('.lt-ie10'),
		isTouch = Modernizr.touch || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
		// evt = !isTouch ? 'tap' : 'click',
		// viewportEvt = Modernizr.deviceorientation ? 'orientationchange' : 'resize',
		evt = 'click',
		browser = platform.name.toLowerCase(),
		iOS = platform.os.family == 'iOS',
		iOS7 = (platform.os.family == 'iOS' && parseInt(platform.os.version, 10) == 7) ? " iOS7 " : "",
		iOS8 = (platform.os.family == 'iOS' && parseInt(platform.os.version, 10) >= 8) ? " iOS8 " : "",
		$floatNav = $('#floatNav'),
		$navSwitch = $('#toggler'),
		$navLinks = $('.flyout > a'),
		dtl = null,
		// ttl = null,
		autoScrolling = false,
		forwarding = false,
		eventhandler = function(e) {
			e.preventDefault();
		};

	// console.log(isTouch);
	document.documentElement.className += ' ' + browser;
	if (iOS) {
		document.documentElement.className += ' iOS ' + iOS7 + iOS8 + platform.product.toLowerCase();
	}

	$myWindow.on('orientationchange resize',updateViewportSize).on('scroll',updateScrollPosition);

	$myDocument.on('touchmovetoggle', function(e, arg) {
		e.stopPropagation();
		if (arg) {
			$myDocument.bind('touchmove', eventhandler);
		} else {
			$myDocument.unbind('touchmove', eventhandler);
		}
	});

	$myWindow.on('updateautoscroll', function(e, arg) {
		// console.log('autoscrolling: ' +arg);
		if (arg) {
			autoScrolling = true;
		} else {
			autoScrolling = false;
		}
	});

	function updateViewportSize() {
		vWidth = $myWindow.width();
		vHeight = $myWindow.height();
	}

	function updateScrollPosition() {
		vScrollTop = $myWindow.scrollTop();
		if (!forwarding) {
			$myWindow.trigger('updateautoscroll', [ false ]);
		}
	}

	function isScrolledIntoView(elem) {
		var $el = elem instanceof jQuery ? elem : $(elem);
		var variant = Math.floor( vHeight / 4 );

		var docViewTop = vScrollTop + variant;
		var elemTop = $el.offset().top;
		var elemBottom = elemTop + $el.height() - (variant*2);

		return ((docViewTop >= elemTop) && (docViewTop <= elemBottom));
	}

	$(document).foundation();

	$navSwitch.on(evt, function(e) {
		e.stopPropagation();
		$floatNav.toggleClass('open');
		return false;
	})

	$forwardlinks.each(function(i) {
		var $this = $(this);
		$this.on(evt, function(e) {
			e.stopPropagation();

			// flag autoScrolling to true
			$myWindow.trigger('updateautoscroll', [ true ]);
			forwarding = true;
			curPanel = i+1;
			scrollPos = i+1 == panelTotal ? 0 : $panels.eq(i+1)[0].offsetTop;
			// TweenLite.to(window, 0.8, {scrollTo:{y:scrollPos}, onComplete: function() {
			// 	$myWindow.trigger('updateautoscroll', [ false ]);
			// 	forwarding = false;
			// }, ease:Power2.easeInOut});

			$('html,body').animate(
				{
					scrollTop: scrollPos
				},
				{
					duration: 500,
					queue: false,
					done: function() {
						$myWindow.trigger('updateautoscroll', [ false ]);
						forwarding = false;
					}
				}
			);


			return false;
		})
	});

	$('.lavanav').lavanav();

	var driveSlider = (function() {
		var $panel = $('#driveoflife'),
			$driveSlider = $('#mainslider'),
			$slides = $('.slides',$driveSlider).css('opacity',0),
			slidesLoaded = false,
			$preloader = $panel.find('.preloader'),
			$cue = $panel.find('.cue');

		var driveSliderInstance = $driveSlider.flexslider({
			animation: 'slide',
			animationLoop: true,
			slideshow: false,
			allowOneSlide: false,
			useCSS: true,
			start: function(slider) {
				if (!slidesLoaded) {
					$(document).foundation('interchange', 'reflow');
				}
			}, after: function() {
				if ($cue.is(':visible')) {
					$cue.fadeOut(450);
				}
			}
			// ,
			// after: function(slider) {
			// 	if (!slidesLoaded) {
			// 		console.log('after run');
			// 		$preloader.addClass('loading');
			// 		slidesLoaded = true;
			// 		$.get('slides.html')
			// 			.done(function(data) {
			// 				$(data).children().each(function() {
			// 					slider.addSlide(this);
			// 				});
			// 				$(document).foundation('interchange', 'reflow');
			// 				$slides.css('opacity',1);
			// 				$preloader.addClass('loaded');
			// 				$myWindow.off('.loadslides');
			// 				$('#mainslider .flex-direction-nav a').off('.loadslides');
			// 			});
			// 	}
			// }
		});

		if (isTouch) {
			loadDriveSlider();
		}
		$myWindow.on('updateautoscroll.loadslides', loadDriveSlider);

		$('#mainslider .flex-direction-nav').on(evt+'.loadslides', 'a', function(e) {
			e.stopPropagation();
			var $this = $(this);
			if (!slidesLoaded) {
				// console.log('click loading initiated...');
				$preloader.addClass('loading');
				slidesLoaded = true;
				$.get('slides.html')
						.done(function(data) {
							$(data).children().each(function() {
								driveSliderInstance.data('flexslider').addSlide(this);
							});
							var pos = ($this.hasClass('flex-next')) ? 1 : $(data).children().length;

							$(document).foundation('interchange', 'reflow');
							$slides.css('opacity',1);
							$preloader.addClass('loaded');
							driveSliderInstance.data('flexslider').flexAnimate(pos, true);
						});
				$(this).off('.loadslides');
				$myWindow.off('.loadslides');
			}
			return false;
		});

		function loadDriveSlider() {
			if (isScrolledIntoView($panel) && !slidesLoaded && isTouch && !autoScrolling) {
				// console.log('loading started...');
				$preloader.addClass('loading');
				slidesLoaded = true;
				$.get('slides.html')
						.done(function(data) {
							$(data).children().each(function() {
								driveSliderInstance.data('flexslider').addSlide(this);
							});
							$(document).foundation('interchange', 'reflow');
							$slides.css('opacity',1);
							$preloader.addClass('loaded');
							$cue.fadeIn(450);

							$myWindow.off('.loadslides');
							$('#mainslider .flex-direction-nav a').off('.loadslides');
						});
			}
		}
	})();

	if (!isTouch) {
		// Desktop only code
		$displayPanes.each(function() {
			var $this = $(this),
				overlay = $('.text-wrap',$this);

			$this.hover(function() {
				TweenLite.to(overlay, 0.4, {css:{opacity:0, scale:1.5}, ease:Power2.easeInOut});
			}, function() {
				TweenLite.to(overlay, 0.4, {css:{opacity:1, scale:1}, ease:Power2.easeInOut});
			});
		});
	} else {
		// Touch enabled devices

		var displaySlider = (function() {
			var $panel = $('#display'),
				$popupTrigger = $('.overlay', $panel),
				$popup = $('.popup', $panel),
				$card = $('.card', $popup).css('visibility','hidden'),
				$closeBtn = $('.close', $popup),
				$close = $closeBtn.add($popup),
				$cue = $('.cue', $popup),
				$displaySlider = $('.popupslider', $panel),
				pos = 0,
				displaySliderInstance = null;

			hideDisplaySlider();

			$myWindow.on('scroll', hideDisplaySlider);

			function hideDisplaySlider() {
				if (!isScrolledIntoView($panel)) {
					$popup.fadeOut(450);
					$myDocument.trigger('touchmovetoggle', [ false ]);
				}
			}

			$popupTrigger.each(function(index) {
				var $this = $(this);
				$this.on(evt, function(e) {
					pos = index;
					$popup.fadeIn(450);
					$myDocument.trigger('touchmovetoggle', [ true ]);
					if (displaySliderInstance == null) {
						displaySliderInstance = $displaySlider.flexslider({
							animation: 'slide',
							controlNav: false,
							directionNav: false,
							animationLoop: true,
							slideshow: false,
							startAt: pos,
							start: function() {
								$card.css('visibility','visible');
								var slides = $displaySlider.find('ul.slides'),
									distance = slides.height()/2;
								slides.css('margin-top', '-'+distance+'px');
								$closeBtn.css({
									'margin-top': '-'+(distance - 10)+'px',
									'margin-right': '-'+(slides.find('.dis-pane:first').width()/2 - 10)+'px'
								});
							},
							after: function() {
								$cue.fadeOut(250);
							}
						});
					} else {
						// console.log('already initiated.');
						displaySliderInstance.data('flexslider').flexAnimate(pos, true);
						var slides = $displaySlider.find('ul.slides'),
							distance = slides.height()/2;
						slides.css('margin-top', '-'+distance+'px');
						$closeBtn.css({
							'margin-top': '-'+(distance - 10)+'px',
							'margin-right': '-'+(slides.find('.dis-pane:first').width()/2 - 10)+'px'
						});
					}
				});
			});

			$close.on(evt, function(e) {
				e.stopPropagation();
				if ($(e.target).is('span.close') || $(e.target).is('div.flex-viewport')) {
					$popup.fadeOut(450);
					$myDocument.trigger('touchmovetoggle', [ false ]);
				}
				return false;
			});
		})();
	}

	var carslider = (function() {
		var carsloaded = false,
			$carHolder = $('#cars'),
			$carpark = $('#carpark'),
			$preloader = $carHolder.find('.preloader'),
			$modelSwitcher = $('#modelSwitch').find('a.carswitch'),
			curCarModel = 'hatch',
			oldCarModel = '',
			$cars = $(),
			curCarPos = 0;

		var $sl = $('#viewSlider').slider({
				max: 99
			}).on('slide', function ( event, ui ) {
				curCarPos = Math.floor(ui.value / 25);
				$cars.removeClass('active').eq(curCarPos).addClass('active');
			}).on('slidestart', function(event, ui) {
				if (!carsloaded) {
					loadCarImg(curCarModel);
				}
			});

		$modelSwitcher.on(evt, function() {
			curCarModel = this.hash.slice(1);

			if (curCarModel != oldCarModel) {
				loadCarImg(curCarModel);
			}
			return false;
		});

		function loadCarImg(carModel) {
			// temporarily disable the slider and display loading animation
			$sl.slider('disable');
			$preloader.addClass('loading');

			oldCarModel = carModel;
			// retrieve car images
			if (!carsloaded) {
				carsloaded = true;
				$.get('cars.html')
					.done(function(data) {
						var $data = $('<div>' + data + '</div>');

						// load images into DOM
						$cars = $('img', $data).appendTo($carpark).invisible().filter('.'+carModel).visible().eq(0).addClass('active').end();

						// hide initial image/loading animation, re-enable the slider
						$preloader.addClass('loaded');
						$sl.slider('enable');
						$sl.slider({value:0});

						$(document).foundation('interchange', 'reflow');
					});
			} else {
				$cars.removeClass('active').invisible();
				$cars = $('.'+carModel, $carpark).visible().eq(curCarPos).addClass('active').end();
				$sl.slider('enable');
				// $sl.slider({value:curCarPos});
			}

		}
	})();

	var dashSlider = (function() {
		var $panel = $('#dashboard'),
			// $infograph = $panel.find('.infograph'),
			$bubbles = $panel.find('.bubble'),
			$popup = $panel.find('.popup'),
			$card = $popup.find('.card').css('visibility','hidden'),
			$closeBtn = $popup.find('.close'),
			$close = $closeBtn.add($popup),
			$cue = $popup.find('.cue'),
			$dashSlider = $panel.find('.popupslider'),
			pos = 0,
			dashSliderInstance = null,
			stageReady = false;

			dtl = new TimelineLite({
				paused: true,
				onComplete: completeHandler,
				onReverseComplete : reverseCompleteHandler
			});

			dtl.staggerTo($bubbles, 0.5, {autoAlpha:1, scale:1.15, ease:Elastic.easeIn}, 0.3 );
			dtl.staggerTo($bubbles, 0.1, {scale:1, ease:Elastic.easeOut}, 0.3, '-=0.6');

		prepareDashStage();

		$myWindow.on('updateautoscroll', prepareDashStage);

		function completeHandler() {
			stageReady = true;
		}

		function reverseCompleteHandler() {
			this.timeScale(1);
		}

		function prepareDashStage() {
			if (autoScrolling) {
				// if in autoscroll mode, kill the tween and reset playhead back to 0
				if (dtl.isActive() || dtl.progress() == 1) {
					dtl.kill();
				}
			} else {
				if (isScrolledIntoView($panel)) {
					if (!stageReady) {
						// console.log('started preparing stage');
						dtl.play();
					}
				} else {
					if (stageReady) {
						// console.log('started clearing stage');
						// $infograph.removeClass('shown');
						// $bubbles.removeClass('active');
						// if (dtl.progress() != 0) {
						// 	dtl.timeScale(2);
						// 	dtl.reverse();
						// }
						$popup.fadeOut(450);
						$myDocument.trigger('touchmovetoggle', [ false ]);
						stageReady = false;
					}
				}
			}
		}

		$bubbles.each(function(index) {
			var $this = $(this);
			$this.on(evt, function() {
				pos = index;
				// $bubbles.removeClass('active').filter($this).addClass('active');
				$popup.fadeIn(450);
				// disable vertical swipe
				$myDocument.trigger('touchmovetoggle', [ true ]);

				if (dashSliderInstance == null) {
					dashSliderInstance = $dashSlider.flexslider({
						animation: 'slide',
						controlNav: false,
						directionNav: true,
						animationLoop: true,
						slideshow: false,
						startAt: pos,
						start: function(slider) {
							$card.css('visibility','visible');
							var slides = $dashSlider.find('ul.slides'),
								distance = slides.height()/2;
							slides.css('margin-top', '-'+distance+'px');
							$closeBtn.css({
								'margin-top': '-'+(distance - 10)+'px',
								'margin-right': '-'+(slides.find('.dis-pane:first').width()/2 - 10)+'px'
							});
						},
						after: function(slider) {
							$cue.fadeOut(250);
						}
					});
				} else {
					dashSliderInstance.data('flexslider').flexAnimate(pos, true);
					var slides = $dashSlider.find('ul.slides'),
						distance = slides.height()/2;
					slides.css('margin-top', '-'+distance+'px');
					$closeBtn.css({
						'margin-top': '-'+(distance - 10)+'px',
						'margin-right': '-'+(slides.find('.dis-pane:first').width()/2 - 10)+'px'
					});
				}
				return false;
			});
		});

		$close.on(evt, function(e) {
			e.stopPropagation();
			if ($(e.target).is('span.close') || $(e.target).is('div.flex-viewport')) {
				// $bubbles.removeClass('active');
				$popup.fadeOut(450);
				// re-enable vertical swipe
				$myDocument.trigger('touchmovetoggle', [ false ]);
			}
			// return false;
		});
	})();

	var hardwareSlider = (function() {
		var $lnks = $('#hardwareSwitch').find('a'),
			$items = $('#hardware').find('.item'),
			target,
			oldTarget = 0,
			disclaimer = '',
			disclaimer2 = '',
			$extra = $('#extra'),
			stageReady = false,
			$panel = $('#skyactiv'),
			$popupTrigger = $panel.find('.bubble'),
			$popup = $panel.find('.popup'),
			$card = $popup.find('.card').css('visibility','hidden'),
			$closeBtn = $popup.find('.close'),
			$close = $closeBtn.add($popup),
			$cue = $popup.find('.cue'),
			$hardwareSlider = $panel.find('.popupslider'),
			pos = 0,
			hardwareSliderInstance = null,
			htls = [];

		$items.each(function(i) {
			var $this = $(this),
				imgs = $this.find('img.base'),
				imgTotal = imgs.length,
				bubbles = $this.find('.bubble'),
				bubTotal = bubbles.length,
				infograph = $this.find('.infograph');

			var childTl = new TimelineLite({
								paused: true,
								onComplete: completeHandler,
								onCompleteParams: [ bubbles ],
								onReverseComplete: reverseCompleteHandler
							});

			if (!iOS || parseInt(platform.os.version, 10) != 7 || platform.product.toLowerCase() != 'iphone') {
				if (imgTotal > 1) {
					childTl.staggerTo(imgs, .4, {autoAlpha:1, scale:1}, 0.3);
				} else {
					childTl.to(imgs, .4, {autoAlpha:1, scale:1});
				}
			}

			if (bubTotal > 1) {
				childTl.staggerTo(bubbles, 0.4, {autoAlpha:1, scale:1.15, ease:Elastic.easeIn}, 0.3);
				childTl.staggerTo(bubbles, 0.1, {scale:1, ease:Elastic.easeOut}, 0.3);
				if (!isTouch || vWidth >= 768) {
					childTl.staggerTo(infograph, 0.2, {autoAlpha:1}, 0.3);
				}
			} else {
				childTl.add( TweenLite.to(bubbles, 0.4, {autoAlpha:1, scale:1.15, ease:Elastic.easeIn}) );
				childTl.add( TweenLite.to(bubbles, 0.1, {scale:1, ease:Elastic.easeOut, delay:0.3}) );
				if (!isTouch || vWidth >= 768) {
					childTl.add( TweenLite.to(infograph, 0.2, {autoAlpha:1}, 0.3) );
				}
			}
			htls.push(childTl);
		});

		function completeHandler(bubbles) {
			bubbles.addClass('active');
			stageReady = true;
		}

		function reverseCompleteHandler() {
			this.timeScale(1);
			this.kill();
			if (typeof target != 'undefined') {
				// if orientationchange happened before click, target wouldn't have been set yet
				$items.removeClass('active').eq(target).addClass('active');
			}
			htls[target].play();
		}

		prepareHardwareStage();

		$myWindow.on('updateautoscroll', prepareHardwareStage);

		function prepareHardwareStage() {
			if (autoScrolling) {
				// is in autoscroll mode, kill the current tween and reset the playhead back to 0
				for (var i = 0, len = htls.length; i < len; i++) {
					if (htls[i].isActive() || htls[i].progress() == 1) {
						htls[i].kill();
					}
				}
				// htls[oldTarget].kill();
			} else {
				if (isScrolledIntoView($('#skyactiv'))) {
					if (!stageReady) {
						// console.log('panel in view, animation starts...');
						htls[oldTarget].play();
					}
				} else {
					if (stageReady) {
						// console.log('panel out of view, animation reverts...');
						// if (htls[oldTarget].progress() != 0) {
						// 	htls[oldTarget].reverse();
						// }
						$popup.fadeOut(450);
						$myDocument.trigger('touchmovetoggle', [ false ]);
						stageReady = false;
					}
				}
			}
		}

		$lnks.each(function(i) {
			var $this = $(this),
				t = this.hash.slice(1);

			$this.on(evt, function(e) {
				e.stopPropagation();

				disclaimer = $('#'+t).data('disclaimer') == undefined ? "" : $('#'+t).data('disclaimer');
				disclaimer2 = $('#'+t).data('disclaimer-more') == undefined ? "" : $('#'+t).data('disclaimer-more');

				target = i;
				if (target != oldTarget) {
					htls[oldTarget].timeScale(3);
					htls[oldTarget].reverse();

					oldTarget = target;
					// htls[target].delay(1).play();
					$extra.empty().append(disclaimer);
					if (disclaimer2 != "") {
						disclaimer2 = '<br />' + disclaimer2;
						$extra.append(disclaimer2);
					}
				}
				return false;
			})
		});

		if (isTouch) {
			$popupTrigger.each(function(index) {
				var $this = $(this);
				$this.on(evt, function(e) {
					e.stopPropagation();
					switch (index) {
						case 0:
							pos = 0;
							break;
						case 1:
							pos = 1;
							break;
						case 2:
							pos = 2;
							break;
						case 3:
							pos = 3;
							break;
						case 4:
							pos = 4;
							break;
						case 5:
							pos = 6;
							break;
						default:
							pos = 0;
							break;
					}

					if (vWidth < 1024) {
						$popup.fadeIn(450);
						$myDocument.trigger('touchmovetoggle', [ true ]);

						if (hardwareSliderInstance == null) {
							hardwareSliderInstance = $hardwareSlider.flexslider({
								animation: 'slide',
								controlNav: false,
								directionNav: false,
								animationLoop: true,
								slideshow: false,
								startAt: pos,
								start: function() {
									$card.css('visibility','visible');
									var slides = $hardwareSlider.find('ul.slides'),
										distance = slides.height()/2;
									slides.css('margin-top', '-'+distance+'px');
									$closeBtn.css({
										'margin-top': '-'+(distance - 10)+'px',
										'margin-right': '-'+(slides.find('.dis-pane:first').width()/2 - 10)+'px'
									});
								},
								after: function() {
									$cue.fadeOut(250);
								}
							});
						} else {
							hardwareSliderInstance.data('flexslider').flexAnimate(pos, true);
							var slides = $hardwareSlider.find('ul.slides'),
								distance = slides.height()/2;
							slides.css('margin-top', '-'+distance+'px');
							$closeBtn.css({
								'margin-top': '-'+(distance - 10)+'px',
								'margin-right': '-'+(slides.find('.dis-pane:first').width()/2 - 10)+'px'
							});
						}
					}
					return false;
				});
			});

			$close.on(evt, function(e) {
				e.stopPropagation();
				if ($(e.target).is('span.close') || $(e.target).is('div.flex-viewport')) {
					$popup.fadeOut(450);
					$myDocument.trigger('touchmovetoggle', [ false ]);
				}
				return false;
			});
		}

	})();

	var technologySlider = (function() {
		var $lnks = $('#techSwitch').find('a'),
			$items = $('#technology').find('.item'),
			$baseImgs = $('#technology').find('img.base'),
			target,
			oldTarget = 0,
			stageReady = false,
			carloaded = false,
			$panel = $('#activsense'),
			$bubbles = $panel.find('.bubble'),
			$popup = $panel.find('.popup'),
			$card = $popup.find('.card').css('visibility','hidden'),
			$closeBtn = $popup.find('.close'),
			$close = $closeBtn.add($popup),
			$cue = $popup.find('.cue'),
			$techSlider = $panel.find('.popupslider'),
			pos = 0,
			techSliderInstance = null,
			carTween = null,
			ttls = [],
			ttlsBub = [];

		$items.each(function(i) {
			var $this = $(this);
			if (!isTouch) {
				// prepare infograph tweens for desktop
				var infograph = $this.find('.infograph');

				var childTl = new TimelineLite({
									paused: true,
									onComplete: completeHandler,
									onReverseComplete: reverseCompleteHandler
								});

				childTl.staggerTo(infograph, 0.4, {autoAlpha:1}, 0.3);

				ttls.push(childTl);
			} else {
				var bubbles = $this.find('.bubble'),
				bubTotal = bubbles.length;

				var bubChildTl = new TimelineLite({
										paused: true,
										onComplete: completeHandler,
										onReverseComplete: bubReverseCompleteHandler
									});

				if (bubTotal > 1) {
					bubChildTl.staggerTo(bubbles, 0.4, {autoAlpha:1, scale:1.15, ease:Elastic.easeIn}, 0.3);
					bubChildTl.staggerTo(bubbles, 0.1, {scale:1, ease:Elastic.easeOut}, 0.3);
				} else {
					bubChildTl.add( TweenLite.to(bubbles, 0.4, {autoAlpha:1, scale:1.15, ease:Elastic.easeIn}) );
					bubChildTl.add( TweenLite.to(bubbles, 0.1, {scale:1, ease:Elastic.easeOut, delay:0.3}) );
				}

				ttlsBub.push(bubChildTl);
			}
		});

		function completeHandler() {
			stageReady = true;
		}

		function reverseCompleteHandler() {
			this.timeScale(1);
			this.kill();
			if (typeof target != 'undefined') {
				// if orientationchange happened before click, target wouldn't have been set yet
				$items.removeClass('active').eq(target).addClass('active');
			}
			ttls[target].play();
		}

		function bubReverseCompleteHandler() {
			this.timeScale(1);
			this.kill();
			if (typeof target != 'undefined') {
				// if orientationchange happened before click, target wouldn't have been set yet
				$items.removeClass('active').eq(target).addClass('active');
			}
			ttlsBub[target].play();
		}

		prepareTechStage();

		$myWindow.on('updateautoscroll', prepareTechStage);

		function prepareTechStage() {
			if (autoScrolling) {
				if (!isTouch) {
					for (var i = 0, len = ttls.length; i < len; i++) {
						if (ttls[i].isActive() || ttls[i].progress() == 1) {
							ttls[i].kill();
						}
					}
				} else {
					for (var i = 0, len = ttlsBub.length; i < len; i++) {
						if (ttlsBub[i].isActive() || ttlsBub[i].progress() == 1) {
							ttlsBub[i].kill();
						}
					}
				}
			} else {
				if (isScrolledIntoView($panel)) {
					if (!stageReady) {
						// console.log('started preparing stage');
						if (!carloaded && (!iOS || parseInt(platform.os.version, 10) != 7 || platform.product.toLowerCase() != 'iphone')) {
							carTween = TweenLite.to($baseImgs, 0.4, {autoAlpha:1, scale:1, ease:Power2.easeInOut});
						}
						if (!isTouch) {
							ttls[oldTarget].delay(1).play();
						} else {
							ttlsBub[oldTarget].play();
						}
					}
				} else {
					if (stageReady) {
						// console.log('started clearing stage');
						if (carTween != null && carTween.progress() == 1) {
							carTween.kill();
						}
						// if (!isTouch) {
						// 	if (ttls[oldTarget].progress() != 0) {
						// 		ttl.timeScale(2);
						// 		ttls[oldTarget].reverse();
						// 	}
						// } else {
						// 	if (ttl.progress() != 0) {
						// 		ttl.timeScale(2);
						// 		ttl.reverse();
						// 	}
						// }
						$popup.fadeOut(450);
						$myDocument.trigger('touchmovetoggle', [ false ]);
						stageReady = false;
					}
				}
			}
		}

		$lnks.each(function(i) {
			var $this = $(this),
				t = this.hash.slice(1);

			$this.on(evt, function(e) {
				e.stopPropagation();
				pos = $this.parent().index();

				target = i;
				if (target != oldTarget) {

					if (!isTouch) {
						ttls[oldTarget].timeScale(2);
						ttls[oldTarget].reverse();
					} else {
						ttlsBub[oldTarget].timeScale(2);
						ttlsBub[oldTarget].reverse();
					}

					oldTarget = target;
				}
				return false;
			});
		});

		$close.on(evt, function(e) {
			e.stopPropagation();
			if ($(e.target).is('span.close') || $(e.target).is('div.flex-viewport')) {
				$popup.fadeOut(450);
				$myDocument.trigger('touchmovetoggle', [ false ]);
			}
			return false;
		});

		if (isTouch) {
			$bubbles.each(function(index) {
				var $this = $(this);

				$this.on(evt, function(e) {
					e.stopPropagation();
					sliderInit(index);

					return false;
				});
			});
		}

		function sliderInit(pos) {
			$popup.fadeIn(450);
			$myDocument.trigger('touchmovetoggle', [ true ]);
			if (techSliderInstance == null) {
				techSliderInstance = $techSlider.flexslider({
					animation: 'slide',
					controlNav: false,
					directionNav: false,
					animationLoop: true,
					slideshow: false,
					startAt: pos,
					start: function() {
						$card.css('visibility','visible');
						var slides = $techSlider.find('ul.slides'),
							distance = slides.height()/2;
						slides.css('margin-top', '-'+distance+'px');
						$closeBtn.css({
							'margin-top': '-'+(distance - 10)+'px',
							'margin-right': '-'+(slides.find('.dis-pane:first').width()/2 - 10)+'px'
						});
					},
					after: function() {
						$cue.fadeOut(250);
					}
				});
			} else {
				// console.log('already initiated.');
				techSliderInstance.data('flexslider').flexAnimate(pos, true);
				var slides = $techSlider.find('ul.slides'),
					distance = slides.height()/2;
				slides.css('margin-top', '-'+distance+'px');
				$closeBtn.css({
					'margin-top': '-'+(distance - 10)+'px',
					'margin-right': '-'+(slides.find('.dis-pane:first').width()/2 - 10)+'px'
				});
			}
		}

	})();

});

$.fn.lavanav = function() {
	return this.each(function() {
		var $el,
			leftPos,
			newWidth,
			that = $(this),
			$lnks = $('a',that);

		that.append('<li class="lava" />');
		var $lava = $('.lava',that);

		if ($('a.active', that).length > 0) {
			var $curElement = $('a.active', that).parent();
			$lava.width($curElement.width())
				.css('left', $curElement.position().left)
				.data('origLeft', $curElement.position().left)
				.data('origWidth', $curElement.width());
		} else {
			$lava.width(0).css('left', 0).data('origLeft', 0).data('origWidth', 0);
		}

		$lnks.on('click', function(e) {
			e.stopPropagation();
			$lnks.removeClass('active').filter($(this)).addClass('active');
			$el = $(this).parent();
			leftPos = $el.position().left;
			newWidth = $el.width();
			$lava.stop().animate({
				left: leftPos,
				width: newWidth
			},250);
			return false;
		});

		// $('a', that).hover(function() {
		// 	$el = $(this).parent();
		// 	leftPos = $el.position().left;
		// 	newWidth = $el.width();
		// 	$lava.stop().animate({
		// 		left: leftPos,
		// 		width: newWidth
		// 	});
		// }, function() {
		// 	$lava.stop().animate({
		// 		left: $el.data('origLeft'),
		// 		width: $el.data('origWidth')
		// 	});
		// });
	});
};
$.fn.visible = function() {
	return this.css('visibility', 'visible');
};
$.fn.invisible = function() {
	return this.css('visibility', 'hidden');
};
