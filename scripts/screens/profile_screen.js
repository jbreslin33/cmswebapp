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

               	this.mProfileType = null;
                this.mActive = null;

                //close nav
                this.setCloseNav();
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

		if (a[1] == 'player')
		{
			if (this.style.backgroundColor == "green")
			{
				this.mProfileType = '1'; 
				this.mActive = '1'; 
			}
			else
			{
				this.mProfileType = '1'; 
				this.mActive = '2'; 
			}
		}
		if (a[1] == 'parent')
		{
			if (this.style.backgroundColor == "green")
			{
				this.mProfileType = '2'; 
				this.mActive = '1'; 
			}
			else
			{
				this.mProfileType = '2'; 
				this.mActive = '2'; 
			}
		}
		if (a[1] == 'coach')
		{
			if (this.style.backgroundColor == "green")
			{
				this.mProfileType = '3'; 
				this.mActive = '1'; 
			}
			else
			{
				this.mProfileType = '3'; 
				this.mActive = '2'; 
			}
		}
		if (a[1] == 'manager')
		{
			if (this.style.backgroundColor == "green")
			{
				this.mProfileType = '4'; 
				this.mActive = '1'; 
			}
			else
			{
				this.mProfileType = '4'; 
				this.mActive = '2'; 
			}
		}
		if (a[1] == 'administrator')
		{
			if (this.style.backgroundColor == "green")
			{
				this.mProfileType = '5'; 
				this.mActive = '1'; 
			}
			else
			{
				this.mProfileType = '5'; 
				this.mActive = '2'; 
			}
		}
		screen.updateProfile(APPLICATION.getPersonId(),this.mProfileType,this.mActive);

		//now update side buttons for new profile
		if (APPLICATION.getSideScreen())
		{
			var person = APPLICATION.getPerson(APPLICATION.getPersonId());
			person.setRole('' + a[1], this.mActive);

			//handle buttons to update screen
			APPLICATION.getSideScreen().handleButtons();
		}
	}

	updateProfile(personId, profileType, active)
	{
                var screen = APPLICATION.getCurrentScreen();
		if (profileType == 1)
		{
			if (active == 1)
			{
				screen.setUrl("/php/classes/screens/delete_player_profile.php?jwt=" + APPLICATION.getJWT() + '&person_id=' + personId);
			}
			else
			{
				screen.setUrl("/php/classes/screens/insert_player_profile.php?jwt=" + APPLICATION.getJWT() + '&person_id=' + personId);
			}
		}

                if (profileType == 2)
                {
                        if (active == 1)
                        {
                                screen.setUrl("/php/classes/screens/delete_parent_profile.php?jwt=" + APPLICATION.getJWT() + '&person_id=' + personId);
                        }
                        else
                        {
                                screen.setUrl("/php/classes/screens/insert_parent_profile.php?jwt=" + APPLICATION.getJWT() + '&person_id=' + personId);
                        }
                }

		if (profileType == 3)
                {
                        if (active == 1)
                        {
                                screen.setUrl("/php/classes/screens/delete_coach_profile.php?jwt=" + APPLICATION.getJWT() + '&person_id=' + personId);
                        }
                        else
                        {
                                screen.setUrl("/php/classes/screens/insert_coach_profile.php?jwt=" + APPLICATION.getJWT() + '&person_id=' + personId);
                        }
                }

		if (profileType == 4)
                {
                        if (active == 1)
                        {
                                screen.setUrl("/php/classes/screens/delete_manager_profile.php?jwt=" + APPLICATION.getJWT() + '&person_id=' + personId);
                        }
                        else
                        {
                                screen.setUrl("/php/classes/screens/insert_manager_profile.php?jwt=" + APPLICATION.getJWT() + '&person_id=' + personId);
                        }
                }


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

					if (this.mJson.profiles[i].parent_id != null)
					{
						this.mParentButton.style.backgroundColor = "green";
					}
					else
					{
						this.mParentButton.style.backgroundColor = "red";
					}
					
					if (this.mJson.profiles[i].coach_id != null)
					{
						this.mCoachButton.style.backgroundColor = "green";
					}
					else
					{
						this.mCoachButton.style.backgroundColor = "red";
					}
					
					if (this.mJson.profiles[i].manager_id != null)
					{
						this.mManagerButton.style.backgroundColor = "green";
					}
					else
					{
						this.mManagerButton.style.backgroundColor = "red";
					}
					
					if (this.mJson.profiles[i].administrator_id != null)
					{
						this.mAdministratorButton.style.backgroundColor = "green";
					}
					else
					{
						this.mAdministratorButton.style.backgroundColor = "red";
					}
				}
			}
		}
	}
}
