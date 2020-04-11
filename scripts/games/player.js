'use strict';

class Player
{
        constructor(id,pitch,x,y,color)
        {
		this.mPitch = pitch;
		this.mContext = pitch.mScreen.mContext;
		console.log("new player");
		this.x = x;
		this.y = y;
		this.mColor = color;

		this.mId = id;

		//need to scale this... 
		/*
		screenWidth/105 gives pixels per meter 
			
			
			
		*/
		this.mSize = 1;

	}

	update()
	{
		//this.mSize	
		var physicalWidth = this.mPitch.mScreen.mCanvas.width; 
		var physicalHeight = this.mPitch.mScreen.mCanvas.height; 


		var pixelsPerMeterOfFieldWidth = physicalWidth / 105;
		var pixelsPerMeterOfFieldHeigth = physicalHeight / 68;

		var playerWidth = pixelsPerMeterOfFieldWidth * .41; 

		



		this.mContext.beginPath();
  		this.mContext.fillStyle = this.mColor;
  		this.mContext.arc(this.x, this.y, playerWidth, 0, Math.PI * 360);
  		this.mContext.fill();
	}
}

