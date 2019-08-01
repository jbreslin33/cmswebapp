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

		location.hash = 'insert_accept_club_invite_screen';
		this.setHtml(document.getElementById("insert_accept_club_invite_screen_html_id"));
                //this.setMenuItem(document.getElementById("insert_accept_club_invite_nav_id"));
                this.setMessageElement(document.getElementById("insert_accept_club_invite_screen_message_id"));
                //this.setForm(document.getElementById("insert_accept_club_invite_screen_form_id"));
                this.setSpinner(document.getElementById("insert_accept_club_invite_screen_spinner_id"));
	}

	get()
	{
		console.log('lets send a php request to find out if I have a email_person entry or if I need to go to join screen');
		console.log('if we have a jwt lets send it then we will have email_id or do we simple auto login person if they are already members and have magic link????');
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_accept_club_invite.php?club_invite_token=" + this.mApplication.mClubInviteToken); 
	 	APPLICATION.getCurrentScreen().ajax();
	}
}
