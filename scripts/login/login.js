'use strict';

class Login
{
	constructor(application)
	{
		
		this.mApplication = application;
		console.log('Login Con');

                       //card
		this.mDivCard = document.createElement("DIV");
                //this.mDivCardLoginTemplate.setAttribute("class", "card cardTemplate weather-forecast");
                this.mDivCard.setAttribute("class", "card-login");
                this.mDivCard.setAttribute('hidden', true);
                this.mApplication.mDivMain.appendChild(this.mDivCard);
     
                this.mDivBreslin = document.createElement("DIV");
                this.mDivBreslin.setAttribute("class", "breslin");
                this.mDivCard.appendChild(this.mDivBreslin);
	
              	//report vars
                //this.mIsLoading = true;
                //this.mVisibleCards = {};
                //this.mSpinner = document.querySelector('.loader');
                //this.mCardTemplate = document.querySelector('.cardTemplate');
                this.mContainer = document.querySelector('.main');

                 this.mLoginCard = this.mDivCard.cloneNode(true);
                 this.mLoginCard.classList.remove('cardTemplate');
                 this.mLoginCard.removeAttribute('hidden');
                 this.mContainer.appendChild(this.mLoginCard);
		
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
