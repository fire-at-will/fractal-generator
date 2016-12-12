var startX;
var startY;
var canvasOffset;
var offsetX;
var offsetY;

function redraw(){
	generateMandelbrot();
}

function onMouseDown(e){
	// Get mouse coordinates
	let mouseX = parseInt(e.clientX - offsetX);
	let mouseY = parseInt(e.clientY - offsetY);

	/*
	* We're dealing with two coordinate planes here: 
	*	1) The physical coordinate plane on the screen that comprises of pixels
	*	2) The logical coordinate plane of real numbers on the X axis and complex
	*		numbers on the Y axis.
	*
	* We need to convert from plane 1 to 2 in order to get the proper values of min/max R
	* and I in order to properly zoom.
	*/

	// Calculate new center of the view (in logical coordinate plane)
	// based on where the user clicks.
	let centerX = mapScreenPixelsToCoordinatePlane(mouseX, width, minR, maxR);
	let centerY = mapScreenPixelsToCoordinatePlane(mouseY, height, minI, maxI);

	if(e.shiftKey){
		// Zoom out
		// Zoom out on the point while maintaining aspect ratio
		let rRange = maxR - minR;
		let iRange = maxI - minI;

		let zoom = 1 + zoomRate;

		minR = centerX - ((rRange / 2) * zoom);
		maxR = centerX + ((rRange / 2) * zoom);

		minI = centerY - ((iRange / 2) * zoom);
		maxI = centerY + ((iRange / 2) * zoom);
	} else {
		// Zoom in
		// Zoom in on the point while maintaining aspect ratio
		let rRange = maxR - minR;
		let iRange = maxI - minI;

		let zoom = 1 - zoomRate;

		minR = centerX - ((rRange / 2) * zoom);
		maxR = centerX + ((rRange / 2) * zoom);

		minI = centerY - ((iRange / 2) * zoom);
		maxI = centerY + ((iRange / 2) * zoom);
	}

	// Now that we've adjusted our parameters, let's redraw the fractal.
	generateMandelbrot();

}


// -------------------------------- Fullscreen Stuff --------------------------------

function toggleFullscreen(){
	if(!fullscreen){
		enterFullscreen();
	} else {
		exitFullscreen();
	}
}

function enterFullscreen(){
	if (
		document.fullscreenEnabled || 
		document.webkitFullscreenEnabled || 
		document.mozFullScreenEnabled ||
		document.msFullscreenEnabled
	) {
		let screen = document.getElementById("screen")
		if (screen.requestFullscreen) {
			screen.requestFullscreen();
			fullscreen = true;
		} else if (screen.webkitRequestFullscreen) {
			screen.webkitRequestFullscreen();
			fullscreen = true;
		} else if (screen.mozRequestFullScreen) {
			screen.mozRequestFullScreen();
			fullscreen = true;
		} else if (screen.msRequestFullscreen) {
			screen.msRequestFullscreen();
			fullscreen = true;
		}
		onLoad()
	} else {
		alert("Cannot do full screen");
	}
}

function exitFullscreen(){
	if (document.exitFullscreen) {
		document.exitFullscreen();
		fullscreen = false;
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
		fullscreen = false;
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
		fullscreen = false;
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
		fullscreen = false;
	}

	onLoad();
}