'use strict';

class InsertAcceptClubInviteScreen extends Screen
{
	constructor(application)
	{
		super(application);
		console.log('corns acc');
		location.hash = "insert_accept_club_invite_screen";

		//html ids 
		this.mSpinnerId = "insert_accept_club_invite_screen_spinner_id";
		this.mHtmlId = "insert_accept_club_invite_screen_html_id";
	}

	get()
	{
		console.log('get in acc');
		//if (this.mApplication.mJWT)
		//{
			var url = "/php/classes/insert/insert_accept_club_invite.php?club_invite_token=" + this.mApplication.mClubInviteToken; 
			//var url = "/php/classes/insert/insert_accept_club_invite.php"; 
		        var request = new XMLHttpRequest();
                	request.onreadystatechange = function()
                	{
                        	if (request.readyState === XMLHttpRequest.DONE)
                        	{
                                	if (request.status === 200)
                                	{
						APPLICATION.mInsertAcceptClubInviteScreen.mData = this.responseText;
						console.log('DUDE:' + APPLICATION.mInsertAcceptClubInviteScreen.mData);
                                	}
                        	}
                	};

                        request.open('POST', url);
                        request.send();
		//}
	}
}
