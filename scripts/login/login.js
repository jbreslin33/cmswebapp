'use strict';

class Login extends Report
{
	constructor(application)
	{
		super(application);	
		console.log('Login Con');
               
		//add card to main
		this.mContainer = document.querySelector('.main');
                this.mContainer.appendChild(this.mDivCard);

		//login stuff
                this.mDivBreslin = document.createElement("DIV");
                this.mDivBreslin.setAttribute("class", "breslin");
		this.mDivCard.appendChild(this.mDivBreslin);
	
		
	}
}
