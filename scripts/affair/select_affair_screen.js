'use strict';

class SelectAffairScreen
{
	constructor(affair)
	{
		this.mAffair = affair;
                
		this.mContainer = document.querySelector('.main');
                this.mDivCard = document.createElement("DIV");
                this.mDivCard.setAttribute("class", "card");
                this.mContainer.appendChild(this.mDivCard);

		this.mDivArray = new Array();

		for (var i = 0; i < 10; i++)
		{
                	var div = document.createElement("DIV");
			this.mDivArray.push(div);
                	div.setAttribute("class", "selectAffairText");
                	this.mDivCard.appendChild(div);
		}

               	//card
		/*
                this.mContainer = document.querySelector('.main');
                this.mDivCard = document.createElement("DIV");
                this.mDivCard.setAttribute("class", "card");
                this.mContainer.appendChild(this.mDivCard);

                this.mDivAffairDate = document.createElement("DIV");
                this.mDivAffairDate.setAttribute("class", "selectAffairText");
                this.mDivCard.appendChild(this.mDivAffairDate);
		
		this.mDivArrivalTime = document.createElement("DIV");
                this.mDivArrivalTime.setAttribute("class", "selectAffairText");
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
		*/
	}

	destructor()
	{
		for (var i = 0; i < 10; i++)
		{
			this.mDivCard.removeChild(this.mDivArray[i]);
		}
                this.mContainer.removeChild(this.mDivCard);
		//this.mContainer.removeChild
		/*
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
		*/
	}

	update()
	{
		for (var i = 0; i < 10; i++)
		{
			if (this.mAffair.mData[i] == null)
			{
         			this.mDivArray[i].style.display == "none";
			}
			else
			{
				if (i == 0) //date
				{
         				this.mDivArray[i].textContent = this.mAffair.mSchedule.convertDate(this.mAffair.mData[i]);
				}
				else if (i == 1) //time
				{
         				this.mDivArray[i].textContent =  "Arrival Time: " + this.mAffair.mSchedule.mTime.convertFromMilitaryToHuman(this.mAffair.mData[i]);
				}
				else if (i == 2) //time
				{
         				this.mDivArray[i].textContent =  "End Time: " + this.mAffair.mSchedule.mTime.convertFromMilitaryToHuman(this.mAffair.mData[i]);
				}
				else
				{
         				this.mDivArray[i].textContent = this.mAffair.mData[i];
				}
			}
		}
	}
}
