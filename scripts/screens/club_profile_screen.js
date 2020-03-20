'use strict';

class ClubProfileScreen extends Screen
{
        constructor(application)
        {
                super(application);
               	
		location.hash = 'club_profile_screen';

		this.setHtml(document.getElementById("club_profile_screen_html_id"));
                this.setMessageElement(document.getElementById("club_profile_screen_message_id"));
                this.setSpinner(document.getElementById("club_profile_screen_spinner_id"));
                this.setForm(document.getElementById("club_profile_screen_form_id"));

		this.mDivArray = new Array();
		this.mClubProfilesArray = new Array();

		this.mPlayerButtonArray = new Array();
		this.mParentButtonArray = new Array();
		this.mCoachButtonArray = new Array();
		this.mManagerButtonArray = new Array();
		this.mAdministratorButtonArray = new Array();

		this.mProfileUpdate = null;
/*
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
		*/
        }

        get()
        {
		super.get();
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/club_profile.php?" + this.getStandardParameters());
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
				this.style.backgroundColor = "red";
				this.mProfileType = '1'; 
				this.mActive = '1'; 
			}
			else
			{
				this.style.backgroundColor = "green";
				this.mProfileType = '1'; 
				this.mActive = '2'; 
			}
		}
		if (a[1] == 'parent')
		{
			if (this.style.backgroundColor == "green")
			{
				this.style.backgroundColor = "red";
				this.mProfileType = '2'; 
				this.mActive = '1'; 
			}
			else
			{
				this.style.backgroundColor = "green";
				this.mProfileType = '2'; 
				this.mActive = '2'; 
			}
		}
		if (a[1] == 'coach')
		{
			if (this.style.backgroundColor == "green")
			{
				this.style.backgroundColor = "red";
				this.mProfileType = '3'; 
				this.mActive = '1'; 
			}
			else
			{
				this.style.backgroundColor = "green";
				this.mProfileType = '3'; 
				this.mActive = '2'; 
			}
		}
		if (a[1] == 'manager')
		{
			if (this.style.backgroundColor == "green")
			{
				this.style.backgroundColor = "red";
				this.mProfileType = '4'; 
				this.mActive = '1'; 
			}
			else
			{
				this.style.backgroundColor = "green";
				this.mProfileType = '4'; 
				this.mActive = '2'; 
			}
		}
		if (a[1] == 'administrator')
		{
			if (this.style.backgroundColor == "green")
			{
				this.style.backgroundColor = "red";
				this.mProfileType = '5'; 
				this.mActive = '1'; 
			}
			else
			{
				this.style.backgroundColor = "green";
				this.mProfileType = '5'; 
				this.mActive = '2'; 
			}
		}
		screen.updateProfile(APPLICATION.getCurrentScreen().getPersonId(),this.mProfileType,this.mActive);
	}

	updateProfile(personId,profileType,active)
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.setUrl("/php/classes/screens/update_profile.php?jwt=" + APPLICATION.getJWT() + '&profiletype=' + profileType + '&active=' + active + '&person_id=' + personId);
		console.log('getUrl:' + screen.getUrl());
		//console.log('mProfileUpdate:' + screen.mProfileUpdate);
		//console.log('mJWT:' + APPLICATION.getJWT());
                screen.ajax();
	}

        processJsonData()
	{
		super.processJsonData();

		this.mClubProfilesArray.length = 0;

		//make new array containing games and practices together
		if (this.mJson)
		{
                	if (this.mJson.club_profiles)
			{
                        	for (var i = 0; i < this.mJson.club_profiles.length; i++)
				{

					//add db row to array
					this.mClubProfilesArray.push(this.mJson.club_profiles[i]);
	                               
					//row
					var div = document.createElement('div');
					this.mDivArray.push(div);
                                	div.setAttribute('class','row');
                                	document.getElementById("club_profile_screen_html_id").appendChild(div);


					//col-3
					var divcol3 = document.createElement('div');
                                	divcol3.setAttribute('class','col-3');
					div.appendChild(divcol3);

					//create a card and container to hold record
	                                var divcard = document.createElement('div');
                                	divcard.setAttribute('class','card');
					divcol3.appendChild(divcard);

                                	var container = document.createElement('div');
                                	container.setAttribute('class','container');
                                	divcard.appendChild(container);


					//text
                                	var textArray = new Array();

                                	var p = document.createElement('p');
                                	p.setAttribute('class','club-profile-paragraph');
                                	container.appendChild(p);
					//p.innerHTML = '' + this.mJson.club_profiles[i].person_id + ' ' + 
					if (this.mJson.club_profiles[i].dob)
					{
						p.innerHTML = '' +  
						this.mJson.club_profiles[i].last_name + ', ' +    
						this.mJson.club_profiles[i].first_name +  ' DOB: ' +  
						this.mJson.club_profiles[i].dob;   
					}
					else
					{
						p.innerHTML = '' +  
						this.mJson.club_profiles[i].last_name + ', ' +    
						this.mJson.club_profiles[i].first_name;  
					}


					//col-3
					var divcol9 = document.createElement('div');
                                	divcol9.setAttribute('class','col-9');
					div.appendChild(divcol9);

					//create a card and container to hold record
	                                var divcard = document.createElement('div');
                                	divcard.setAttribute('class','card');
					divcol9.appendChild(divcard);

                                	var container = document.createElement('div');
                                	container.setAttribute('class','container');
                                	divcard.appendChild(container);



					//create a player button
 					var button = document.createElement("BUTTON");
                                	button.setAttribute('class','club-profile-button');
                                        button.innerHTML = "Player";
                                        container.appendChild(button);
                                        var id = 'club_player_button_' + this.mJson.club_profiles[i].person_id;
                                        button.setAttribute("id", id);
                                        button.onclick = this.hit.bind(button);
					
					if (this.mJson.club_profiles[i].player_id != null)
					{
						button.style.backgroundColor = "green";
					}
					else
					{
						button.style.backgroundColor = "red";
					}

                                        this.mPlayerButtonArray.push(button);
					
					//create a parent button
 					var button = document.createElement("BUTTON");
                                	button.setAttribute('class','club-profile-button');
                                        button.innerHTML = "Parent";
                                        container.appendChild(button);
                                        var id = 'club_parent_button_' + this.mJson.club_profiles[i].person_id;
                                        button.setAttribute("id", id);
                                        button.onclick = this.hit.bind(button);
					
					if (this.mJson.club_profiles[i].parent_id != null)
					{
						button.style.backgroundColor = "green";
					}
					else
					{
						button.style.backgroundColor = "red";
					}

                                        this.mParentButtonArray.push(button);
					
					//create a coach button
 					var button = document.createElement("BUTTON");
                                	button.setAttribute('class','club-profile-button');
                                        button.innerHTML = "Coach";
                                        container.appendChild(button);
                                        var id = 'club_coach_button_' + this.mJson.club_profiles[i].person_id;
                                        button.setAttribute("id", id);
                                        button.onclick = this.hit.bind(button);
					
					if (this.mJson.club_profiles[i].coach_id != null)
					{
						button.style.backgroundColor = "green";
					}
					else
					{
						button.style.backgroundColor = "red";
					}

                                        this.mCoachButtonArray.push(button);
					
					//create a manager button
 					var button = document.createElement("BUTTON");
                                	button.setAttribute('class','club-profile-button');
                                        button.innerHTML = "Manager";
                                        container.appendChild(button);
                                        var id = 'club_manager_button_' + this.mJson.club_profiles[i].person_id;
                                        button.setAttribute("id", id);
                                        button.onclick = this.hit.bind(button);
					
					if (this.mJson.club_profiles[i].manager_id != null)
					{
						button.style.backgroundColor = "green";
					}
					else
					{
						button.style.backgroundColor = "red";
					}

                                        this.mManagerButtonArray.push(button);

					//create a administrator button
 					var button = document.createElement("BUTTON");
                                	button.setAttribute('class','club-profile-button');
                                        button.innerHTML = "Administrator";
                                        container.appendChild(button);
                                        var id = 'club_administrator_button_' + this.mJson.club_profiles[i].person_id;
                                        button.setAttribute("id", id);
                                        button.onclick = this.hit.bind(button);
					
					if (this.mJson.club_profiles[i].administrator_id != null)
					{
						button.style.backgroundColor = "green";
					}
					else
					{
						button.style.backgroundColor = "red";
					}

                                        this.mAdministratorButtonArray.push(button);





					//console.log('club_profile:' + this.mJson.club_profiles[i]); 
/*
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
					*/
				}
			}
		}
	}
}
