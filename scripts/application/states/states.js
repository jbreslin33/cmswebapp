
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
		console.log('D:' + location.hash);
                if (app.mStateLogs || app.mStateExecuteLogs)
                {
                        console.log("GLOBAL_APPLICATION: EXECUTE"); 
                }
		if (location.hash == '#login_screen' && app.mStateMachine.mCurrentState != app.mLOGIN_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mLOGIN_APPLICATION);
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
		else if (location.hash == '#insert_native_login_screen' && app.mStateMachine.mCurrentState != app.mINSERT_NATIVE_LOGIN_SCREEN_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_NATIVE_LOGIN_SCREEN_APPLICATION);
                }
		else if (location.hash == '#insert_native_login_club_screen' && app.mStateMachine.mCurrentState != app.mINSERT_NATIVE_LOGIN_CLUB_SCREEN_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_NATIVE_LOGIN_CLUB_SCREEN_APPLICATION);
                }
		else if (location.hash == '#insert_club_screen' && app.mStateMachine.mCurrentState != app.mINSERT_CLUB_APPLICATION)
                {
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
		else if (location.hash == '#insert_invite_club_member_screen' && app.mStateMachine.mCurrentState != app.mINSERT_INVITE_CLUB_MEMBER_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_INVITE_CLUB_MEMBER_APPLICATION);
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
		document.getElementById("insert_native_login_screen_html_id").style.display = "none";
		document.getElementById("insert_native_login_club_screen_html_id").style.display = "none";
		document.getElementById("login_screen_html_id").style.display = "none";
		document.getElementById("main_screen_html_id").style.display = "none";
		document.getElementById("insert_club_screen_html_id").style.display = "none";
		document.getElementById("insert_person_screen_html_id").style.display = "none";
		document.getElementById("delete_person_screen_html_id").style.display = "none";
		document.getElementById("insert_team_screen_html_id").style.display = "none";
		document.getElementById("insert_practice_screen_html_id").style.display = "none";
		document.getElementById("insert_game_screen_html_id").style.display = "none";
		document.getElementById("insert_forgot_password_screen_html_id").style.display = "none";
		document.getElementById("insert_invite_club_member_screen_html_id").style.display = "none";
		document.getElementById("update_forgot_password_screen_html_id").style.display = "none";
	}
        
	execute(application)
        {
		if (application.mStateLogs || application.mStateExecuteLogs)
		{
			console.log("INIT_APPLICATION_STATE: EXECUTE");        
		}
		if (application.getJWT())
		{
			application.mStateMachine.changeState(application.mMAIN_APPLICATION);
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

		app.setCurrentScreen(new InsertLoginScreen(app));

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
		if (app.mInsertNativeLoginClubScreen)
		{
			//also maybe some clean up as well, so just leaving this if statement here.
			app.mInsertNativeLoginClubScreen = new InsertLoginClubScreen(app);

		}
		else
		{
			app.mInsertNativeLoginClubScreen = new InsertLoginClubScreen(app);
		}
                document.getElementById("insert_native_login_club_screen_nav_id").className += " active";
		app.mInsertNativeLoginClubScreen.show();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_NATIVE_LOGIN_CLUB_SCREEN_APPLICATION: EXECUTE");        
		}
              
                if (app.mInsertNativeLoginClubScreen.mData)
                {
                        var dataArray = app.mInsertNativeLoginClubScreen.mData.split(",");
                        app.mInsertNativeLoginClubScreen.mCode = dataArray[0];
                        console.log('CODE:::' + app.mInsertNativeLoginClubScreen.mCode);


                        if (app.mInsertNativeLoginClubScreen.mCode == -100)
                        {
                                app.setJWT(dataArray[1]); //set jwt

                                app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                        	document.getElementById('insert_native_login_screen_email_message_id').innerHTML = '';
                        }
                        if (app.mInsertNativeLoginClubScreen.mCode == -102)
                        {
				document.getElementById('insert_native_login_screen_email_message_id').style.color = 'red';
                        	document.getElementById('insert_native_login_screen_email_message_id').innerHTML = 'Email already exists. Do you want to log in instead?';
				//show link as well
				document.getElementById("insert_native_login_screen_link_id").style.display = "block";
                        }
                }
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_NATIVE_LOGIN_CLUB_SCREEN_APPLICATION: EXIT");        
		}
		app.mInsertNativeLoginClubScreen.mCode = 0;
		app.mInsertNativeLoginClubScreen.mData = null;

		//hide it for now maybe delete later
		var element = document.getElementById("insert_native_login_club_screen_nav_id");
                element.className = element.className.replace(/\active\b/g, "");

		app.mInsertNativeLoginClubScreen.hide();
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
		if (app.mInsertForgotPasswordScreen)
		{
			app.mInsertForgotPasswordScreen = new InsertForgotPasswordScreen(app);
		}
		else
		{
			app.mInsertForgotPasswordScreen = new InsertForgotPasswordScreen(app);
		}
		app.mInsertForgotPasswordScreen.show();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_FORGOT_PASSWORD_APPLICATION: EXECUTE");        
		}
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_FORGOT_PASSWORD_APPLICATION: EXIT");        
		}
		this.mHit = false;
		app.mInsertForgotPasswordScreen.hide();
		app.mInsertForgotPasswordScreen.mCode = 0;
		app.mInsertForgotPasswordScreen.mData = null;
	}
}

class INSERT_INVITE_CLUB_MEMBER_APPLICATION extends State
{
        constructor()
        {
                super();
        }

        enter(app)
        {
                if (app.mStateLogs || app.mStateEnterLogs)
                {
                        console.log("INSERT_INVITE_CLUB_MEMBER_APPLICATION: ENTER");
		}

                if (app.mInsertInviteClubMemberScreen)
                {
                        app.mInsertInviteClubMemberScreen = new InsertInviteClubMemberScreen(app);
                }
                else
                {
                        app.mInsertInviteClubMemberScreen = new InsertInviteClubMemberScreen(app);
                }
        }

        execute(app)
        {
                if (app.mStateLogs || app.mStateExecuteLogs)
                {
                        console.log("INSERT_INVITE_CLUB_MEMBER_APPLICATION: EXECUTE");
                }
        }

        exit(app)
        {
                if (app.mStateLogs || app.mStateExitLogs)
                {
                        console.log("INSERT_INVITE_CLUB_MEMBER_APPLICATION: EXIT");
                }
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
                if (app.mInsertAcceptClubInviteScreen)
                {
                        app.mInsertAcceptClubInviteScreen = new InsertAcceptClubInviteScreen(app);
                }
                else
                {
                        app.mInsertAcceptClubInviteScreen = new InsertAcceptClubInviteScreen(app);
                }
		app.mInsertAcceptClubInviteScreen.get();
        }
        
	execute(app)
        {
                if (app.mStateLogs || app.mStateExecuteLogs)
                {
                        console.log("INSERT_ACCEPT_CLUB_INVITE_APPLICATION: EXECUTE");
                }
                if (app.mInsertAcceptClubInviteScreen.mData)
		{
                	var dataArray = app.mInsertAcceptClubInviteScreen.mData.split(",");
                	app.mInsertAcceptClubInviteScreen.mCode = dataArray[0];
		}
		//you joined club welcome
               	if (app.mInsertAcceptClubInviteScreen.mCode == -100)
                {
			console.log('we should have already joined in db and this is confirm message 100');
                        app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                }
		//we need to have you join and get a user and person and user_person entry
                if (app.mInsertAcceptClubInviteScreen.mCode == -104)
               	{    
			console.log('lets redirect its a 104 to a join as there is no user yet');
                        app.mStateMachine.changeState(app.mINSERT_NATIVE_LOGIN_CLUB_SCREEN_APPLICATION);
                }
        }

        exit(app)
        {
                if (app.mStateLogs || app.mStateExitLogs)
                {
                        console.log("INSERT_ACCEPT_CLUB_INVITE_APPLICATION: EXIT");
                }
                app.mInsertAcceptClubInviteScreen.mCode = 0;
                app.mInsertAcceptClubInviteScreen.mData = null;
        }
}

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
		if (app.mUpdateForgotPasswordScreen)
		{
			app.mUpdateForgotPasswordScreen = new UpdateForgotPasswordScreen(app);
		}
		else
		{
			app.mUpdateForgotPasswordScreen = new UpdateForgotPasswordScreen(app);
		}
		app.mUpdateForgotPasswordScreen.show();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("UPDATE_FORGOT_PASSWORD_APPLICATION: EXECUTE");        
		}
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("UPDATE_FORGOT_PASSWORD_APPLICATION: EXIT");        
		}
		app.mUpdateForgotPasswordScreen.hide();
		app.mUpdateForgotPasswordScreen.mCode = 0;
		app.mUpdateForgotPasswordScreen.mData = null;
	}
}

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
		if (app.mMain)
		{
                      app.mMain = new Main(app);
                }
                else
                {
                      app.mMain = new Main(app);
                }
             	document.getElementById("main_nav_id").className += " active";

                app.mMain.show();
                app.mMain.get();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("MAIN_APPLICATION: EXECUTE");        
		}
                var screen = app.mMain;
                screen.processData();

                if (screen.mJson)
                {
			/*
                        if (screen.mJson.persons)
                        {
                                //app.mStateMachine.changeState(app.mMAIN_APPLICATION);
				//instead we will display data (schedule)
                        }
                        if (screen.mJson.pitches)
                        {
                                console.log('got pitches');
                        }
			*/
                        if (screen.mJson.practices)
                        {
                                console.log('got practices');
                        }
                }
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("MAIN_APPLICATION: EXIT");        
		}
               	
		var element = document.getElementById("main_nav_id");
                element.className = element.className.replace(/\active\b/g, "");

                var screen = app.mMain;
                screen.hide();
                screen.mCode = 0;
                screen.mData = null;
                screen.mJson = null;

		//need to delete cards
		//while (screen.mCloneArray.length > 0)
		for (i = 0; i < screen.mCloneArray.length; i++)
		{
			screen.mCloneArray[i].remove();
		}
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
		if (app.mInsertPersonScreen)
		{
			app.mInsertPersonScreen = new InsertPersonScreen(app);
		}
		else
		{
			app.mInsertPersonScreen = new InsertPersonScreen(app);
		}
		app.mInsertPersonScreen.show();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_PERSON_APPLICATION: EXECUTE");        
		}
		var screen = app.mInsertPersonScreen;

                screen.processData();

                if (screen.mJson)
                {
                        if (screen.mJson.persons)
                        {
                                app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                        }
                }

             
		if (screen.mData)
                {
                        var dataArray = app.mInsertPersonScreen.mData.split(",");
                        screen.mCode = dataArray[0];

                        if (app.mInsertPersonScreen.mCode == -106)
                        {
                                document.getElementById('insert_person_screen_name_message_id').style.color = 'red';
                                document.getElementById('insert_person_screen_name_message_id').innerHTML = 'Person Name already exists.';
				app.mInsertPersonScreen.mCode = 0;
				app.mInsertPersonScreen.mData = null;
                        }
                }
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_PERSON_APPLICATION: EXIT");        
		}
		app.mInsertPersonScreen.hide();
		app.mInsertPersonScreen.mCode = 0;
		app.mInsertPersonScreen.mData = null;
		app.mInsertPersonScreen.mJson = null;
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
		if (app.mDeletePersonScreen)
		{
			app.mDeletePersonScreen = new DeletePersonScreen(app);
		}
		else
		{
			app.mDeletePersonScreen = new DeletePersonScreen(app);
		}
		app.mDeletePersonScreen.get();
		app.mDeletePersonScreen.show();
	}
	/*
                var screen = app.mInsertTeamScreen;

                screen.processData();

                if (screen.mJson)
                {
                        if (screen.mJson.persons)
                        {
                                app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                        }
                }
*/
        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("DELETE_PERSON_APPLICATION: EXECUTE");        
		}

		var screen = app.mDeletePersonScreen;
                screen.processData();

                if (screen.mJson)
                {
                        if (screen.mJson.clubs)
                        {
                                app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                        }
			else if(screen.mJson.persons)
                        {
				screen.mCode = 0;
				screen.mData = null;
				screen.mJson = null;
			}
                }
                
		if (screen.mCode == -131)
		{
               		document.getElementById('delete_person_screen_message_id').innerHTML = 'Sorry you cannot delete only person.';
			screen.mCode = 0;
			screen.mData = null;
		}
                if (screen.mCode == -132)
		{	
                        document.getElementById('delete_person_screen_message_id').innerHTML = 'Sorry you cannot delete this person as they are involved in club.';
			screen.mCode = 0;
			screen.mData = null;
		}
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("DELETE_PERSON_APPLICATION: EXIT");        
		}
		app.mDeletePersonScreen.hide();
		app.mDeletePersonScreen.mCode = 0;
		app.mDeletePersonScreen.mData = null;
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
		if (app.mInsertTeamScreen)
		{
			app.mInsertTeamScreen = new InsertTeamScreen(app);
		}
		else
		{
			app.mInsertTeamScreen = new InsertTeamScreen(app);
		}
		app.setCurrentScreen(app.mInsertTeamScreen);
		app.mInsertTeamScreen.show();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_TEAM_APPLICATION: EXECUTE");        
		}
                var screen = app.mInsertTeamScreen;

                screen.processData();

                if (screen.mJson)
                {
                        if (screen.mJson.persons)
                        {
                                app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                        }
                }

                if (screen.mData)
                {
                        if (screen.mCode == -106)
                        {
				app.mCurrentScreen.setMessage("Team name already exists", "red");
                                app.mInsertTeamScreen.mCode = 0;
                                app.mInsertTeamScreen.mData = null;
                        }
                }
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
		if (app.mInsertPracticeScreen)
		{
			app.mInsertPracticeScreen = new InsertPracticeScreen(app);
		}
		else
		{
			app.mInsertPracticeScreen = new InsertPracticeScreen(app);
		}
		app.mInsertPracticeScreen.show();
		app.mInsertPracticeScreen.get();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_PRACTICE_APPLICATION: EXECUTE");        
		}

		var screen = app.mInsertPracticeScreen;
                screen.processData();

                if (screen.mJson)
                {
                        if (screen.mJson.persons)
                        {
                                app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                        }
                }
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_PRACTICE_APPLICATION: EXIT");        
		}
		var screen = app.mInsertPracticeScreen;
		screen.hide();
		screen.mCode = 0;
		screen.mData = null;
		screen.mJson = null;
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
		if (app.mInsertGameScreen)
		{
			app.mInsertGameScreen = new InsertGameScreen(app);
		}
		else
		{
			app.mInsertGameScreen = new InsertGameScreen(app);
		}
		app.mInsertGameScreen.show();
		app.mInsertGameScreen.get();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_GAME_APPLICATION: EXECUTE");        
		}

		var screen = app.mInsertGameScreen;
                screen.processData();

                if (screen.mJson)
                {
			console.log('got mJson in exe');
                        if (screen.mJson.persons)
                        {
				console.log('got persons in exe');
                                app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                        }
                }
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_GAME_APPLICATION: EXIT");        
		}
		var screen = app.mInsertGameScreen;
		screen.hide();
		screen.mCode = 0;
		screen.mData = null;
		screen.mJson = null;
	}
}



