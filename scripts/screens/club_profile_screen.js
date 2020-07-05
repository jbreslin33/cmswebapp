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

		this.mClubRoleRow = document.getElementById("club_profile_screen_club_role_row_id");
		this.mTeamRow = document.getElementById("club_profile_screen_team_row_id");
		
		//modal
                this.setModal(document.getElementById("club_profile_modal_id"));
                this.setModalParagraph(document.getElementById("club_profile_modal_p_id"));
                this.setModalButton(document.getElementById("club_profile_modal_button_id"));
                this.setModalCloseButton(document.getElementById("club_profile_modal_close_button_id"));

		this.mClubPlayerButton = null;
		this.mClubParentButton = null;
		this.mClubCoachButton = null;
		this.mClubManagerButton = null;

		this.mDivArray = new Array();

		//create a club player button
                var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Player';
                this.mClubRoleRow.appendChild(button);
                button.onclick = this.hitClubPlayerButton.bind(button);
                button.style.backgroundColor = "red";
                this.mClubPlayerButton = button;

                //create a club parent button
                var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Parent';
                this.mClubRoleRow.appendChild(button);
                button.onclick = this.hitClubParentButton.bind(button);
                button.style.backgroundColor = "red";
                this.mClubParentButton = button;

                //create a club coach button
                var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Coach';
                this.mClubRoleRow.appendChild(button);
                button.onclick = this.hitClubCoachButton.bind(button);
                button.style.backgroundColor = "red";
                this.mClubCoachButton = button;

                //create a club manager button
                var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Manager';
                this.mClubRoleRow.appendChild(button);
                button.onclick = this.hitClubManagerButton.bind(button);
                button.style.backgroundColor = "red";
                this.mClubManagerButton = button;

		this.mCurrentButton = null;

		this.mPlayerButtonArray = new Array();
		this.mParentButtonArray = new Array();
		this.mCoachButtonArray = new Array();
		this.mManagerButtonArray = new Array();

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

                //close nav
                this.setCloseNav();
        }

        exit()
        {
                this.removeDivs();

		//remove club role buttons
		this.mClubPlayerButton.remove();		
		this.mClubParentButton.remove();		
		this.mClubCoachButton.remove();		
		this.mClubManagerButton.remove();		

                super.exit();
        }

        removeDivs()
        {
                for (var i = 0; i < APPLICATION.getCurrentScreen().mDivArray.length; i++)
                {
                        APPLICATION.getCurrentScreen().mDivArray[i].remove();
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

	removeClubButtons()
	{
		this.mClubPlayerButton.remove();
		this.mClubParentButton.remove();
		this.mClubCoachButton.remove();
		this.mClubManagerButton.remove();
	}

	removePlayerButtons()
	{
                for (var i = 0; i < APPLICATION.getCurrentScreen().mPlayerButtonArray.length; i++)
                {
                        APPLICATION.getCurrentScreen().mPlayerButtonArray[i].remove();
                }
 		APPLICATION.getCurrentScreen().mPlayerButtonArray.length = 0;
	}


        removeParentButtons()
        {
                for (var i = 0; i < APPLICATION.getCurrentScreen().mParentButtonArray.length; i++)
                {
                        APPLICATION.getCurrentScreen().mParentButtonArray[i].remove();
                }
                APPLICATION.getCurrentScreen().mParentButtonArray.length = 0;
        }

        removeCoachButtons()
        {
                for (var i = 0; i < APPLICATION.getCurrentScreen().mCoachButtonArray.length; i++)
                {
                        APPLICATION.getCurrentScreen().mCoachButtonArray[i].remove();
                }
                APPLICATION.getCurrentScreen().mCoachButtonArray.length = 0;
        }

        removeManagerButtons()
        {
                for (var i = 0; i < APPLICATION.getCurrentScreen().mManagerButtonArray.length; i++)
                {
                        APPLICATION.getCurrentScreen().mManagerButtonArray[i].remove();
                }
                APPLICATION.getCurrentScreen().mManagerButtonArray.length = 0;
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
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/club_persons.php?" + this.getStandardParameters() + '&club_id=' + this.getClubId());
                APPLICATION.getCurrentScreen().ajax();
        }
        
	getClubPersonProfile()
        {
		var person_selected_id =  APPLICATION.getCurrentScreen().getPersonId(); 

		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/club_person_profile.php?" + this.getStandardParameters() + '&club_id=' + this.getClubId() + '&person_selected_id=' + person_selected_id);
                APPLICATION.getCurrentScreen().ajax();
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
                var screen = APPLICATION.getCurrentScreen();
		screen.mCurrentButton = this;

                if (this.style.backgroundColor == "green")
		{
			screen.deleteClubParent();
		}
		else
		{
			screen.insertClubParent();
		}
	}

	hitClubCoachButton()
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.mCurrentButton = this;

                if (this.style.backgroundColor == "green")
		{
			screen.deleteClubCoach();
		}
		else
		{
			screen.insertClubCoach();
		}
	}

	hitClubManagerButton()
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.mCurrentButton = this;

                if (this.style.backgroundColor == "green")
		{
			screen.deleteClubManager();
		}
		else
		{
			screen.insertClubManager();
		}
	}

	hitPlayerButton()
	{
		APPLICATION.getCurrentScreen().mCurrentButton = this;
		var screen = APPLICATION.getCurrentScreen();

		if (this.style.backgroundColor == "green")
		{
			screen.deleteTeamPlayer(this.getAttribute("team_id"), this.getAttribute("team_club_player_id"));
		}
		else
		{
			screen.insertTeamPlayer(this.getAttribute("team_id"));
		}
	}


	hitParentButton()
        {
                APPLICATION.getCurrentScreen().mCurrentButton = this;
                var screen = APPLICATION.getCurrentScreen();

                if (this.style.backgroundColor == "green")
                {
                        screen.deleteTeamParent(this.getAttribute("team_id"), this.getAttribute("team_club_parent_id"));
                }
                else
                {
                        screen.insertTeamParent(this.getAttribute("team_id"));
                }
        }

        hitCoachButton()
        {
                APPLICATION.getCurrentScreen().mCurrentButton = this;
                var screen = APPLICATION.getCurrentScreen();

                if (this.style.backgroundColor == "green")
                {
                        screen.deleteTeamCoach(this.getAttribute("team_id"), this.getAttribute("team_club_coach_id"));
                }
                else
                {
                        screen.insertTeamCoach(this.getAttribute("team_id"));
                }
        }

	hitManagerButton()
        {
                APPLICATION.getCurrentScreen().mCurrentButton = this;
                var screen = APPLICATION.getCurrentScreen();

                if (this.style.backgroundColor == "green")
                {
                        screen.deleteTeamManager(this.getAttribute("team_id"), this.getAttribute("team_club_manager_id"));
                }
                else
                {
                        screen.insertTeamManager(this.getAttribute("team_id"));
                }
        }



	insertTeamPlayer(team_id)
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.setUrl("/php/classes/screens/insert_team_player.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&team_id=' + team_id + '&club_id=' + this.getClubId());
                screen.ajax();
	}
	deleteTeamPlayer(team_id,team_club_player_id)
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.setUrl("/php/classes/screens/delete_team_player.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&team_id=' + team_id + '&club_id=' + this.getClubId() + '&team_club_player_id=' + team_club_player_id);
		console.log('url:' + screen.getUrl());
                screen.ajax();
	}



        insertTeamParent(team_id)
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/insert_team_parent.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&team_id=' + team_id + '&club_id=' + this.getClubId());
                screen.ajax();
        }
        deleteTeamParent(team_id,team_club_parent_id)
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/delete_team_parent.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&team_id=' + team_id + '&club_id=' + this.getClubId() + '&team_club_parent_id=' + team_club_parent_id);
		console.log('url:' + screen.getUrl());
                screen.ajax();
        }

        insertTeamCoach(team_id)
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/insert_team_coach.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&team_id=' + team_id + '&club_id=' + this.getClubId());
                screen.ajax();
        }
        deleteTeamCoach(team_id,team_club_coach_id)
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/delete_team_coach.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&team_id=' + team_id + '&club_id=' + this.getClubId() + '&team_club_coach_id=' + team_club_coach_id);
		console.log('url:' + screen.getUrl());
                screen.ajax();
        }

        insertTeamManager(team_id)
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/insert_team_manager.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&team_id=' + team_id + '&club_id=' + this.getClubId());
                screen.ajax();
        }
        deleteTeamManager(team_id,team_club_manager_id)
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/delete_team_manager.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&team_id=' + team_id + '&club_id=' + this.getClubId() + '&team_club_manager_id=' + team_club_manager_id);
		console.log('url:' + screen.getUrl());
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
		screen.setUrl("/php/classes/screens/delete_club_player.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
	}

        insertClubParent()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/insert_club_parent.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }
        deleteClubParent()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/delete_club_parent.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }

        insertClubCoach()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/insert_club_coach.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }
        deleteClubCoach()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/delete_club_coach.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }

       	insertClubManager()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/insert_club_manager.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }
        deleteClubManager()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/delete_club_manager.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }

        processJsonData()
	{
		super.processJsonData();

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
				this.getClubPersonProfile()
			}

			if (this.mJson.teams)
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
				//APPLICATION.getCurrentScreen().removeClubButtons();	
				APPLICATION.getCurrentScreen().removePlayerButtons();
				APPLICATION.getCurrentScreen().removeParentButtons();
				APPLICATION.getCurrentScreen().removeCoachButtons();
				APPLICATION.getCurrentScreen().removeManagerButtons();
                                
				for (var i = 0; i < this.mJson.teams.length; i++)
				{
					//new row...
                                        var rowDiv = document.createElement("DIV");
                                       	rowDiv.setAttribute('class','row');
					this.getHtml().appendChild(rowDiv);
					this.mDivArray.push(rowDiv);

                                        //create a player button
                                        var button = document.createElement("BUTTON");
                                        button.setAttribute('class','club-profile-button');
                                        button.innerHTML = '' + this.mJson.teams[i].team_name;
                                        rowDiv.appendChild(button);
                                        var team_id = this.mJson.teams[i].team_id;
                                        var team_name = this.mJson.teams[i].team_name;
                                        button.setAttribute("team_id", team_id);
                                        button.setAttribute("team_name", team_name);
                                        button.setAttribute("team_club_player_id", null);
                                        button.onclick = this.hitPlayerButton.bind(button);
					button.style.backgroundColor = "red";
                                        this.mPlayerButtonArray.push(button);

                                        //create a parent button
                                        var button = document.createElement("BUTTON");
                                        button.setAttribute('class','club-profile-button');
                                        button.innerHTML = '' + this.mJson.teams[i].team_name;
                                        rowDiv.appendChild(button);
                                        var team_id = this.mJson.teams[i].team_id;
                                        var team_name = this.mJson.teams[i].team_name;
                                        button.setAttribute("team_id", team_id);
                                        button.setAttribute("team_name", team_name);
                                        button.setAttribute("team_club_parent_id", null);
                                        button.onclick = this.hitParentButton.bind(button);
                                        button.style.backgroundColor = "red";
                                        this.mParentButtonArray.push(button);

                                       	//create a coach button
                                        var button = document.createElement("BUTTON");
                                        button.setAttribute('class','club-profile-button');
                                        button.innerHTML = '' + this.mJson.teams[i].team_name;
                                        rowDiv.appendChild(button);
                                        var team_id = this.mJson.teams[i].team_id;
                                        var team_name = this.mJson.teams[i].team_name;
                                        button.setAttribute("team_id", team_id);
                                        button.setAttribute("team_name", team_name);
                                        button.setAttribute("team_club_coach_id", null);
                                        button.onclick = this.hitCoachButton.bind(button);
                                        button.style.backgroundColor = "red";
                                        this.mCoachButtonArray.push(button);

					//create a manager button
                                        var button = document.createElement("BUTTON");
                                        button.setAttribute('class','club-profile-button');
                                        button.innerHTML = '' + this.mJson.teams[i].team_name;
                                        rowDiv.appendChild(button);
                                        var team_id = this.mJson.teams[i].team_id;
                                        var team_name = this.mJson.teams[i].team_name;
                                        button.setAttribute("team_id", team_id);
                                        button.setAttribute("team_name", team_name);
                                        button.setAttribute("team_club_manager_id", null);
                                        button.onclick = this.hitManagerButton.bind(button);
                                        button.style.backgroundColor = "red";
                                        this.mManagerButtonArray.push(button);

				}

				if (this.mJson.team_club_players)
				{
                        		for (var i = 0; i < this.mJson.team_club_players.length; i++)
					{
                        			for (var t = 0; t < this.mPlayerButtonArray.length; t++)
						{
							if (this.mJson.team_club_players[i].team_id == this.mPlayerButtonArray[t].getAttribute("team_id"))
							{
                                                		this.mPlayerButtonArray[t].style.backgroundColor = "green";
                                                		this.mPlayerButtonArray[t].setAttribute("team_club_player_id", this.mJson.team_club_players[i].team_club_player_id);
							}
						}
					}
				}

                                if (this.mJson.team_club_parents)
                                {
                                        for (var i = 0; i < this.mJson.team_club_parents.length; i++)
                                        {
                                                for (var t = 0; t < this.mParentButtonArray.length; t++)
                                                {
                                                        if (this.mJson.team_club_parents[i].team_id == this.mParentButtonArray[t].getAttribute("team_id"))
                                                        {
                                                                this.mParentButtonArray[t].style.backgroundColor = "green";
                                                                this.mParentButtonArray[t].setAttribute("team_club_parent_id", this.mJson.team_club_parents[i].team_club_parent_id);
                                                        }
                                                }
                                        }
                                }

				if (this.mJson.team_club_coaches)
                                {
                                        for (var i = 0; i < this.mJson.team_club_coaches.length; i++)
                                        {
                                                for (var t = 0; t < this.mCoachButtonArray.length; t++)
                                                {
                                                        if (this.mJson.team_club_coaches[i].team_id == this.mCoachButtonArray[t].getAttribute("team_id"))
                                                        {
                                                                this.mCoachButtonArray[t].style.backgroundColor = "green";
                                                                this.mCoachButtonArray[t].setAttribute("team_club_coach_id", this.mJson.team_club_coaches[i].team_club_coach_id);
                                                        }
                                                }
                                        }
                                }

                                if (this.mJson.team_club_managers)
                                {
                                        for (var i = 0; i < this.mJson.team_club_managers.length; i++)
                                        {
                                                for (var t = 0; t < this.mManagerButtonArray.length; t++)
                                                {
                                                        if (this.mJson.team_club_managers[i].team_id == this.mManagerButtonArray[t].getAttribute("team_id"))
                                                        {
                                                                this.mManagerButtonArray[t].style.backgroundColor = "green";
                                                                this.mManagerButtonArray[t].setAttribute("team_club_manager_id", this.mJson.team_club_managers[i].team_club_manager_id);
                                                        }
                                                }
                                        }
                                }
			}
		}
	}
}
