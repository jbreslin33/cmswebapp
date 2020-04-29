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

		this.mAngle = null;
		this.mLastAngle = null;



		//make svg player
		var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width','200');
svg.setAttribute('height','200');
//document.body.appendChild(svg);
                document.getElementById("svg_div_id").appendChild(svg);

var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
path.setAttribute('d','M100,0 L200,100 100,200 0,100Z');
path.setAttribute('fill','red');
svg.appendChild(path);
		/*
	        var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
                circle.setAttributeNS(null,'cx',150);
                circle.setAttributeNS(null,'cy',150);
                circle.setAttributeNS(null,'r',50);
                circle.setAttributeNS(null,'stroke','green');
                circle.setAttributeNS(null,'stroke-width',4);
                circle.setAttributeNS(null,'fill','yellow');

                document.getElementById("svg_div_id").appendChild(circle);

///		circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />

                                //var container = document.createElement('div');
                                //container.setAttribute('class','co	
*/
	}

	update()
	{
		var w = this.mPitch.mScreen.mCanvas.width;
		var l = this.mPitch.mScreen.mCanvas.height;

		var mod_w = w / 700;	
		var mod_l = l / 400;	

		//var totalY = mod_l * 400;
	
		var drawX = this.x * mod_w;
		var drawY = this.y * mod_l;

		drawY = l - drawY; //768 - 100 draw at 668 instead of 100
		
		//always fix mFacingAngle coming in right away
		if (this.mFacingAngle < 0)
		{
			this.mFacingAngle = this.mFacingAngle * -1;
			this.mFacingAngle = 360 - this.mFacingAngle;
		}

	}
}
