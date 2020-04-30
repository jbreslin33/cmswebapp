'use strict';

class Player
{
        constructor(id,pitch,x,y,radius,color)
        {
		this.mPitch = pitch;
		
		this.mScreenWidth = screen.width;
		this.mScreenHeight = screen.height;
		
		this.x = x;
		this.y = y;

		this.mFacingAngle = 0.0;

		this.mColor = color;
		this.mStateName = '';

		this.mId = id;

		this.mRadius = radius;

		this.mDivArray = new Array();

		this.createBody();
	}

	createBody()
	{
		//make player
		this.mCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		this.mCircle.setAttribute('cx',0);
		this.mCircle.setAttribute('cy',0);
		this.mCircle.setAttribute('r',5);
		this.mCircle.setAttribute('stroke',"black");
		this.mCircle.setAttribute('stroke-width',3);
		this.mCircle.setAttribute('fill',this.mColor);
		this.mPitch.mSvg.appendChild(this.mCircle);
                this.mDivArray.push(this.mCircle);

		//text
		this.mText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		this.mText.setAttribute('x',150);
		this.mText.setAttribute('y',150);
		this.mText.setAttribute('fill', 'yellow');
		this.mText.textContent = 'T';
		
		this.mPitch.mSvg.appendChild(this.mText);

                this.mDivArray.push(this.mText);
	}

	removeDivs()
        {
                for (var i = 0; i < this.mDivArray.length; i++)
                {
                        this.mDivArray[i].remove();
                }
        }

	update()
	{
		this.render();
	}

	render()
	{
		//get full screen size of client
		var w = screen.width;
		var l = screen.height;

		//calc position based on relative full screen size
		var mod_w = w / 700;	
		var mod_l = l / 400;	

		var drawX = this.x * mod_w;
		var drawY = this.y * mod_l;

		//recalc radius based on screen size
		var added = parseFloat(mod_w + mod_l);
		var average = parseFloat(added / 2);
		var drawR = this.mRadius * average;

		//flip screen as html uses upside down y axis
		drawY = l - drawY; //768 - 100 draw at 668 instead of 100
		
		//move circle
		this.mCircle.setAttribute('cx', drawX)
		this.mCircle.setAttribute('cy', drawY)

		//change radius
		this.mCircle.setAttribute('r',drawR)

		//move text
		this.mText.setAttribute('x', drawX)
		this.mText.setAttribute('y', drawY)

		//rotate text
		this.mText.setAttribute('transform','rotate(' + this.mFacingAngle + ' ' + drawX + ' ' + drawY + ')');
	}
}
