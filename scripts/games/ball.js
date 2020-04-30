'use strict';

class Ball
{
        constructor(pitch,x,y,radius,colorA,colorB)
        {
		this.mPitch = pitch;

		this.x = x;
		this.y = y;

             	this.mScreenWidth = screen.width;
                this.mScreenHeight = screen.height;

		this.mRadius = radius;

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

	}

}

