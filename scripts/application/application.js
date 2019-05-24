'use strict';

class Application 
{
	constructor(clubInviteName,clubInviteToken,forgotPasswordToken) 
	{
		this.mStateLogs = false;
		this.mStateEnterLogs = true;
		this.mStateExecuteLogs = false;
		this.mStateExitLogs = false;

		//state changed
		window.onhashchange = this.locationHashChanged;

		//locatation.has
		this.mLocationHash = null;
	
		//forgot_password
		this.mClubInviteName = clubInviteName; 
		this.mClubInviteToken = clubInviteToken; 
		this.mForgotPasswordToken = forgotPasswordToken; 

		//localstorage
		this.mJWT = null;

		//utilities
		this.mUtility = new Utility();

		//calendar
		this.mCalendar = new Calendar();

		//login first
		this.mLogin = null;

		this.mMain = null;
		this.mAddClub = null;
		this.mInsertTeamScreen = null;

		this.mInsertNativeLoginScreen = null;
	
		//daily schedule
		this.mDailySchedule = null;

		//insert evento
		this.mInsertEvento = null;

		//insert forgot password
		this.mInsertForgotPasswordScreen = null;
		
		//update forgot password
		this.mUpdateForgotPasswordScreen = null;

		//main class
                this.mDivMain = document.createElement("DIV");
                this.mDivMain.setAttribute("class", "main");
                document.body.appendChild(this.mDivMain);

		//states
		this.mStateMachine = new StateMachine(this);
		this.mGLOBAL_APPLICATION          = new GLOBAL_APPLICATION();
		this.mINIT_APPLICATION            = new INIT_APPLICATION();
		this.mMAIN_APPLICATION            = new MAIN_APPLICATION();
		this.mINSERT_NATIVE_LOGIN_SCREEN_APPLICATION     = new INSERT_NATIVE_LOGIN_SCREEN_APPLICATION();
		this.mINSERT_NATIVE_LOGIN_CLUB_SCREEN_APPLICATION     = new INSERT_NATIVE_LOGIN_CLUB_SCREEN_APPLICATION();
		this.mLOGIN_APPLICATION           = new LOGIN_APPLICATION();
		this.mINSERT_CLUB_APPLICATION        = new INSERT_CLUB_APPLICATION();
		this.mINSERT_TEAM_APPLICATION        = new INSERT_TEAM_APPLICATION();
		this.mINSERT_PRACTICE_APPLICATION        = new INSERT_PRACTICE_APPLICATION();
		this.mINSERT_FORGOT_PASSWORD_APPLICATION        = new INSERT_FORGOT_PASSWORD_APPLICATION();
		this.mINSERT_INVITE_CLUB_MEMBER_APPLICATION        = new INSERT_INVITE_CLUB_MEMBER_APPLICATION();
		this.mINSERT_ACCEPT_CLUB_INVITE_APPLICATION        = new INSERT_ACCEPT_CLUB_INVITE_APPLICATION();
		this.mUPDATE_FORGOT_PASSWORD_APPLICATION        = new UPDATE_FORGOT_PASSWORD_APPLICATION();

		this.mStateMachine.setGlobalState(this.mGLOBAL_APPLICATION);
		this.mStateMachine.changeState(this.mINIT_APPLICATION);
	}
	
	update(timestamp)
	{
		this.mStateMachine.update();

		if (this.mInsertForgotPasswordScreen)
		{
			this.mInsertForgotPasswordScreen.update(timestamp);
		}
		if (this.mUpdateForgotPasswordScreen)
		{
			this.mUpdateForgotPasswordScreen.update(timestamp);
		}
		if (this.mInsertInviteClubMemberScreen)
		{
			this.mInsertInviteClubMemberScreen.update(timestamp);
		}
		if (this.mInsertTeamScreen)
		{
			this.mInsertTeamScreen.update(timestamp);
		}
		if (this.mInsertPracticeScreen)
		{
			this.mInsertPracticeScreen.update(timestamp);
		}
		if (this.mDailySchedule)
		{
			this.mDailySchedule.update(timestamp);
		}

		//run again
	        window.requestAnimationFrame(APPLICATION.update.bind(APPLICATION));
	}
}
