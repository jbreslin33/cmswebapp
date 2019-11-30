'use strict';

class Application 
{
	constructor(joinEmail,clubInviteName,clubInviteToken,forgotPasswordToken) 
	{
		this.mStateLogs = false;
		this.mStateEnterLogs = true;
		this.mStateExecuteLogs = false;
		this.mStateExitLogs = false;

		//state changed
		window.onhashchange = this.locationHashChanged;

		//forgot_password
		this.mJoinEmail = joinEmail; 
		console.log('mJoinEmail:' + this.mJoinEmail);
		this.mClubInviteName = clubInviteName; 
		this.mClubInviteToken = clubInviteToken; 
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
		this.mINSERT_NATIVE_LOGIN_EMAIL_SCREEN_APPLICATION     = new INSERT_NATIVE_LOGIN_EMAIL_SCREEN_APPLICATION();
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
		this.mINSERT_INVITE_CLUB_EMAIL_APPLICATION        = new INSERT_INVITE_CLUB_EMAIL_APPLICATION();
		this.mINSERT_ACCEPT_CLUB_INVITE_APPLICATION        = new INSERT_ACCEPT_CLUB_INVITE_APPLICATION();
		this.mUPDATE_FORGOT_PASSWORD_APPLICATION        = new UPDATE_FORGOT_PASSWORD_APPLICATION();

		this.mStateMachine.setGlobalState(this.mGLOBAL_APPLICATION);
		this.mStateMachine.changeState(this.mINIT_APPLICATION);
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
	
	//----------------PERSONS

	setPersonIdInLocalStorage(id)
	{
		localStorage.setItem('mPersonId', id);
	}

	//used to set selects onload from localstorage
	getPersonIdFromLocalStorage()
	{
		return localStorage.getItem("mPersonId");
	}
	
	//----------------CLUBS
	
	setClubIdInLocalStorage(id)
	{
		localStorage.setItem('mClubId', id);
	}
	
	//used to set selects onload from localstorage
	getClubIdFromLocalStorage()
	{
		return localStorage.getItem("mClubId");
	}
	

	//----------------TEAMS
	setTeamIdInLocalStorage(id)
	{
		localStorage.setItem('mTeamId', id);
	}

	getTeamIdFromLocalStorage()
	{
		return localStorage.getItem("mTeamId");
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
