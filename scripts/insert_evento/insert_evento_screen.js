'use strict';

class InsertEventoScreen
{
	constructor(schedule)
	{
		//set button event listner
		document.getElementById("insert_evento_button_id").onclick = this.buttonClicked;


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

	buttonClicked()
	{
		console.log('clicked');
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
