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
		this.mSelectAvailability.onchange=this.updateAvailability;
		

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
         				div.textContent = "Set Availability:";
					this.mDivCard.appendChild(this.mSelectAvailability);
					var optionA = document.createElement("option");
					var optionB = document.createElement("option");
					var optionC = document.createElement("option");
					optionA.value = 1;
					optionB.value = 2;
					optionC.value = 3;
					optionA.innerHTML = 'Yes';
					optionB.innerHTML = 'Maybe';
					optionC.innerHTML = 'No';
					this.mSelectAvailability.appendChild(optionA);
					this.mSelectAvailability.appendChild(optionB);
					this.mSelectAvailability.appendChild(optionC);
					if (this.mAffair.mData[i] == 1)
					{
						optionA.selected = 'selected';
					}
					if (this.mAffair.mData[i] == 2)
					{
						optionB.selected = 'selected';
					}
					if (this.mAffair.mData[i] == 3)
					{
						optionC.selected = 'selected';
					}
				}
				else
				{
         				div.textContent = this.mAffair.mData[i];
				}
			}
		}
	}
	updateAvailability()
	{
		console.log('called upa');
	        var url = "/php/classes/query/availability_update.php?username=" + APPLICATION.mLogin.mUsername;

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
