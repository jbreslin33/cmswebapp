'use strict';

class JoinScreen
{
	constructor(application)
	{
		this.mApplication = application;

		//logs
		this.mStateLogs = false;
		this.mStateEnterLogs = true; 
		this.mStateExecuteLogs = false;
		this.mStateExitLogs = false;

		//sql php vars
		this.mFirstName = null;
		this.mMiddleName = null;
		this.mLastName = null;
		this.mPhone = null;
		this.mAddress = null;
		this.mPassword = null;

		document.getElementById("joinscreenbuttonid").addEventListener("click",this.send.bind(this));
	}

	send()
	{
		//get vars
               	this.mFirstName  = document.getElementById("join_first_name_id").value;
               	this.mMiddleName = document.getElementById("join_middle_name_id").value;
               	this.mLastName   = document.getElementById("join_last_name_id").value;
               	this.mPhone      = document.getElementById("join_phone_id").value;

               	this.mStreet = document.getElementById("join_street_id").value;
               	this.mCity = document.getElementById("join_city_id").value;
               	this.mState = document.getElementById("join_state_id").value;
               	this.mZip = document.getElementById("join_zip_id").value;

               	this.mApplication.mLogin.mEmail    = document.getElementById("join_email_id").value;
               	this.mApplication.mLogin.mPassword = document.getElementById("join_password1_id").value;
               	this.mPassword                     = document.getElementById("join_password2_id").value;

		//need to handle not having a team yet...
		var url = "/php/classes/insert/join.php?first_name=" + this.mFirstName + "&middle_name=" + this.mMiddleName + "&last_name=" + this.mLastName + "&phone=" + this.mPhone + "&street=" + this.mStreet + "&city=" + this.mCity + "&state=" + this.mState + "&zip=" + this.mZip + "&email=" + this.mApplication.mLogin.mEmail + "&password=" + this.mPassword; 

                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
                                        var data = this.responseText;
                                        if (data)
                                        {
						if (data == 100)
						{
							APPLICATION.mLogin.process(data); //should recieve 100 for good join/login
						}
						else
						{
						}
                                        }
                                }
                        }
                };
                request.open('POST', url);
                request.send();
	}
        
	show()
	{
              document.getElementById("join_screen_html_id").style.display = "block";
	}

	hide()
	{
              document.getElementById("join_screen_html_id").style.display = "none";
	}
}
