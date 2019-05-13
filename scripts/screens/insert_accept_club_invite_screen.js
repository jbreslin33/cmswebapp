'use strict';

/*
 * This class is the landing place when you click email link that club admin has sent you to join club.
 * It is a conduit to then send to server that you accept and then waits for ajax reply to see if you joined or need to still join site
 */

class InsertAcceptClubInviteScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = "insert_accept_club_invite_screen";

		//html ids 
		this.mSpinnerId = "insert_accept_club_invite_screen_spinner_id";
		this.mHtmlId = "insert_accept_club_invite_screen_html_id";
	}

	get()
	{
		var url = "/php/classes/insert/insert_accept_club_invite.php?club_invite_token=" + this.mApplication.mClubInviteToken; 
		var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                      	if (request.readyState === XMLHttpRequest.DONE)
                       	{
                               	if (request.status === 200)
                               	{
					APPLICATION.mInsertAcceptClubInviteScreen.mData = this.responseText;
                               	}
                       	}
                };
                request.open('POST', url);
                request.send();
	}
}
