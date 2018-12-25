'use strict';

class AffairScreen
{
	constructor(affair)
	{
		this.mAffair = affair;

               	//card
                this.mContainer = document.querySelector('.main');
                this.mDivCard = document.createElement("DIV");
                this.mDivCard.setAttribute("class", "card");
                this.mContainer.appendChild(this.mDivCard);

                this.mDivAffairDate = document.createElement("DIV");
                this.mDivAffairDate.setAttribute("class", "affairDate");
                this.mDivCard.appendChild(this.mDivAffairDate);
		
		this.mDivArrivalTime = document.createElement("DIV");
                this.mDivArrivalTime.setAttribute("class", "arrivalTime");
                this.mDivCard.appendChild(this.mDivArrivalTime);
                
		this.mDivStartTime = document.createElement("DIV");
                this.mDivStartTime.setAttribute("class", "startTime");
                this.mDivCard.appendChild(this.mDivStartTime);
                
		this.mDivEndTime = document.createElement("DIV");
                this.mDivEndTime.setAttribute("class", "endTime");
                this.mDivCard.appendChild(this.mDivEndTime);
                
		this.mDivAddress = document.createElement("DIV");
                this.mDivAddress.setAttribute("class", "address");
                this.mDivCard.appendChild(this.mDivAddress);
		
		this.mDivCoordinates = document.createElement("DIV");
                this.mDivCoordinates.setAttribute("class", "coordinates");
                this.mDivCard.appendChild(this.mDivCoordinates);

		//link for coordinates
		this.mCoordinateA = document.createElement("a");	
		this.mCoordinateText = document.createTextNode("map");
		this.mCoordinateA.appendChild(this.mCoordinateText);
		this.mCoordinateA.title = "map";
		this.mCoordinateA.href = null;
		this.mDivCoordinates.appendChild(this.mCoordinateA);	

		this.mDivPitch = document.createElement("DIV");
                this.mDivPitch.setAttribute("class", "pitch");
                this.mDivCard.appendChild(this.mDivPitch);
		
		this.mDivFieldName = document.createElement("DIV");
                this.mDivFieldName.setAttribute("class", "fieldName");
                this.mDivCard.appendChild(this.mDivFieldName);
		
		this.mDivTeam = document.createElement("DIV");
                this.mDivTeam.setAttribute("class", "team");
                this.mDivCard.appendChild(this.mDivTeam);

		this.mDivAffairType = document.createElement("DIV");
                this.mDivAffairType.setAttribute("class", "affairType");
                this.mDivCard.appendChild(this.mDivAffairType);
	}

	destructor()
	{
		//this.mContainer.removeChild
		console.log('desctructor called on: ' + this.mDivCard.querySelector('.affairDate').textContent); 
	
		this.mDivCard.removeChild(this.mDivAffairType);
		this.mDivCard.removeChild(this.mDivTeam);
		this.mDivCard.removeChild(this.mDivFieldName);
		this.mDivCard.removeChild(this.mDivPitch);

		this.mDivCoordinates.removeChild(this.mCoordinateA);
		this.mCoordinateA.removeChild(this.mCoordinateText);
                
		this.mDivCard.removeChild(this.mDivCoordinates);
                this.mDivCard.removeChild(this.mDivAddress);
                this.mDivCard.removeChild(this.mDivEndTime);
                this.mDivCard.removeChild(this.mDivStartTime);
                this.mDivCard.removeChild(this.mDivArrivalTime);
                this.mDivCard.removeChild(this.mDivAffairDate);
                this.mContainer.removeChild(this.mDivCard);
	}

	update()
	{
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

		//mArrivalTime
		if (this.mAffair.mArrivalTime == null)
		{
         		this.mDivCard.querySelector('.arrivalTime').style.display == "none";
		}
		else
		{
         		this.mDivCard.querySelector('.arrivalTime').textContent =  "Arrival Time: " + this.mAffair.mSchedule.mTime.convertFromMilitaryToHuman(this.mAffair.mArrivalTime);;
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
		
		//mEndTime
		if (this.mAffair.mEndTime == null)
		{
         		this.mDivCard.querySelector('.endTime').style.display == "none";
		}
		else
		{
         		this.mDivCard.querySelector('.endTime').textContent =  "End Time: " + this.mAffair.mSchedule.mTime.convertFromMilitaryToHuman(this.mAffair.mStartTime);;
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
		
		//mCoordinates
		if (this.mAffair.mCoordinates == null)
		{
         		this.mDivCard.querySelector('.coordinates').style.display == "none";
		}
		else
		{
			this.mCoordinateA.href = this.mAffair.mCoordinates;
		}
		
		//mPitch
		if (this.mAffair.mPitch == null)
		{
         		this.mDivCard.querySelector('.pitch').style.display == "none";
		}
		else
		{
         		this.mDivCard.querySelector('.pitch').textContent = this.mAffair.mPitch;
		}
		
		//mFieldName
		if (this.mAffair.mFieldName == null)
		{
         		this.mDivCard.querySelector('.fieldName').style.display == "none";
		}
		else
		{
         		this.mDivCard.querySelector('.fieldName').textContent = this.mAffair.mFieldName;
		}

		//mTeam
		if (this.mAffair.mTeam == null)
		{
         		this.mDivCard.querySelector('.team').style.display == "none";
		}
		else
		{
         		this.mDivCard.querySelector('.team').textContent = this.mAffair.mTeam;
		}

		//mAffairType
		if (this.mAffair.mAffairType == null)
		{
         		this.mDivCard.querySelector('.affairType').style.display == "none";
		}
		else
		{
         		this.mDivCard.querySelector('.affairType').textContent = this.mAffair.mAffairType;
		}
	}
}
