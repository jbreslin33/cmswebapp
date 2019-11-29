
'use strict';

class GLOBAL_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
                if (app.mStateLogs || app.mStateEnterLogs)
                {
                        console.log("GLOBAL_APPLICATION: ENTER"); 
                }
	}

        execute(app)
        {

		console.log('location.hash:' + location.hash);
                if (app.mStateLogs || app.mStateExecuteLogs)
                {
                        console.log("GLOBAL_APPLICATION: EXECUTE"); 
                }
		if (location.hash == '#login_screen' && app.mStateMachine.mCurrentState != app.mLOGIN_APPLICATION)
                {
			console.log('heere 1');
                        APPLICATION.mStateMachine.changeState(APPLICATION.mLOGIN_APPLICATION);
                }
		else if (location.hash == '#choose_person_screen' && app.mStateMachine.mCurrentState != app.mCHOOSE_PERSON_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mCHOOSE_PERSON_APPLICATION);
                }
		else if (location.hash == '#logout_screen' && app.mStateMachine.mCurrentState != app.mLOGOUT_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mLOGOUT_APPLICATION);
                }
		else if (location.hash == '#main_screen' && app.mStateMachine.mCurrentState != app.mMAIN_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mMAIN_APPLICATION);
                }
		else if (location.hash == '#update_forgot_password_screen' && app.mStateMachine.mCurrentState != app.mUPDATE_FORGOT_PASSWORD_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mUPDATE_FORGOT_PASSWORD_APPLICATION);
                }
		else if (location.hash == '#insert_native_login_email_screen' && app.mStateMachine.mCurrentState != app.mINSERT_NATIVE_LOGIN_EMAIL_SCREEN_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_NATIVE_LOGIN_EMAIL_SCREEN_APPLICATION);
                }
		else if (location.hash == '#insert_native_login_screen' && app.mStateMachine.mCurrentState != app.mINSERT_NATIVE_LOGIN_SCREEN_APPLICATION)
                {
			console.log('heere 2');
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_NATIVE_LOGIN_SCREEN_APPLICATION);
                }
		else if (location.hash == '#insert_native_login_club_screen' && app.mStateMachine.mCurrentState != app.mINSERT_NATIVE_LOGIN_CLUB_SCREEN_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_NATIVE_LOGIN_CLUB_SCREEN_APPLICATION);
                }
		else if (location.hash == '#insert_club_screen' && app.mStateMachine.mCurrentState != app.mINSERT_CLUB_APPLICATION)
                {
			console.log('heere 3');
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_CLUB_APPLICATION);
                }
		else if (location.hash == '#insert_person_screen' && app.mStateMachine.mCurrentState != app.mINSERT_PERSON_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_PERSON_APPLICATION);
                }
		else if (location.hash == '#delete_person_screen' && app.mStateMachine.mCurrentState != app.mDELETE_PERSON_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mDELETE_PERSON_APPLICATION);
              	} 
		else if (location.hash == '#insert_team_screen' && app.mStateMachine.mCurrentState != app.mINSERT_TEAM_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_TEAM_APPLICATION);
                }
		else if (location.hash == '#insert_pitch_screen' && app.mStateMachine.mCurrentState != app.mINSERT_PITCH_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_PITCH_APPLICATION);
                }
		else if (location.hash == '#insert_practice_screen' && app.mStateMachine.mCurrentState != app.mINSERT_PRACTICE_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_PRACTICE_APPLICATION);
                }
		else if (location.hash == '#insert_game_screen' && app.mStateMachine.mCurrentState != app.mINSERT_GAME_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_GAME_APPLICATION);
                }
		else if (location.hash == '#insert_forgot_password_screen' && app.mStateMachine.mCurrentState != app.mINSERT_FORGOT_PASSWORD_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_FORGOT_PASSWORD_APPLICATION);
                }
		else if (location.hash == '#insert_invite_club_email_screen' && app.mStateMachine.mCurrentState != app.mINSERT_INVITE_CLUB_EMAIL_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_INVITE_CLUB_EMAIL_APPLICATION);
                }
		else if (location.hash == '#insert_accept_club_invite_screen' && app.mStateMachine.mCurrentState != app.mINSERT_ACCEPT_CLUB_INVITE_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_ACCEPT_CLUB_INVITE_APPLICATION);
                }
		else if (location.hash == '#main_screen' && app.mStateMachine.mCurrentState != app.mMAIN_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mMAIN_APPLICATION);
                }
	}

        exit(application)
        {
                if (application.mStateLogs || application.mStateExitLogs)
		{
                        console.log("GLOBAL_APPLICATION: EXIT"); 
                }
	}
}


class INIT_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(application)
        {
		if (application.mStateLogs || application.mStateEnterLogs)
		{
			console.log("INIT_APPLICATION_STATE: ENTER");        
		}
		//hide evertthing except nav_bar_id
		document.getElementById("nav_bar_id").style.display = "block";
		document.getElementById("insert_native_login_email_screen_html_id").style.display = "none";
		document.getElementById("insert_native_login_screen_html_id").style.display = "none";
		document.getElementById("insert_native_login_club_screen_html_id").style.display = "none";
		document.getElementById("login_screen_html_id").style.display = "none";
		document.getElementById("choose_person_screen_html_id").style.display = "none";
		document.getElementById("main_screen_html_id").style.display = "none";
		document.getElementById("insert_club_screen_html_id").style.display = "none";
		document.getElementById("insert_person_screen_html_id").style.display = "none";
		document.getElementById("delete_person_screen_html_id").style.display = "none";
		document.getElementById("insert_team_screen_html_id").style.display = "none";
		document.getElementById("insert_pitch_screen_html_id").style.display = "none";
		document.getElementById("insert_practice_screen_html_id").style.display = "none";
		document.getElementById("insert_game_screen_html_id").style.display = "none";
		document.getElementById("insert_forgot_password_screen_html_id").style.display = "none";
		document.getElementById("insert_invite_club_email_screen_html_id").style.display = "none";
		document.getElementById("insert_accept_club_invite_screen_html_id").style.display = "none";
		document.getElementById("update_forgot_password_screen_html_id").style.display = "none";
	}
        
	execute(application)
        {
		if (application.mStateLogs || application.mStateExecuteLogs)
		{
			console.log("INIT_APPLICATION_STATE: EXECUTE");        
		}

		if (application.mJoinEmailToken)
		{
			application.mStateMachine.changeState(application.mINSERT_NATIVE_LOGIN_SCREEN_APPLICATION);
		}
		else if (application.mForgotPasswordToken)
		{
			application.mStateMachine.changeState(application.mUPDATE_FORGOT_PASSWORD_APPLICATION);
		}
		else if (application.getJWT())
		{
			application.mStateMachine.changeState(application.mMAIN_APPLICATION);
		}
		else if (application.mClubInviteToken)
		{
			//application.mStateMachine.changeState(application.mINSERT_ACCEPT_CLUB_INVITE_APPLICATION);
			application.mStateMachine.changeState(application.mLOGIN_APPLICATION);
		}
		else
		{
			application.mStateMachine.changeState(application.mLOGIN_APPLICATION);
		}
	}

        exit(application)
        {
		if (application.mStateLogs || application.mStateExitLogs)
		{
			console.log("INIT_APPLICATION_STATE: EXIT");        
		}
	}
}

class LOGIN_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("LOGIN_APPLICATION: ENTER");        
		}

		app.setCurrentScreen(new LoginScreen(app));
		app.getCurrentScreen().enter();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("LOGIN_APPLICATION: EXECUTE");        
		}

		app.getCurrentScreen().execute()
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("LOGIN_APPLICATION: EXIT");        
		}
		app.mCurrentScreen.exit();
	}
}

class CHOOSE_PERSON_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("CHOOSE_PERSON_APPLICATION: ENTER");        
		}
		
		app.setCurrentScreen(new ChoosePersonScreen(app));
		app.getCurrentScreen().enter();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("CHOOSE_PERSON_APPLICATION: EXECUTE");        
		}
		
		app.getCurrentScreen().execute();
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("CHOOSE_PERSON_APPLICATION: EXIT");        
		}
		app.getCurrentScreen().exit();
	}
}


class LOGOUT_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("LOGOUT_APPLICATION: ENTER");        
		}

		//clear mJWT from localstorage
		localStorage.removeItem("mJWT");

		//clear personal selects
		var club_select = document.getElementById("club_select_id");
                club_select.length = 0;
		var team_select = document.getElementById("team_select_id");
                team_select.length = 0;
		var person_select = document.getElementById("person_select_id");
                person_select.length = 0;
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("LOGOUT_APPLICATION: EXECUTE");        
		}
		app.mStateMachine.changeState(app.mINIT_APPLICATION);
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("LOGOUT_APPLICATION: EXIT");        
		}

		var element = document.getElementById("logout_nav_id");
		element.className = element.className.replace(/\active\b/g, "");
		location.hash = "login_screen";
	}
}

class INSERT_NATIVE_LOGIN_EMAIL_SCREEN_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("INSERT_NATIVE_LOGIN_EMAIL_SCREEN_APPLICATION: ENTER");        
		}

		app.setCurrentScreen(new InsertLoginEmailScreen(app));
		app.getCurrentScreen().enter();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_NATIVE_LOGIN_EMAIL_SCREEN_APPLICATION: EXECUTE");        
		}
		
		app.getCurrentScreen().execute();
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_NATIVE_LOGIN_EMAIL_SCREEN_APPLICATION: EXIT");        
		}
		app.getCurrentScreen().exit();
	}
}

//what
class INSERT_NATIVE_LOGIN_CLUB_SCREEN_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("INSERT_NATIVE_LOGIN_CLUB_SCREEN_APPLICATION: ENTER");        
		}
		app.setCurrentScreen(new InsertLoginClubScreen(app));
		app.getCurrentScreen().enter();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_NATIVE_LOGIN_CLUB_SCREEN_APPLICATION: EXECUTE");        
		}
		app.getCurrentScreen().execute();
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_NATIVE_LOGIN_CLUB_SCREEN_APPLICATION: EXIT");        
		}
		app.getCurrentScreen().exit();
	}
}


class INSERT_FORGOT_PASSWORD_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("INSERT_FORGOT_PASSWORD_APPLICATION: ENTER");        
		}
		
		app.setCurrentScreen(new InsertForgotPasswordScreen(app));
		app.getCurrentScreen().enter();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_FORGOT_PASSWORD_APPLICATION: EXECUTE");        
		}

		app.getCurrentScreen().execute();

	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_FORGOT_PASSWORD_APPLICATION: EXIT");        
		}

		app.getCurrentScreen().exit();

	}
}

class INSERT_INVITE_CLUB_EMAIL_APPLICATION extends State
{
        constructor()
        {
                super();
        }

        enter(app)
        {
                if (app.mStateLogs || app.mStateEnterLogs)
                {
                        console.log("INSERT_INVITE_CLUB_EMAIL_APPLICATION: ENTER");
		}

		app.setCurrentScreen(new InsertInviteClubEmailScreen(app));
		app.getCurrentScreen().enter();
        }

        execute(app)
        {
                if (app.mStateLogs || app.mStateExecuteLogs)
                {
                        console.log("INSERT_INVITE_CLUB_EMAIL_APPLICATION: EXECUTE");
                }
		app.getCurrentScreen().execute();
        }

        exit(app)
        {
                if (app.mStateLogs || app.mStateExitLogs)
                {
                        console.log("INSERT_INVITE_CLUB_EMAIL_APPLICATION: EXIT");
                }
		app.getCurrentScreen().exit();
        }
}

class INSERT_ACCEPT_CLUB_INVITE_APPLICATION extends State
{
        constructor()
        {
                super();
        }

        enter(app)
        {
                if (app.mStateLogs || app.mStateEnterLogs)
                {
                        console.log("INSERT_ACCEPT_CLUB_INVITE_APPLICATION: ENTER");
		}
		
		app.setCurrentScreen(new InsertAcceptClubInviteScreen(app));
		app.getCurrentScreen().enter();
        }
        
	execute(app)
        {
                if (app.mStateLogs || app.mStateExecuteLogs)
                {
                        console.log("INSERT_ACCEPT_CLUB_INVITE_APPLICATION: EXECUTE");
                }
		app.getCurrentScreen().execute();
	}
        exit(app)
        {
                if (app.mStateLogs || app.mStateExitLogs)
                {
                        console.log("INSERT_ACCEPT_CLUB_INVITE_APPLICATION: EXIT");
                }
		app.getCurrentScreen().exit();
        }
}
//what
//
class UPDATE_FORGOT_PASSWORD_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("UPDATE_FORGOT_PASSWORD_APPLICATION: ENTER");        
		}

		app.setCurrentScreen(new UpdateForgotPasswordScreen(app));
		app.getCurrentScreen().enter();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("UPDATE_FORGOT_PASSWORD_APPLICATION: EXECUTE");        
		}
		app.getCurrentScreen().execute();
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("UPDATE_FORGOT_PASSWORD_APPLICATION: EXIT");        
		}
		app.getCurrentScreen().exit();
	}
}
//what
//n
class MAIN_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("MAIN_APPLICATION: ENTER");        
		}
		
		app.setCurrentScreen(new Main(app));
		app.getCurrentScreen().enter();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("MAIN_APPLICATION: EXECUTE");        
		}
		
		app.getCurrentScreen().execute();
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("MAIN_APPLICATION: EXIT");        
		}
		
               	
		//need to delete cards
		//while (screen.mCloneArray.length > 0)
		if (app.getCurrentScreen().mCloneArray)
		{
			for (i = 0; i < app.getCurrentScreen().mCloneArray.length; i++)
			{
				app.getCurrentScreen().mCloneArray[i].remove();
			}
		}
		app.getCurrentScreen().exit();
	}
}

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

		app.setCurrentScreen(new InsertClubScreen(app));
		app.getCurrentScreen().enter();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_CLUB_APPLICATION: EXECUTE");        
		}

		app.getCurrentScreen().execute();
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_CLUB_APPLICATION: EXIT");        
		}

		app.getCurrentScreen().exit();
	}
}

class INSERT_PERSON_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("INSERT_PERSON_APPLICATION: ENTER");        
		}

		app.setCurrentScreen(new InsertPersonScreen(app));
		app.getCurrentScreen().enter();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_PERSON_APPLICATION: EXECUTE");        
		}

		app.getCurrentScreen().execute();
	}

        exit(app)
	{
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_PERSON_APPLICATION: EXIT");        
		}
		app.getCurrentScreen().exit();
	}
}

class INSERT_NATIVE_LOGIN_SCREEN_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("INSERT_NATIVE_LOGIN_SCREEN_APPLICATION: ENTER");        
		}

		app.setCurrentScreen(new InsertNativeLoginScreen(app));
		app.getCurrentScreen().enter();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_NATIVE_LOGIN_SCREEN_APPLICATION: EXECUTE");        
		}
		
		app.getCurrentScreen().execute();
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_NATIVE_LOGIN_SCREEN_APPLICATION: EXIT");        
		}
		app.getCurrentScreen().exit();
	}
}


class DELETE_PERSON_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("DELETE_PERSON_APPLICATION: ENTER");        
		}
		
		app.setCurrentScreen(new DeletePersonScreen(app));
		app.getCurrentScreen().enter();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("DELETE_PERSON_APPLICATION: EXECUTE");        
		}
		
		app.getCurrentScreen().execute();
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("DELETE_PERSON_APPLICATION: EXIT");        
		}
		
		app.getCurrentScreen().exit();
	}
}

class INSERT_TEAM_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("INSERT_TEAM_APPLICATION: ENTER");        
		}
		
		app.setCurrentScreen(new InsertTeamScreen(app));
		app.getCurrentScreen().enter();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_TEAM_APPLICATION: EXECUTE");        
		}

		app.getCurrentScreen().execute();
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_TEAM_APPLICATION: EXIT");        
		}
		app.getCurrentScreen().exit();
	}
}


class INSERT_PITCH_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("INSERT_PITCH_APPLICATION: ENTER");        
		}
		
		app.setCurrentScreen(new InsertPitchScreen(app));
		app.getCurrentScreen().enter();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_PITCH_APPLICATION: EXECUTE");        
		}

		app.getCurrentScreen().execute();
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_PITCH_APPLICATION: EXIT");        
		}
		app.getCurrentScreen().exit();
	}
}


class INSERT_PRACTICE_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("INSERT_PRACTICE_APPLICATION: ENTER");        
		}

                app.setCurrentScreen(new InsertPracticeScreen(app));
		app.getCurrentScreen().enter();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_PRACTICE_APPLICATION: EXECUTE");        
		}

		app.getCurrentScreen().execute();
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_PRACTICE_APPLICATION: EXIT");        
		}

		app.getCurrentScreen().exit();
	}
}

class INSERT_GAME_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("INSERT_GAME_APPLICATION: ENTER");        
		}
                
		app.setCurrentScreen(new InsertGameScreen(app));
		app.getCurrentScreen().enter();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_GAME_APPLICATION: EXECUTE");        
		}

		app.getCurrentScreen().execute();
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_GAME_APPLICATION: EXIT");        
		}
		
		app.getCurrentScreen().exit();
	}
}
