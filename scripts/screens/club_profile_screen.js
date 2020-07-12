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

		this.mClubRoleInterestRow = document.getElementById("club_profile_screen_club_role_interest_row_id");
		this.mClubRoleLeadRow = document.getElementById("club_profile_screen_club_role_lead_row_id");
		this.mClubRoleProspectRow = document.getElementById("club_profile_screen_club_role_prospect_row_id");
		this.mClubRolePotentialRow = document.getElementById("club_profile_screen_club_role_potential_row_id");
		this.mClubRoleRegularRow = document.getElementById("club_profile_screen_club_role_regular_row_id");

		this.mTeamRow = document.getElementById("club_profile_screen_team_row_id");
		
		//modal
                this.setModal(document.getElementById("club_profile_modal_id"));
                this.setModalParagraph(document.getElementById("club_profile_modal_p_id"));
                this.setModalButton(document.getElementById("club_profile_modal_button_id"));
                this.setModalCloseButton(document.getElementById("club_profile_modal_close_button_id"));

		this.mClubPlayerInterestButton = null;
		this.mClubParentInterestButton = null;
		this.mClubCoachInterestButton = null;
		this.mClubManagerInterestButton = null;

		this.mClubPlayerLeadButton = null;
		this.mClubParentLeadButton = null;
		this.mClubCoachLeadButton = null;
		this.mClubManagerLeadButton = null;

		this.mClubPlayerProspectButton = null;
		this.mClubParentProspectButton = null;
		this.mClubCoachProspectButton = null;
		this.mClubManagerProspectButton = null;

		this.mClubPlayerPotentialButton = null;
		this.mClubParentPotentialButton = null;
		this.mClubCoachPotentialButton = null;
		this.mClubManagerCoachPotentialButton = null;

		this.mClubPlayerButton = null;
		this.mClubParentButton = null;
		this.mClubCoachButton = null;
		this.mClubManagerButton = null;

		this.mDivArray = new Array();

		//Interest
                var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Player Interest';
                this.mClubRoleInterestRow.appendChild(button);
                button.onclick = this.hitClubPlayerInterestButton.bind(button);
                button.style.backgroundColor = "red";
                this.mClubPlayerInterestButton = button;
                
		var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Parent Interest';
                this.mClubRoleInterestRow.appendChild(button);
                button.onclick = this.hitClubParentInterestButton.bind(button);
                button.style.backgroundColor = "red";
                this.mClubParentInterestButton = button;
		
		var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Coach Interest';
                this.mClubRoleInterestRow.appendChild(button);
                button.onclick = this.hitClubCoachInterestButton.bind(button);
                button.style.backgroundColor = "red";
                this.mClubCoachInterestButton = button;

                var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Manager Interest';
                this.mClubRoleInterestRow.appendChild(button);
                //button.onclick = this.hitClubManagerInterestButton.bind(button);
                button.style.backgroundColor = "grey";
                this.mClubManagerInterestButton = button;

		//Lead
                var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Player Lead';
                this.mClubRoleLeadRow.appendChild(button);
                button.onclick = this.hitClubPlayerLeadButton.bind(button);
                button.style.backgroundColor = "red";
                this.mClubPlayerLeadButton = button;
                
		var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Parent Lead';
                this.mClubRoleLeadRow.appendChild(button);
                button.onclick = this.hitClubParentLeadButton.bind(button);
                button.style.backgroundColor = "red";
                this.mClubParentLeadButton = button;

		var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Coach Lead';
                this.mClubRoleLeadRow.appendChild(button);
                button.onclick = this.hitClubCoachLeadButton.bind(button);
                button.style.backgroundColor = "red";
                this.mClubCoachLeadButton = button;
                
		var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Manager Lead';
                this.mClubRoleLeadRow.appendChild(button);
                //button.onclick = this.hitClubManagerButton.bind(button);
                button.style.backgroundColor = "grey";
                this.mClubManagerLeadButton = button;

		//Prospect
                var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Player Prospect';
                this.mClubRoleProspectRow.appendChild(button);
                button.onclick = this.hitClubPlayerProspectButton.bind(button);
                button.style.backgroundColor = "red";
                this.mClubPlayerProspectButton = button;

		var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Parent Prospect';
                this.mClubRoleProspectRow.appendChild(button);
                button.onclick = this.hitClubParentProspectButton.bind(button);
                button.style.backgroundColor = "red";
                this.mClubParentProspectButton = button;
	
		var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Coach Prospect';
                this.mClubRoleProspectRow.appendChild(button);
                button.onclick = this.hitClubCoachProspectButton.bind(button);
                button.style.backgroundColor = "red";
                this.mClubCoachProspectButton = button;
                
		var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Manager Prospect';
                this.mClubRoleProspectRow.appendChild(button);
                //button.onclick = this.hitClubManagerProspectButton.bind(button);
                button.style.backgroundColor = "grey";
                this.mClubManagerProspectButton = button;

		//Potential
                var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Player Potential';
                this.mClubRolePotentialRow.appendChild(button);
                button.onclick = this.hitClubPlayerPotentialButton.bind(button);
                button.style.backgroundColor = "red";
                this.mClubPlayerPotentialButton = button;
		
		var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Parent Potential';
                this.mClubRolePotentialRow.appendChild(button);
                button.onclick = this.hitClubParentPotentialButton.bind(button);
                button.style.backgroundColor = "red";
                this.mClubParentPotentialButton = button;
		
		var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Coach Potential';
                this.mClubRolePotentialRow.appendChild(button);
                button.onclick = this.hitClubCoachPotentialButton.bind(button);
                button.style.backgroundColor = "red";
                this.mClubCoachPotentialButton = button;
                
		var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Manager Potential';
                this.mClubRolePotentialRow.appendChild(button);
                //button.onclick = this.hitClubManagerButton.bind(button);
                button.style.backgroundColor = "grey";
                this.mClubManagerPotentialButton = button;

		//Regular
		var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Player';
                this.mClubRoleRegularRow.appendChild(button);
                button.onclick = this.hitClubPlayerButton.bind(button);
                button.style.backgroundColor = "red";
                this.mClubPlayerButton = button;
		
		var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Parent';
                this.mClubRoleRegularRow.appendChild(button);
                button.onclick = this.hitClubParentButton.bind(button);
                button.style.backgroundColor = "red";
                this.mClubParentButton = button;
		
		var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Coach';
                this.mClubRoleRegularRow.appendChild(button);
                button.onclick = this.hitClubCoachButton.bind(button);
                button.style.backgroundColor = "red";
                this.mClubCoachButton = button;

		var button = document.createElement("BUTTON");
                button.setAttribute('class','club-profile-button');
                button.innerHTML = 'Club Manager';
                this.mClubRoleRegularRow.appendChild(button);
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

		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/club_person_profile.php?" + this.getStandardParameters() + '&club_id=' + this.getClubId() + '&screen_person_id=' + person_selected_id);
                APPLICATION.getCurrentScreen().ajax();
        }

        hitClubPlayerInterestButton()
        {
		console.log('ClubProfileScreen::hitClubPlayerInterestButton()');
                var screen = APPLICATION.getCurrentScreen();
                screen.mCurrentButton = this;

                if (this.style.backgroundColor == "green")
                {
                        screen.deleteClubPlayerInterest();
                }
                else
                {
                        screen.insertClubPlayerInterest();
                }
        }

        hitClubPlayerLeadButton()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.mCurrentButton = this;

                if (this.style.backgroundColor == "green")
                {
                        screen.deleteClubPlayerLead();
                }
                else
                {
                        screen.insertClubPlayerLead();
                }
        }

        hitClubPlayerProspectButton()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.mCurrentButton = this;

                if (this.style.backgroundColor == "green")
                {
                        screen.deleteClubPlayerProspect();
                }
                else
                {
                        screen.insertClubPlayerProspect();
                }
        }


        hitClubPlayerPotentialButton()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.mCurrentButton = this;

                if (this.style.backgroundColor == "green")
                {
                        screen.deleteClubPlayerPotential();
                }
                else
                {
                        screen.insertClubPlayerPotential();
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

	hitClubParentInterestButton()
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.mCurrentButton = this;

                if (this.style.backgroundColor == "green")
		{
			screen.deleteClubParentInterest();
		}
		else
		{
			screen.insertClubParentInterest();
		}
	}

	hitClubParentLeadButton()
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.mCurrentButton = this;

                if (this.style.backgroundColor == "green")
		{
			screen.deleteClubParentLead();
		}
		else
		{
			screen.insertClubParentLead();
		}
	}

	hitClubParentProspectButton()
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.mCurrentButton = this;

                if (this.style.backgroundColor == "green")
		{
			screen.deleteClubParentProspect();
		}
		else
		{
			screen.insertClubParentProspect();
		}
	}

	hitClubParentPotentialButton()
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.mCurrentButton = this;

                if (this.style.backgroundColor == "green")
		{
			screen.deleteClubParentPotential();
		}
		else
		{
			screen.insertClubParentPotential();
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

	hitClubCoachInterestButton()
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.mCurrentButton = this;

                if (this.style.backgroundColor == "green")
		{
			screen.deleteClubCoachInterest();
		}
		else
		{
			screen.insertClubCoachInterest();
		}
	}

	hitClubCoachLeadButton()
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.mCurrentButton = this;

                if (this.style.backgroundColor == "green")
		{
			screen.deleteClubCoachLead();
		}
		else
		{
			screen.insertClubCoachLead();
		}
	}

	hitClubCoachProspectButton()
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.mCurrentButton = this;

                if (this.style.backgroundColor == "green")
		{
			screen.deleteClubCoachProspect();
		}
		else
		{
			screen.insertClubCoachProspect();
		}
	}

	hitClubCoachPotentialButton()
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.mCurrentButton = this;

                if (this.style.backgroundColor == "green")
		{
			screen.deleteClubCoachPotential();
		}
		else
		{
			screen.insertClubCoachPotential();
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
                screen.ajax();
        }

	insertClubPlayerInterest()
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.setUrl("/php/classes/screens/insert_club_player_interest.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
	}
	deleteClubPlayerInterest()
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.setUrl("/php/classes/screens/delete_club_player_interest.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
	}

	insertClubPlayerLead()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/insert_club_player_lead.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }
        deleteClubPlayerLead()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/delete_club_player_lead.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }

	insertClubPlayerProspect()
        {
		console.log('ClubProfileScreen::insertClubPlayerProspect()');
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/insert_club_player_prospect.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }
        deleteClubPlayerProspect()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/delete_club_player_prospect.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }

	insertClubPlayerPotential()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/insert_club_player_potential.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }
        deleteClubPlayerPotential()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/delete_club_player_potential.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
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

        insertClubParentInterest()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/insert_club_parent_interest.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }
        deleteClubParentInterest()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/delete_club_parent_interest.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }

        insertClubParentLead()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/insert_club_parent_lead.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }
        deleteClubParentLead()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/delete_club_parent_lead.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }

        insertClubParentProspect()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/insert_club_parent_prospect.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }
        deleteClubParentProspect()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/delete_club_parent_prospect.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }

        insertClubParentPotential()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/insert_club_parent_potential.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }
        deleteClubParentPotential()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/delete_club_parent_potential.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
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


        insertClubCoachInterest()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/insert_club_coach_interest.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }
        deleteClubCoachInterest()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/delete_club_coach_interest.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }

        insertClubCoachLead()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/insert_club_coach_lead.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }
        deleteClubCoachLead()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/delete_club_coach_lead.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }

        insertClubCoachProspect()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/insert_club_coach_prospect.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }
        deleteClubCoachProspect()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/delete_club_coach_prospect.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }

        insertClubCoachPotential()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/insert_club_coach_potential.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
                screen.ajax();
        }
        deleteClubCoachPotential()
        {
                var screen = APPLICATION.getCurrentScreen();
                screen.setUrl("/php/classes/screens/delete_club_coach_potential.php?" + this.getStandardParameters() + '&screen_person_id=' + this.getPersonId() + '&club_id=' + this.getClubId());
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


                                if (this.mJson.club_players_interest_id)
                                {
                                        if (this.mJson.club_players_interest_id.length > 0)
                                        {
                                                if (this.mJson.club_players_interest_id[0].person_id)
                                                {
                                                        var id = 'club_players_interest_button_' + this.mJson.club_players_interest_id[0].person_id;
                                                        this.mClubPlayerInterestButton.setAttribute("id", id);
                                                        this.mClubPlayerInterestButton.style.backgroundColor = "green";
                                                }
                                        }
                                        else
                                        {
                                                var id = 'club_players_interest_button_' + this.getPersonId();
                                                this.mClubPlayerInterestButton.setAttribute("id", id);
                                                this.mClubPlayerInterestButton.style.backgroundColor = "red";
                                        }
                                }

                                if (this.mJson.club_players_lead_id)
                                {
                                        if (this.mJson.club_players_lead_id.length > 0)
                                        {
                                                if (this.mJson.club_players_lead_id[0].person_id)
                                                {
                                                        var id = 'club_players_lead_button_' + this.mJson.club_players_lead_id[0].person_id;
                                                        this.mClubPlayerLeadButton.setAttribute("id", id);
                                                        this.mClubPlayerLeadButton.style.backgroundColor = "green";
                                                }
                                        }
                                        else
                                        {
                                                var id = 'club_players_lead_button_' + this.getPersonId();
                                                this.mClubPlayerLeadButton.setAttribute("id", id);
                                                this.mClubPlayerLeadButton.style.backgroundColor = "red";
                                        }
                                }

                                if (this.mJson.club_players_prospect_id)
                                {
					console.log('got players prospect');
                                        if (this.mJson.club_players_prospect_id.length > 0)
                                        {
						console.log('got players prospect:' + this.mJson.club_players_prospect_id[0].person_id);
                                                if (this.mJson.club_players_prospect_id[0].person_id)
                                                {
                                                        var id = 'club_players_prospect_button_' + this.mJson.club_players_prospect_id[0].person_id;
                                                        this.mClubPlayerProspectButton.setAttribute("id", id);
                                                        this.mClubPlayerProspectButton.style.backgroundColor = "green";
                                                }
                                        }
                                        else
                                        {
                                                var id = 'club_players_prospect_button_' + this.getPersonId();
                                                this.mClubPlayerProspectButton.setAttribute("id", id);
                                                this.mClubPlayerProspectButton.style.backgroundColor = "red";
                                        }
                                }


                                if (this.mJson.club_players_potential_id)
                                {
                                        if (this.mJson.club_players_potential_id.length > 0)
                                        {
                                                if (this.mJson.club_players_potential_id[0].person_id)
                                                {
                                                        var id = 'club_players_potential_button_' + this.mJson.club_players_potential_id[0].person_id;
                                                        this.mClubPlayerPotentialButton.setAttribute("id", id);
                                                        this.mClubPlayerPotentialButton.style.backgroundColor = "green";
                                                }
                                        }
                                        else
                                        {
                                                var id = 'club_players_potential_button_' + this.getPersonId();
                                                this.mClubPlayerPotentialButton.setAttribute("id", id);
                                                this.mClubPlayerPotentialButton.style.backgroundColor = "red";
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


                                if (this.mJson.club_parents_interest_id)
                                {
                                        if (this.mJson.club_parents_interest_id.length > 0)
                                        {
                                                if (this.mJson.club_parents_interest_id[0].person_id)
                                                {
                                                        var id = 'club_parents_interest_button_' + this.mJson.club_parents_interest_id[0].person_id;
                                                        this.mClubParentInterestButton.setAttribute("id", id);
                                                        this.mClubParentInterestButton.style.backgroundColor = "green";
                                                }
                                        }
                                        else
                                        {
                                                var id = 'club_parents_interest_button_' + this.getPersonId();
                                                this.mClubParentInterestButton.setAttribute("id", id);
                                                this.mClubParentInterestButton.style.backgroundColor = "red";
                                        }
                                }

                                if (this.mJson.club_parents_lead_id)
                                {
                                        if (this.mJson.club_parents_lead_id.length > 0)
                                        {
                                                if (this.mJson.club_parents_lead_id[0].person_id)
                                                {
                                                        var id = 'club_parents_lead_button_' + this.mJson.club_parents_lead_id[0].person_id;
                                                        this.mClubParentLeadButton.setAttribute("id", id);
                                                        this.mClubParentLeadButton.style.backgroundColor = "green";
                                                }
                                        }
                                        else
                                        {
                                                var id = 'club_parents_lead_button_' + this.getPersonId();
                                                this.mClubParentLeadButton.setAttribute("id", id);
                                                this.mClubParentLeadButton.style.backgroundColor = "red";
                                        }
                                }

                                if (this.mJson.club_parents_prospect_id)
                                {
                                        if (this.mJson.club_parents_prospect_id.length > 0)
                                        {
                                                if (this.mJson.club_parents_prospect_id[0].person_id)
                                                {
                                                        var id = 'club_parents_prospect_button_' + this.mJson.club_parents_prospect_id[0].person_id;
                                                        this.mClubParentProspectButton.setAttribute("id", id);
                                                        this.mClubParentProspectButton.style.backgroundColor = "green";
                                                }
                                        }
                                        else
                                        {
                                                var id = 'club_parents_prospect_button_' + this.getPersonId();
                                                this.mClubParentProspectButton.setAttribute("id", id);
                                                this.mClubParentProspectButton.style.backgroundColor = "red";
                                        }
                                }

                                if (this.mJson.club_parents_potential_id)
                                {
                                        if (this.mJson.club_parents_potential_id.length > 0)
                                        {
                                                if (this.mJson.club_parents_potential_id[0].person_id)
                                                {
                                                        var id = 'club_parents_potential_button_' + this.mJson.club_parents_potential_id[0].person_id;
                                                        this.mClubParentPotentialButton.setAttribute("id", id);
                                                        this.mClubParentPotentialButton.style.backgroundColor = "green";
                                                }
                                        }
                                        else
                                        {
                                                var id = 'club_parents_potential_button_' + this.getPersonId();
                                                this.mClubParentPotentialButton.setAttribute("id", id);
                                                this.mClubParentPotentialButton.style.backgroundColor = "red";
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

                                if (this.mJson.club_coaches_interest_id)
                                {
                                        if (this.mJson.club_coaches_interest_id.length > 0)
                                        {
                                                if (this.mJson.club_coaches_interest_id[0].person_id)
                                                {
                                                        var id = 'club_coaches_interest_button_' + this.mJson.club_coaches_interest_id[0].person_id;
                                                        this.mClubCoachInterestButton.setAttribute("id", id);
                                                        this.mClubCoachInterestButton.style.backgroundColor = "green";
                                                }
                                        }
                                        else
                                        {
                                                var id = 'club_coaches_interest_button_' + this.getPersonId();
                                                this.mClubCoachInterestButton.setAttribute("id", id);
                                                this.mClubCoachInterestButton.style.backgroundColor = "red";
                                        }
                                }

                                if (this.mJson.club_coaches_lead_id)
                                {
                                        if (this.mJson.club_coaches_lead_id.length > 0)
                                        {
                                                if (this.mJson.club_coaches_lead_id[0].person_id)
                                                {
                                                        var id = 'club_coaches_lead_button_' + this.mJson.club_coaches_lead_id[0].person_id;
                                                        this.mClubCoachLeadButton.setAttribute("id", id);
                                                        this.mClubCoachLeadButton.style.backgroundColor = "green";
                                                }
                                        }
                                        else
                                        {
                                                var id = 'club_coaches_lead_button_' + this.getPersonId();
                                                this.mClubCoachLeadButton.setAttribute("id", id);
                                                this.mClubCoachLeadButton.style.backgroundColor = "red";
                                        }
                                }

                                if (this.mJson.club_coaches_prospect_id)
                                {
                                        if (this.mJson.club_coaches_prospect_id.length > 0)
                                        {
                                                if (this.mJson.club_coaches_prospect_id[0].person_id)
                                                {
                                                        var id = 'club_coaches_prospect_button_' + this.mJson.club_coaches_prospect_id[0].person_id;
                                                        this.mClubCoachProspectButton.setAttribute("id", id);
                                                        this.mClubCoachProspectButton.style.backgroundColor = "green";
                                                }
                                        }
                                        else
                                        {
                                                var id = 'club_coaches_prospect_button_' + this.getPersonId();
                                                this.mClubCoachProspectButton.setAttribute("id", id);
                                                this.mClubCoachProspectButton.style.backgroundColor = "red";
                                        }
                                }


                                if (this.mJson.club_coaches_potential_id)
                                {
                                        if (this.mJson.club_coaches_potential_id.length > 0)
                                        {
                                                if (this.mJson.club_coaches_potential_id[0].person_id)
                                                {
                                                        var id = 'club_coaches_potential_button_' + this.mJson.club_coaches_potential_id[0].person_id;
                                                        this.mClubCoachPotentialButton.setAttribute("id", id);
                                                        this.mClubCoachPotentialButton.style.backgroundColor = "green";
                                                }
                                        }
                                        else
                                        {
                                                var id = 'club_coaches_potential_button_' + this.getPersonId();
                                                this.mClubCoachPotentialButton.setAttribute("id", id);
                                                this.mClubCoachPotentialButton.style.backgroundColor = "red";
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


			if (this.mJson.teams)
			{

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
