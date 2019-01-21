'use strict';

		//this.mSelectAvailability.onchange=this.updateAvailability.bind(this);

class SelectAffairScreen
{
	constructor(affair)
	{
		this.mAffair = affair;
		console.log("clone card");
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
		for (var i = 0; i < this.mAffair.mData.length; i++)
		{
			//make dropdowns for availabilitys not yet set	
			//either way we need drop down
			this.mAffair.mID = this.mAffair.mData[0];
			this.mAffair.mAffairsUsersAvailabilityID = this.mAffair.mData[1];

			if (this.mAffair.mData[i] != null)
			{
				if (i == 2) //date
				{
/*

        <div id="cardoriginalid" class="card text-center">

                <div class="card-header">Featured</div>

                <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>

                <div class="card-footer text-muted"> 2 days ago </div>

        </div>
*/
					for (var n=0; n < this.mCard.childNodes.length; n++)
					{
						console.log(this.mCard.childNodes[n]);
					}
					console.log("inner html to i 2");
					//document.getElementById("card_date_id").innerHTML = this.mAffair.mData[i];
					this.mCard.children[0].innerHTML = "0";
					this.mCard.children[1].children[0].innerHTML = "10";
					this.mCard.children[1].children[1].innerHTML = "11";
					this.mCard.children[1].children[2].innerHTML = "12";
					this.mCard.children[2].innerHTML = "2";
					this.mCard.children[3].innerHTML = "3";
					console.log("length of child nodes:" + this.mCard.childNodes.length);
					//var card_body = this.mCard.childNodes[2];
/*
					this.mCard.children[3].innerHTML = "H5";
					this.mCard.childNodes[4].innerHTML = "P";
					this.mCard.childNodes[5].innerHTML = "HREF";
					this.mCard.childNodes[6].innerHTML = "FOOTER";
*/
					//this.mCard.childNodes[3].innerHTML = "C3";
					//this.mCard.childNodes[4].innerHTML = "D4";
					//this.mCard.childNodes[5].innerHTML = "E5";
					//this.mCard.childNodes[6].innerHTML = "F6";
					//this.mCard.childNodes[7].innerHTML = "G7";
					/*
         				div.textContent = this.mAffair.mSchedule.convertDate(this.mAffair.mData[i]);
					*/
				}
				else if (i == 3) //time
				{
					/*/
         				div.textContent =  "Arrival Time: " + this.mAffair.mSchedule.mTime.convertFromMilitaryToHuman(this.mAffair.mData[i]);
					*/
				}
				else if (i == 4) //time
				{
					/*
         				div.textContent =  "End Time: " + this.mAffair.mSchedule.mTime.convertFromMilitaryToHuman(this.mAffair.mData[i]);
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

					a.href = this.mAffair.mData[i];
					*/
				}
				else if (i == 8) //coordinates
				{
					/*
         				div.textContent = this.mAffair.mData[i];
					*/
				}
				else if (i == 12)
				{
					//dont need the default option because we have a db entry
					/*
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
					*/
				}
				else 
				{
					/*
					if (i != 0)
					{
         					div.textContent = this.mAffair.mData[i];
					}
					*/
				}
			}

			if (this.mAffair.mData[12] == null)
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
			//going to need user_id, affair_id
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
		*/
        }
}
