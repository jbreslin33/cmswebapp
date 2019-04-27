'use strict';

class InsertInviteClubMemberScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = "insert_invite_club_member_screen";

		//html ids 
		this.mSpinnerId = "insert_invite_club_member_screen_spinner_id";
		this.mHtmlId = "insert_invite_club_member_screen_html_id";

		//sql php vars
		this.mEmail = null;
		
		document.getElementById("insertinviteclubmemberscreenbuttonid").onclick = this.hit.bind(this);
                
                this.mStateMachine = new StateMachine(this);
                this.mINIT_INSERT_INVITE_CLUB_MEMBER_SCREEN            = new INIT_INSERT_INVITE_CLUB_MEMBER_SCREEN();
                this.mGLOBAL_INSERT_INVITE_CLUB_MEMBER_SCREEN            = new GLOBAL_INSERT_INVITE_CLUB_MEMBER_SCREEN();
                this.mWAIT_INSERT_INVITE_CLUB_MEMBER_SCREEN            = new WAIT_INSERT_INVITE_CLUB_MEMBER_SCREEN();

                this.mStateMachine.setGlobalState(this.mGLOBAL_INSERT_INVITE_CLUB_MEMBER_SCREEN);
                this.mStateMachine.changeState(this.mINIT_INSERT_INVITE_CLUB_MEMBER_SCREEN);
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
                                        	APPLICATION.mInsertInviteClubMemberScreen.mData = this.responseText;
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

      		this.mEmail  = document.getElementById("insert_invite_club_member_screen_email_id").value;

		var url = "/php/classes/insert/insert_invite_club_member.php?email=" + this.mEmail; 

                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
					APPLICATION.mInsertInviteClubMemberScreen.mData = this.responseText;
                                }
                        }
                };

		var form = document.getElementById('insert_invite_club_member_screen_html_id');
		if (form.checkValidity() == true) 
		{
			request.open('POST', url);
                	request.send();
		}
	}
}
