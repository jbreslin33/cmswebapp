'use strict';

class JoinSiteScreen
{
	constructor(application)
	{
		this.mApplication = application;

		location.hash = "join-site-screen";

		this.mJoined = false;

		//sql php vars
		this.mFirstName = null;
		this.mMiddleName = null;
		this.mLastName = null;
		this.mPhone = null;
		this.mAddress = null;
		this.mPassword = null;

		document.getElementById("joinsitescreenbuttonid").addEventListener("click",this.hit.bind(this));
	}

	hit()
	{
		//get vars
               	this.mFirstName  = document.getElementById("join_site_screen_first_name_id").value;
               	this.mMiddleName = document.getElementById("join_site_screen_middle_name_id").value;
               	this.mLastName   = document.getElementById("join_site_screen_last_name_id").value;
               	this.mPhone      = document.getElementById("join_site_screen_phone_id").value;
               	this.mAddress = document.getElementById("join_site_screen_address_id").value;

               	this.mApplication.mLogin.mEmail    = document.getElementById("join_site_screen_email_id").value;
               	this.mApplication.mLogin.mPassword = document.getElementById("join_site_screen_password1_id").value;
               	this.mPassword                     = document.getElementById("join_site_screen_password2_id").value;

		var form = document.getElementById('join_site_screen_html_id');
		if (form.checkValidity() === false) 
		{
			//console.log('invalid');
		}
		else
		{
			var passwordMatch = false;

			if (this.mPassword == this.mApplication.mLogin.mPassword)
			{
				this.send();
          			document.getElementById('password_message_id').style.color = 'green';
          			document.getElementById('password_message_id').innerHTML = 'passwords are matching';
			}
			else
			{
          			document.getElementById('password_message_id').style.color = 'red';
          			document.getElementById('password_message_id').innerHTML = 'passwords are not matching';
			}
		}
	}

	send()
	{
		var url = "/php/classes/insert/join_site.php?first_name=" + this.mFirstName + "&middle_name=" + this.mMiddleName + "&last_name=" + this.mLastName + "&phone=" + this.mPhone + "&address=" + this.mAddress + "&email=" + this.mApplication.mLogin.mEmail + "&password=" + this.mPassword; 

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
							this.mJoined = true;
							APPLICATION.mJoinSiteScreen.mJoined = true;
						}
						else
						{
							this.mJoined = false;
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
              document.getElementById("join_site_screen_html_id").style.display = "block";
	}

	hide()
	{
              document.getElementById("join_site_screen_html_id").style.display = "none";
	}
}
