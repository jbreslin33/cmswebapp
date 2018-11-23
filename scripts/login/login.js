'use strict';

class Login extends Report
{
	constructor(application)
	{
		super(application);	
              
		this.mStateLogs = false;
		this.mLoggedIn = false;

		//credentials
		this.mUsername = null;
		this.mPassword = null;

		//add card to main
		this.mContainer = document.querySelector('.main');
                this.mContainer.appendChild(this.mDivCard);

		//login stuff
                this.mDivLogin = document.createElement("DIV");
                this.mDivLogin.setAttribute("class", "login");
		this.mDivCard.appendChild(this.mDivLogin);
                
		this.mDivInputEmail = document.createElement("INPUT");
                this.mDivInputEmail.setAttribute("type", "text");
                this.mDivInputEmail.setAttribute("placeholder", "email");
                this.mDivInputEmail.setAttribute("id", "username");
                this.mDivInputEmail.setAttribute("name", "username");
		this.mDivLogin.appendChild(this.mDivInputEmail);
		
		this.mDivInputPassword = document.createElement("INPUT");
                this.mDivInputPassword.setAttribute("type", "password");
                this.mDivInputPassword.setAttribute("placeholder", "password");
                this.mDivInputPassword.setAttribute("id", "password");
                this.mDivInputPassword.setAttribute("name", "password");
		this.mDivLogin.appendChild(this.mDivInputPassword);
		
		this.mButton = document.createElement("BUTTON");
		this.mButton.addEventListener("click",this.sendLogin);
		this.mDivLogin.appendChild(this.mButton);

                //states
                this.mStateMachine = new StateMachine(this);
                this.mGLOBAL_LOGIN = new GLOBAL_LOGIN();
                this.mINIT_LOGIN = new INIT_LOGIN();

                this.mStateMachine.setGlobalState(this.mGLOBAL_LOGIN);
                this.mStateMachine.changeState(this.mINIT_LOGIN);

		/*	
		this.mDivA = document.createElement("A");
                this.mDivA.setAttribute("href", "#");
                this.mDivA.setAttribute("class", "forgot");
		this.mDivA.innerHTML = "forgot password";
		this.mDivLogin.appendChild(this.mDivA);
		*/
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
		APPLICATION.mLogin.mUsername = APPLICATION.mLogin.mDivInputEmail.value;
		APPLICATION.mLogin.mPassword = APPLICATION.mLogin.mDivInputPassword.value;

		var url = "/php/classes/login/login.php?username=" + APPLICATION.mLogin.mDivInputEmail.value + "&password=" + APPLICATION.mLogin.mDivInputPassword.value; 

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

	// TODO add saveSelectedCities function here
        // Save list of cities to localStorage.
        saveLoginCredentials()
        {
                //var data = JSON.stringify(this.mForecastData);
                //localStorage.mForecastData = data;
        }
}
