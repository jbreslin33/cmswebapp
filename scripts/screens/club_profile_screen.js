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

		this.mClubPlayerButton = document.getElementById("club_profile_club_player_button_id");
		this.mClubParentButton = document.getElementById("club_profile_club_parent_button_id");
		this.mClubCoachButton = document.getElementById("club_profile_club_coach_button_id");
		this.mClubManagerButton = document.getElementById("club_profile_club_manager_button_id");
				
		this.mClubPlayerButton.setAttribute('class','club-profile-button');
		this.mClubParentButton.setAttribute('class','club-profile-button');
		this.mClubCoachButton.setAttribute('class','club-profile-button');
		this.mClubManagerButton.setAttribute('class','club-profile-button');
                                
		this.mClubPlayerButton.onclick  = this.hitClubPlayerButton.bind(this.mClubPlayerButton);
                this.mClubParentButton.onclick  = this.hitClubParentButton.bind(this.mClubParentButton);
                this.mClubCoachButton.onclick   = this.hitClubCoachButton.bind(this.mClubCoachButton);
                this.mClubManagerButton.onclick = this.hitClubManagerButton.bind(this.mClubManagerButton);
	
		this.mCurrentButton = null;

		//this.removePlayerButtons();
		this.mPlayerButtonArray = new Array();

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

	removePlayerButtons()
	{
                for (var i = 0; i < APPLICATION.getCurrentScreen().mPlayerButtonArray.length; i++)
                {
                        APPLICATION.getCurrentScreen().mPlayerButtonArray[i].remove();
                }
 		APPLICATION.getCurrentScreen().mPlayerButtonArray.length = 0;
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
		console.log('getClubPersons called');
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/club_persons.php?" + this.getStandardParameters() + '&club_id=' + this.getClubId());
                APPLICATION.getCurrentScreen().ajax();
        }
        
	getClubPersonProfile()
        {
		var person_selected_id =  APPLICATION.getCurrentScreen().getPersonId(); 
		console.log('person_selected_id:' + person_selected_id);

		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/club_person_profile.php?" + this.getStandardParameters() + '&club_id=' + this.getClubId() + '&person_selected_id=' + person_selected_id);
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

	hitClubPlayerButton()
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.mCurrentButton = this;

                if (this.style.backgroundColor == "green")
		{
			screen.deleteClubPlayer();
		}
		else
		{
			screen.insertClubPlayer();
		}
	}

	hitClubParentButton()
        {
                APPLICATION.getCurrentScreen().mCurrentButton = this;
                var screen = APPLICATION.getCurrentScreen();
                var a = this.id.split('_');
                var person_to_change_id = a[3];

                if (this.style.backgroundColor == "green")
                {
                        APPLICATION.getCurrentScreen().deleteClubParent(person_to_change_id);
                }
                else
                {
                        APPLICATION.getCurrentScreen().insertClubParent(person_to_change_id);
                }
        }

        hitClubCoachButton()
        {
                APPLICATION.getCurrentScreen().mCurrentButton = this;
                var screen = APPLICATION.getCurrentScreen();
                var a = this.id.split('_');
                var person_to_change_id = a[3];

                if (this.style.backgroundColor == "green")
                {
                        APPLICATION.getCurrentScreen().deleteClubCoach(person_to_change_id);
                }
                else
                {
                        APPLICATION.getCurrentScreen().insertClubCoach(person_to_change_id);
                }
        }

        hitClubManagerButton()
        {
                APPLICATION.getCurrentScreen().mCurrentButton = this;
                var screen = APPLICATION.getCurrentScreen();
                var a = this.id.split('_');
                var person_to_change_id = a[3];

                if (this.style.backgroundColor == "green")
                {
                        APPLICATION.getCurrentScreen().deleteClubManager(person_to_change_id);
                }
                else
                {
                        APPLICATION.getCurrentScreen().insertClubManager(person_to_change_id);
                }
        }

	hitClubRoleButton()
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

		screen.updateProfile(APPLICATION.getPersonId(),profileNumber,active,person_to_change_id);
	}
	/*
                                        button.setAttribute("team_id", team_id);
                                        button.setAttribute("team_name", team_name);
                                        button.setAttribute("team_club_persons_club_player_id", null);
					*/

	hitPlayerButton()
	{
		APPLICATION.getCurrentScreen().mCurrentButton = this;
		var screen = APPLICATION.getCurrentScreen();
		
		var a = this.id.split('_');

		if (this.style.backgroundColor == "green")
		{
			screen.deleteTeamPlayer(screen.getPersonId(),this.getAttribute("team_id"));
		}
		else
		{
			screen.insertTeamPlayer(screen.getPersonId(),this.getAttribute("team_id"));
		}

		//screen.updateProfile(APPLICATION.getPersonId(),profileNumber,active,person_to_change_id);
	}

	insertTeamPlayer(team_id)
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.setUrl("/php/classes/screens/insert_team_player.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&team_id=' + team_id + '&club_id=' + this.getClubId());
                screen.ajax();
	}
	deleteTeamPlayer(team_club_persons_club_player_id, team_id)
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.setUrl("/php/classes/screens/insert_team_player.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&team_id=' + team_id + '&club_id=' + this.getClubId() + '&team_club_persons_club_player_id=' + team_club_persons_club_player_id);
                screen.ajax();
	}

	insertClubPlayer()
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.setUrl("/php/classes/screens/insert_club_player.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
	}
	deleteClubPlayer()
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.setUrl("/php/classes/screens/delete_club_player.php?" + this.getStandardParameters() + '&person_to_change_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
	}

        insertClubParent(person_to_change_id)
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/insert_club_parent.php?" + this.getStandardParameters() + '&person_to_change_id=' + person_to_change_id);
                screen.ajax();
        }
        deleteClubParent(person_to_change_id)
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/delete_club_parent.php?" + this.getStandardParameters() + '&person_to_change_id=' + person_to_change_id);
                screen.ajax();
        }

        insertClubCoach(person_to_change_id)
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/insert_club_coach.php?" + this.getStandardParameters() + '&person_to_change_id=' + person_to_change_id);
                screen.ajax();
        }
        deleteClubCoach(person_to_change_id)
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/delete_club_coach.php?" + this.getStandardParameters() + '&person_to_change_id=' + person_to_change_id);
                screen.ajax();
        }

        insertClubManager(person_to_change_id)
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/insert_club_manager.php?" + this.getStandardParameters() + '&person_to_change_id=' + person_to_change_id);
                screen.ajax();
        }
        deleteClubManager(person_to_change_id)
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/delete_club_manager.php?" + this.getStandardParameters() + '&person_to_change_id=' + person_to_change_id);
                screen.ajax();
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


				console.log('got some');
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

			if (this.mJson.club_teams)
			{
				if (this.mJson.club_players_id)
				{
                        		if (this.mJson.club_players_id.length > 0)
					{
                                		if (this.mJson.club_players_id[0].person_id)
                                		{
                                			var id = 'club_player_button_' + this.mJson.club_players_id[0].person_id;
                                			this.mClubPlayerButton.setAttribute("id", id);
                                			this.mClubPlayerButton.style.backgroundColor = "green";
						}
                                	}
					else
					{
                                		var id = 'club_player_button_' + this.getPersonId();
                                		this.mClubPlayerButton.setAttribute("id", id);
                                       		this.mClubPlayerButton.style.backgroundColor = "red";
					}
				}
				
				if (this.mJson.club_parents_id)
                                {
                                        if (this.mJson.club_parents_id.length > 0)
                                        {
                                                if (this.mJson.club_parents_id[0].person_id)
                                                {
                                                        var id = 'club_parent_button_' + this.mJson.club_parents_id[0].person_id;
                                                        this.mClubParentButton.setAttribute("id", id);
                                                        this.mClubParentButton.style.backgroundColor = "green";
                                                }
                                        }
                                        else
                                        {
                                                var id = 'club_parent_button_' + this.getPersonId();
                                                this.mClubParentButton.setAttribute("id", id);
                                                this.mClubParentButton.style.backgroundColor = "red";
                                        }
                                }
				
				if (this.mJson.club_coaches_id)
                                {
                                        if (this.mJson.club_coaches_id.length > 0)
                                        {
                                                if (this.mJson.club_coaches_id[0].person_id)
                                                {
                                                        var id = 'club_coach_button_' + this.mJson.club_coaches_id[0].person_id;
                                                        this.mClubCoachButton.setAttribute("id", id);
                                                        this.mClubCoachButton.style.backgroundColor = "green";
                                                }
                                        }
                                        else
                                        {
                                                var id = 'club_coach_button_0' + this.getPersonId();
                                                this.mClubCoachButton.setAttribute("id", id);
                                                this.mClubCoachButton.style.backgroundColor = "red";
                                        }
                                }
				
				if (this.mJson.club_managers_id)
                                {
                                        if (this.mJson.club_managers_id.length > 0)
                                        {
                                                if (this.mJson.club_managers_id[0].person_id)
                                                {
                                                        var id = 'club_manager_button_' + this.mJson.club_managers_id[0].person_id;
                                                        this.mClubManagerButton.setAttribute("id", id);
                                                        this.mClubManagerButton.style.backgroundColor = "green";
                                                }
                                        }
                                        else
                                        {
                                                var id = 'club_manager_button_0' + this.getPersonId();
                                                this.mClubManagerButton.setAttribute("id", id);
                                                this.mClubManagerButton.style.backgroundColor = "red";
                                        }
                                }
				
				APPLICATION.getCurrentScreen().removePlayerButtons();
                                
				for (var i = 0; i < this.mJson.club_teams.length; i++)
				{
					//row
                                	var div = document.createElement('div');
                                	this.mDivArray.push(div);
                                	div.setAttribute('class','row');
                                	document.getElementById("club_profile_screen_html_id").appendChild(div);

                                        //create a player button
                                        var button = document.createElement("BUTTON");
                                        button.setAttribute('class','club-profile-button');
                                        button.innerHTML = '' + this.mJson.club_teams[i].team_name;
                                        div.appendChild(button);
					//team id may be all we need
                                        var team_id = this.mJson.club_teams[i].team_id;
                                        var team_name = this.mJson.club_teams[i].team_name;
                                        button.setAttribute("team_id", team_id);
                                        button.setAttribute("team_name", team_name);
                                        button.setAttribute("team_club_persons_club_player_id", null);
                                        button.onclick = this.hitPlayerButton.bind(button);
                                        
					button.style.backgroundColor = "red";

                                        this.mPlayerButtonArray.push(button);
				}

				if (this.mJson.team_club_persons_club_players)
				{
                        		for (var i = 0; i < this.mJson.team_club_persons_club_players.length; i++)
					{
                        			for (var t = 0; t < this.mPlayerButtonArray.length; t++)
						{
							if (this.mJson.team_club_persons_club_players[i].team_id == this.mPlayerButtonArray[t].getAttribute("team_id"))
							{
								console.log('found match at team:' + this.mPlayerButtonArray[t].getAttribute("team_name"));
                                                		this.mPlayerButtonArray[t].style.backgroundColor = "green";
                                                		this.mPlayerButtonArray[t].setAttribute("team_club_persons_club_player_id", this.mJson.team_club_persons_club_players[i].team_club_persons_club_player_id);
							}
						}
					}
				}
			}
		}
	}
}
