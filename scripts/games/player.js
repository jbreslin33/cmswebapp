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

		this.mAngle = 1;
	}

	update()
	{
		//update player size based on physical screen size	
		var physicalWidth = this.mPitch.mScreen.mCanvas.width; 
		var physicalHeight = this.mPitch.mScreen.mCanvas.height; 
		var pixelsPerMeterOfFieldWidth = physicalWidth / 105;
		var pixelsPerMeterOfFieldHeigth = physicalHeight / 68;
		//this.mSize = pixelsPerMeterOfFieldWidth * .41; 
		this.mSize = pixelsPerMeterOfFieldWidth * 1.0; 

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

		var f = this.mFacingAngle;
		var newFacingAngle;
		if (f < 0)
		{
			newFacingAngle = 360 - (f * -1);
			this.mFacingAngle = newFacingAngle;
		}
			
		this.mAngle = this.mFacingAngle * Math.PI / 180;

		this.mContext.save();
		this.mContext.translate(this.drawX,this.drawY);
		this.mContext.rotate(this.mAngle);
		
		//rect body
		this.mContext.beginPath();
		this.mContext.fillStyle = this.mColor;
		this.mContext.fill();
		this.mContext.fillRect
		(
			this.mSize / -2, 
			this.mSize / -2,   
			this.mSize,     
			this.mSize / 2
		);        
		
		//left foot
		this.mContext.beginPath();
		this.mContext.fillStyle = "black";
		this.mContext.fill();
		this.mContext.fillRect
		(
			this.mSize / -2,      
			this.mSize * 0.25,  //set to this.mSize / -2 to hide under body        
			this.mSize / 8, 
			this.mSize / 2
		);        
		
		//right foot
		this.mContext.beginPath();
		this.mContext.fillStyle = "red";
		this.mContext.fill();
		this.mContext.fillRect
		(
			this.mSize / 2,
			this.mSize * 0.25, 
			this.mSize / 8, 
			this.mSize / 2
		);        
		
		//right shoulder
		this.mContext.beginPath();
		this.mContext.fillStyle = "white";
		this.mContext.fill();
		this.mContext.fillRect
		(
			this.mSize / 2,
			this.mSize / -2, 
			this.mSize / 8, 
			this.mSize / 2
		);        
		
		//left shoulder
		this.mContext.beginPath();
		this.mContext.fillStyle = "white";
		this.mContext.fill();
		this.mContext.fillRect
		(
			this.mSize / -2,
			this.mSize / -2, 
			this.mSize / 8, 
			this.mSize / 2
		);        
		
        	
		
       

		this.mContext.restore();
		this.mContext.setTransform(1, 0, 0, 1, 0, 0);
	}
}
