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
		//set vars
		this.mInsertEvento.mEventoTypeID  = document.getElementById("insert_evento_evento_type_id").value;	
		this.mInsertEvento.mEventoDate    = document.getElementById("insert_evento_date_id").value;	
		this.mInsertEvento.mArrivalTime   = document.getElementById("insert_evento_arrival_time_id").value;	
		this.mInsertEvento.mStartTime     = document.getElementById("insert_evento_start_time_id").value;	
		this.mInsertEvento.mEndTime       = document.getElementById("insert_evento_end_time_id").value;	
		this.mInsertEvento.mAddress       = document.getElementById("insert_evento_address_id").value;	
		this.mInsertEvento.mCoordinates   = document.getElementById("insert_evento_coordinates_id").value;	
		this.mInsertEvento.mPitchID       = document.getElementById("insert_evento_pitch_id").value;	
		this.mInsertEvento.mFieldName     = document.getElementById("insert_evento_field_name_id").value;	
		this.mInsertEvento.mTeamID        = document.getElementById("insert_evento_team_id").value;	


		console.log('clicked:' + this.mInsertEvento.mEventoDate);
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
