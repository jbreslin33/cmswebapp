'use strict';

class DailySchedule extends Report
{
	constructor(application)
	{
		super(application);

                this.mDivDate = document.createElement("DIV");
                this.mDivDate.setAttribute("class", "date");
                this.mDivCardTemplate.appendChild(this.mDivDate);
		this.mDivDate.textContent = "yo";

          	var textScale = document.createTextNode(' mph ');
               	this.mDivDate.appendChild(textScale);

		console.log('DailySchedule constructor');


                //report vars
                this.isLoading = true;
                this.visibleCards = {};
                this.spinner = document.querySelector('.loader');
                this.cardTemplate = document.querySelector('.cardTemplate');
                this.container = document.querySelector('.main');

                //var card = this.visibleCards[data.key];
                //if (!card)
                //{
                        var card = this.cardTemplate.cloneNode(true);
                        card.classList.remove('cardTemplate');
                        //card.querySelector('.location').textContent = data.label;
                        //card.querySelector('.location').textContent = "LABEL GOES HERE";
                        card.removeAttribute('hidden');
                        this.container.appendChild(card);
                        this.visibleCards[data.key] = card;
                //}



	}
}
