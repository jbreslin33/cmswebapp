'use strict';

class Login
{
	constructor(application)
	{
		console.log('CON Login');
		this.mLoginScreen = null;
		this.mApplication = application;

		this.mStateLogs = false;
		this.mStateEnterLogs = true; 
		this.mStateExecuteLogs = false;
		this.mStateExitLogs = false;
		this.mLoggedIn = false;

		//credentials
		this.mUsername = null;
		this.mPassword = null;

                //states
                this.mStateMachine = new StateMachine(this);
                this.mGLOBAL_LOGIN = new GLOBAL_LOGIN();
                this.mINIT_LOGIN = new INIT_LOGIN();
                this.mCHECK_LOCALSTORAGE_LOGIN = new CHECK_LOCALSTORAGE_LOGIN();

                this.mStateMachine.setGlobalState(this.mGLOBAL_LOGIN);
                this.mStateMachine.changeState(this.mINIT_LOGIN);

	}

	update(timestamp)
	{
		this.mStateMachine.update();
	}

	processLogin(code)
	{
		if (code == 100)
		{
			console.log("logged in is true");
			this.mLoggedIn = true;	
		}
	}

	sendLogin()
	{
		//set username and password in case they are valid
		var url = null;
		if (APPLICATION.mLogin)
		{
			console.log('login exists');
		}
		else
		{
			console.log('login does not exists');
		}
		if (APPLICATION.mLogin.mLoginScreen)
		{
			APPLICATION.mLogin.mUsername = APPLICATION.mLogin.mLoginScreen.mDivInputEmail.value;
			APPLICATION.mLogin.mPassword = APPLICATION.mLogin.mLoginScreen.mDivInputPassword.value;

			url = "/php/classes/login/login.php?username=" + APPLICATION.mLogin.mLoginScreen.mDivInputEmail.value + "&password=" + APPLICATION.mLogin.mLoginScreen.mDivInputPassword.value; 
		}

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
		if (url)
		{
			console.log('url');
                	request.open('POST', url);
                	request.send();
		}
		else
		{
			console.log('no url');
		}
	}

	// TODO add saveSelectedCities function here
        // Save list of cities to localStorage.
        saveLoginCredentials()
        {
                //var data = JSON.stringify(this.mForecastData);
                //localStorage.mForecastData = data;
        }
}
