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

		this.mColor = color;
		this.mStateName = '';

		this.mId = id;

		this.mDiameter = 3.0;
		this.mSize = 10; //at first

		this.mAngle = 1;
	}

	update()
	{

		this.mContext.save();
		
		var w = this.mPitch.mScreen.mCanvas.width;
		var l = this.mPitch.mScreen.mCanvas.height;

		var mod_w = w / 700;	
		var mod_l = l / 400;	
	
		var drawX = this.x * mod_w;
		var drawY = this.y * mod_l;

		this.drawCircleMan(drawX,drawY);	
		this.drawText(drawX,drawY);

		this.mContext.restore();
		this.mContext.setTransform(1, 0, 0, 1, 0, 0);
	}

	drawCircleMan(drawX,drawY)
	{


      		this.mContext.beginPath();
      		this.mContext.arc(drawX, drawY, this.mSize / 2, 0, 2 * Math.PI, false);
      		this.mContext.fillStyle = this.mColor;
      		this.mContext.fill();
	}

	drawText(drawX,drawY)
	{
		this.mContext.font = "12px Arial";
		this.mContext.fillText(this.mStateName,drawX,drawY);
	}


	drawStickMan()
	{
		this.drawBody();
		this.drawLeftFoot();
		this.drawRightFoot();
		this.drawLeftShoulder();
		this.drawRightShoulder();
	}

	drawLine()
	{
		//rect body
		this.mContext.beginPath();
		this.mContext.fillStyle = "yellow";
		this.mContext.fill();
		this.mContext.fillRect
		(
			this.mSize / -2, 
			this.mSize / -2,   
			this.mSize,     
			this.mSize / 2
		);        
	}


	drawBody()
	{
		
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

	}

	drawLeftFoot()
	{
		
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

	}
	
	drawRightFoot()
	{
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
	}	

	drawRightShoulder()
	{

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

	}
	
	drawLeftShoulder()
	{
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

	}
}
