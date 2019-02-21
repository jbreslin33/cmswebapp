'use strict';

class JoinScreen
{
	constructor(application)
	{
		this.mApplication = application;

		location.hash = "join-screen";

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
               	this.mAddress = document.getElementById("join_address_id").value;

               	this.mApplication.mLogin.mEmail    = document.getElementById("join_email_id").value;
               	this.mApplication.mLogin.mPassword = document.getElementById("join_password1_id").value;
               	this.mPassword                     = document.getElementById("join_password2_id").value;

		//need to handle not having a team yet...
		var url = "/php/classes/insert/join.php?first_name=" + this.mFirstName + "&middle_name=" + this.mMiddleName + "&last_name=" + this.mLastName + "&phone=" + this.mPhone + "&address=" + this.mAddress + "&email=" + this.mApplication.mLogin.mEmail + "&password=" + this.mPassword; 

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
							console.log('joined cmswebapp');
							APPLICATION.mLogin.process(data); //should recieve 100 for good join/login
						}
						else
						{
							console.log('failed to joined cmswebapp');
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
