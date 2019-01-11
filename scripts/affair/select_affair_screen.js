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
		this.mSelectAvailability.onchange=this.updateAvailability;

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

			if (this.mAffair.mData[i] != null)
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
				else if (i == 6) //coordinates
				{
         				div.textContent = this.mAffair.mData[i];
				}
				else if (i == 10)
				{
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
         				div.textContent = this.mAffair.mData[i];
				}
				
			}

			if (this.mAffair.mData[10] == null)
			{
                        	this.mDivCard.appendChild(this.mSelectAvailability);
			}

		}
	}
	updateAvailability()
	{
		console.log('called upa');
	        var url = "/php/classes/update/availability_update.php?username=" + APPLICATION.mLogin.mUsername;

                // Fetch the latest data.
                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
					console.log('got 200');
					/*
                                        var code = this.responseText.slice(0,4);
                                        var data = this.responseText.slice(4,this.responseText.length);
                                        var jsondata = JSON.parse(data);

                                        if (jsondata)
                                        {
                                                //lets clear array....
                                                var i = 0;
                                                for (i = 0; i < APPLICATION.mSchedule.mSelectAffairArray.length; i++)
                                                {
                                                        var affair = APPLICATION.mSchedule.mSelectAffairArray.shift();
                                                        affair.mScreen.mDivCard.style.display = "none";
                                                }

                                                i = 0;
                                                while (jsondata[i])
                                                {
                                                        var affair = new SelectAffair(APPLICATION.mSchedule);
                                                        for (var b = 0; b < 11; b++)
                                                        {
                                                                affair.mData.push(jsondata[i][b]);
                                                        }

                                                        //create screen to display data
                                                        affair.mScreen = new SelectAffairScreen(affair);

                                                        //update screen card
                                                        affair.mScreen.update();

                                                        //save for later
                                                        APPLICATION.mSchedule.saveToLocalStorage(affair);

                                                        //push to array
                                                        APPLICATION.mSchedule.mSelectAffairArray.push(affair);
                                                        i++;
                                                }
                                        }
                                        else
                                        {
                                                console.log('no schedule');
                                        }
					*/
                                }
                        }
                };
                request.open('GET', url);
                request.send();
        }
}
