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

      		var email  = document.getElementById("insert_invite_club_member_screen_email_id").value;
                var person_select = document.getElementById("person_select_id");
                var club_select = document.getElementById("club_select_id");

                if (club_select.length > 0 && person_select.length > 0)
                {
                        var club_id = club_select.options[club_select.selectedIndex].value;
                        var person_id = person_select.options[person_select.selectedIndex].value;

                        APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_invite_club_member.php?jwt=" + APPLICATION.getJWT() + '&club_id=' + club_id + '&person_id=' + person_id + '&email=' + email);

                        APPLICATION.getCurrentScreen().ajax();
                }
                else
                {
                        this.setMessage("You must select a club first","red");
                }
	}
}
