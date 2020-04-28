'use strict';

class Ball
{
        constructor(pitch,x,y,colorA,colorB)
        {
		this.mPitch = pitch;
		this.mContext = pitch.mScreen.mContext;
		this.x = x;
		this.y = y;

		this.mColorA = colorA;
		this.mColorB = colorB;

		this.mDiameter = 3.0;
		this.mSize = 10.0;
	}

	update()
	{
                var w = this.mPitch.mScreen.mCanvas.width;
                var l = this.mPitch.mScreen.mCanvas.height;

                var mod_w = w / 700;
                var mod_l = l / 400;

                var drawX = this.x * mod_w;
                var drawY = this.y * mod_l;

                drawY = l - drawY; //768 - 100 draw at 668 instead of 100

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
    			this.mContext.moveTo(drawX, drawY);
    			this.mContext.arc(drawX, drawY, this.mSize / 2, beginAngle, endAngle);
    			this.mContext.lineTo(drawX, drawY);
    			this.mContext.stroke();

    			// Fill
    			this.mContext.fill();
  		}
	}
}

