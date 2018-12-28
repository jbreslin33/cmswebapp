'use strict';

class Login
{
	constructor(application)
	{
		this.mLoginScreen = null;
		this.mApplication = application;

		//logs
		this.mStateLogs = false;
		this.mStateEnterLogs = true; 
		this.mStateExecuteLogs = false;
		this.mStateExitLogs = false;
		this.mLoggedIn = false;

		//credentials
		this.mUsername = null;
		this.mPassword = null;
		this.mUserID   = null;

                //states
                this.mStateMachine = new StateMachine(this);
                this.mGLOBAL_LOGIN = new GLOBAL_LOGIN();
                this.mINIT_LOGIN = new INIT_LOGIN();
                this.mCHECK_LOCALSTORAGE_LOGIN = new CHECK_LOCALSTORAGE_LOGIN();
                this.mSCREEN_LOGIN = new SCREEN_LOGIN();
                this.mLOGGED_IN_LOGIN = new LOGGED_IN_LOGIN();

                this.mStateMachine.setGlobalState(this.mGLOBAL_LOGIN);
                this.mStateMachine.changeState(this.mINIT_LOGIN);
	}

	update(timestamp)
	{
		this.mStateMachine.update();
	}

	sendLoginFromLocalStorage(username,password)
	{
                var url = "/php/classes/login/login.php?username=" + username + "&password=" + password;

                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
                                        var data = this.responseText;
                                        if (data)
                                        {
                                                APPLICATION.mLogin.processLogin(data);
                                        }
                                }
                        }
                };
                request.open('POST', url);
                request.send();
	}

	sendLogin()
	{
		APPLICATION.mLogin.mUsername = APPLICATION.mLogin.mLoginScreen.mDivInputEmail.value;
		APPLICATION.mLogin.mPassword = APPLICATION.mLogin.mLoginScreen.mDivInputPassword.value;

		var url = "/php/classes/login/login.php?username=" + APPLICATION.mLogin.mLoginScreen.mDivInputEmail.value + "&password=" + APPLICATION.mLogin.mLoginScreen.mDivInputPassword.value; 

                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
                                        var data = this.responseText;
                                        if (data)
                                        {
						var dataArray = data.split(",");
						APPLICATION.mLogin.processLogin(dataArray[0]);
						APPLICATION.mLogin.mUserID = dataArray[1];
						APPLICATION.mLogin.save(APPLICATION.mLogin.mUsername,APPLICATION.mLogin.mPassword,APPLICATION.mLogin.mUserID);
                                        }
                                }
                        }
                };
                request.open('POST', url);
                request.send();
	}

	processLogin(code)
	{
		if (code == 100)
		{
			this.mLoggedIn = true;	
		}
	}

        // Save list of cities to localStorage.
        save(username,password,user_id)
        {
		localStorage.setItem("username",username);
		localStorage.setItem("password",password);
		localStorage.setItem("user_id",user_id);
        }
}
