'use strict';

class Player
{
        constructor(id,pitch,x,y,color)
        {
		this.mPitch = pitch;
		
		this.mScreenWidth = screen.width;
		this.mScreenHeight = screen.height;
		
		this.x = x;
		this.y = y;


		this.mLooking = 0.0;
		this.mFacingAngle = 0.0;

		this.mColor = color;
		this.mStateName = '';

		this.mId = id;

		this.mRadius = 10.0;
		this.mSize = 10; //at first

		this.mAngle = null;
		this.mLastAngle = null;

		this.mDivArray = new Array();

		//make player
		this.mCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		this.mCircle.setAttribute('cx',0);
		this.mCircle.setAttribute('cy',0);
		this.mCircle.setAttribute('r',5);
		this.mCircle.setAttribute('stroke',"black");
		this.mCircle.setAttribute('stroke-width',3);
		if (this.mId == 4)
		{
			this.mCircle.setAttribute('fill','violet');
		}
		else
		{
			this.mCircle.setAttribute('fill',this.mColor);
		}
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
		var w = screen.width;
		var l = screen.height;

		var mod_w = w / 700;	
		var mod_l = l / 400;	

		var drawX = this.x * mod_w;
		var drawY = this.y * mod_l;

		var added = parseFloat(mod_w + mod_l);
		var average = parseFloat(added / 2);
		
		var drawR = this.mRadius * average;
		//console.log('average:' + average);
		console.log('R:' + drawR);

		drawY = l - drawY; //768 - 100 draw at 668 instead of 100
		
		//move
		this.mCircle.setAttribute('cx', drawX)
		this.mCircle.setAttribute('cy', drawY)
		this.mCircle.setAttribute('r',drawR)

		this.mText.setAttribute('x', drawX)
		this.mText.setAttribute('y', drawY)
		
		this.mText.setAttribute('transform','rotate(' + this.mFacingAngle + ' ' + drawX + ' ' + drawY + ')');

	}
}
