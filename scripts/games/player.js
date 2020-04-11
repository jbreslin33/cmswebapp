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

		this.drawX = x;
		this.drawY = y;

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
		//update player size based on physical screen size	
		var physicalWidth = this.mPitch.mScreen.mCanvas.width; 
		var physicalHeight = this.mPitch.mScreen.mCanvas.height; 
		var pixelsPerMeterOfFieldWidth = physicalWidth / 105;
		var pixelsPerMeterOfFieldHeigth = physicalHeight / 68;
		var playerWidth = pixelsPerMeterOfFieldWidth * .41; 

		
		//translate server and real world cartesian coordinate of player to this screen
		var originX = physicalWidth / 2; 
		var originY = physicalHeight / 2; 

		var fieldWidth = 105;
		var fieldHeigt = 68; 
		var eastTouchLine = -52.5;
		var westTouchLine = 52.5;
		var northTouchLine = 34
		var southTouchLine = -34

		//so if you are at 5x then you are 5 * pixelsPerMeterOfFieldWidth

		this.drawX = (this.x * pixelsPerMeterOfFieldWidth) + originX; 
		this.drawY = (this.y * pixelsPerMeterOfFieldWidth) + originY; 


		this.mContext.beginPath();
  		this.mContext.fillStyle = this.mColor;
  		this.mContext.arc(this.drawX, this.drawY, playerWidth, 0, Math.PI * 360);
  		this.mContext.fill();
	}
}

