'use strict';

class Pitch
{
        constructor(screen)
        {
		console.log("new pitch");
		/*
		var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
	*/

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

