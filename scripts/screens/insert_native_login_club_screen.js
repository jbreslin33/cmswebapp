'use strict';

class InsertLoginClubScreen extends InsertLoginScreen
{
	constructor(application)
	{
		super(application);

		location.hash = "insert_native_login_club_screen";

                //html ids
                this.mSpinnerId = "insert_native_login_club_screen_spinner_id";
                this.mHtmlId    = "insert_native_login_club_screen_html_id";

		document.getElementById("insertloginscreenbuttonid").addEventListener("click",this.hit.bind(this));
	}

	show()
	{
		//also show google
              	document.getElementById("insert_native_login_screen_html_id").style.display = "block";
              	document.getElementById("insert_native_login_club_screen_html_id").style.display = "block";
		//hide link
		document.getElementById("insert_native_login_screen_link_id").style.display = "none";
		//document.getElementById("insert_native_login_club_screen_link_id").style.display = "none";
	}

	hide()
	{
		//also hide google
              document.getElementById("insert_native_login_club_screen_html_id").style.display = "none";
	}
}
