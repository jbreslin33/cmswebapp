'use strict';

class Pitch
{
        constructor(screen)
        {
		this.mScreen = screen;
		console.log("new pitch");
		
		//width and height for this canvas
		screen.mCanvas.width = 480;
		screen.mCanvas.height = 270;

		//document.body.insertBefore(this.mCanvas,document.body.childNodes[0]);
		document.getElementById("rondo_screen_html_id").appendChild(screen.mCanvas);

		this.mFrameNumber = 0;
		this.mInterval = setInterval(this.update,20);

		this.mPlayerArray = new Array();

		//add players
		/*
		for (var i = 0; i < 4; i++)
		{
			var player = new Player(this,10*i,10*i); 
			this.mPlayerArray.push(player);
		}
		*/
		this.mPlayerArray.push(new Player(this,30,30,'blue'));
		this.mPlayerArray.push(new Player(this,400,30,'blue'));
		this.mPlayerArray.push(new Player(this,30,200,'blue'));

		this.mPlayerArray.push(new Player(this,200,150,'red'));

	}

	update()
	{
		//APPLICATION.getCurrentScreen().mPitch.mPlayerArray();
		for (var i = 0; i <  APPLICATION.getCurrentScreen().mPitch.mPlayerArray.length; i++)
		{
			 APPLICATION.getCurrentScreen().mPitch.mPlayerArray[i].update();
		}
	}
}

