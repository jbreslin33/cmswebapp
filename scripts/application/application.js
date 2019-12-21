'use strict';

class Application 
{
	constructor(insertNativeLoginToken,joinEmail,forgotPasswordToken,forgotPasswordEmail) 
	{
		this.mStateLogs = false;
		this.mStateEnterLogs = true;
		this.mStateExecuteLogs = false;
		this.mStateExitLogs = false;

                //authentication google
                this.mEmail = null;
                this.mPassword = null;
                this.mGoogleID = null;
                this.mGoogleIDToken = null;
                this.mFirstName = null;
                this.mLastName = null;
                this.mImageUrl = null;
                this.mGoogleLoginHit = false;

		//html
               	this.mNavBarHtml = null; 
               	this.mInsertEmailScreenHtml = null; 
               	this.mInsertNativeLoginScreenHtml = null; 
               	this.mLoginScreenHtml = null; 
               	this.mChoosePersonScreenHtml = null; 
               	this.mMainScreenHtml = null; 
               	this.mInsertClubScreenHtml = null; 
               	this.mInsertPersonScreenHtml = null; 
               	this.mDeletePersonScreenHtml = null; 
               	this.mInsertTeamScreenHtml = null; 
               	this.mInsertPitchScreenHtml = null; 
               	this.mInsertPracticeScreenHtml = null; 
               	this.mInsertGameScreenHtml = null; 
               	this.mInsertForgotPasswordScreenHtml = null; 
               	this.mInsertEmailClubInviteScreenHtml = null; 
               	this.mInsertAcceptClubInInviteScreenHtml = null; 
               	this.mUpdateForgotPasswordScreenHtml = null; 

		//set html 
               	this.setNavBarHtml                         ( document.getElementById("nav_bar_id")                               ); 
               	this.setInsertEmailScreenHtml              ( document.getElementById("insert_email_screen_html_id")              ); 
               	this.setInsertNativeLoginScreenHtml        ( document.getElementById("insert_native_login_screen_html_id")       ); 
               	this.setLoginScreenHtml                    ( document.getElementById("login_screen_html_id")                     ); 
               	this.setChoosePersonScreenHtml             ( document.getElementById("choose_person_screen_html_id")             ); 
               	this.setMainScreenHtml                     ( document.getElementById("main_screen_html_id")                      );
               	this.setInsertClubScreenHtml        	   ( document.getElementById("insert_club_screen_html_id")               ); 
               	this.setInsertPersonScreenHtml             ( document.getElementById("insert_person_screen_html_id")             );  
               	this.setDeletePersonScreenHtml             ( document.getElementById("delete_person_screen_html_id")             );  
               	this.setInsertTeamScreenHtml               ( document.getElementById("insert_team_screen_html_id")               ); 
               	this.setInsertPitchScreenHtml              ( document.getElementById("insert_pitch_screen_html_id")              ); 
               	this.setInsertPracticeScreenHtml    	   ( document.getElementById("insert_practice_screen_html_id")           ); 
               	this.setInsertGameScreenHtml               ( document.getElementById("insert_game_screen_html_id")               ); 
               	this.setInsertForgotPasswordScreenHtml     ( document.getElementById("insert_forgot_password_screen_html_id")    );
               	this.setInsertEmailClubScreenHtml          ( document.getElementById("insert_email_club_screen_html_id")         ); 
               	this.setInsertAcceptClubInInviteScreenHtml ( document.getElementById("insert_accept_club_invite_screen_html_id") );
               	this.setUpdateForgotPasswordScreenHtml     ( document.getElementById("update_forgot_password_screen_html_id")    ); 
		
		
		//user variables
		this.mUserSelectedPerson = false;

		//forgot_password
		this.mInsertNativeLoginToken = insertNativeLoginToken; 
		this.mJoinEmail = joinEmail; 
		this.mForgotPasswordToken = forgotPasswordToken; 
		this.mForgotPasswordEmail = forgotPasswordEmail; 

		//utilities
		this.mUtility = new Utility();

		//calendar
		this.mCalendar = new Calendar();
		
		//time
		this.mTime = new Time();

		//SCREENs
		//current Screen
		this.mCurrentScreen = null;

		//daily schedule
		this.mDailySchedule = null;

		//insert evento
		this.mInsertEvento = null;

		//main class
                this.mDivMain = document.createElement("DIV");
                this.mDivMain.setAttribute("class", "main");
                document.body.appendChild(this.mDivMain);

		//states
		this.mStateMachine = new StateMachine(this);
		this.mGLOBAL_APPLICATION          = new GLOBAL_APPLICATION();
		this.mINIT_APPLICATION            = new INIT_APPLICATION();
		this.mMAIN_APPLICATION            = new MAIN_APPLICATION();
		this.mINSERT_EMAIL_SCREEN_APPLICATION     = new INSERT_EMAIL_SCREEN_APPLICATION();
		this.mINSERT_NATIVE_LOGIN_SCREEN_APPLICATION     = new INSERT_NATIVE_LOGIN_SCREEN_APPLICATION();
		this.mLOGIN_APPLICATION           = new LOGIN_APPLICATION();
		this.mCHOOSE_PERSON_APPLICATION        = new CHOOSE_PERSON_APPLICATION();
		this.mLOGOUT_APPLICATION           = new LOGOUT_APPLICATION();
		this.mINSERT_CLUB_APPLICATION        = new INSERT_CLUB_APPLICATION();
		this.mINSERT_PERSON_APPLICATION        = new INSERT_PERSON_APPLICATION();
		this.mDELETE_PERSON_APPLICATION        = new DELETE_PERSON_APPLICATION();
		this.mINSERT_TEAM_APPLICATION        = new INSERT_TEAM_APPLICATION();
		this.mINSERT_PITCH_APPLICATION        = new INSERT_PITCH_APPLICATION();
		this.mINSERT_PRACTICE_APPLICATION        = new INSERT_PRACTICE_APPLICATION();
		this.mINSERT_GAME_APPLICATION        = new INSERT_GAME_APPLICATION();
		this.mINSERT_FORGOT_PASSWORD_APPLICATION        = new INSERT_FORGOT_PASSWORD_APPLICATION();
		this.mINSERT_EMAIL_CLUB_APPLICATION        = new INSERT_EMAIL_CLUB_APPLICATION();
		this.mINSERT_ACCEPT_CLUB_INVITE_APPLICATION        = new INSERT_ACCEPT_CLUB_INVITE_APPLICATION();
		this.mUPDATE_FORGOT_PASSWORD_APPLICATION        = new UPDATE_FORGOT_PASSWORD_APPLICATION();

		this.mStateMachine.setGlobalState(this.mGLOBAL_APPLICATION);
		this.mStateMachine.changeState(this.mINIT_APPLICATION);

		// nav bar buttons clicked
		document.getElementById("navbuttonid").onclick = this.openNav.bind(this);
		document.getElementById("nav_bar_close_button_id").onclick = this.closeNav.bind(this);

		document.getElementById("mainnavbuttonid").onclick = this.hit.bind(this);
		document.getElementById("loginnavbuttonid").onclick = this.hit.bind(this);
		document.getElementById("logoutnavbuttonid").onclick = this.hit.bind(this);
		
		document.getElementById("insertpracticenavbuttonid").onclick = this.hit.bind(this);
		document.getElementById("insertgamenavbuttonid").onclick = this.hit.bind(this);
		
		document.getElementById("insertteamnavbuttonid").onclick = this.hit.bind(this);
		document.getElementById("insertpitchnavbuttonid").onclick = this.hit.bind(this);
		document.getElementById("insertemailclubnavbuttonid").onclick = this.hit.bind(this);
		
		document.getElementById("insertpersonnavbuttonid").onclick = this.hit.bind(this);
		document.getElementById("deletepersonnavbuttonid").onclick = this.hit.bind(this);
		
		document.getElementById("insertemailnavbuttonid").onclick = this.hit.bind(this);
		document.getElementById("insertforgotnavbuttonid").onclick = this.hit.bind(this);
		
		document.getElementById("insertclubnavbuttonid").onclick = this.hit.bind(this);

	}

        openNav()
        {
		console.log('cas');
                //document.getElementById("nav_bar_id").style.width = "250px";
                this.getNavBarHtml().style.width = "250px";

        }


        closeNav()
        {
		console.log('cas cl');
                //document.getElementById("nav_bar_id").style.width = "0";
                this.getNavBarHtml().style.width = "0";
        }

	hit ()
	{
		console.log('just hit a link so close');
                if (this.getNavBarHtml())
                {
			this.closeNav();
                }
	}
	
	update(timestamp)
	{
		this.mStateMachine.update();

		if (this.getCurrentScreen())
		{
			this.getCurrentScreen().update(timestamp);
		}


		//run again
	        window.requestAnimationFrame(APPLICATION.update.bind(APPLICATION));
	}

	setJWT(jwt)
	{
		localStorage.setItem('mJWT', jwt);
	}
	getJWT()
	{
		return localStorage.getItem("mJWT");
	}
	
	//------------------SCREENS
	setCurrentScreen(screen)
	{
		this.mCurrentScreen = screen;
	}
	getCurrentScreen()
	{
		return this.mCurrentScreen;
	}

	//GOOGLE
        googleSignIn(googleUser)
        {
                // Useful data for your client-side scripts:
                var profile = googleUser.getBasicProfile();

                // The ID token you need to pass to your backend:
                var id_token = googleUser.getAuthResponse().id_token;

                this.mEmail = profile.getEmail();
                this.mGoogleID = profile.getId();
                this.mIDToken = id_token;
                this.mFirstName = profile.getGivenName();
                this.mLastName = profile.getFamilyName();
                this.mImageUrl = profile.getImageUrl();

                this.getCurrentScreen().googleLogin();
        }

        googleSignOut()
        {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function ()
                {
                        console.log('User signed out.');
                });
        }

	setNavBarHtml(h)
	{
		this.mNavBarHtml = h;
	}
	getNavBarHtml()
	{
		if (this.mNavBarHtml)
		{
			return this.mNavBarHtml;
		}
		else
		{
			console.log("nothing");
		}
	}

                
	setInsertEmailScreenHtml(h)
	{
		this.mInsertEmailScreenHtml = h;
	}
	getInsertEmailScreenHtml()
	{
		return this.mInsertEmailScreenHtml;
	}

        setInsertNativeLoginScreenHtml(h)
	{
                this.mInsertNativeLoginScreenHtml = h;
	}
        getInsertNativeLoginScreenHtml()
	{
                return this.mInsertNativeLoginScreenHtml;
	}

        setLoginScreenHtml(h)
	{
                this.mLoginScreenHtml = h;
	}
        getLoginScreenHtml()
	{
                return this.mLoginScreenHtml;
	}


        setChoosePersonScreenHtml(h)
	{
                this.mChoosePersonScreenHtml = h;
	}
        getChoosePersonScreenHtml()
	{
                return this.mChoosePersonScreenHtml;
	}

        setMainScreenHtml(h)
	{
                this.mMainScreenHtml = h; 
	}
        getMainScreenHtml()
	{
                return this.mMainScreenHtml; 
	}


        setInsertClubScreenHtml(h)
	{
                this.mInsertClubScreenHtml = h;
	}
        getInsertClubScreenHtml()
	{
               return this.mInsertClubScreenHtml;
	}

        setInsertPersonScreenHtml(h)
	{
                this.mInsertPersonScreenHtml = h;
	}	
        getInsertPersonScreenHtml()
	{
                return this.mInsertPersonScreenHtml;
	}	

        setDeletePersonScreenHtml(h)
	{
                this.mDeletePersonScreenHtml = h;
	}
        getDeletePersonScreenHtml()
	{
                return this.mDeletePersonScreenHtml;
	}

        setInsertTeamScreenHtml(h)
	{
                this.mInsertTeamScreenHtml = h;
	}
        getInsertTeamScreenHtml()
	{
                return this.mInsertTeamScreenHtml;
	}

        setInsertPitchScreenHtml(h)
	{
                this.mInsertPitchScreenHtml = h;
	}
        getInsertPitchScreenHtml()
	{
                return this.mInsertPitchScreenHtml;
	}

        setInsertPracticeScreenHtml(h)
	{
                this.mInsertPracticeScreenHtml = h;
	}
        getInsertPracticeScreenHtml()
	{
                return this.mInsertPracticeScreenHtml;
	}

        setInsertGameScreenHtml(h)
	{
                this.mInsertGameScreenHtml = h;
	}
        getInsertGameScreenHtml()
	{
                return this.mInsertGameScreenHtml;
	}

        setInsertForgotPasswordScreenHtml(h)
	{
                this.mInsertForgotPasswordScreenHtml = h;
	}
        getInsertForgotPasswordScreenHtml()
	{
                return this.mInsertForgotPasswordScreenHtml;
	}

        setInsertEmailClubScreenHtml(h)
	{
                this.mInsertEmailClubScreenHtml = h;
	}
        getInsertEmailClubScreenHtml()
	{
                return this.mInsertEmailClubScreenHtml;
	}

        setInsertAcceptClubInInviteScreenHtml(h)
	{
                this.mInsertAcceptClubInInviteScreenHtml = h;
	}
        getInsertAcceptClubInviteScreenHtml()
	{
                return this.mInsertAcceptClubInInviteScreenHtml;
	}

        setUpdateForgotPasswordScreenHtml(h)
	{
                this.mUpdateForgotPasswordScreenHtml = h;
	}
        getUpdateForgotPasswordScreenHtml()
	{
                return this.mUpdateForgotPasswordScreenHtml;
	}

}
