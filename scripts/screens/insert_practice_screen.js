'use strict';

class InsertPracticeScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = "insert_practice_screen";

		//html ids 
		this.mSpinnerId = "insert_practice_screen_spinner_id";
		this.mHtmlId = "insert_practice_screen_html_id";

		//sql php vars
		this.mEmail = null;
		
		document.getElementById("insertpracticescreenbuttonid").onclick = this.hit.bind(this);
                
                this.mStateMachine = new StateMachine(this);
                this.mGLOBAL_INSERT_PRACTICE_SCREEN            = new GLOBAL_INSERT_PRACTICE_SCREEN();
                this.mINIT_INSERT_PRACTICE_SCREEN            = new INIT_INSERT_PRACTICE_SCREEN();
                this.mWAIT_FOR_SELECTS_INSERT_PRACTICE_SCREEN            = new WAIT_FOR_SELECTS_INSERT_PRACTICE_SCREEN();
                this.mWAIT_FOR_SUBMIT_INSERT_PRACTICE_SCREEN            = new WAIT_FOR_SUBMIT_INSERT_PRACTICE_SCREEN();
                this.mWAIT_INSERT_PRACTICE_SCREEN            = new WAIT_INSERT_PRACTICE_SCREEN();

                this.mStateMachine.setGlobalState(this.mGLOBAL_INSERT_PRACTICE_SCREEN);
                this.mStateMachine.changeState(this.mINIT_INSERT_PRACTICE_SCREEN);
	}

	get()
	{
		if (this.mApplication.mJWT)
		{
			var url = "/php/classes/select/select_club_administrator_clubs.php?jwt=" + this.mApplication.mJWT; 
		        var request = new XMLHttpRequest();
                	request.onreadystatechange = function()
                	{
                        	if (request.readyState === XMLHttpRequest.DONE)
                        	{
                                	if (request.status === 200)
                                	{
						console.log('response:' + this.responseText);
                                        	APPLICATION.mInsertPracticeScreen.mData = this.responseText;
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

		this.mName  = document.getElementById("insert_practice_screen_name_id").value;

		var url = "/php/classes/insert/insert_practice.php?name=" + this.mName + '&club_id=' + document.getElementById("insert_practice_screen_select_id").value + '&jwt=' + APPLICATION.mJWT;

                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
					APPLICATION.mInsertPracticeScreen.mData = this.responseText;
                                }
                        }
                };

		var form = document.getElementById('insert_practice_screen_html_id');
		if (form.checkValidity() == true) 
		{
			request.open('POST', url);
                	request.send();
		}
	}
}
