
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
                if (app.mStateLogs || app.mStateExecuteLogs)
                {
                        console.log("GLOBAL_APPLICATION: EXECUTE"); 
                }
                
		if (location.hash == '#login_screen' && app.mStateMachine.mCurrentState != app.mLOGIN_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mLOGIN_APPLICATION);
                }

                if (location.hash == '#add_event' && app.mStateMachine.mCurrentState != app.mINSERT_EVENTO_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_EVENTO_APPLICATION);
                }
		else if (location.hash == '#daily_schedule' && app.mStateMachine.mCurrentState != app.mSHOW_DAILY_SCHEDULE_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mSHOW_DAILY_SCHEDULE_APPLICATION);
                }
		else if (location.hash == '#insert_native_login_screen' && app.mStateMachine.mCurrentState != app.mINSERT_NATIVE_LOGIN_SCREEN_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_NATIVE_LOGIN_SCREEN_APPLICATION);
                }
		else if (location.hash == '#insert_club_screen' && app.mStateMachine.mCurrentState != app.mINSERT_CLUB_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_CLUB_APPLICATION);
                }
		else if (location.hash == '#insert_forgot_password_screen' && app.mStateMachine.mCurrentState != app.mINSERT_FORGOT_PASSWORD_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_FORGOT_PASSWORD_APPLICATION);
                }
		else if (location.hash == '#insert_invite_club_member_screen' && app.mStateMachine.mCurrentState != app.mINSERT_INVITE_CLUB_MEMBER_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_INVITE_CLUB_MEMBER_APPLICATION);
                }
		else if (location.hash == '#update_forgot_password_screen' && app.mStateMachine.mCurrentState != app.mUPDATE_FORGOT_PASSWORD_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mUPDATE_FORGOT_PASSWORD_APPLICATION);
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
			console.log("INIT_PPLICATION_STATE: ENTER");        
		}
		//hide evertthing except nav_bar_id
		document.getElementById("nav_bar_id").style.display = "block";
		document.getElementById("insert_native_login_screen_html_id").style.display = "none";
		document.getElementById("login_screen_html_id").style.display = "none";
		document.getElementById("card_original_id").style.display = "none";
		document.getElementById("insert_evento_html_id").style.display = "none";
		document.getElementById("insert_club_screen_html_id").style.display = "none";
		document.getElementById("insert_forgot_password_screen_html_id").style.display = "none";
		document.getElementById("insert_invite_club_member_screen_html_id").style.display = "none";
		document.getElementById("update_forgot_password_screen_html_id").style.display = "none";
	}

        execute(application)
        {
		console.log("A0");
		if (application.mStateLogs || application.mStateExecuteLogs)
		{
			console.log("INIT_APPLICATION_STATE: EXECUTE");        
		}
		application.mJWT = localStorage.getItem("mJWT");

		if (application.mForgotPasswordToken)
		{
			console.log("A1");
			application.mStateMachine.changeState(application.mUPDATE_FORGOT_PASSWORD_APPLICATION);
		}
		else if (application.mClubInviteName && application.mClubInviteToken && application.mJWT)
		{
			//you already are logged in (sortof) and you have creds to join club so do it but maybe with something other than whats below
			console.log("A2");
			application.mStateMachine.changeState(application.mLOGIN_APPLICATION);
		}
		else if (application.mClubInviteName && application.mClubInviteToken && application.mJWT == null)
		{
			//you are not logged in but you have creds to join club so do it but maybe with something other than whats below
			console.log("A3");
			application.mStateMachine.changeState(application.mLOGIN_APPLICATION);
		}
		//else its  not a special case like forgot password or join club etc and just a normal login attempt
		else
		{
			if (application.mJWT)
			{
				console.log("A4");
				application.mStateMachine.changeState(application.mMAIN_APPLICATION);
			}
			else
			{
				console.log("A5");
				application.mStateMachine.changeState(application.mLOGIN_APPLICATION);
			}
		}
		console.log("A6");
	}

        exit(application)
        {
		if (application.mStateLogs || application.mStateExitLogs)
		{
			console.log("INIT_APPLICATION_STATE: EXIT");        
		}
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
		if (app.mInsertNativeLoginScreen)
		{
			//also maybe some clean up as well, so just leaving this if statement here.
			app.mInsertNativeLoginScreen = new InsertLoginScreen(app);

		}
		else
		{
			app.mInsertNativeLoginScreen = new InsertLoginScreen(app);
		}
                document.getElementById("insert_native_login_screen_nav_id").className += " active";
		app.mInsertNativeLoginScreen.show();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_NATIVE_LOGIN_SCREEN_APPLICATION: EXECUTE");        
		}
              
                if (app.mInsertNativeLoginScreen.mData)
                {
                        var dataArray = app.mInsertNativeLoginScreen.mData.split(",");
                        app.mInsertNativeLoginScreen.mCode = dataArray[0];

                        if (app.mInsertNativeLoginScreen.mCode == -100)
                        {
                                app.mJWT = dataArray[1]; //set jwt
                                //put in local storage
                                localStorage.setItem('mJWT', app.mJWT);

                                app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                        	document.getElementById('insert_native_login_screen_email_message_id').innerHTML = '';
                        }
                        if (app.mInsertNativeLoginScreen.mCode == -101)
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
			console.log("INSERT_NATIVE_LOGIN_SCREEN_APPLICATION: EXIT");        
		}
		app.mInsertNativeLoginScreen.mCode = 0;
		app.mInsertNativeLoginScreen.mData = null;

		//hide it for now maybe delete later
		var element = document.getElementById("insert_native_login_screen_nav_id");
                element.className = element.className.replace(/\active\b/g, "");

		app.mInsertNativeLoginScreen.hide();
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
		if (app.mLogin)
		{
			//do nothing right now	
		}
		else
		{
			//start the login subsystem
			app.mLogin = new LoginScreen(app);
		}
		document.getElementById("login_nav_id").className += " active";
    		app.mLogin.show();

	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("LOGIN_APPLICATION: EXECUTE");        
		}

		if (app.mLogin.mData)
		{
			var dataArray = app.mLogin.mData.split(",");
			app.mLogin.mCode = dataArray[0];
			if (app.mLogin.mCode == -100)
			{
				app.mJWT = dataArray[1]; //set jwt
				//put in local storage
				localStorage.setItem('mJWT', app.mJWT);
					
				app.mStateMachine.changeState(app.mMAIN_APPLICATION);
				document.getElementById('login_screen_password_message_id').innerHTML = '';
				document.getElementById('login_screen_email_message_id').innerHTML = '';
			}
			if (app.mLogin.mCode == -101)
			{
                		document.getElementById('login_screen_email_message_id').style.color = 'red';
                        	document.getElementById('login_screen_email_message_id').innerHTML = 'email does not exist. Please enter a valid email.';
				document.getElementById('login_screen_password_message_id').innerHTML = '';
			}
			if (app.mLogin.mCode == -105)
			{
                		document.getElementById('login_screen_password_message_id').style.color = 'red';
                        	document.getElementById('login_screen_password_message_id').innerHTML = 'Incorrect password.';
				document.getElementById('login_screen_email_message_id').innerHTML = '';
			}
		}
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("LOGIN_APPLICATION: EXIT");        
		}
		//reset data variables
		app.mLogin.mCode = 0;
		app.mLogin.mData = null;

		var element = document.getElementById("login_nav_id");
		element.className = element.className.replace(/\active\b/g, "");
    		app.mLogin.hide();
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
                app.mInsertInviteClubMemberScreen.show();
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
                this.mHit = false;
                app.mInsertInviteClubMemberScreen.hide();
                app.mInsertInviteClubMemberScreen.mCode = 0;
                app.mInsertInviteClubMemberScreen.mData = null;
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
		//app.mStateMachine.changeState(app.mLOGIN_APPLICATION);
		
		if (app.mMain)
		{
                        //also maybe some clean up as well, so just leaving this if statement here.
                      app.mMain = new Main(app);

                }
                else
                {
                      app.mMain = new Main(app);
                }
             	document.getElementById("main_nav_id").className += " active";

                //app.mMain.show();

	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("MAIN_APPLICATION: EXECUTE");        
		}
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("MAIN_APPLICATION: EXIT");        
		}
                //app.mMain.hide();
               	var element = document.getElementById("main_nav_id");
                element.className = element.className.replace(/\active\b/g, "");
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
                                document.getElementById('insert_club_screen_name_message_id').innerHTML = '';
                        }
                        if (app.mInsertClubScreen.mCode == -106)
                        {
                                document.getElementById('insert_club_screen_name_message_id').style.color = 'red';
                                document.getElementById('insert_club_screen_name_message_id').innerHTML = 'Club Name already exists.';
				app.mInsertClubScreen.mCode = 0;
				app.mInsertClubScreen.mData = null;
                        }
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
