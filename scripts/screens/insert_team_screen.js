'use strict';

class InsertTeamScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = "insert_team_screen";

		//html ids 
		this.mSpinnerId = "insert_team_screen_spinner_id";
		this.mHtmlId = "insert_team_screen_html_id";

		//sql php vars
		this.mEmail = null;
		
		document.getElementById("insertteamscreenbuttonid").onclick = this.hit.bind(this);
                
                this.mStateMachine = new StateMachine(this);
                this.mGLOBAL_INSERT_TEAM_SCREEN            = new GLOBAL_INSERT_TEAM_SCREEN();
                this.mINIT_INSERT_TEAM_SCREEN            = new INIT_INSERT_TEAM_SCREEN();
                this.mWAIT_FOR_CLUBS_INSERT_TEAM_SCREEN            = new WAIT_FOR_CLUBS_INSERT_TEAM_SCREEN();
                this.mWAIT_FOR_SUBMIT_INSERT_TEAM_SCREEN            = new WAIT_FOR_SUBMIT_INSERT_TEAM_SCREEN();
                this.mWAIT_INSERT_TEAM_SCREEN            = new WAIT_INSERT_TEAM_SCREEN();

                this.mStateMachine.setGlobalState(this.mGLOBAL_INSERT_TEAM_SCREEN);
                this.mStateMachine.changeState(this.mINIT_INSERT_TEAM_SCREEN);
	}

	get()
	{
		if (this.mApplication.mJWT)
		{
			var select = document.getElementById("person_select_id");
                	var person_id = select.options[select.selectedIndex].value;
			var url = "/php/classes/select/select_club_administrator_clubs.php?jwt=" + localStorage.getItem("mJWT") + '&person_id=' + person_id; 
		        var request = new XMLHttpRequest();
                	request.onreadystatechange = function()
                	{
                        	if (request.readyState === XMLHttpRequest.DONE)
                        	{
                                	if (request.status === 200)
                                	{
						console.log('response:' + this.responseText);
                                        	APPLICATION.mInsertTeamScreen.mData = this.responseText;
                                	}
                        	}
                	};

                        request.open('POST', url);
                        request.send();
		}
	}

	hit()
	{
		this.mHit = true;

		this.mName  = document.getElementById("insert_team_screen_name_id").value;

		var select = document.getElementById("person_select_id");
                var person_id = select.options[select.selectedIndex].value;

		var url = "/php/classes/insert/insert_team.php?name=" + this.mName + '&club_id=' + document.getElementById("insert_team_screen_select_id").value + '&jwt=' + APPLICATION.mJWT + '&person_id=' + person_id;

                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
					APPLICATION.mInsertTeamScreen.mData = this.responseText;
                                }
                        }
                };

		var form = document.getElementById('insert_team_screen_html_id');
		if (form.checkValidity() == true) 
		{
			request.open('POST', url);
                	request.send();
		}
	}
}
