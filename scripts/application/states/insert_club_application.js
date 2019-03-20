
'use strict';

class INSERT_CLUB_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("INSERT_CLUB_APPLICATION: ENTER");        
		}
		if (app.mInsertClubScreen)
		{
			app.mInsertClubScreen = new InsertClubScreen(app);
		}
		else
		{
			app.mInsertClubScreen = new InsertClubScreen(app);
		}
		app.mInsertClubScreen.show();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_CLUB_APPLICATION: EXECUTE");        
		}
             
		if (app.mInsertClubScreen.mData)
                {
                        var dataArray = app.mInsertClubScreen.mData.split(",");
                        app.mInsertClubScreen.mCode = dataArray[0];

                        if (app.mInsertClubScreen.mCode == -100)
                        {
                                app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                                document.getElementById('insert_native_login_screen_email_message_id').innerHTML = '';
                        }
                        if (app.mInsertNativeLoginScreen.mCode == -106)
                        {
                                document.getElementById('insert_club_screen_name_message_id').style.color = 'red';
                                document.getElementById('insert_club_screen_name_message_id').innerHTML = 'Club Name already exists.';
                        }
                }

               
		if (app.mInsertClubScreen.mCode == 100)
                {
                        app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                }
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_CLUB_APPLICATION: EXIT");        
		}
		app.mInsertClubScreen.hide();
		app.mInsertClubScreen.mCode = 0;
		app.mInsertClubScreen.mData = null;
	}
}
