'use strict';

class PracticeScreen
{
	constructor(practice)
	{
		this.mPractice = practice;

               	//card
                this.mDivCard = document.createElement("DIV");
                this.mDivCard.setAttribute("class", "card");
                this.mPractice.mSchedule.mApplication.mDivMain.appendChild(this.mDivCard);

                //add card to main
                this.mContainer = document.querySelector('.main');
                this.mContainer.appendChild(this.mDivCard);

                this.mDivEventDate = document.createElement("DIV");
                this.mDivEventDate.setAttribute("class", "eventDate");
                this.mDivCard.appendChild(this.mDivEventDate);

                this.mDivStartTime = document.createElement("DIV");
                this.mDivStartTime.setAttribute("class", "startTime");
                this.mDivCard.appendChild(this.mDivStartTime);

                this.mDivAddress = document.createElement("DIV");
                this.mDivAddress.setAttribute("class", "address");
                this.mDivCard.appendChild(this.mDivAddress);

	}

	update()
	{
         	this.mDivCard.querySelector('.eventDate').textContent = this.mPractice.mEventDate;
         	this.mDivCard.querySelector('.startTime').textContent = this.mPractice.mStartTime;
         	this.mDivCard.querySelector('.address').textContent = this.mPractice.mAddress;
	}
}
