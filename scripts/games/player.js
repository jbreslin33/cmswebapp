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

		  // Colors
  		//var colors = [this.mColor, this.mColor, this.mColor, this.mColor, this.mColor, this.mColor];
  		var colors = [this.mColor, this.mColor];

  		// List of Angles
  		//var angles = [Math.PI * 0.3, Math.PI * 0.7, Math.PI * 0.2, Math.PI * 0.4, Math.PI * 0.4];
  		var angles = [Math.PI * 0.5, Math.PI * 1.5];

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
    			this.mContext.arc(this.drawX, this.drawY, playerWidth, beginAngle, endAngle);
    			this.mContext.lineTo(this.drawX, this.drawY);
    			this.mContext.stroke();

    			// Fill
    			this.mContext.fill();
  		}

/*
		this.mContext.beginPath();
  		this.mContext.fillStyle = this.mColor;

		var facingRadian = 1.5;
		var leftFoot = 1.5 - 0.25;
		var rigthFoot = 1.5 + 0.25;

  		//this.mContext.arc(this.drawX, this.drawY, playerWidth, 0, Math.PI * 360);
  		// full this.mContext.arc(this.drawX, this.drawY, playerWidth, 0*Math.PI, 2*Math.PI);
  		//this.mContext.arc(this.drawX, this.drawY, playerWidth, 0*Math.PI, 1.5*Math.PI);
  	
		//left
		this.mContext.arc(this.drawX, this.drawY, playerWidth, leftFoot*Math.PI, rightFoot*Math.PI);
		this.mContext.arc(this.drawX, this.drawY, playerWidth, rightFoot*Math.PI, leftFoot*Math.PI);
		
  		this.mContext.fill();
		*/
	}
}

