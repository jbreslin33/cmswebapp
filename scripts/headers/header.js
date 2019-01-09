'use strict';

class Header 
{
	constructor(application,text)
	{
		//Application
		this.mApplication = application;

		//text
		this.mText = text;	

                //states
                this.mStateMachine = new StateMachine(this);
                this.mGLOBAL_APPLICATION = new GLOBAL_APPLICATION();
                this.mINIT_APPLICATION = new INIT_APPLICATION();
                this.mMAIN_APPLICATION = new MAIN_APPLICATION();

                this.mStateMachine.setGlobalState(this.mGLOBAL_APPLICATION);
                this.mStateMachine.changeState(this.mINIT_APPLICATION);

		//header
		this.mHeader = document.createElement("header");
		this.mHeader.setAttribute("class", "header");
		document.body.appendChild(this.mHeader);

		//h1
		this.mHeaderTitle = document.createElement("H1");
		this.mHeaderTitleText = document.createTextNode(this.mText);
		this.mHeaderTitle.setAttribute("class", "header__title");
		this.mHeaderTitle.appendChild(this.mHeaderTitleText);
		this.mHeader.appendChild(this.mHeaderTitle);

		//refreshbutton
		this.mButtonRefresh = document.createElement("BUTTON");
		this.mButtonRefresh.setAttribute("class", "headerButton");
		this.mButtonRefresh.setAttribute("aria-label", "Refresh");
		this.mButtonRefresh.setAttribute("id", "butRefresh");
		this.mButtonRefresh.addEventListener("click",this.buttonRefreshClicked); 
		this.mHeader.appendChild(this.mButtonRefresh);
		
		this.mSelectClubTeamRole = document.createElement("SELECT");
		this.mHeader.appendChild(this.mSelectClubTeamRole);
	}

	buttonRefreshClicked()
	{
		console.log('buttonRefreshClicked');
		//call some kind of update all function
	}

	getClubTeamRole()
        {
                /*******
                 *
                 * AFFAIR TYPE
                ****/
                var url = "/php/classes/query/clubs_teams_roles_query.php?username=" + APPLICATION.mLogin.mUsername;

                // Fetch the latest data.
                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
                                        var data = JSON.parse(this.responseText);
                                        if (data)
                                        {
                                                for (var i = 0; i < data.length; i++)
                                                {
							//        select users_clubs_roles_teams.id, clubs.name, teams.name, roles.name, roles.id, users_clubs_roles_teams.default_timestamp

                                                        var option = document.createElement("option");
                                                        option.value = data[i][0];
                                                        option.text = data[i][1] + ' ' + data[i][2] + ' ' + data[i][3];
                                                        APPLICATION.mLogin.mHeader.mSelectClubTeamRole.appendChild(option);
                                                }
                                        }
                                        else
                                        {
                                                console.log('no clubTeamRole data');
                                        }
                                }
                        }
                };

                request.open('GET', url);
                request.send();
        }
}
