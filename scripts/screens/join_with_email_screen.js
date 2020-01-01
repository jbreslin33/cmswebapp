'use strict';

class JoinWithEmailScreen extends Screen
{
        constructor(application)
        {
                super(application);

		location.hash = 'join_with_email_screen';

		document.getElementById("joinwithemailscreenbuttonid").onclick = this.hit.bind(this);

                this.setMessageElement(document.getElementById("join_with_email_screen_message_id"));
		this.setHtml(document.getElementById("join_with_email_screen_html_id"));
		this.setSpinner(document.getElementById("join_with_email_screen_spinner_id"));
		this.setForm(document.getElementById("join_with_email_screen_form_id"));
	}

	hit()
	{
		var email = document.getElementById("join_with_email_screen_form_id").value;
		this.setUrl("/php/classes/screens/join_with_email.php?email=" + email); 
		this.ajax();
	}
}
