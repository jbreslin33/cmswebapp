'use strict';

class Player
{
        constructor(pitch,x,y,color)
        {
		this.mContext = pitch.mScreen.mContext;
		console.log("new player");
		this.x = x;
		this.y = y;
		this.mColor = color;

		this.mId = 0;
	}

	update()
	{
		this.mContext.beginPath();
  		this.mContext.fillStyle = this.mColor;
  		this.mContext.arc(this.x, this.y, 20, 0, Math.PI * 360);
  		this.mContext.fill();
	}
}

