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

		this.mClient = new Client();

		this.mPlayerArray = new Array();

			
		this.mPlayerArray.push(new Player(this,30,30,'#87CEEB'));
		this.mPlayerArray.push(new Player(this,400,30,'#87CEEB'));
		this.mPlayerArray.push(new Player(this,30,200,'#87CEEB'));

		this.mPlayerArray.push(new Player(this,200,150,'red'));

	}

	update()
	{
		//APPLICATION.getCurrentScreen().mPitch.mPlayerArray();
		if (APPLICATION.getCurrentScreen().mPitch)
		{
			for (var i = 0; i <  APPLICATION.getCurrentScreen().mPitch.mPlayerArray.length; i++)
			{
				APPLICATION.getCurrentScreen().mPitch.mPlayerArray[i].update();
			}
		}
		APPLICATION.getCurrentScreen().mPitch.mClient.update();
	}
}

