'use strict';

class Game extends Occasion
{
	constructor(application)
	{
		super(application);	

                //card
                this.mDivCard = document.createElement("DIV");
                this.mDivCard.setAttribute("class", "card");
                this.mApplication.mDivMain.appendChild(this.mDivCard);
	}
}
