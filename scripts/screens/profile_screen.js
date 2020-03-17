'use strict';

class ProfileScreen extends Screen
{
        constructor(application)
        {
                super(application);
               	
		location.hash = 'profile_screen';

		this.setHtml(document.getElementById("profile_screen_html_id"));
                this.setMessageElement(document.getElementById("profile_screen_message_id"));
                this.setSpinner(document.getElementById("profile_screen_spinner_id"));
                this.setForm(document.getElementById("profile_screen_form_id"));

		this.mProfilesArray = new Array();

		this.mProfileUpdate = null;

		this.mPlayerButton = document.getElementById("profile_player_id");
		this.mParentButton = document.getElementById("profile_parent_id");
		this.mCoachButton = document.getElementById("profile_coach_id");
		this.mManagerButton = document.getElementById("profile_manager_id");
		this.mAdministratorButton = document.getElementById("profile_administrator_id");
		
		this.mPlayerButton.onclick = this.hit.bind(this.mPlayerButton);
		this.mParentButton.onclick = this.hit.bind(this.mParentButton);
		this.mCoachButton.onclick = this.hit.bind(this.mCoachButton);
		this.mManagerButton.onclick = this.hit.bind(this.mManagerButton);
		this.mAdministratorButton.onclick = this.hit.bind(this.mAdministratorButton);
		
		this.mPlayerButton.style.backgroundColor = "red";
		this.mParentButton.style.backgroundColor = "red";
		this.mCoachButton.style.backgroundColor = "red";
		this.mManagerButton.style.backgroundColor = "red";
		this.mAdministratorButton.style.backgroundColor = "red";
        }

        get()
        {
		super.get();
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/profile.php?" + this.getStandardParameters());
                APPLICATION.getCurrentScreen().ajax();
        }

	exit()
	{
		this.removeDivs();
		super.exit();
	}
	
	removeDivs()
	{
		/*
		for (var i = 0; i < APPLICATION.getCurrentScreen().mDivArray.length; i++)
		{
                        APPLICATION.getCurrentScreen().mDivArray[i].remove();
		}
		*/
	}

	hit()
	{
		var screen = APPLICATION.getCurrentScreen();
		
		var a = this.id.split('_');
		var profileType = a[1]; 

		if (this.style.backgroundColor == "green")
		{
			console.log('green');
			this.style.backgroundColor = "red";
			this.mProfileUpdate = profileType + '_' + '0'; 
		}
		else
		{
			console.log('red');
			this.style.backgroundColor = "green";
			this.mProfileUpdate = profileType + '_' + '1'; 
			console.log('in red:' + this.mProfileUpdate);
		}
		screen.updateProfile(this.mProfileUpdate);
	}

	updateProfile(profileUpdate)
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.setUrl("/php/classes/screens/update_profile.php?jwt=" + APPLICATION.getJWT() + '&profile_update=' + profileUpdate);
		console.log('getUrl:' + screen.getUrl());
		//console.log('mProfileUpdate:' + screen.mProfileUpdate);
		//console.log('mJWT:' + APPLICATION.getJWT());
                screen.ajax();
	}

        processJsonData()
	{
		super.processJsonData();

		this.mProfilesArray.length = 0;

		//make new array containing games and practices together
		if (this.mJson)
		{
                	if (this.mJson.profiles)
			{
                        	for (var i = 0; i < this.mJson.profiles.length; i++)
				{
					this.mProfilesArray.push(this.mJson.profiles[i]);
					if (this.mJson.profiles[i].player_id != null)
					{
						this.mPlayerButton.style.backgroundColor = "green";
					}
					else
					{
						this.mPlayerButton.style.backgroundColor = "red";
					}
				}
			}
		}
	}
}
