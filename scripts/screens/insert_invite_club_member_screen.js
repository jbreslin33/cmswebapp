'use strict';

class InsertInviteClubMemberScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'insert_invite_club_member_screen';

		document.getElementById("insertinviteclubmemberscreenbuttonid").onclick = this.hit.bind(this);

                this.setHtml(document.getElementById("insert_invite_club_member_screen_html_id"));
                this.setMenuItem(document.getElementById("insert_invite_club_member_nav_id"));
                this.setMessageElement(document.getElementById("insert_invite_club_member_screen_message_id"));
                this.setForm(document.getElementById("insert_invite_club_member_screen_form_id"));
                this.setSpinner(document.getElementById("insert_invite_club_member_screen_spinner_id"));
	}
	
	hit()
	{
		this.mHit = true;

      		this.mEmail  = document.getElementById("insert_invite_club_member_screen_email_id").value;

		APPLICATION.getCurrentScreen().setUrl("/php/classes/insert/insert_invite_club_member.php?email=" + this.mEmail + '&club_id=' + document.getElementById("insert_invite_club_member_screen_select_id").value + '&jwt=' + APPLICATION.getJWT());

                APPLICATION.getCurrentScreen().ajax();
	}
}
