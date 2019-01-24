'use strict';

class InsertEventoScreen
{
	constructor(schedule)
	{
		console.log('constructor InsertEventoScreen');
	
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
