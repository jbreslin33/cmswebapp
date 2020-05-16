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

		
		//modal
                this.setModal(document.getElementById("club_profile_modal_id"));
                this.setModalParagraph(document.getElementById("club_profile_modal_p_id"));
                this.setModalButton(document.getElementById("club_profile_modal_button_id"));
                this.setModalCloseButton(document.getElementById("club_profile_modal_close_button_id"));

		this.mDivArray = new Array();
		this.mClubProfilesArray = new Array();

		this.mPlayerButtonArray = new Array();
		this.mParentButtonArray = new Array();
		this.mCoachButtonArray = new Array();
		this.mManagerButtonArray = new Array();
		this.mAdministratorButtonArray = new Array();
		
		this.setClubSelect(document.getElementById("club_profile_screen_club_select_id"));
		this.setPersonSelect(document.getElementById("club_person_screen_person_select_id"));

               	//club select
                if (this.getClubSelect())
		{
                	this.getClubSelect().onchange = this.clubSelected.bind(this);
		}

                //person select
                if (this.getPersonSelect())
                {
                        this.getPersonSelect().onchange = this.personSelected.bind(this);
                }


        }

       	get()
        {
                if (APPLICATION.getJWT())
                {
                        APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_administrated_clubs.php?" + this.getStandardParameters());
                        APPLICATION.getCurrentScreen().ajax();
                }
        }

	//override from screen
	personSelected()
	{
                this.getClubPersonProfile();
	}

        clubSelected()
        {
                this.getClubPersons();
        }

	processClubs()
        {
                super.processClubs();
                if (this.mJson.clubs)
                {
                        this.getClubPersons();
                }
        }

        getClubPersons()
        {
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/club_person.php?" + this.getStandardParameters() + '&club_id=' + this.getClubId());
                APPLICATION.getCurrentScreen().ajax();
        }
        
	getClubPersonProfile()
        {
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/club_person_profile.php?" + this.getStandardParameters() + '&club_id=' + this.getClubId() + '&person_selected_id=' + this.getPersonId());
                APPLICATION.getCurrentScreen().ajax();
        }

	exit()
	{
		this.removeDivs();
		super.exit();
	}
	
	removeDivs()
	{
		for (var i = 0; i < APPLICATION.getCurrentScreen().mDivArray.length; i++)
		{
                        APPLICATION.getCurrentScreen().mDivArray[i].remove();
		}
	}

	hit()
	{
		var screen = APPLICATION.getCurrentScreen();
		
		var a = this.id.split('_');

		var profileType = a[1]; 
		var person_to_change_id = a[3];

		var profileNumber = 0;
		var active = 0;

		if (a[1] == 'player')
		{
			if (this.style.backgroundColor == "green")
			{
				this.style.backgroundColor = "red";
				profileNumber = '1'; 
				active = '1'; 
			}
			else
			{
				this.style.backgroundColor = "green";
				profileNumber = '1'; 
				active = '2'; 
			}
		}
		if (a[1] == 'parent')
		{
			if (this.style.backgroundColor == "green")
			{
				this.style.backgroundColor = "red";
				profileNumber = '2'; 
				active = '1'; 
			}
			else
			{
				this.style.backgroundColor = "green";
				profileNumber = '2'; 
				active = '2'; 
			}
		}
		if (a[1] == 'coach')
		{
			if (this.style.backgroundColor == "green")
			{
				this.style.backgroundColor = "red";
				profileNumber = '3'; 
				active = '1'; 
			}
			else
			{
				this.style.backgroundColor = "green";
				profileNumber = '3'; 
				active = '2'; 
			}
		}
		if (a[1] == 'manager')
		{
			if (this.style.backgroundColor == "green")
			{
				this.style.backgroundColor = "red";
				profileNumber = '4'; 
				active = '1'; 
			}
			else
			{
				this.style.backgroundColor = "green";
				profileNumber = '4'; 
				active = '2'; 
			}
		}
		if (a[1] == 'administrator')
		{
			if (this.style.backgroundColor == "green")
			{
				this.style.backgroundColor = "red";
				profileNumber = '5'; 
				active = '1'; 
			}
			else
			{
				this.style.backgroundColor = "green";
				profileNumber = '5'; 
				active = '2'; 
			}
		}
		screen.updateProfile(APPLICATION.getPersonId(),profileNumber,active,person_to_change_id);
	}

	updateProfile(personId,profileNumber,active,person_to_change_id)
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.setUrl("/php/classes/screens/update_club_profile.php?jwt=" + APPLICATION.getJWT() + '&profiletype=' + profileNumber + '&active=' + active + '&person_id=' + personId + '&person_to_change_id=' + person_to_change_id);
                screen.ajax();
	}

        processJsonData()
	{
		super.processJsonData();

		this.mClubProfilesArray.length = 0;

		//make new array containing games and practices together
		if (this.mJson)
		{
			if (this.mJson.club_persons)
			{
				//load up club_persons option
                        	var select = this.getPersonSelect();
                        	select.length = 0;

                        	for (var i = 0; i < this.mJson.club_persons.length; i++)
                        	{
                                	var opt = document.createElement('option');
                                	opt.value = this.mJson.club_persons[i].id;
					var first_name = this.mJson.club_persons[i].first_name;
					var middle_name = this.mJson.club_persons[i].middle_name;
            				var last_name = this.mJson.club_persons[i].last_name;
            				var dob = this.mJson.club_persons[i].dob;
					var full_name = '';
					if (last_name)
					{
						full_name = full_name + '' + last_name;
					}
					if (first_name)
					{
						if (last_name)
						{
							full_name = full_name + ', ' + first_name;
						}
						else
						{
							//no last name
							full_name = full_name + '' + first_name;
						}
					}
					if (middle_name)
					{
						full_name = full_name + ' ' + middle_name;
					}
					if (dob)
					{
						full_name = full_name + ' ' + dob;
					}

                                	opt.innerHTML = full_name;
                                	select.appendChild(opt);
                        	}
			}

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
				}
			}
		}
	}
}
