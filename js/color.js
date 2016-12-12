var colors;
var numberOfColors;
function getPixelColor(n){
	// Map to RGB
	if(Math.floor(n) == maxIterations){
		return [0, 0, 0];
	}

	switch(palatteMode){
		case "Blue":
			color = mapIterationToColorBlue(n);
			break;
		case "Red":
			color = mapIterationToColorRed(n);
			break;
		case "Green":
			color = mapIterationToColorGreen(n);
			break;
		case "Purple":
			color = mapIterationToColorPurple(n);
			break;
	}

	switch(postEffect){
		case "squared":
			color[0] = color[0] * color[0] % 256;
			color[1] = color[1] * color[1] % 256;
			break;
		case "sin":
			color[0] = Math.sin(color[0]);
			color[1] = Math.sin(color[1]);
			color[2] = Math.sin(color[2]);
			break;
		case "tan":
			color[0] = Math.tan(color[0]);
			color[1] = Math.tan(color[1]);
			color[2] = Math.tan(color[2]);
			break;
		default:
			break;
	}

	return color;
}

function getColor(mu){
	// var color1 = Math.floor(mu);
	// var second = mu - color1;
	// var inverse = 1 - second;

	// color1 = color1 % numberOfColors;
	// var color2 = (color1 + 1) % numberOfColors;

	// if(isNaN(color1)){
	// 	//console.log("saved the day");
	// 	color1 = 3;
	// }
	// if(isNaN(color2)){
	// 	//console.log("saved the day again");
	// 	color2 = 3;
	// }

	// //console.log("Color 1 " + color1);

	// //console.log(mu + " " + color1)

	// var r = (colors[color1][0]) * inverse; //+ (colors[color2][0] * second);
	// var g = colors[color1][1] * inverse + colors[color2][1] * second;
	// var b = colors[color1][2] * inverse + colors[color2][2] * second;

	// return colors[color1];

	if(isNaN(mu)){
		mu = 3;
	}

	var colorIndex = parseInt(mu / maxIterations * 768);
    if (colorIndex >= 768) colorIndex = 0;
    if (colorIndex < 0) colorIndex = 0;

    // console.log("Returning " + colorIndex + ": " + colors[colorIndex]);
    return colors[colorIndex];
}

function generateColors(numberOfColors){
	// numberOfColors = numberOfColors;
	colors = [];

	// Blue
	for(var i = 0; i < 768; i++){
		var r = 0;
		var g = 0;
		var b = 0;
		if(i >= 512){
			r = i - 512;
			g = 255 - r;
		} else if(i >= 256){
			g = i - 256;
			b = 255 - g;
		} else {
			b = i;
		}

		colors[i] = [r, g, b];
	}
	// Red
	// for(var i = 0; i < 768; i++){
	// 	var r = 0;
	// 	var g = 0;
	// 	var b = 0;
	// 	if(i >= 512){
	// 		g = i - 512;
	// 		r = 255 - g;
	// 	} else if(i >= 256){
	// 		b = i - 256;
	// 		g = 255 - b;
	// 	} else {
	// 		r = i;
	// 	}

	// 	colors[i] = [r, g, b];
	// }

	// B&W
	// 	for(var i = 0; i < 768; i++){
	// 	var r = 0;
	// 	var g = 0;
	// 	var b = 0;
	// 	if(i >= 512){
	// 		r = i % 768;
	// 		g = i % 768;
	// 		b = i % 768;
	// 	} else if(i >= 256){
	// 		r = i % 768;
	// 		g = i % 768;
	// 		b = i % 768;
	// 	} else {
	// 		r = parseInt(i / 768);
	// 		g = parseInt(i / 768);
	// 		b = parseInt(i / 768);
	// 	}

	// 	colors[i] = [r, g, b];
	// }

	// Grayscale
	// for(var i = 0; i < 768; i++){
	// 	var r = 0;
	// 	var g = 0;
	// 	var b = 0;
	// 	if(i >= 512){
	// 		r = i % 768;
	// 		g = i % 768;
	// 		b = i % 768;
	// 	} else if(i >= 256){
	// 		r = i % 768;
	// 		g = i % 768;
	// 		b = i % 768;
	// 	} else {
	// 		r = i % 768;
	// 		g = i % 768;
	// 		b = i % 768;
	// 	}

	// 	colors[i] = [r, g, b];
	// }
	
}



function mapIterationToColorPurple(iteration){
	var color = {};
	color[0] = iteration * 7919 % 255; 		// R
	color[1] = 60;							// G
	color[2] = iteration * 7919 % 255;		// B

	return color;
}

function mapIterationToColorBlue(iteration){
	var color = {};
	color[0] = Math.floor(iteration * 7919 % 255); 		// R
	color[1] = Math.floor(iteration * 7919 % 255);		// G
	color[2] = 210;							// B

	return color;
}

function mapIterationToColorRed(iteration){
	var color = {};
	color[0] = 210;					 		// R
	color[1] = iteration * 7919 % 255;		// G
	color[2] = iteration * 7919 % 255;		// B

	return color;
}

function mapIterationToColorGreen(iteration){
	var color = {};
	color[0] = iteration * 7919 % 255;		// R
	color[1] = 210;							// G
	color[2] = iteration * 7919 % 255;		// B

	return color;
}

function getSmoothedN(n, Tr, Ti){
	let logBase = 1.0 / Math.log(2.0);
	let logHalfBase = Math.log(0.5)*logBase;
	return 5 + n - logHalfBase - Math.log(Math.log(Tr+Ti))*logBase;
}

function performAntialiasing(pixels, width, height){
	var x;
	var y;

	for(x = 0; x < width; x++){
		for(y = 0; y < height; y++){

			// Get pixels
			var above  = getAbove(x, y);
			var below  = getBelow(x, y);
			var left   = getLeft(x, y);
			var right  = getRight(x, y);
			var center = pixels[indexForCoords(x, y)];

			// Calculate RGB average for all relevant pixels
			var count = 1;

			if(above != null){
				center[0] += above[0];
				center[1] += above[1];
				center[2] += above[2];
				count++;
			}
			if(below != null){
				center[0] += below[0];
				center[1] += below[1];
				center[2] += below[2];
				count++;				
			}
			if(left != null){
				center[0] += left[0];
				center[1] += left[1];
				center[2] += left[2];
				count++;				
			}
			if(right != null){
				center[0] += right[0];
				center[1] += right[1];
				center[2] += right[2];
				count++;				
			}

			center[0] = parseInt(center[0] / count);
			center[1] = parseInt(center[1] / count);
			center[2] = parseInt(center[2] / count);

			// Set pixels to have avg pixel
			pixels[indexForCoords(x, y)] = center;
		}
	}

	return pixels;

	function getAbove(x, y){
		if(y == 0){
			return null;
		} else {
			return pixels[indexForCoords(x, y - 1)];
		}
	}

	function getBelow(x, y){
		if(y == height - 1){
			return null;
		} else {
			return pixels[indexForCoords(x, y + 1)];
		}
	}

	function getLeft(x, y){
		if(x == 0){
			return null;
		} else {
			return pixels[indexForCoords(x - 1, y)];
		}
	}

	function getRight(x, y){
		if(x == 0){
			return null;
		} else {
			return pixels[indexForCoords(x + 1, y)];
		}
	}

	function indexForCoords(x, y){
		return (y * width) + x;
	}
}