'use strict';

class InsertLoginScreen extends Screen
{
        constructor(application)
        {
                super(application);
// please note, 
// that IE11 now returns undefined again for window.chrome
// and new Opera 30 outputs true for window.chrome
// but needs to check if window.opr is not undefined
// and new IE Edge outputs to true now for window.chrome
// and if not iOS Chrome check
// so use the below updated condition
		/*
var isChromium = window.chrome;
var winNav = window.navigator;
var vendorName = winNav.vendor; 
var isOpera = typeof window.opr !== "undefined";
var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
var isIOSChrome = winNav.userAgent.match("CriOS");
if (isIOSChrome)
{       
        // is Google Chrome on IOS
} 
else if(
  isChromium !== null &&
  typeof isChromium !== "undefined" &&
  vendorName === "Google Inc." &&
  isOpera === false &&
  isIEedge === false
)       
{
        // is Google Chrome
	location.hash = 'insert_login_screen';
	location.href = "";
	location.href = location.hash;
} else  
{       
        // not Google Chrome 
	location.hash = 'insert_login_screen';
}
*/
		location.hash = 'insert_native_login_screen';

		this.mCode = 0;
                this.mData = null;

		//sql php vars
		this.mFirstName = null;
		this.mMiddleName = null;
		this.mLastName = null;
		this.mPhone = null;
		this.mAddress = null;
		this.mEmail = null;
		this.mPassword1 = null;
		this.mPassword2 = null;

		document.getElementById("insertloginscreenbuttonid").addEventListener("click",this.hit.bind(this));
	}

	hit()
	{
		//get vars
               	this.mFirstName  = document.getElementById("insert_native_login_screen_first_name_id").value;
               	this.mMiddleName = document.getElementById("insert_native_login_screen_middle_name_id").value;
               	this.mLastName   = document.getElementById("insert_native_login_screen_last_name_id").value;
               	this.mPhone      = document.getElementById("insert_native_login_screen_phone_id").value;
               	this.mAddress    = document.getElementById("insert_native_login_screen_address_id").value;
               	this.mEmail    	 = document.getElementById("insert_native_login_screen_email_id").value;
               	this.mPassword1  = document.getElementById("insert_native_login_screen_password1_id").value;
               	this.mPassword2  = document.getElementById("insert_native_login_screen_password2_id").value;

		var url = "/php/classes/insert/insert_native_login.php?first_name=" + this.mFirstName + "&middle_name=" + this.mMiddleName + "&last_name=" + this.mLastName + "&phone=" + this.mPhone + "&address=" + this.mAddress + "&email=" + this.mEmail + "&password=" + this.mPassword1; 

                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
					console.log('responseTextyo:' + this.responseText);
					APPLICATION.mInsertNativeLoginScreen.mData = this.responseText;
                                }
                        }
                };

		var form = document.getElementById('insert_native_login_screen_form_id');
		if (form.checkValidity() == true) 
		{
			var passwordMatch = false;

			if (this.mPassword1 == this.mPassword2)
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
		document.getElementById("insert_native_login_screen_email_div_id").style.display = "block";
		document.getElementById("insert_native_login_screen_header_div_id").innerHTML = "Join Cmswebapp";
		document.getElementById("insert_native_login_screen_email_id").required = true;

	}

	hide()
	{
              document.getElementById("insert_native_login_screen_html_id").style.display = "none";
	}

}
