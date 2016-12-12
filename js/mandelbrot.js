//function mandelbrot(x, y){
function mandelbrot(x, y){

	var i = 0;
	var zReal = 0.0;
	var zImaginary = 0.0;
	var zrSquared = 0;
	var ziSquared = 0;

	// Ensure that we are within bounds and haven't exceeded maxIterations
	for ( ; i<maxIterations && (zrSquared + ziSquared)<=4; ++i ) {
		zImaginary = 2 * zReal * zImaginary + y;
		zReal = zrSquared - ziSquared + x;
		zrSquared = zReal * zReal;
		ziSquared = zImaginary * zImaginary
	}

	return [i, zrSquared, ziSquared];
}

function mapToReal(x){
	let range = maxR - minR;
	return x * (range / width) + minR;
}

function mapToImaginary(y){
	let range = maxI - minI;
	return y * (range / height) + minI;
}


function mapScreenPixelsToCoordinatePlane(pixel, maxPixel, planeMin, planeMax){
	let range = planeMax - planeMin;
	let positionOnPixels = pixel / maxPixel;
	let planeOffset = range * positionOnPixels;

	let planePositionForPixel = planeMin + planeOffset;
	return planePositionForPixel;
}