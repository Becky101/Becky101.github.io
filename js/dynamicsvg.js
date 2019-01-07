function pathPrepare ($el) {
							var lineLength = $el[0].getTotalLength();
							$el.css("stroke-dasharray", lineLength);
							$el.css("stroke-dashoffset", lineLength);
						}

						var $part1 = $("path#part1");
						var $part2 = $("path#part2");
						var $part3 = $("path#part3");
						

						// prepare SVG
						pathPrepare($part1);
						pathPrepare($part2);
						pathPrepare($part3);
						
						// init controller
						var controller = new ScrollMagic.Controller();

						// build tween
						var tween = new TimelineMax()
						.add(TweenMax.to($part1, 1, {strokeDashoffset: 0, ease:Linear.easeNone}))
						.add(TweenMax.to($part2, 1, {strokeDashoffset: 0, ease:Linear.easeNone}))
					     	.add(TweenMax.to($part3, 1, {strokeDashoffset:140, ease:Linear.easeNone}))
						// draw dot for 0.1
								// change color during the whole thing

						// build scene
						var scene = new ScrollMagic.Scene({triggerElement: "#trigger1", duration: 300, tweenChanges: true})
										.setTween(tween)
										.addIndicators() // add indicators (requires plugin)
										.addTo(controller);