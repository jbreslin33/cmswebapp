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
		//this.mA = null;
/*
		for (var i = 0; i < 10; i++)
		{
                	var div = document.createElement("DIV");
			this.mDivArray.push(div);
                	div.setAttribute("class", "selectAffairText");
                	this.mDivCard.appendChild(div);
		}
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
/*
       var div = document.createElement("DIV");
                        this.mDivArray.push(div); 
                        div.setAttribute("class", "selectAffairText");
                        this.mDivCard.appendChild(div);
*
 * */
	update()
	{
		for (var i = 0; i < 10; i++)
		{
			if (this.mAffair.mData[i] == null)
			{
				//do nothing
         			//this.mDivArray[i].style.display == "none";
			}
			else
			{
       				var div = document.createElement("DIV");
                        	this.mDivArray.push(div); 
                        	div.setAttribute("class", "selectAffairText");
                        	this.mDivCard.appendChild(div);
				
				if (i == 0) //date
				{
         				div.textContent = this.mAffair.mSchedule.convertDate(this.mAffair.mData[i]);
				}
				else if (i == 1) //time
				{
         				div.textContent =  "Arrival Time: " + this.mAffair.mSchedule.mTime.convertFromMilitaryToHuman(this.mAffair.mData[i]);
				}
				else if (i == 2) //time
				{
         				div.textContent =  "End Time: " + this.mAffair.mSchedule.mTime.convertFromMilitaryToHuman(this.mAffair.mData[i]);
				}
				else if (i == 5) //coordinates
				{
					//ok we have coordinates from server lets create elements
					var a = document.createElement("a"); 
					var text = document.createTextNode("map"); 
					a.appendChild(text);
					a.title = "map";
					a.href = null;
					div.appendChild(a);

					a.href = this.mAffair.mData[i];
				}
				else
				{
         				div.textContent = this.mAffair.mData[i];
				}
			}
		}
	}
}
