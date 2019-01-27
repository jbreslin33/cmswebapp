'use strict';

		//this.mSelectAvailability.onchange=this.updateAvailability.bind(this);

class SelectEventoScreen
{
	constructor(evento)
	{
		this.mEvento = evento;
		this.mOriginalCard = document.getElementById("card_original_id");
		this.mCard = this.mOriginalCard.cloneNode(true);
		document.body.appendChild(this.mCard);
	        this.mCard.style.display = "block";
	}

	destructor()
	{
	
	}

	show()
	{
  		this.mCard.style.display = "block";
	}

	hide()
	{
  		this.mCard.style.display = "none";
	}
	
	update()
	{
		if (this.mEvento.mDate)
		{
			this.mCard.children[0].innerHTML = APPLICATION.mCalendar.convertDate(this.mEvento.mDate);
		}
		if (this.mEvento.mEventoTypes)
		{
			this.mCard.children[1].children[0].innerHTML = this.mEvento.mEventoTypes;  
		}
		if (this.mEvento.mArrivalTime)
		{
			this.mCard.children[1].children[1].innerHTML = "Arrival Time: " + APPLICATION.mCalendar.mTime.convertFromMilitaryToHuman(this.mEvento.mArrivalTime);  
		}
		if (this.mEvento.mStartTime)
		{
			this.mCard.children[1].children[2].innerHTML = "Start Time: " + APPLICATION.mCalendar.mTime.convertFromMilitaryToHuman(this.mEvento.mStartTime);  
		}
		if (this.mEvento.mEndTime)
		{
			this.mCard.children[1].children[3].innerHTML = "End Time: " + APPLICATION.mCalendar.mTime.convertFromMilitaryToHuman(this.mEvento.mEndTime);  
		}
		if (this.mEvento.mAddress)
		{		
			this.mCard.children[1].children[4].innerHTML = "" + this.mEvento.mAddress;  
		}
		if (this.mEvento.mCoordinates)
		{
			this.mCard.children[1].children[5].innerHTML = "" + this.mEvento.mCoordinates;  
		}
		if (this.mEvento.mPitch)
		{
			this.mCard.children[1].children[6].innerHTML = "" + this.mEvento.mPitch;  
		}
		if (this.mEvento.mFieldName)
		{
			this.mCard.children[1].children[7].innerHTML = "" + this.mEvento.mFieldName;  
		}
		if (this.mEvento.mTeam)
		{
			this.mCard.children[1].children[8].innerHTML = this.mEvento.mClub + ' ' + this.mEvento.mTeam;  
		}	

		//this.mEvento.mID = this.mEvento.mData[12];
/*
                                                                evento.mID             = jsondata[i][0];
                                                                evento.mAvailabilityID = jsondata[i][1];
                                                                evento.mDate           = jsondata[i][2];
                                                                evento.mArrivalTime    = jsondata[i][3];
                                                                evento.mStarTime       = jsondata[i][4];
                                                                evento.mEndTime        = jsondata[i][5];
                                                                evento.mAddress        = jsondata[i][6];
                                                                evento.mCoordinates    = jsondata[i][7];
                                                                evento.mPitch          = jsondata[i][8];
                                                                evento.mFieldName      = jsondata[i][9];
                                                                evento.mTeam           = jsondata[i][10];
                                                                evento.mEventoTypes    = jsondata[i][11];

                                                                evento.mAvailabilityID = jsondata[i][12];
                                                                evento.mClub           = jsondata[i][13];

                var eventoArray = JSON.parse(localStorage.getItem('mEventoArrayLocal'));
                for(var i = 0; i < eventoArray.length; i++)
                {
                        console.log('mID:' + eventoArray[i].mID);
                        console.log('mDate:' + eventoArray[i].mDate);
                        console.log('mTeam:' + eventoArray[i].mTeam);
                }
*/
/*
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
			}
		}
*/
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
