'use strict';

class InsertEventoScreen
{
	constructor(schedule)
	{
		this.mDailySchedule
		//set button event listner
		document.getElementById("insert_evento_button_id").onclick = this.buttonClicked;


	}
	
	buttonClicked()
	{
		console.log('clicked');
		this.mDailySchedule.send();
	}

	divInputEmailKeyDown(e)
	{
		/*
		if (e.key == 'Enter')	
		{
			APPLICATION.mLogin.mLoginScreen.mDivInputPassword.focus();
		}
		*/
	}


	divInputPasswordKeyDown(e)
	{
		/*
		if (e.key == 'Enter')	
		{
			APPLICATION.mLogin.mLoginScreen.mButton.focus();
		}
		*/
	}

	show()
	{
		document.getElementById("insert_evento_html_id").style.display = "block";
	}

	hide()
	{
		document.getElementById("insert_evento_html_id").style.display = "none";
	}
}
