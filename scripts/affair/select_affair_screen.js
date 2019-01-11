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

		//select
                this.mSelectAvailability = document.createElement("SELECT");
                this.mSelectAvailability.setAttribute("class", "dropdown");
		this.mSelectAvailability.onchange=this.updateAvailability.bind(this);

                //div.textContent = "Set Availability:";
                this.option  = document.createElement("option");
                this.optionA = document.createElement("option");
                this.optionB = document.createElement("option");
                this.optionC = document.createElement("option");
                this.option.value  = 0;
                this.optionA.value = 1;
                this.optionB.value = 2;
                this.optionC.value = 3;
                this.option.innerHTML  = 'SET AVAILABILITY';
                this.optionA.innerHTML = 'Going';
                this.optionB.innerHTML = 'Maybe Going';
                this.optionC.innerHTML = 'Not Going';
                this.mSelectAvailability.appendChild(this.option);
                this.mSelectAvailability.appendChild(this.optionA);
                this.mSelectAvailability.appendChild(this.optionB);
                this.mSelectAvailability.appendChild(this.optionC);
	}

	destructor()
	{
		for (var i = 0; i < this.mDivArray.length; i++)
		{
			this.mDivCard.removeChild(this.mDivArray[i]);
		}
                this.mContainer.removeChild(this.mDivCard);
	}
	
	update()
	{
		for (var i = 0; i < this.mAffair.mData.length; i++)
		{
			//make dropdowns for availabilitys not yet set	
			//either way we need drop down
			this.mAffair.mAffairsUsersAvailabilityID = this.mAffair.mData[0];
			console.log('mAffairsUsersAvailabilityID:' + this.mAffair.mAffairsUsersAvailabilityID);

			if (this.mAffair.mData[i] != null)
			{
       				var div = document.createElement("DIV");
                        	this.mDivArray.push(div); 
                        	div.setAttribute("class", "selectAffairText");
                        	this.mDivCard.appendChild(div);
				
				if (i == 1) //date
				{
         				div.textContent = this.mAffair.mSchedule.convertDate(this.mAffair.mData[i]);
				}
				else if (i == 2) //time
				{
         				div.textContent =  "Arrival Time: " + this.mAffair.mSchedule.mTime.convertFromMilitaryToHuman(this.mAffair.mData[i]);
				}
				else if (i == 3) //time
				{
         				div.textContent =  "End Time: " + this.mAffair.mSchedule.mTime.convertFromMilitaryToHuman(this.mAffair.mData[i]);
				}
				else if (i == 6) //coordinates
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
				else if (i == 7) //coordinates
				{
         				div.textContent = this.mAffair.mData[i];
				}
				else if (i == 11)
				{
					//dont need the default option because we have a db entry
					this.mSelectAvailability.remove(this.mOption);

                                        this.mDivCard.appendChild(this.mSelectAvailability);
					if (this.mAffair.mData[i] == 1)
					{
						this.optionA.selected = 'selected';
					}
					if (this.mAffair.mData[i] == 2)
					{
						this.optionB.selected = 'selected';
					}
					if (this.mAffair.mData[i] == 3)
					{
						this.optionC.selected = 'selected';
					}
				}
				else 
				{
					if (i != 0)
					{
         					div.textContent = this.mAffair.mData[i];
					}
				}
			}

			if (this.mAffair.mData[11] == null)
			{
                        	this.mDivCard.appendChild(this.mSelectAvailability);
			}

		}
	}
	updateAvailability()
	{
		//first lets remove default option so user cant mess up but dont remove if you already did
		//and then do insert
		if (this.mSelectAvailability.length > 3)
		{
			this.mSelectAvailability.remove(this.mSelectAvailability[0])
                	var url = "/php/classes/update/availability_update.php?username=" + APPLICATION.mLogin.mUsername + "&affairs_users_availability_id=" + this.mAffairsUsersAvailabilityID;

                	// Fetch the latest data.
                	var request = new XMLHttpRequest();
                	request.onreadystatechange = function()
                	{
                        	if (request.readyState === XMLHttpRequest.DONE)
                        	{
                                	if (request.status === 200)
                                	{
                                        	console.log('got 200');
                                	}
                        	}
                	};
                	request.open('GET', url);
                	request.send();

		}
		else //do update
		{
			console.log("ID:" + this.mSelectAvailability.options[this.mSelectAvailability.selectedIndex].value);
                        var url = "/php/classes/update/availability_update.php?username=" + APPLICATION.mLogin.mUsername + "&availability_id=" + this.mSelectAvailability.options[this.mSelectAvailability.selectedIndex].value + "&affairs_users_availability_id=" + this.mAffair.mAffairsUsersAvailabilityID;
			console.log('url:' + url);

                        // Fetch the latest data.
                        var request = new XMLHttpRequest();
                        request.onreadystatechange = function()
                        {
                                if (request.readyState === XMLHttpRequest.DONE)
                                {
                                        if (request.status === 200)
                                        {       
                                                console.log('got 200');
                                        }
                                }
                        };
                        request.open('GET', url);
                        request.send();
		}
        }
}
