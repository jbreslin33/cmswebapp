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

                this.mDivArray = new Array();

                //make player
                this.mCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                this.mCircle.setAttribute('cx',0);
                this.mCircle.setAttribute('cy',0);
                this.mCircle.setAttribute('r',5);
                this.mCircle.setAttribute('stroke',"black");
                this.mCircle.setAttribute('stroke-width',3);
                this.mCircle.setAttribute('fill',"white");
                this.mPitch.mSvg.appendChild(this.mCircle);
                this.mDivArray.push(this.mCircle);

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

                //var totalY = mod_l * 400;

                var drawX = this.x * mod_w;
                var drawY = this.y * mod_l;

                drawY = l - drawY; //768 - 100 draw at 668 instead of 100

	        //move
		this.mCircle.setAttribute('cx', drawX)
       		this.mCircle.setAttribute('cy', drawY)

	}

}

