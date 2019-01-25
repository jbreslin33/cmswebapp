'use strict';

class InsertEventoScreen
{
	constructor(insertEvento)
	{
		this.mInsertEvento = insertEvento;
		//set button event listner
		document.getElementById("insert_evento_button_id").onclick = this.buttonClicked.bind(this);


	}
	
	buttonClicked()
	{
		console.log('clicked');
		this.mInsertEvento.send();
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
