'use strict';

class Ball
{
        constructor(pitch,x,y,colorA,colorB)
        {
		this.mPitch = pitch;
		this.mContext = pitch.mScreen.mContext;
		this.x = x;
		this.y = y;

		this.drawX = x;
		this.drawY = y;

		this.mColorA = colorA;
		this.mColorB = colorB;

		this.mDiameter = 3.0;
		this.mSize = 0.0;
	}

	update()
	{
		//update player size based on physical screen size	
		var physicalWidth = this.mPitch.mScreen.mCanvas.width; 
		var physicalHeight = this.mPitch.mScreen.mCanvas.height; 
		var pixelsPerMeterOfFieldWidth = physicalWidth / 800;
		var pixelsPerMeterOfFieldHeigth = physicalHeight / 600; 
		this.mSize = pixelsPerMeterOfFieldWidth * this.mDiameter; 

		
		//translate server and real world cartesian coordinate of player to this screen
		var originX = physicalWidth / 2; 
		var originY = physicalHeight / 2; 

		var fieldWidth = 800;
		var fieldHeigt = 600; 
		var eastTouchLine = -52.5;
		var westTouchLine = 52.5;
		var northTouchLine = 34
		var southTouchLine = -34

		//so if you are at 5x then you are 5 * pixelsPerMeterOfFieldWidth

		this.drawX = (this.x * pixelsPerMeterOfFieldWidth) + originX; 
		this.drawY = (this.y * pixelsPerMeterOfFieldWidth) + originY; 

		  // Colors
  		var colors = [this.mColorA, this.mColorB, this.mColorA, this.mColorB];

  		// List of Angles
  		var angles = [Math.PI * 0.5, Math.PI * 0.5, Math.PI * 0.5, Math.PI * 0.5];

  		// Temporary variables, to store each arc angles
  		var beginAngle = 0;
  		var endAngle = 0;

  		// Iterate through the angles
  		for(var i = 0; i < angles.length; i = i + 1) 
		{
    			// Begin where we left off
    			beginAngle = endAngle;
    			// End Angle
    			endAngle = endAngle + angles[i];

    			this.mContext.beginPath();
    			// Fill color
    			this.mContext.fillStyle = colors[i % colors.length];

    			// Same code as before
    			this.mContext.moveTo(this.drawX, this.drawY);
    			this.mContext.arc(this.drawX, this.drawY, this.mSize / 2, beginAngle, endAngle);
    			this.mContext.lineTo(this.drawX, this.drawY);
    			this.mContext.stroke();

    			// Fill
    			this.mContext.fill();
  		}
	}
}

