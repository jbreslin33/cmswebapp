
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
     	
		//mLocationHash in application	
		var hash = window.location.hash.substr(1);
        	var urlArray = hash.split('&');
		if (urlArray.length > 0)
		{
			app.mLocationHash = urlArray[0];
		}
                
		if (app.mLocationHash == 'login_screen' && app.mStateMachine.mCurrentState != app.mLOGIN_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mLOGIN_APPLICATION);
                }
		else if (app.mLocationHash == 'logout_screen' && app.mStateMachine.mCurrentState != app.mLOGOUT_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mLOGOUT_APPLICATION);
                }
		else if (app.mLocationHash == 'update_forgot_password_screen' && app.mStateMachine.mCurrentState != app.mUPDATE_FORGOT_PASSWORD_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mUPDATE_FORGOT_PASSWORD_APPLICATION);
                }
		else if (app.mLocationHash == 'insert_native_login_screen' && app.mStateMachine.mCurrentState != app.mINSERT_NATIVE_LOGIN_SCREEN_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_NATIVE_LOGIN_SCREEN_APPLICATION);
                }
		else if (app.mLocationHash == 'insert_native_login_club_screen' && app.mStateMachine.mCurrentState != app.mINSERT_NATIVE_LOGIN_CLUB_SCREEN_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_NATIVE_LOGIN_CLUB_SCREEN_APPLICATION);
                }
		else if (app.mLocationHash == 'insert_club_screen' && app.mStateMachine.mCurrentState != app.mINSERT_CLUB_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_CLUB_APPLICATION);
                }
		else if (app.mLocationHash == 'insert_person_screen' && app.mStateMachine.mCurrentState != app.mINSERT_PERSON_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_PERSON_APPLICATION);
                }
		else if (app.mLocationHash == 'delete_person_screen' && app.mStateMachine.mCurrentState != app.mDELETE_PERSON_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mDELETE_PERSON_APPLICATION);
                }
		else if (app.mLocationHash == 'insert_team_screen' && app.mStateMachine.mCurrentState != app.mINSERT_TEAM_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_TEAM_APPLICATION);
                }
		else if (app.mLocationHash == 'insert_practice_screen' && app.mStateMachine.mCurrentState != app.mINSERT_PRACTICE_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_PRACTICE_APPLICATION);
                }
		else if (app.mLocationHash == 'insert_forgot_password_screen' && app.mStateMachine.mCurrentState != app.mINSERT_FORGOT_PASSWORD_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_FORGOT_PASSWORD_APPLICATION);
                }
		else if (app.mLocationHash == 'insert_invite_club_member_screen' && app.mStateMachine.mCurrentState != app.mINSERT_INVITE_CLUB_MEMBER_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_INVITE_CLUB_MEMBER_APPLICATION);
                }
		else if (app.mLocationHash == 'insert_accept_club_invite_screen' && app.mStateMachine.mCurrentState != app.mINSERT_ACCEPT_CLUB_INVITE_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_ACCEPT_CLUB_INVITE_APPLICATION);
                }
		else if (app.mLocationHash == 'main_screen' && app.mStateMachine.mCurrentState != app.mMAIN_APPLICATION)
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
		document.getElementById("insert_club_screen_html_id").style.display = "none";
		document.getElementById("insert_person_screen_html_id").style.display = "none";
		document.getElementById("delete_person_screen_html_id").style.display = "none";
		document.getElementById("insert_team_screen_html_id").style.display = "none";
		document.getElementById("insert_practice_screen_html_id").style.display = "none";
		document.getElementById("insert_forgot_password_screen_html_id").style.display = "none";
		document.getElementById("insert_invite_club_member_screen_html_id").style.display = "none";
		document.getElementById("update_forgot_password_screen_html_id").style.display = "none";
	}
        
//if you click link it automatically joins you to club	
	//then it simply takes you to login page
	//where you can join site or simply login
	execute(application)
        {
		if (application.mStateLogs || application.mStateExecuteLogs)
		{
			console.log("INIT_APPLICATION_STATE: EXECUTE");        
		}
		application.mJWT = localStorage.getItem("mJWT");
		if (application.mJWT)
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
//you need to take the invite token and do a query to find out the appropriate place for this user....
		//to do this do we need loginScreen states?
		//
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("LOGIN_APPLICATION: EXECUTE");        
		}
                
		var screen = app.mLogin;

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
		
		//document.getElementById("logout_nav_id").className += " active";

		localStorage.removeItem("mJWT");
                //app.mLocationHash = "logout_screen";
		app.mStateMachine.changeState(app.mINIT_APPLICATION);
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("LOGOUT_APPLICATION: EXECUTE");        
		}
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("LOGOUT_APPLICATION: EXIT");        
		}

		var element = document.getElementById("logout_nav_id");
		element.className = element.className.replace(/\active\b/g, "");
                app.mLocationHash = "login_screen";
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

		var screen = app.mInsertNativeLoginScreen;

		screen.processData();

		if (screen.mJson)
		{
			if (screen.mJson.persons)
			{
				console.log('we got persons');
				app.mStateMachine.changeState(app.mMAIN_APPLICATION);
			}
			else
			{
				console.log('no persons');
			}
		}
              
                if (app.mInsertNativeLoginScreen.mData)
		{
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
                                app.mJWT = dataArray[1]; //set jwt
                                //put in local storage
                                localStorage.setItem('mJWT', app.mJWT);

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
            
		var screen = app.mInsertClubScreen;

		screen.processData();

		if (screen.mData)
                {
                        if (screen.mCode == -106)
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
             
		if (screen.mData)
                {
                        var dataArray = app.mInsertPersonScreen.mData.split(",");
                        screen.mCode = dataArray[0];

                        if (screen.mCode == -100)
                        {

                                app.mJWT = dataArray[1]; //set jwt
                                //put in local storage
                                localStorage.setItem('mJWT', app.mJWT);

                                //JSON
                                dataArray.shift(); //remove mCode
                                dataArray.shift(); //remove mJwt
                                dataArray.join();
                                screen.mJson = JSON.parse(dataArray);
                                //remove all old options

				
                                //load up option
                                var select = document.getElementById("person_select_id");
				select.length = 0;
                                for (var i = 0; i < screen.mJson.persons.length; i++)
                                {
                                        var opt = document.createElement('option');
                                        opt.value = screen.mJson.persons[i].id;
                                        var full_name = screen.mJson.persons[i].first_name + ' ' + screen.mJson.persons[i].middle_name + ' ' + screen.mJson.persons[i].last_name;
                                        opt.innerHTML = full_name;
                                        select.appendChild(opt);
                                }

                                app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                                document.getElementById('insert_person_screen_name_message_id').innerHTML = '';
                        }
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

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("DELETE_PERSON_APPLICATION: EXECUTE");        
		}
		var screen = app.mDeletePersonScreen;

                if (screen.mData)
                {
                        var dataArray = screen.mData.split(",");
                        screen.mCode = dataArray[0];

                        if (screen.mCode == -190)
                        {
                                app.mJWT = dataArray[1]; //set jwt
                                //put in local storage
                                localStorage.setItem('mJWT', app.mJWT);

                                //JSON
                                dataArray.shift(); //remove mCode
                                dataArray.shift(); //remove mJwt
                                dataArray.join();
                                screen.mJson = JSON.parse(dataArray);
                                //remove all old options

                                //load up option
                                var select = document.getElementById("delete_person_screen_select_id");
                                select.length = 0;
                                for (var i = 0; i < screen.mJson.persons.length; i++)
                                {
                                        var opt = document.createElement('option');
                                        opt.value = screen.mJson.persons[i].id;
                                        var full_name = screen.mJson.persons[i].first_name + ' ' + screen.mJson.persons[i].middle_name + ' ' + screen.mJson.persons[i].last_name;
                                        opt.innerHTML = full_name;
                                        select.appendChild(opt);
                                }

                                //app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                                //document.getElementById('delete_person_screen_name_message_id').innerHTML = '';
				screen.mCode = 0;
				screen.mData = null;
                        }

                        if (screen.mCode == -100)
                        {
                                app.mJWT = dataArray[1]; //set jwt
                                //put in local storage
                                localStorage.setItem('mJWT', app.mJWT);

                                //JSON
                                dataArray.shift(); //remove mCode
                                dataArray.shift(); //remove mJwt
                                dataArray.join();
                                screen.mJson = JSON.parse(dataArray);
                                //remove all old options


                                //load up option
                                var select = document.getElementById("person_select_id");
                                select.length = 0;
                                for (var i = 0; i < screen.mJson.persons.length; i++)
                                {
                                        var opt = document.createElement('option');
                                        opt.value = screen.mJson.persons[i].id;
                                        var full_name = screen.mJson.persons[i].first_name + ' ' + screen.mJson.persons[i].middle_name + ' ' + screen.mJson.persons[i].last_name;
                                        opt.innerHTML = full_name;
                                        select.appendChild(opt);
                                }

                                app.mStateMachine.changeState(app.mMAIN_APPLICATION);
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

                if (screen.mData)
                {
                        if (screen.mCode == -106)
                        {
                                document.getElementById('insert_team_screen_name_message_id').style.color = 'red';
                                document.getElementById('insert_team_screen_name_message_id').innerHTML = 'Team Name already exists.';
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
		app.mInsertTeamScreen.hide();
		app.mInsertTeamScreen.mCode = 0;
		app.mInsertTeamScreen.mData = null;
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
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_PRACTICE_APPLICATION: EXECUTE");        
		}
               
		var screen = app.mInsertPracticeScreen;

                screen.processData();
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_PRACTICE_APPLICATION: EXIT");        
		}
		app.mInsertPracticeScreen.hide();
		app.mInsertPracticeScreen.mCode = 0;
		app.mInsertPracticeScreen.mData = null;
	}
}



