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

	
		//var this.mContext = this.mCanvas.getContext("2d");
		var radius = this.mPitch.mScreen.mCanvas.height / 2;

		//this.mPitch.mScreen.mCanvas

		this.mContext.translate(radius, radius);
		radius = radius * 0.90;
		this.drawClock(radius);	
	
	}
	
	drawClock(radius) 
	{
  		this.drawFace(radius);
  		this.drawNumbers(radius);
 	 	this.drawTime(radius);
	}

	drawFace(radius) 
	{
  		var grad;
  		this.mContext.beginPath();
  		this.mContext.arc(0, 0, radius, 0, 2*Math.PI);
  		this.mContext.fillStyle = 'white';
  		this.mContext.fill();
  		grad = this.mContext.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  		grad.addColorStop(0, '#333');
  		grad.addColorStop(0.5, 'white');
  		grad.addColorStop(1, '#333');
  		this.mContext.strokeStyle = grad;
  		this.mContext.lineWidth = radius*0.1;
  		this.mContext.stroke();
  		this.mContext.beginPath();
  		this.mContext.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  		this.mContext.fillStyle = '#333';
  		this.mContext.fill();
	}

	drawNumbers(radius) 
	{
  		var ang;
  		var num;
  		this.mContext.font = radius*0.15 + "px arial";
  		this.mContext.textBaseline="middle";
  		this.mContext.textAlign="center";
  		for(num = 1; num < 13; num++)
		{
    			ang = num * Math.PI / 6;
    			this.mContext.rotate(ang);
    			this.mContext.translate(0, -radius*0.85);
    			this.mContext.rotate(-ang);
    			this.mContext.fillText(num.toString(), 0, 0);
    			this.mContext.rotate(ang);
    			this.mContext.translate(0, radius*0.85);
    			this.mContext.rotate(-ang);
  		}
	}

	drawTime(radius)
	{
    		var now = new Date();
    		var hour = now.getHours();
    		var minute = now.getMinutes();
    		var second = now.getSeconds();
    		
		//hour
    		hour=hour%12;
    		hour=(hour*Math.PI/6)+
    		(minute*Math.PI/(6*60))+
    		(second*Math.PI/(360*60));
    		this.drawHand(hour, radius*0.5, radius*0.07);
    
		//minute
    		minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    		this.drawHand(minute, radius*0.8, radius*0.07);
    
		// second
    		second=(second*Math.PI/30);
    		this.drawHand(second, radius*0.9, radius*0.02);
	}

	drawHand(pos, length, width) 
	{
    		this.mContext.beginPath();
    		this.mContext.lineWidth = width;
    		this.mContext.lineCap = "round";
    		this.mContext.moveTo(0,0);
    		this.mContext.rotate(pos);
    		this.mContext.lineTo(0, -length);
    		this.mContext.stroke();
    		this.mContext.rotate(-pos);
	}
}
