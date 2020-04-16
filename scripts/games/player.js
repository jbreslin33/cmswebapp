'use strict';

class Player
{
        constructor(id,pitch,x,y,color)
        {
		this.mPitch = pitch;
		this.mContext = pitch.mScreen.mContext;
		this.x = x;
		this.y = y;

		this.mLooking = 0.0;
		this.mFacingAngle = 0.0;

		this.drawX = x;
		this.drawY = y;

		this.mColor = color;

		this.mId = id;

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
      		this.mContext.arc(this.drawX, this.drawY, playerWidth, 0, 2 * Math.PI, false);
     		//this.mContext.fillStyle = 'green';
     		this.mContext.fillStyle = this.mColor;
      		this.mContext.fill();


//legs and facing
		var startAngle = 1.1 * Math.PI;
      		var endAngle = 1.9 * Math.PI;
      		var counterClockwise = false;

      		this.mContext.beginPath();
      		this.mContext.arc(this.drawX, this.drawY, playerWidth, startAngle, endAngle, counterClockwise);
      		this.mContext.lineWidth = 15;

      		// line color
      		this.mContext.strokeStyle = 'black';
      		this.mContext.stroke();
	}
}

