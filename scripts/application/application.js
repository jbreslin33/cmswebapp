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

		//select person
		this.mPersonSelect = null;

		//html
               	this.mLoggedOutHeaderHtml = null; 
               	this.mLoggedInHeaderHtml = null; 
               	this.mInsertEmailScreenHtml = null; 
               	this.mInsertNativeLoginScreenHtml = null; 
               	this.mLoginScreenHtml = null; 
               	this.mChoosePersonScreenHtml = null; 
               	this.mUpcomingScreenHtml = null; 
               	this.mCalendarScreenHtml = null; 
               	this.mInsertClubScreenHtml = null; 
               	this.mInsertPersonScreenHtml = null; 
               	this.mDeletePersonScreenHtml = null; 
               	this.mInsertTeamScreenHtml = null; 
               	this.mInsertPitchScreenHtml = null; 
               	this.mInsertPracticeScreenHtml = null; 
               	this.mInsertGameScreenHtml = null; 
               	this.mInsertForgotPasswordScreenHtml = null; 
               	this.mInviteToClubScreenHtml = null; 
               	this.mInsertAcceptClubInInviteScreenHtml = null; 
               	this.mUpdateForgotPasswordScreenHtml = null; 

		//set html 
               	this.setLoggedOutHeaderHtml                ( document.getElementById("logged_out_header_html_id")                ); 
               	this.setLoggedInHeaderHtml                 ( document.getElementById("logged_in_header_html_id")                 ); 

               	this.setInsertEmailScreenHtml              ( document.getElementById("insert_email_screen_html_id")              ); 
               	this.setInsertNativeLoginScreenHtml        ( document.getElementById("insert_native_login_screen_html_id")       ); 
               	this.setLoginScreenHtml                    ( document.getElementById("login_screen_html_id")                     ); 
               	this.setChoosePersonScreenHtml             ( document.getElementById("choose_person_screen_html_id")             ); 
               	this.setUpcomingScreenHtml                 ( document.getElementById("upcoming_screen_html_id")                  );
               	this.setCalendarScreenHtml                 ( document.getElementById("calendar_screen_html_id")                  );
               	this.setInsertClubScreenHtml        	   ( document.getElementById("insert_club_screen_html_id")               ); 
               	this.setDeleteClubScreenHtml               ( document.getElementById("delete_club_screen_html_id")             );  
               	this.setInsertPersonScreenHtml             ( document.getElementById("insert_person_screen_html_id")             );  
               	this.setDeletePersonScreenHtml             ( document.getElementById("delete_person_screen_html_id")             );  
               	this.setInsertTeamScreenHtml               ( document.getElementById("insert_team_screen_html_id")               ); 
               	this.setInsertPitchScreenHtml              ( document.getElementById("insert_pitch_screen_html_id")              ); 
               	this.setInsertPracticeScreenHtml    	   ( document.getElementById("insert_practice_screen_html_id")           ); 
               	this.setInsertGameScreenHtml               ( document.getElementById("insert_game_screen_html_id")               ); 
               	this.setInsertForgotPasswordScreenHtml     ( document.getElementById("insert_forgot_password_screen_html_id")    );
               	this.setInviteToClubScreenHtml             ( document.getElementById("invite_to_club_screen_html_id")         ); 
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
		this.mUPCOMING_APPLICATION            = new UPCOMING_APPLICATION();
		this.mCALENDAR_APPLICATION            = new CALENDAR_APPLICATION();
		this.mINSERT_EMAIL_SCREEN_APPLICATION     = new INSERT_EMAIL_SCREEN_APPLICATION();
		this.mINSERT_NATIVE_LOGIN_SCREEN_APPLICATION     = new INSERT_NATIVE_LOGIN_SCREEN_APPLICATION();
		this.mLOGIN_APPLICATION           = new LOGIN_APPLICATION();
		this.mCHOOSE_PERSON_APPLICATION        = new CHOOSE_PERSON_APPLICATION();
		this.mLOGOUT_APPLICATION           = new LOGOUT_APPLICATION();
		this.mINSERT_CLUB_APPLICATION        = new INSERT_CLUB_APPLICATION();
		this.mDELETE_CLUB_APPLICATION        = new DELETE_CLUB_APPLICATION();
		this.mINSERT_PERSON_APPLICATION        = new INSERT_PERSON_APPLICATION();
		this.mDELETE_PERSON_APPLICATION        = new DELETE_PERSON_APPLICATION();
		this.mINSERT_TEAM_APPLICATION        = new INSERT_TEAM_APPLICATION();
		this.mINSERT_PITCH_APPLICATION        = new INSERT_PITCH_APPLICATION();
		this.mINSERT_PRACTICE_APPLICATION        = new INSERT_PRACTICE_APPLICATION();
		this.mINSERT_GAME_APPLICATION        = new INSERT_GAME_APPLICATION();
		this.mINSERT_FORGOT_PASSWORD_APPLICATION        = new INSERT_FORGOT_PASSWORD_APPLICATION();
		this.mINVITE_TO_CLUB_APPLICATION        = new INVITE_TO_CLUB_APPLICATION();
		this.mINSERT_ACCEPT_CLUB_INVITE_APPLICATION        = new INSERT_ACCEPT_CLUB_INVITE_APPLICATION();
		this.mUPDATE_FORGOT_PASSWORD_APPLICATION        = new UPDATE_FORGOT_PASSWORD_APPLICATION();

		this.mStateMachine.setGlobalState(this.mGLOBAL_APPLICATION);
		this.mStateMachine.changeState(this.mINIT_APPLICATION);

		//sidenav
		document.getElementById("sidenavopenbuttonid").onclick = this.openNav.bind(this);
		document.getElementById("sidenavclosebuttonid").onclick = this.closeNav.bind(this);

		//calendar modal
		document.getElementById("modal_close_id").onclick = this.closeModal.bind(this);
		
		this.setPersonSelect(document.getElementById("person_select_id"));
		this.getPersonSelect().onclick = this.personSelected.bind(this);

		document.getElementById("upcomingnavbuttonid").onclick = this.hit.bind(document.getElementById("upcomingnavbuttonid"));
		document.getElementById("calendarnavbuttonid").onclick = this.hit.bind(document.getElementById("calendarnavbuttonid"));

		document.getElementById("logoutnavbuttonid").onclick = this.hit.bind(document.getElementById("logoutnavbuttonid"));
		
		document.getElementById("insertpracticenavbuttonid").onclick = this.hit.bind(document.getElementById("insertpracticenavbuttonid"));
		document.getElementById("insertgamenavbuttonid").onclick = this.hit.bind(document.getElementById("insertgamenavbuttonid"));
		
		document.getElementById("insertteamnavbuttonid").onclick = this.hit.bind(document.getElementById("insertteamnavbuttonid"));
		document.getElementById("insertpitchnavbuttonid").onclick = this.hit.bind(document.getElementById("insertpitchnavbuttonid"));
		document.getElementById("invitetoclubnavbuttonid").onclick = this.hit.bind(document.getElementById("invitetoclubnavbuttonid"));
		
		document.getElementById("insertpersonnavbuttonid").onclick = this.hit.bind(document.getElementById("insertpersonnavbuttonid"));
		document.getElementById("deletepersonnavbuttonid").onclick = this.hit.bind(document.getElementById("deletepersonnavbuttonid"));
		
		document.getElementById("insertforgotnavbuttonid").onclick = this.hit.bind(document.getElementById("insertforgotnavbuttonid"));
		
		document.getElementById("insertclubnavbuttonid").onclick = this.hit.bind(document.getElementById("insertclubnavbuttonid"));
		document.getElementById("deleteclubnavbuttonid").onclick = this.hit.bind(document.getElementById("deleteclubnavbuttonid"));

		//aside
                this.mAsideMessageElement = null;
           	this.setAsideMessageElement(document.getElementById("aside_p_id"));

	}
	
	hit()
	{
		APPLICATION.closeNav();	
		if (this.id == 'upcomingnavbuttonid')
		{
			location.hash = '#upcoming_screen';
		}
		if (this.id == 'calendarnavbuttonid')
		{
			location.hash = '#calendar_screen';
		}
		if (this.id == 'logoutnavbuttonid')
		{
			location.hash = '#logout_screen';
		}
		if (this.id == 'insertpracticenavbuttonid')
		{
			location.hash = '#insert_practice_screen';
		}
		if (this.id == 'insertgamenavbuttonid')
		{
			location.hash = '#insert_game_screen';
		}
		if (this.id == 'insertteamnavbuttonid')
		{
			location.hash = '#insert_team_screen';
		}
		if (this.id == 'insertpitchnavbuttonid')
		{
			location.hash = '#insert_pitch_screen';
		}
		if (this.id == 'invitetoclubnavbuttonid')
		{
			location.hash = '#invite_to_club_screen';
		}
		if (this.id == 'insertpersonnavbuttonid')
		{
			location.hash = '#insert_person_screen';
		}
		if (this.id == 'deletepersonnavbuttonid')
		{
			location.hash = '#delete_person_screen';
		}
		if (this.id == 'insertclubnavbuttonid')
		{
			location.hash = '#insert_club_screen';
		}
		if (this.id == 'deleteclubnavbuttonid')
		{
			location.hash = '#delete_club_screen';
		}
	}

	//aside
        setAsideMessageElement(e)
        {
                this.mAsideMessageElement = e;
        }
        getAsideMessageElement()
        {
                return this.mAsideMessageElement;
        }

        setAsideMessage(message, color)
        {
                if (this.mAsideMessageElement)
                {
                        this.mAsideMessageElement.innerHTML = message;
                        this.mAsideMessageElement.style.color = color;

                        //make sure we can see it       
                        this.getAsideMessageElement().style.display = "block";
                        this.getAsideMessageElement().style.visibility = "visible";
                }
                else
                {
                        console.log('attempting to setNavMessage but there is no mNavMessageElement: ' + message);
                }
        }

	personSelected()
	{
		this.setAsideMessage('Welcome ' + this.getPersonSelect().options[this.getPersonSelect().selectedIndex].text, 'white');
	}

	setLoggedOutHeaderHtml(e)
	{
		this.setLoggedOutHeaderHtml = e;
	}
	
	setLoggedInHeaderHtml(e)
	{
		this.setLoggedInHeaderHtml = e;
	}

	getLoggedOutHeaderHtml()
	{
		return this.setLoggedOutHeaderHtml;
	}
	
	getLoggedInHeaderHtml()
	{
		return this.setLoggedInHeaderHtml;
	}

        showLoggedInHeaderHtml(b)
        {
		if (b)
		{
                	if (this.getLoggedInHeaderHtml())
                	{
                        	this.getLoggedInHeaderHtml().style.display = "block";
                        	this.getLoggedInHeaderHtml().style.visibility = "visible";
                	}
                	if (this.getLoggedOutHeaderHtml())
                	{
                        	this.getLoggedOutHeaderHtml().style.display = "none";
                	}
		}
		else
		{
                	if (this.getLoggedOutHeaderHtml())
                	{
                        	this.getLoggedOutHeaderHtml().style.display = "block";
                        	this.getLoggedOutHeaderHtml().style.visibility = "visible";
				console.log('show logged out');
                	}
                	if (this.getLoggedInHeaderHtml())
                	{
                        	this.getLoggedInHeaderHtml().style.display = "none";
				console.log('hide logged in');
                	}
		}
        }

	//side nav
       
	openNav()
        {
        	document.getElementById("side_nav_id").style.width = "250px";
        }

        closeNav()
        {
        	document.getElementById("side_nav_id").style.width = "0";
        }

	//calendar modal
        closeModal()
        {
        	document.getElementById("calendar_modal_id").style.display = "none";
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

	setMenuHtml(h)
	{
		this.mMenuHtml = h;
	}
	getMenuHtml()
	{
		if (this.mMenuHtml)
		{
			return this.mMenuHtml;
		}
		else
		{
			console.log("nothing");
		}
	}

	setSideNavOpenButtonHtml(h)
	{
		this.mSideNavOpenButtonHtml = h;
	}

	getSideNavOpenButtonHtml()
	{
		if (this.mSideNavOpenButtonHtml)
		{
			return this.mSideNavOpenButtonHtml;
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

        setUpcomingScreenHtml(h)
	{
                this.mUpcomingScreenHtml = h; 
	}
        getUpcomingScreenHtml()
	{
                return this.mUpcomingScreenHtml; 
	}
        
	setCalendarScreenHtml(h)
	{
                this.mCalendarScreenHtml = h; 
	}
        getCalendarScreenHtml()
	{
                return this.mCalendarScreenHtml; 
	}
        
        setInsertClubScreenHtml(h)
	{
                this.mInsertClubScreenHtml = h;
	}
        getInsertClubScreenHtml()
	{
               return this.mInsertClubScreenHtml;
	}
        
	setDeleteClubScreenHtml(h)
	{
                this.mDeleteClubScreenHtml = h;
	}
        getDeleteClubScreenHtml()
	{
               return this.mDeleteClubScreenHtml;
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

        setInviteToClubScreenHtml(h)
	{
                this.mInviteToClubScreenHtml = h;
	}
        getInviteToClubScreenHtml()
	{
                return this.mInviteToClubScreenHtml;
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

        setPersonSelect(select)
        {
                this.mPersonSelect = select;
        }

        getPersonSelect()
        {
                return this.mPersonSelect;
        }


}
