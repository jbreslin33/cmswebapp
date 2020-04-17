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
		this.mSize = pixelsPerMeterOfFieldWidth * 2.41; 

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
	/*	
		var f = this.mFacingAngle;
		var newFacingAngle;
		if (f < 0)
		{
			newFacingAngle = 360 - (f * -1);	
			this.mFacingAngle = newFacingAngle;
		}
		*/


			
		if (this.mId == 1)
		{
			//console.log('mAngle:' + this.mAngle);
			//console.log('mFacingAngle:' + this.mFacingAngle);
		}
		this.mAngle = this.mFacingAngle * Math.PI / 180;


        	//this.mContext.rotate(this.mAngle);
		this.mContext.save();
		this.mContext.translate(this.drawX,this.drawY);
		this.mContext.rotate(this.mAngle);
        	this.mContext.fillStyle = this.mColor;
        	//this.mContext.fillRect(this.mSize / -2, this.mSize / -2, this.mSize, this.mSize);        
        	this.mContext.fillRect(this.mSize / -2, this.mSize / -2, this.mSize, this.mSize);        

		this.mContext.restore();

		//this.mAngle += 1 * Math.PI / 180;

	}
	/*
	       ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);        
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);        
        ctx.restore();    *
	 */ 
}
