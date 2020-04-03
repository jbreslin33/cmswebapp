'use strict';

class Player
{
        constructor(screen)
        {
		console.log("new player");

		this.mCanvas = document.createElement("canvas");
		this.mCanvas.width = 480;
		this.mCanvas.height = 270;
		this.mContext = this.mCanvas.getContext("2d");

		//document.body.insertBefore(this.mCanvas,document.body.childNodes[0]);
		document.getElementById("rondo_screen_html_id").appendChild(this.mCanvas);

		this.mFrameNumber = 0;
		this.mInterval = setInterval(this.update,20);
	}

	clear()
	{
		this.mContext.clearRect(0, 0, this.mCanvas.width, this.mCanvas.height);
	}

	update()
	{

	}
}

