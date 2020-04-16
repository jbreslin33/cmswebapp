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

		  // Colors
  		var colors = [this.mColor, this.mColor];

		/*
		                   // Colors
                var colors = [this.mColorA, this.mColorB, this.mColorA, this.mColorB];

                // List of Angles
                var angles = [Math.PI * 0.5, Math.PI * 0.5, Math.PI * 0.5, Math.PI * 0.5];

		 */

  		// List of Angles
  		//var angles = [APPLICATION.mUtility.degreesToRadians(this.mRightFootAngle),APPLICATION.mUtility.degreesToRadians(this.mLeftFootAngle - 2)];
                var angles = [Math.PI * 0.5, Math.PI * 1.5];

                // Temporary variables, to store each arc angles
                //var beginAngle = this.mFacingAngle;
                var beginAngle = APPLICATION.mUtility.degreesToRadians(this.mFacingAngle);
		//console.log('beginAngle:' + beginAngle);
                var endAngle = beginAngle;

  		// Iterate through the angles
  		for(var i = 0; i < angles.length; i = i + 1) 
		{
    			// Begin where we left off
    			beginAngle = endAngle;
    			// End Angle
    			endAngle = angles[i];

    			this.mContext.beginPath();
    			// Fill color
    			this.mContext.fillStyle = colors[i % colors.length];

    			// Same code as before
    			this.mContext.moveTo(this.drawX, this.drawY);
    			this.mContext.arc(this.drawX, this.drawY, playerWidth, beginAngle, endAngle);
    			this.mContext.lineTo(this.drawX, this.drawY);
    			this.mContext.stroke();

    			// Fill
    			this.mContext.fill();
  		}
	}
}

