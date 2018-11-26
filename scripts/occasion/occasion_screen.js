'use strict';

class OccasionScreen extends ReportScreen
{
	constructor(application)
	{
		super(application);

                //card
                this.mDivCard = document.createElement("DIV");
                this.mDivCard.setAttribute("class", "card");
                this.mApplication.mDivMain.appendChild(this.mDivCard);


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
}
