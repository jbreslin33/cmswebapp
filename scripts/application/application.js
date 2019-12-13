'use strict';

class Application 
{
	constructor(insertNativeLoginToken,joinEmail,forgotPasswordToken,forgotPasswordEmail) 
	{
		this.mStateLogs = false;
		this.mStateEnterLogs = true;
		this.mStateExecuteLogs = false;
		this.mStateExitLogs = false;

		//hash
		
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

	hit ()
	{
		if ( $(".collapse").is( ":visible" ) )
		{
  			$(".collapse").collapse('hide');
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

}
