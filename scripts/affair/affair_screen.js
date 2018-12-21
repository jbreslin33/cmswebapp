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
                
		this.mDivArrivalTime = document.createElement("DIV");
                this.mDivArrivalTime.setAttribute("class", "arrivalTime");
                this.mDivCard.appendChild(this.mDivArrivalTime);

                this.mDivAddress = document.createElement("DIV");
                this.mDivAddress.setAttribute("class", "address");
                this.mDivCard.appendChild(this.mDivAddress);

	}

	update()
	{
		//mAffairType
		if (this.mAffair.mAffairType == null)
		{
         		this.mDivCard.querySelector('.affairType').style.display == "none";
		}
		else
		{
         		this.mDivCard.querySelector('.affairType').textContent = this.mAffair.mAffairType;
		}

		//mAffairDate
		if (this.mAffair.mAffairDate == null)
		{
         		this.mDivCard.querySelector('.affairDate').style.display == "none";
		}
		else
		{
                	var date = new Date(this.mAffair.mAffairDate);
                	var dayElement = date.getDay();
                	var monthElement = date.getMonth();
			var dayOfMonth = date.getDate() + 1;
         		this.mDivCard.querySelector('.affairDate').textContent = this.mAffair.mSchedule.mDayArray[dayElement] + ' ' + this.mAffair.mSchedule.mMonthArray[monthElement] + ' ' + dayOfMonth;
		}

		//mStartTime
		if (this.mAffair.mStartTime == null)
		{
         		this.mDivCard.querySelector('.startTime').style.display == "none";
		}
		else
		{
         		this.mDivCard.querySelector('.startTime').textContent =  "Start Time: " + this.mAffair.mSchedule.mTime.convertFromMilitaryToHuman(this.mAffair.mStartTime);;
		}

		//mArrivalTime
		if (this.mAffair.mArrivalTime == null)
		{
         		this.mDivCard.querySelector('.arrivalTime').style.display == "none";
		}
		else
		{
         		this.mDivCard.querySelector('.arrivalTime').textContent =  "Arrival Time: " + this.mAffair.mSchedule.mTime.convertFromMilitaryToHuman(this.mAffair.mArrivalTime);;
		}

		//mAddress
		if (this.mAffair.mAddress == null)
		{
         		this.mDivCard.querySelector('.address').style.display == "none";
		}
		else
		{
         		this.mDivCard.querySelector('.address').textContent = this.mAffair.mAddress;
		}
	}
}
