'use strict';

class Player
{
        constructor(pitch,x,y)
        {
		this.mContext = pitch.mScreen.mContext;
		console.log("new player");
		this.x = x;
		this.y = y;
	}

	update()
	{
		this.mContext.beginPath();
  		this.mContext.fillStyle = 'red';
  		this.mContext.arc(this.x, this.y, 20, 0, Math.PI * 360);
  		this.mContext.fill();
	}
}

