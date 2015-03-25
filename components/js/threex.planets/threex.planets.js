var THREEx = THREEx || {}

THREEx.Planets	= {}

THREEx.EarthRadConst = 1.4,
THREEx.AstronomicDistance = /*703.668861*/ 390; 
THREEx.BaseVelocity = 0.005;
THREEx.RF = 4; // Коэффициент увеличения радиуса 
THREEx.VF = 0.01; // Коэффициент увеличения скорости движения

var sr = THREEx.EarthRadConst*109, ad = THREEx.AstronomicDistance, bv = THREEx.BaseVelocity;

THREEx.PlanetData = {
	sun: {
		Radius:sr,
		Distance:0,
		Day:0.0394,
		Year:0,
		Velocity:0,
		Angle:0,
		Eq:0,
		Name:"СОЛНЦЕ"
	},
	mercury: {
		Radius:THREEx.EarthRadConst*0.382*THREEx.RF,
		Distance:0.387*ad+sr,
		Day:0.017*THREEx.VF,
		Year:0,
		Track: 0x1abc9c,
		Velocity:0.0713*THREEx.VF,
		Angle:0,
		Eq:0.122,
		Name:"МЕРКУРИЙ"
	},
	venus: {
		Radius:THREEx.EarthRadConst*0.94*THREEx.RF,
		Distance:0.723*ad+sr,
		Day:0.00411*THREEx.VF,
		Year:0,
		Track: 0xf1c40f,
		Velocity:0.0279*THREEx.VF,
		Angle:0,
		Eq:0.0591,
		Name:"ВЕНЕРА"
	},
	earth: {
		Radius:THREEx.EarthRadConst*THREEx.RF,
		Distance:1*ad+sr,
		Day:1*THREEx.VF,
		Year:0,
		Track: 0x3498db,
		Velocity: 0.0172*THREEx.VF,
		Angle:0,
		Eq:0,
		Name:"ЗЕМЛЯ И ЛУНА"
	},
	moon: {
		Radius:THREEx.EarthRadConst*0.273*THREEx.RF,
		Distance:12,
		Day:0,
		Year:0,
		Eq:0		
	},
	mars: {
		Radius:THREEx.EarthRadConst*0.532*THREEx.RF,
		Distance:1.524*ad+sr,
		Day:0.97959*THREEx.VF,
		Year:0,
		Track: 0xf39c12,
		Velocity: 0.00914*THREEx.VF,
		Angle:0,
		Eq:0.0323,
		Name:"МАРС"
	},
	jupiter: {
		Radius:THREEx.EarthRadConst*11.19*THREEx.RF,
		Distance:5.204*ad+sr,
		Day:2.4*THREEx.VF,
		Year:0,
		Track: 0x2ecc71,
		Velocity: 0.001445*THREEx.VF,
		Angle:0,
		Eq:0.0228,
		Name:"ЮПИТЕР"
	},
	saturn: {
		Radius:THREEx.EarthRadConst*9.439*THREEx.RF,
		Distance:9.56*ad+sr,
		Day:2.353*THREEx.VF,
		Year:0,
		Track: 0x27ae60,
		Velocity: 0.000583*THREEx.VF,
		Angle:0,
		Eq:0.0434,
		Name:"САТУРН"
	},
	uranus: {
		Radius:THREEx.EarthRadConst*4*THREEx.RF,
		Distance:19.18*ad+sr,
		Day:1.4117*THREEx.VF,
		Year:0,
		Track: 0xe67e22,
		Velocity: 0.0002047*THREEx.VF,
		Angle:0,
		Eq:0,
		Name:"УРАН"
	},
	neptune: {
		Radius:THREEx.EarthRadConst*3.878*THREEx.RF,
		Distance:30*ad+sr,
		Day:1.348*THREEx.VF,
		Year:0,
		Track: 0x3498db,
		Velocity: 0.0001043*THREEx.VF,
		Angle:0,
		Eq:0.031,
		Name:"НЕПТУН"
	},
	pluto : {
		Radius:THREEx.EarthRadConst*3.878*THREEx.RF,
		Distance:39.482*ad+sr,
		Day:0.15625*THREEx.VF,
		Year:0,
		Track: 0xd35400,
		Velocity: (6.94e-5)*THREEx.VF,
		Angle:0,
		Eq:0.296,
		Name:"ПЛУТОН"
	}
}

//console.log("1 a.e. = "+THREEx.AstronomicDistance);


THREEx.Planets.baseURL	= 'components/js/threex.planets/'

// from http://planetpixelemporium.com/

THREEx.Planets.createSun	= function(){
	var geometry	= new THREE.SphereGeometry(THREEx.PlanetData.sun.Radius, 64, 64)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/sunmap.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.1,
		emissive: 0xFAFF63
	})
	var mesh	= new THREE.Mesh(geometry, material);
	return mesh	
}

THREEx.Planets.createMercury	= function(){
	var geometry	= new THREE.SphereGeometry(THREEx.PlanetData.mercury.Radius, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/mercurymap.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/mercurybump.jpg'),
		bumpScale: 0.005,
	})
	var mesh	= new THREE.Mesh(geometry, material);
	return mesh;
}

THREEx.Planets.createVenus	= function(){
	var geometry	= new THREE.SphereGeometry(THREEx.PlanetData.venus.Radius, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/venusmap.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/venusbump.jpg'),
		bumpScale: 0.005,
	})
	var mesh	= new THREE.Mesh(geometry, material);
	return mesh	
}

THREEx.Planets.createEarth	= function(){
	var geometry	= new THREE.SphereGeometry(THREEx.PlanetData.earth.Radius, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map		: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/earthmap1k.jpg'),
		bumpMap		: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/earthbump1k.jpg'),
		bumpScale	: 0.01,
		specularMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/earthspec1k.jpg'),
		specular	: new THREE.Color('grey'),
	})
	var mesh	= new THREE.Mesh(geometry, material);
	return mesh	
}

THREEx.Planets.createEarthCloud	= function(){
	// create destination canvas
	var canvasResult	= document.createElement('canvas')
	canvasResult.width	= 1024
	canvasResult.height	= 512
	var contextResult	= canvasResult.getContext('2d')		

	// load earthcloudmap
	var imageMap	= new Image();
	imageMap.addEventListener("load", function() {
		
		// create dataMap ImageData for earthcloudmap
		var canvasMap	= document.createElement('canvas')
		canvasMap.width	= imageMap.width
		canvasMap.height= imageMap.height
		var contextMap	= canvasMap.getContext('2d')
		contextMap.drawImage(imageMap, 0, 0)
		var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

		// load earthcloudmaptrans
		var imageTrans	= new Image();
		imageTrans.addEventListener("load", function(){
			// create dataTrans ImageData for earthcloudmaptrans
			var canvasTrans		= document.createElement('canvas')
			canvasTrans.width	= imageTrans.width
			canvasTrans.height	= imageTrans.height
			var contextTrans	= canvasTrans.getContext('2d')
			contextTrans.drawImage(imageTrans, 0, 0)
			var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
			// merge dataMap + dataTrans into dataResult
			var dataResult		= contextMap.createImageData(canvasMap.width, canvasMap.height)
			for(var y = 0, offset = 0; y < imageMap.height; y++){
				for(var x = 0; x < imageMap.width; x++, offset += 4){
					dataResult.data[offset+0]	= dataMap.data[offset+0]
					dataResult.data[offset+1]	= dataMap.data[offset+1]
					dataResult.data[offset+2]	= dataMap.data[offset+2]
					dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0]
				}
			}
			// update texture with result
			contextResult.putImageData(dataResult,0,0)	
			material.map.needsUpdate = true;
		})
		imageTrans.src	= THREEx.Planets.baseURL+'images/earthcloudmaptrans.jpg';
	}, false);
	imageMap.src	= THREEx.Planets.baseURL+'images/earthcloudmap.jpg';

	var geometry	= new THREE.SphereGeometry(0.51, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map		: new THREE.Texture(canvasResult),
		side		: THREE.DoubleSide,
		transparent	: true,
		opacity		: 0.8,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}


THREEx.Planets.createMoon	= function(){
	var geometry	= new THREE.SphereGeometry(THREEx.PlanetData.moon.Radius, 32, 32);
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/moonmap1k.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/moonbump1k.jpg'),
		bumpScale: 0.002,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createMars	= function(){
	var geometry	= new THREE.SphereGeometry(THREEx.PlanetData.mars.Radius, 32, 32);
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/marsmap1k.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/marsbump1k.jpg'),
		bumpScale: 0.05,
	})
	var mesh	= new THREE.Mesh(geometry, material);
	return mesh	
}

THREEx.Planets.createJupiter	= function(){
	var geometry	= new THREE.SphereGeometry(THREEx.PlanetData.jupiter.Radius, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/jupitermap.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.02,
	})
	var mesh	= new THREE.Mesh(geometry, material);
	//mesh.position.x -= THREEx.PlanetData.jupiter.Distance;
	return mesh	
}


THREEx.Planets.createSaturn	= function(){
	var geometry	= new THREE.SphereGeometry(THREEx.PlanetData.saturn.Radius, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/saturnmap.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.05,
		shininess: 60
	})
	var mesh	= new THREE.Mesh(geometry, material);
	return mesh	
}


THREEx.Planets.createSaturnRing	= function(){
	// create destination canvas
	var canvasResult	= document.createElement('canvas')
	canvasResult.width	= 915
	canvasResult.height	= 64
	var contextResult	= canvasResult.getContext('2d')	

	// load earthcloudmap
	var imageMap	= new Image();
	imageMap.addEventListener("load", function() {
		
		// create dataMap ImageData for earthcloudmap
		var canvasMap	= document.createElement('canvas')
		canvasMap.width	= imageMap.width
		canvasMap.height= imageMap.height
		var contextMap	= canvasMap.getContext('2d')
		contextMap.drawImage(imageMap, 0, 0)
		var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

		// load earthcloudmaptrans
		var imageTrans	= new Image();
		imageTrans.addEventListener("load", function(){
			// create dataTrans ImageData for earthcloudmaptrans
			var canvasTrans		= document.createElement('canvas')
			canvasTrans.width	= imageTrans.width
			canvasTrans.height	= imageTrans.height
			var contextTrans	= canvasTrans.getContext('2d')
			contextTrans.drawImage(imageTrans, 0, 0)
			var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
			// merge dataMap + dataTrans into dataResult
			var dataResult		= contextMap.createImageData(canvasResult.width, canvasResult.height)
			for(var y = 0, offset = 0; y < imageMap.height; y++){
				for(var x = 0; x < imageMap.width; x++, offset += 4){
					dataResult.data[offset+0]	= dataMap.data[offset+0]
					dataResult.data[offset+1]	= dataMap.data[offset+1]
					dataResult.data[offset+2]	= dataMap.data[offset+2]
					dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0]/4
				}
			}
			// update texture with result
			contextResult.putImageData(dataResult,0,0)	
			material.map.needsUpdate = true;
		})
		imageTrans.src	= THREEx.Planets.baseURL+'images/saturnringpattern.gif';
	}, false);
	imageMap.src	= THREEx.Planets.baseURL+'images/saturnringcolor.jpg';
	
	var geometry	= new THREEx.Planets._RingGeometry(THREEx.PlanetData.saturn.Radius*1.85, 0.75, 64);
	var material	= new THREE.MeshPhongMaterial({
		map		: new THREE.Texture(canvasResult),
		// map		: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/ash_uvgrid01.jpg'),
		side		: THREE.DoubleSide,
		transparent	: true,
		opacity		: 1,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	mesh.lookAt(new THREE.Vector3(0.5,-4,1))
	return mesh	
}


THREEx.Planets.createUranus	= function(){
	var geometry	= new THREE.SphereGeometry(THREEx.PlanetData.uranus.Radius, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/uranusmap.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.05,
	})
	var mesh	= new THREE.Mesh(geometry, material);
	return mesh	
}

THREEx.Planets.createUranusRing	= function(){
	// create destination canvas
	var canvasResult	= document.createElement('canvas')
	canvasResult.width	= 1024
	canvasResult.height	= 72
	var contextResult	= canvasResult.getContext('2d')	

	// load earthcloudmap
	var imageMap	= new Image();
	imageMap.addEventListener("load", function() {
		
		// create dataMap ImageData for earthcloudmap
		var canvasMap	= document.createElement('canvas')
		canvasMap.width	= imageMap.width
		canvasMap.height= imageMap.height
		var contextMap	= canvasMap.getContext('2d')
		contextMap.drawImage(imageMap, 0, 0)
		var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

		// load earthcloudmaptrans
		var imageTrans	= new Image();
		imageTrans.addEventListener("load", function(){
			// create dataTrans ImageData for earthcloudmaptrans
			var canvasTrans		= document.createElement('canvas')
			canvasTrans.width	= imageTrans.width
			canvasTrans.height	= imageTrans.height
			var contextTrans	= canvasTrans.getContext('2d')
			contextTrans.drawImage(imageTrans, 0, 0)
			var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
			// merge dataMap + dataTrans into dataResult
			var dataResult		= contextMap.createImageData(canvasResult.width, canvasResult.height)
			for(var y = 0, offset = 0; y < imageMap.height; y++){
				for(var x = 0; x < imageMap.width; x++, offset += 4){
					dataResult.data[offset+0]	= dataMap.data[offset+0]
					dataResult.data[offset+1]	= dataMap.data[offset+1]
					dataResult.data[offset+2]	= dataMap.data[offset+2]
					dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0]/2
				}
			}
			// update texture with result
			contextResult.putImageData(dataResult,0,0)	
			material.map.needsUpdate = true;
		})
		imageTrans.src	= THREEx.Planets.baseURL+'images/uranusringtrans.gif';
	}, false);
	imageMap.src	= THREEx.Planets.baseURL+'images/uranusringcolour.jpg';
	
	var geometry	= new THREEx.Planets._RingGeometry(0.55, 0.75, 64);
	var material	= new THREE.MeshPhongMaterial({
		map		: new THREE.Texture(canvasResult),
		// map		: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/ash_uvgrid01.jpg'),
		side		: THREE.DoubleSide,
		transparent	: true,
		opacity		: 0.8,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	mesh.lookAt(new THREE.Vector3(0.5,-4,1))
	return mesh	
}


THREEx.Planets.createNeptune	= function(){
	var geometry	= new THREE.SphereGeometry(THREEx.PlanetData.neptune.Radius, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/neptunemap.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.05,
	})
	var mesh	= new THREE.Mesh(geometry, material);
	return mesh	
}



THREEx.Planets.createPluto	= function(){
	var geometry	= new THREE.SphereGeometry(THREEx.PlanetData.pluto.Radius, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/plutomap1k.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/plutobump1k.jpg'),
		bumpScale: 0.005,
	})
	var mesh	= new THREE.Mesh(geometry, material);
	return mesh	
}

THREEx.Planets.createStarfield	= function(){
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'../../images/milky_way.jpg')
	var material	= new THREE.MeshBasicMaterial({
		map	: texture,
		side	: THREE.BackSide
	})
	var geometry	= new THREE.SphereGeometry(28000, 128, 128)
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}


//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

/**
 * change the original from three.js because i needed different UV
 * 
 * @author Kaleb Murphy
 * @author jerome etienne
 */
THREEx.Planets._RingGeometry = function ( innerRadius, outerRadius, thetaSegments ) {

	THREE.Geometry.call( this )

	innerRadius	= innerRadius || 0
	outerRadius	= outerRadius || 50
	thetaSegments	= thetaSegments	|| 8

	var normal	= new THREE.Vector3( 0, 0, 1 )

	for(var i = 0; i < thetaSegments; i++ ){
		var angleLo	= (i / thetaSegments) *Math.PI*2
		var angleHi	= ((i+1) / thetaSegments) *Math.PI*2

		var vertex1	= new THREE.Vector3(innerRadius * Math.cos(angleLo), innerRadius * Math.sin(angleLo), 0);
		var vertex2	= new THREE.Vector3(outerRadius * Math.cos(angleLo), outerRadius * Math.sin(angleLo), 0);
		var vertex3	= new THREE.Vector3(innerRadius * Math.cos(angleHi), innerRadius * Math.sin(angleHi), 0);
		var vertex4	= new THREE.Vector3(outerRadius * Math.cos(angleHi), outerRadius * Math.sin(angleHi), 0);

		this.vertices.push( vertex1 );
		this.vertices.push( vertex2 );
		this.vertices.push( vertex3 );
		this.vertices.push( vertex4 );
		

		var vertexIdx	= i * 4;

		// Create the first triangle
		var face = new THREE.Face3(vertexIdx + 0, vertexIdx + 1, vertexIdx + 2, normal);
		var uvs = []

		var uv = new THREE.Vector2(0, 0)
		uvs.push(uv)
		var uv = new THREE.Vector2(1, 0)
		uvs.push(uv)
		var uv = new THREE.Vector2(0, 1)
		uvs.push(uv)

		this.faces.push(face);
		this.faceVertexUvs[0].push(uvs);

		// Create the second triangle
		var face = new THREE.Face3(vertexIdx + 2, vertexIdx + 1, vertexIdx + 3, normal);
		var uvs = []

		var uv = new THREE.Vector2(0, 1)
		uvs.push(uv)
		var uv = new THREE.Vector2(1, 0)
		uvs.push(uv)
		var uv = new THREE.Vector2(1, 1)
		uvs.push(uv)

		this.faces.push(face);
		this.faceVertexUvs[0].push(uvs);
	}

	//this.computeCentroids();
	this.computeFaceNormals();

	this.boundingSphere = new THREE.Sphere( new THREE.Vector3(), outerRadius );

};
THREEx.Planets._RingGeometry.prototype = Object.create( THREE.Geometry.prototype );


