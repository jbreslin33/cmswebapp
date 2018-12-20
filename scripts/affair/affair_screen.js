'use strict';

class AffairScreen
{
	constructor(affair)
	{
		this.mAffair = affair;

               	//card
                this.mDivCard = document.createElement("DIV");
                this.mDivCard.setAttribute("class", "card");
                this.mAffair.mSchedule.mApplication.mDivMain.appendChild(this.mDivCard);

                //add card to main
                this.mContainer = document.querySelector('.main');
                this.mContainer.appendChild(this.mDivCard);
                
		this.mDivAffairType = document.createElement("DIV");
                this.mDivAffairType.setAttribute("class", "affairType");
                this.mDivCard.appendChild(this.mDivAffairType);

                this.mDivAffairDate = document.createElement("DIV");
                this.mDivAffairDate.setAttribute("class", "affairDate");
                this.mDivCard.appendChild(this.mDivAffairDate);

                this.mDivStartTime = document.createElement("DIV");
                this.mDivStartTime.setAttribute("class", "startTime");
                this.mDivCard.appendChild(this.mDivStartTime);

                this.mDivAddress = document.createElement("DIV");
                this.mDivAddress.setAttribute("class", "address");
                this.mDivCard.appendChild(this.mDivAddress);

	}

	update()
	{
         	this.mDivCard.querySelector('.affairType').textContent = this.mAffair.mAffairType;
         	this.mDivCard.querySelector('.affairDate').textContent = this.mAffair.mAffairDate;
         	this.mDivCard.querySelector('.startTime').textContent = this.mAffair.mStartTime;
         	this.mDivCard.querySelector('.address').textContent = this.mAffair.mAddress;
	}
}
