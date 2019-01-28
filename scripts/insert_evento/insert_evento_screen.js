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
		this.mInsertEvento.mEvento.mEventoTypesID = document.getElementById("insert_evento_evento_types_id").value;	
		this.mInsertEvento.mEvento.mEventoDate    = document.getElementById("insert_evento_date_id").value;	
		this.mInsertEvento.mEvento.mArrivalTime   = document.getElementById("insert_evento_arrival_time_id").value;	
		this.mInsertEvento.mEvento.mStartTime     = document.getElementById("insert_evento_start_time_id").value;	
		this.mInsertEvento.mEvento.mEndTime       = document.getElementById("insert_evento_end_time_id").value;	
		this.mInsertEvento.mEvento.mAddress       = document.getElementById("insert_evento_address_id").value;	
		this.mInsertEvento.mEvento.mCoordinates   = document.getElementById("insert_evento_coordinates_id").value;	
		this.mInsertEvento.mEvento.mPitchID       = document.getElementById("insert_evento_pitch_id").value;	
		this.mInsertEvento.mEvento.mFieldName     = document.getElementById("insert_evento_field_name_id").value;	
		this.mInsertEvento.mEvento.mTeamID        = document.getElementById("insert_evento_team_id").value;	

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
