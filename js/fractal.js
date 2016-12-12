var minR = -2.3;		//-2.3, 1.5, -1.2, 1.2
var maxR = 1.5;

var minI = -1.2;
var maxI = 1.2;

let zoomRate = .60;		// Zoom in 20% each time

var maxIterations = 100;
var numberOfColors = 1000;
var antialiasing = false;

var fullscreen = false;
var palatteMode = "Blue";
var postEffect = "squared";

var height;
var width; 

var pixels;

function onLoad(){

	height 		= window.innerHeight;
	width		= window.innerWidth;

	initCanvas(width, height);

	generateColors(numberOfColors);

	$('#palatte-list a').on('click', function(){
    	palatteMode = $(this).text();
    	$('#palatte-dropdown').text(palatteMode);
	});

	$('#iteration-input').change(function(){
		maxIterations = parseInt($('#iteration-input').val());
		console.log(maxIterations);
	});

	generateMandelbrot();
}


function generateMandelbrot(){
	// First, reset all pixels
	pixels = [];

	console.log("New zoom: X: " + minR + ", " + maxR + " Y: " + minI + ", " + maxI + ".");

	// For each row...
	for(var y = 0; y < height; y++){
		// For each column...
		for(var x = 0; x < width; x++){

			let cr = mapToReal(x);
			let ci = mapToImaginary(y);

			var result = mandelbrot(cr, ci);
			var n = result[0];	// Unsmoothed
			n = getSmoothedN(n, result[1], result[2]);
			if(n == NaN){
				n = 10;
			}
			//n = n + 1 - Math.log()
			//var color = getPixelColor(n);
			var color = getColor(n);

			//pixels.push(color);
			if(antialiasing){
				pixels.push(color);
			} else {
				setPixelRGB(x, y, color[0], color[1], color[2]);
			}
			
		}
	}

	if(antialiasing){
		pixels = performAntialiasing(pixels, width, height);
		drawFractalToCanvas(pixels);
	}

	console.log("Done!");
}

