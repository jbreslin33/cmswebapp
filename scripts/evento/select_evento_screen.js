'use strict';

		//this.mSelectAvailability.onchange=this.updateAvailability.bind(this);

class SelectEventoScreen
{
	constructor(evento)
	{
		this.mEvento = evento;
		this.mOriginalCard = document.getElementById("cardoriginalid");
		this.mCard = this.mOriginalCard.cloneNode(true);
		document.body.appendChild(this.mCard);
	        this.mCard.style.display = "block";
	}

	destructor()
	{
	
	}
	
	update()
	{
		for (var i = 0; i < this.mEvento.mData.length; i++)
		{
			//make dropdowns for availabilitys not yet set	
			//either way we need drop down
			this.mEvento.mID = this.mEvento.mData[12];
			this.mEvento.mEventosUsersAvailabilityID = this.mEvento.mData[11];

			if (this.mEvento.mData[i] != null)
			{
//select eventos.id, eventos_users_availability.id, evento_date, arrival_time, start_time, end_time, eventos.address, eventos.coordinates, pitches.name, field_name, teams.name, evento_types.name, availability.id

				//date in header
				this.mCard.children[0].innerHTML = APPLICATION.mCalendar.convertDate(this.mEvento.mData[2]);
				
				//big title				
				this.mCard.children[1].children[0].innerHTML = this.mEvento.mData[11];  

				if (this.mEvento.mData[3]) //time
				{
					this.mCard.children[1].children[1].innerHTML = "Arrival Time: " + APPLICATION.mCalendar.mTime.convertFromMilitaryToHuman(this.mEvento.mData[3]);  
				}
				if (this.mEvento.mData[4]) //time
				{
					this.mCard.children[1].children[2].innerHTML = "Start Time: " + APPLICATION.mCalendar.mTime.convertFromMilitaryToHuman(this.mEvento.mData[4]);  
				}
				if (this.mEvento.mData[5]) //time
				{
					this.mCard.children[1].children[3].innerHTML = "End Time: " + APPLICATION.mCalendar.mTime.convertFromMilitaryToHuman(this.mEvento.mData[5]);  
				}
				if (this.mEvento.mData[6]) //address
				{
					this.mCard.children[1].children[4].innerHTML = "" + this.mEvento.mData[6];  
				}
				if (this.mEvento.mData[7]) //coord
				{
					this.mCard.children[1].children[5].innerHTML = "" + this.mEvento.mData[7];  
				}
				if (this.mEvento.mData[8]) //pitchname
				{
					this.mCard.children[1].children[6].innerHTML = "" + this.mEvento.mData[8];  
				}
				if (this.mEvento.mData[9]) //fieldname
				{
					this.mCard.children[1].children[7].innerHTML = "" + this.mEvento.mData[9];  
				}
				if (this.mEvento.mData[10]) //team
				{
					this.mCard.children[1].children[8].innerHTML = this.mEvento.mData[13] + ' ' + this.mEvento.mData[10];  
				}
				else if (i == 4) //time
				{
					/*
         				div.textContent =  "End Time: " + this.mEvento.mSchedule.mTime.convertFromMilitaryToHuman(this.mEvento.mData[i]);
					*/
				}
				else if (i == 7) //coordinates
				{
					//ok we have coordinates from server lets create elements
					/*
					var a = document.createElement("a"); 
					var text = document.createTextNode("map"); 
					a.appendChild(text);
					a.title = "map";
					a.href = null;
					div.appendChild(a);

					a.href = this.mEvento.mData[i];
					*/
				}
				else if (i == 8) //coordinates
				{
					/*
         				div.textContent = this.mEvento.mData[i];
					*/
				}
				else if (i == 12)
				{
					//dont need the default option because we have a db entry
					/*
					this.mSelectAvailability.remove(this.mOption);

                                        this.mDivCard.appendChild(this.mSelectAvailability);
					if (this.mEvento.mData[i] == 1)
					{
						this.optionA.selected = 'selected';
					}
					if (this.mEvento.mData[i] == 2)
					{
						this.optionB.selected = 'selected';
					}
					if (this.mEvento.mData[i] == 3)
					{
						this.optionC.selected = 'selected';
					}
					*/
				}
				else 
				{
					/*
					if (i != 0)
					{
         					div.textContent = this.mEvento.mData[i];
					}
					*/
				}
			}

			if (this.mEvento.mData[12] == null)
			{
				/*
                        	this.mDivCard.appendChild(this.mSelectAvailability);
				*/
			}

		}
	}
	updateAvailability()
	{
		//first lets remove default option so user cant mess up but dont remove if you already did
		//and then do insert
		/*
		if (this.mSelectAvailability.length > 3)
		{
			this.mSelectAvailability.remove(this.mSelectAvailability[0])
			//going to need user_id, evento_id
                	var url = "/php/classes/update/availability_update.php?username=" + APPLICATION.mLogin.mUsername + "&eventos_users_availability_id=" + this.mEventosUsersAvailabilityID;

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
                        var url = "/php/classes/update/availability_update.php?username=" + APPLICATION.mLogin.mUsername + "&availability_id=" + this.mSelectAvailability.options[this.mSelectAvailability.selectedIndex].value + "&eventos_users_availability_id=" + this.mEvento.mEventosUsersAvailabilityID;
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
		*/
        }
}
