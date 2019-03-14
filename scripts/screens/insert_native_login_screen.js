'use strict';

class InsertLoginScreen
{
	constructor(application)
	{
		this.mApplication = application;

		location.hash = "insert_native_login_screen";

		this.mCode = 0;
                this.mData = null;

		//sql php vars
		this.mFirstName = null;
		this.mMiddleName = null;
		this.mLastName = null;
		this.mPhone = null;
		this.mAddress = null;
		this.mPassword = null;

		document.getElementById("insertloginscreenbuttonid").addEventListener("click",this.hit.bind(this));
	}

	hit()
	{
		//get vars
               	this.mFirstName  = document.getElementById("insert_native_login_screen_first_name_id").value;
               	this.mMiddleName = document.getElementById("insert_native_login_screen_middle_name_id").value;
               	this.mLastName   = document.getElementById("insert_native_login_screen_last_name_id").value;
               	this.mPhone      = document.getElementById("insert_native_login_screen_phone_id").value;
               	this.mAddress = document.getElementById("insert_native_login_screen_address_id").value;

               	this.mApplication.mLogin.mEmail    = document.getElementById("insert_native_login_screen_email_id").value;
               	this.mApplication.mLogin.mPassword = document.getElementById("insert_native_login_screen_password1_id").value;
               	this.mPassword                     = document.getElementById("insert_native_login_screen_password2_id").value;

		var url = "/php/classes/insert/insert_native_login.php?first_name=" + this.mFirstName + "&middle_name=" + this.mMiddleName + "&last_name=" + this.mLastName + "&phone=" + this.mPhone + "&address=" + this.mAddress + "&email=" + this.mApplication.mLogin.mEmail + "&password=" + this.mPassword; 

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
						APPLICATION.mInsertNativeLoginScreen.mData = data;
						console.log('data:' + data);
                                        }
                                }
                        }
                };

		var form = document.getElementById('insert_native_login_screen_form_id');
		if (form.checkValidity() == true) 
		{
			var passwordMatch = false;

			if (this.mPassword == this.mApplication.mLogin.mPassword)
			{
				request.open('POST', url);
                		request.send();

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
        
	show()
	{
              	document.getElementById("insert_native_login_screen_html_id").style.display = "block";
		//hide link
		document.getElementById("insert_native_login_screen_link_id").style.display = "none";
	}

	hide()
	{
              document.getElementById("insert_native_login_screen_html_id").style.display = "none";
	}
}
