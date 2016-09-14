document.addEventListener("DOMContentLoaded", function() {
	
			var planetObj = {};
	
			var Solar = {
				particleCount: 4500,
				particleSize: 10,
				galaxyVelocity: 0.002*THREEx.VF,
				asteroidsVelocity: 0.002*THREE.VF,
				firstLaunch: true, 
				radiusScaled: false,
				lookFrom:0,
				lookFromTan:0,
				moonAngle:0,
				days:0,
				months:0,
				years:0,
				cameraPosition: {x:0, y:0, z: 0},
				cameraPositionTo: {x:0, y: 0, z: 0},
				monthDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
			};
	
			Solar.TrackLines = {};
			Solar.TextLabels = {};
	
			var DATE = new Date();
	
			Solar.years = DATE.getFullYear();
			Solar.months = DATE.getMonth()+1;
			Solar.days = DATE.getDate();
	
			Solar.toggleTracksVisible = function(mode) {
				if(mode) {
					for(var track in Solar.TrackLines)
						Solar.TrackLines[track].traverse( function ( object ) { object.visible = true; } );
				}
				else {
					for(var track in Solar.TrackLines)
						Solar.TrackLines[track].traverse( function ( object ) { object.visible = false; } );
				}
			}
			
			Solar.scalePlanetsRadius = function(mode) {
				if(mode) {
					Solar.radiusScaled = true;
					for(var planet in planetObj)
						planetObj[planet].scale.set(1.8,1.8,1.8);
					saturnRing.scale.set(1.8,1.8,1.8);
					moon.scale.set(1.8,1.8,1.8);
				}
				else {
					Solar.radiusScaled = false;
					for(var planet in planetObj)
						planetObj[planet].scale.set(1.0,1.0,1.0);
					saturnRing.scale.set(1,1,1);
					moon.scale.set(1,1,1);
				}
			}

			Solar.astRand = function(i) {
				var s, r;
				r = Math.random();
				s = ( r>0.5 ) ? 1 : -1; 
				
				return	{
						x:Math.cos(r*i)*s*(Math.random()*(THREEx.PlanetData.jupiter.Distance - THREEx.PlanetData.mars.Distance) + THREEx.PlanetData.mars.Distance), 
						y:Math.random()*s*250,
						z:Math.sin(r*i)*s*(Math.random()*(THREEx.PlanetData.jupiter.Distance - THREEx.PlanetData.mars.Distance) + THREEx.PlanetData.mars.Distance)
				}
			}
			
			$("#back").click(function() {
				document.location.href = "index.html";
			});
			
			var W = $("body").width(), H = $("body").height();
	
			var toggleSettings = $("#toggleSettings"), settings = $("#settingsMenu"), ambSound = document.getElementById("ambientSound"), toggleOrbits = $("#toggleOrbits"), toggleDate = $("#toggleDate"), dateHolder = $("#date"), soundVolume = $("#soundVolume"), changeVelocity = $("#movementVelocity"), incRadius = $("#incRad"), year = $("#year"), month = $("#month"), day = $("#day"), planetInfo = document.getElementById("planetInfo"), planetInfoContent = $("#planetInfoContent"), closeInfo = $("#closeInfo"), welcoming = document.getElementById("welcoming"), goToSun = $("#goToSun");
	
			year.text(Solar.years);
			month.text(Solar.months);
			day.text(Solar.days);
	
			// Настройки
	
			function toggleDateBlock() {
				if(toggleDate.hasClass("clicked")) {
					toggleDate.removeClass("clicked").removeClass("anim-rot-180");
					dateHolder.slideUp();
				}
				else {
					toggleDate.addClass("clicked").addClass("anim-rot-180");
					dateHolder.slideDown();
				}
			}
	
			function toggleOptions() {
				if(toggleSettings.hasClass("clicked")) {
					settings.slideUp();
					toggleSettings.removeClass("clicked").removeClass("anim-rot-180");
				}
				else {
					settings.slideDown();
					toggleSettings.addClass("clicked").addClass("anim-rot-180");
				}
			}
		
			$("#rdinc").css("padding-bottom", "10px");
	
			toggleSettings.click(function() {
				if(toggleDate.hasClass("clicked") && !toggleSettings.hasClass("clicked")) toggleDateBlock();
				toggleOptions();
			});
	
			toggleDate.click(function() {
				if(toggleSettings.hasClass("clicked") && !toggleDate.hasClass("clicked")) toggleOptions();
				toggleDateBlock();
			});
	
			/*soundVolume.on("immediate-value-change", function() {
				console.log(parseInt($(this).attr("aria-valuenow"), 10)/100);
				ambSound.volume = parseInt($(this).attr("aria-valuenow"), 10)/100;
			});
	
			changeVelocity.on("immediate-value-change", function() {
				var old = THREEx.VF;
				THREEx.VF = parseInt($(this).attr("aria-valuenow"), 10)/100;
				for(var planet in planetObj) {
					console.log(planet+" - "+THREEx.Velocity);
					THREEx.PlanetData[planet].Velocity/=old;
					THREEx.PlanetData[planet].Velocity*=THREEx.VF;
					
					THREEx.PlanetData[planet].Day/=old;
					THREEx.PlanetData[planet].Day*=THREEx.VF;
				}
				Solar.galaxyVelocity/=old;
				Solar.galaxyVelocity*=THREEx.VF;
				Solar.asteroidsVelocity/=old;
				Solar.asteroidsVelocity*=THREE.VF;
			});
	
			incRadius.change(function() {
				var old = THREEx.RF;
				
				switch($(this).attr("aria-pressed")) {
					case "true": {
						Solar.scalePlanetsRadius(false);
					}; break;
					case "false": {
						Solar.scalePlanetsRadius(true);
					}
				}
			});
	
			toggleOrbits.change(function() {
				switch($(this).attr("aria-pressed")) {
					case "true": {
						Solar.toggleTracksVisible(false);
					}; break;
					case "false": {
						Solar.toggleTracksVisible(true);
					}
				}
			});*/

    		var scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera( 45, W/H, 2.5, 60000 );
			camera.position.z = 650;
			camera.position.x = -90;
			camera.position.y = 150;
			camera.lookAt(new THREE.Vector3(0,0,0));
			Solar.cameraPosition.x = camera.position.x;
			Solar.cameraPosition.y = camera.position.y;
			Solar.cameraPosition.z = camera.position.z;
			var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
			renderer.setClearColor(0x000000);
			renderer.setSize( W, H );
			$("#three-container").append( renderer.domElement );
	
			window.addEventListener( 'resize', onWindowResize, false );

			var controls = new THREE.TrackballControls(camera, renderer.domElement);
			controls.rotateSpeed = 0.6;
			controls.zoomSpeed = 0.5;
			controls.minDistance = THREEx.PlanetData.sun.Radius+250;
			controls.maxDistance = THREEx.PlanetData.neptune.Distance+8000;
			
			var domEvents = new THREEx.DomEvents(camera, renderer.domElement);
	
			if(Solar.firstLaunch) {
				new TWEEN.Tween(camera.position).to({ x: 1000, y: 900, z: 1500}, 2500).easing(TWEEN.Easing.Cubic.InOut).start();
				Solar.firstLaunch = false;
			}
		
			var sft = window.localStorage["showedFirstTime"];
			console.log(window.localStorage["showedFirstTime"]);
	
			if(!sft) {
				welcoming.close();
				window.localStorage["showedFirstTime"] =  "true";
			}
			else welcoming.remove();

			var starField = THREEx.Planets.createStarfield();
			starField.rotation.z += Math.PI/2;
			starField.rotation.x -= Math.PI/2.5;
			scene.add(starField);
			
	
			var light	= new THREE.PointLight(0xffffff);
			scene.add(light);
	
			var alight = new THREE.AmbientLight(0x888888);
			scene.add(alight);
	

	
			planetObj["mercury"] = THREEx.Planets.createMercury();
			planetObj["mercury"].position.x -= THREEx.PlanetData.mercury.Distance;
			scene.add(planetObj["mercury"]);

			planetObj["venus"] = THREEx.Planets.createVenus();
			planetObj["venus"].position.x -= THREEx.PlanetData.venus.Distance;
			scene.add(planetObj["venus"]);
	
			planetObj["earth"] = THREEx.Planets.createEarth();
			planetObj["earth"].position.x -= THREEx.PlanetData.earth.Distance;
			planetObj["earth"].receiveShadow = true;
			scene.add(planetObj["earth"]);
	
			var phantom = new THREE.Object3D();
			phantom.position.x = planetObj["earth"].position.x;
			phantom.position.y = 0;
			phantom.position.z = 0;
			scene.add(phantom);
			var moon = THREEx.Planets.createMoon();
			moon.castsShadow = true;
			phantom.add(moon);
			moon.position.x-=13;
			moon.scale.set(0.8,0.8,0.8);
	
			planetObj["mars"] = THREEx.Planets.createMars();
			planetObj["mars"].position.x -= THREEx.PlanetData.mars.Distance;
			scene.add(planetObj["mars"]);
	
			planetObj["jupiter"] = THREEx.Planets.createJupiter();
			planetObj["jupiter"].position.x -= THREEx.PlanetData.jupiter.Distance;
			scene.add(planetObj["jupiter"]);
	
			planetObj["saturn"] = THREEx.Planets.createSaturn();
			scene.add(planetObj["saturn"]);
	
			var saturnRing = THREEx.Planets.createSaturnRing();
			saturnRing.position.x-=THREEx.PlanetData.saturn.Distance;
			scene.add(saturnRing);
	
			planetObj["uranus"] = THREEx.Planets.createUranus();
			planetObj["uranus"].position.x -= THREEx.PlanetData.uranus.Distance;
			scene.add(planetObj["uranus"]);
	
			planetObj["neptune"] = THREEx.Planets.createNeptune();
			planetObj["neptune"].position.x -= THREEx.PlanetData.neptune.Distance;
			scene.add(planetObj["neptune"]);
	
			var plutoCenter = new THREE.Object3D();
			plutoCenter.position.x+=200;
			scene.add(plutoCenter);
			planetObj["pluto"] = THREEx.Planets.createPluto();
			plutoCenter.add(planetObj["pluto"]);
			planetObj["pluto"].position.x-=THREEx.PlanetData.pluto.Distance;
			
			
			var i = 1, curPlanet;
			for(var planet in planetObj) {
				
				curPlanet = planetObj[planet];
				
				curPlanet.objName = planet;
				
				
				reserveDomEvent(curPlanet);
				
				Solar.TrackLines[planet] = DrawTrackLine(THREEx.PlanetData[planet].Track, THREEx.PlanetData[planet].Distance, 64*i);
				Solar.TrackLines[planet].rotation.x -= Math.PI/2;
				Solar.TrackLines[planet].rotation.y += THREEx.PlanetData[planet].Eq;
				scene.add(Solar.TrackLines[planet]);
				i++;
				
				Solar.TextLabels[planet] = makeTextSprite(THREEx.PlanetData[planet].Name, {
					"fontface" : "Helvetica",
					"fontsize" : 25,
					"borderThickness" : 0,
					"borderColor" : {
						r: 0,
						g: 0,
						b: 0,
						a: 0
					},
					"backgroundColor" : {
						r: 0,
						g: 0,
						b: 0,
						a: 0
					}
				});
				
				planetObj[planet].add(Solar.TextLabels[planet]);
				Solar.TextLabels[planet].objName = planet;
				Solar.TextLabels[planet].position.y += THREEx.PlanetData[planet].Radius*1.2;
				
			}
	
			// Блики от света
	
			var textureFlare0 = THREE.ImageUtils.loadTexture( "components/images/lensflare0.png" );
			var textureFlare2 = THREE.ImageUtils.loadTexture( "components/images/lensflare2.png" );
			var textureFlare3 = THREE.ImageUtils.loadTexture( "components/images/lensflare3.png" );
	
			function createLensFlare(x,y,z, size, overrideImage){
				  var flareColor = new THREE.Color( 0xffffff );

				  lensFlare = new THREE.LensFlare( overrideImage, 700, 0.0, THREE.AdditiveBlending, flareColor );

				  //	we're going to be using multiple sub-lens-flare artifacts, each with a different size
				  lensFlare.add( textureFlare2, 4096, 0.0, THREE.AdditiveBlending );
				  lensFlare.add( textureFlare3, 512, 0.0, THREE.AdditiveBlending );
				  lensFlare.add( textureFlare3, 512, 0.0, THREE.AdditiveBlending );
				  lensFlare.add( textureFlare3, 512, 0.0, THREE.AdditiveBlending );

				  //	and run each through a function below
				  lensFlare.customUpdateCallback = lensFlareUpdateCallback;

				  lensFlare.position = new THREE.Vector3(x,y,z);
				  lensFlare.size = size ? size : 16000 ;
				  return lensFlare;
				}

				//	this function will operate over each lensflare artifact, moving them around the screen
				function lensFlareUpdateCallback( object ) {
				  var f, fl = this.lensFlares.length;
				  var flare;
				  var vecX = -this.positionScreen.x * 2;
				  var vecY = -this.positionScreen.y * 2;
				  var size = object.size ? object.size : 16000;

				  var camDistance = camera.position.length();

				  for( f = 0; f < fl; f ++ ) {
					flare = this.lensFlares[ f ];

					flare.x = this.positionScreen.x + vecX * flare.distance;
					flare.y = this.positionScreen.y + vecY * flare.distance;

					flare.scale = size / camDistance;
					flare.rotation = 0;
				  }
			}
	
			var flare1 = createLensFlare(0, 0, 0, 1000, textureFlare0);
			flare1.scale = 20;
			scene.add(flare1);
	
			var sun = THREEx.Planets.createSun();
	
			var glowColor	= new THREE.Color('#F8FF7D');
			var sunAtmGeo = new THREE.SphereGeometry(THREEx.PlanetData.sun.radius, 60, 60);
			sunAtmGeo = sun.geometry.clone();
			var sunAtmMaterial	= THREEx.createAtmosphereMaterial();
			sunAtmMaterial.side	= THREE.BackSide;
			sunAtmMaterial.uniforms.coeficient.value = 0.27;
			sunAtmMaterial.uniforms.power.value	= 15;
			sunAtmMaterial.uniforms.glowColor.value	= glowColor;
			var sunAtmMesh	= new THREE.Mesh(sunAtmGeo , sunAtmMaterial);
			sunAtmMesh.scale.multiplyScalar(1.2);
			scene.add(sunAtmMesh);
			sunAtmMesh.objName = "sun";
	
				// Действия для Солнца
			reserveDomEvent(sunAtmMesh);
					Solar.TextLabels["sun"] = makeTextSprite(THREEx.PlanetData["sun"].Name, {
					"fontface" : "Helvetica",
					"fontsize" : 45,
					"borderThickness" : 0,
					"borderColor" : {
						r: 0,
						g: 0,
						b: 0,
						a: 0
					},
					"backgroundColor" : {
						r: 0,
						g: 0,
						b: 0,
						a: 0
					}
				});
				
				sunAtmMesh.add(Solar.TextLabels["sun"]);
				Solar.TextLabels["sun"].objName = planet;
				Solar.TextLabels["sun"].position.y += THREEx.PlanetData["sun"].Radius*1.1;
			//
	
			// Астероиды
			var astGeometry = new THREE.Geometry(), astMaterial = new THREE.ParticleBasicMaterial({
				color: 0x844e2e,
				size: Solar.particleSize,
				map: THREE.ImageUtils.loadTexture(
					"components/images/astTexture.png"
				),
				transparent:true
			});
			for(var i=0;i<Solar.particleCount;i++) {
				var coords = Solar.astRand(i);
				astGeometry.vertices.push( new THREE.Vector3( coords.x, coords.y, coords.z ) );
			}
	
			var astSystem = new THREE.ParticleSystem(astGeometry,astMaterial);
			astSystem.sortParticles = true;
			scene.add(astSystem);
			var asteroidsLabel = makeTextSprite("Пояс астероидов", {
					"fontface" : "Helvetica",
					"fontsize" : 35,
					"borderThickness" : 0,
					"borderColor" : {
						r: 0,
						g: 0,
						b: 0,
						a: 0
					},
					"backgroundColor" : {
						r: 0,
						g: 0,
						b: 0,
						a: 0
					}
			});
			scene.add(asteroidsLabel);
			asteroidsLabel.position.set(THREEx.PlanetData.mars.Distance*1.4, 3, 0);
			//
			var asystv = 0, lookFromPositionX=0, lookFromPositionZ=0;
			var render = function (time) {
		
				requestAnimationFrame( render );
				
				TWEEN.update(time);
				
				starField.rotation.z += Solar.galaxyVelocity;
				
				for(var planet in planetObj) {
						planetObj[planet].position.x = THREEx.PlanetData[planet].Distance*Math.cos(THREEx.PlanetData[planet].Angle); //
						planetObj[planet].position.z = -THREEx.PlanetData[planet].Distance*Math.sin(THREEx.PlanetData[planet].Angle); //
						planetObj[planet].position.y = -planetObj[planet].position.x*Math.tan(THREEx.PlanetData[planet].Eq);
						if(planetObj[planet].position.y > 0) {
							planetObj[planet].position.x += THREEx.PlanetData[planet].Distance*(1-Math.cos(THREEx.PlanetData[planet].Eq))
						}
						if(planetObj[planet].position.y < 0) {
							planetObj[planet].position.x -= THREEx.PlanetData[planet].Distance*(1-Math.cos(THREEx.PlanetData[planet].Eq))
						}
						THREEx.PlanetData[planet].Angle += THREEx.PlanetData[planet].Velocity; 										  //
					
						if(planet == "venus" || planet == "uranus") planetObj[planet].rotation.y -= THREEx.PlanetData[planet].Day*2*Math.PI;
						else planetObj[planet].rotation.y += THREEx.PlanetData[planet].Day*2*Math.PI; 
				}
				
				planetObj["pluto"].position.y+=175;
				planetObj["pluto"].position.x += (planetObj["pluto"].position.y > 0 ? 1 : -1)*205;
				
				phantom.position.x = planetObj["earth"].position.x;
				phantom.position.z = planetObj["earth"].position.z;
				phantom.rotation.y += THREEx.PlanetData.earth.Day*2*Math.PI/27.69;
				
				saturnRing.position.x = THREEx.PlanetData.saturn.Distance*Math.cos(THREEx.PlanetData.saturn.Angle);
				saturnRing.position.z = -THREEx.PlanetData.saturn.Distance*Math.sin(THREEx.PlanetData.saturn.Angle);
				saturnRing.position.y = -planetObj["saturn"].position.x*Math.tan(THREEx.PlanetData.saturn.Eq);
				
				//sun.rotation.y += THREEx.PlanetData.sun.Day*2*Math.PI*THREEx.VF;
				
				
				
				/*Размещаем камеру около выбранной планеты*/
				if(Solar.lookFrom) {
					if(Solar.lookFrom != "sun") {
						lookFromPositionX = planetObj[Solar.lookFrom].position.x, lookFromPositionZ = planetObj[Solar.lookFrom].position.z;
						Solar.lookFromTan = Math.abs(lookFromPositionZ/lookFromPositionX);
						var newPos = Math.abs(lookFromPositionX)+THREEx.PlanetData[Solar.lookFrom].Radius*4*Math.cos(Math.atan(Solar.lookFromTan));
						camera.position.x = ((lookFromPositionX>0) ? 1 : -1)*newPos;
						camera.position.y = planetObj[Solar.lookFrom].position.y;
						camera.position.z = ((lookFromPositionZ>=0) ? 1: -1)*newPos*Solar.lookFromTan;
					}
				}
				/**/
				
				if(THREEx.VF < 1) {
					Solar.days+=THREEx.VF;
					if((Solar.days-Math.floor(Solar.days))>=0.96) Solar.days = Math.round(Solar.days);
				}
				else if(THREE.VF = 1) Solar.days++;
				if(Solar.days>Solar.monthDays[Solar.months-1]) {
					Solar.months++;
					Solar.days = 1;
				}
				
				if(Solar.months>12) {
					Solar.years++;
					Solar.months = 1;
					Solar.days = 1;
				}
				
				year.text(Solar.years);
				month.text(Solar.months);
				day.text(Math.floor(Solar.days));
				
				controls.update();

				renderer.render(scene, camera);
			};

			render();
	
			function DrawTrackLine(color, radius, segments) {
				var material = new THREE.MeshBasicMaterial({
					color:color
				})
				var geometry = new THREE.CircleGeometry(radius, segments);
				geometry.vertices.shift();
				return new THREE.Line(geometry, material);
			}
	
			function makeTextSprite( message, parameters ) {
				if ( parameters === undefined ) parameters = {};

				var fontface = parameters.hasOwnProperty("fontface") ? 
					parameters["fontface"] : "Arial";

				var fontsize = parameters.hasOwnProperty("fontsize") ? 
					parameters["fontsize"] : 18;

				var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
					parameters["borderThickness"] : 4;

				var borderColor = parameters.hasOwnProperty("borderColor") ?
					parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };

				var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
					parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');
				context.font = "Bold " + fontsize + "px " + fontface;

				var metrics = context.measureText( message );
				var textWidth = metrics.width;

				context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
											  + backgroundColor.b + "," + backgroundColor.a + ")";
				context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
											  + borderColor.b + "," + borderColor.a + ")";
				context.lineWidth = borderThickness;
				roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);

				context.fillStyle = "rgba(255, 255, 255, 1.0)";

				context.fillText( message, borderThickness, fontsize + borderThickness);

				var texture = new THREE.Texture(canvas) 
				texture.needsUpdate = true;

				var spriteMaterial = new THREE.SpriteMaterial( 
					{ map: texture, useScreenCoordinates: false } );
				var sprite = new THREE.Sprite( spriteMaterial );
				sprite.scale.set(100,50,1.0);
				return sprite;	
			}
	
			function roundRect(ctx, x, y, w, h, r) {
				ctx.beginPath();
				ctx.moveTo(x+r, y);
				ctx.lineTo(x+w-r, y);
				ctx.quadraticCurveTo(x+w, y, x+w, y+r);
				ctx.lineTo(x+w, y+h-r);
				ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
				ctx.lineTo(x+r, y+h);
				ctx.quadraticCurveTo(x, y+h, x, y+h-r);
				ctx.lineTo(x, y+r);
				ctx.quadraticCurveTo(x, y, x+r, y);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();   
			}
	
			function reserveDomEvent(object) {
				domEvents.addEventListener(object, "mouseover", function(event) {
					$("body").toggleClass("pointer");
				}, false);
				
				domEvents.addEventListener(object, "mouseout", function(event) {
					$("body").removeClass("pointer");
				}, false);
				
				domEvents.addEventListener(object, "click", function(event) {
					if(event.target.objName!="sun") {
						var tween = new TWEEN.Tween(camera.position).to({
							x: event.target.position.x,
							y: event.target.position.y,
							z: event.target.position.z
						}, 1000).onComplete(function() {
						camera.lookAt(sunAtmMesh);
						}).easing(TWEEN.Easing.Cubic.InOut).start();
					}
					else setDefaultCameraPosition();
					setTimeout(function(){
						Solar.lookFrom = event.target.objName;
						$.getJSON("components/js/json/"+Solar.lookFrom+".json", function(data) {
							planetInfoContent.html(data.info);
							planetInfo.toggle();
							planetInfo.setAttribute("heading", THREEx.PlanetData[Solar.lookFrom].Name);
						});
						closeInfo.click(function() {
							if(event.target.objName!="sun")
								goToSun.fadeIn();
						});
					}, 1100);
				}, false);	
			}
	
			goToSun.children("paper-button").click(function() {
				setDefaultCameraPosition();
				$(this).parent().fadeOut();
			});
	
			function setDefaultCameraPosition() {
				if(event.target.objName!="sun")
					Solar.lookFrom = "sun";
				var tween = new TWEEN.Tween(camera.position).to({
						x: Solar.cameraPosition.x,
						y: Solar.cameraPosition.y,
						z: Solar.cameraPosition.z
					}, 2000).onComplete(function() {
						camera.lookAt(sunAtmMesh);
				}).easing(TWEEN.Easing.Cubic.InOut).start();
			}
	
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}
});
