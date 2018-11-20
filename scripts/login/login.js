'use strict';

class Login extends Report
{
	constructor(application)
	{
		super(application);	
		console.log('Login Con');

                this.mDivBreslin = document.createElement("DIV");
                this.mDivBreslin.setAttribute("class", "breslin");
		this.mDivCard.appendChild(this.mDivBreslin);
	
                this.mContainer = document.querySelector('.main');

                //this.mLoginCard = this.mDivCard.cloneNode(true);
                //this.mLoginCard.classList.remove('cardTemplate');
                //this.mLoginCard.removeAttribute('hidden');
                this.mContainer.appendChild(this.mDivCard);
		
/*
		//main class
                this.mDivMain = document.createElement("DIV");
                this.mDivMain.setAttribute("class", "main");
                document.body.appendChild(this.mDivMain);

                        //card
                        this.mDivCardTemplate = document.createElement("DIV");
                        this.mDivCardTemplate.setAttribute("class", "card cardTemplate weather-forecast");
                        this.mDivCardTemplate.setAttribute('hidden', true);
                        this.mDivMain.appendChild(this.mDivCardTemplate);
*/
	}
}
