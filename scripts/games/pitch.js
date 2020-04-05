'use strict';

class Pitch
{
        constructor(screen)
        {
		console.log("new pitch");
		
		//width and height for this canvas
		screen.mCanvas.width = 480;
		screen.mCanvas.height = 270;

		//document.body.insertBefore(this.mCanvas,document.body.childNodes[0]);
		document.getElementById("rondo_screen_html_id").appendChild(screen.mCanvas);

		this.mFrameNumber = 0;
		this.mInterval = setInterval(this.update,20);
	}

	update()
	{
		//update players
		
		//console.log('delta:' + APPLICATION.mDelta);	
	}
}

