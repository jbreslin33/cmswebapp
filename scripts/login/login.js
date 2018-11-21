'use strict';

class Login extends Report
{
	constructor(application)
	{
		super(application);	
		console.log('Login Con');
              
		this.mLoggedIn = false;

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
/*	
		this.mDivA = document.createElement("A");
                this.mDivA.setAttribute("href", "#");
                this.mDivA.setAttribute("class", "forgot");
		this.mDivA.innerHTML = "forgot password";
		this.mDivLogin.appendChild(this.mDivA);
		*/
		
	}

	processLogin(code)
	{
		console.log("processLogin:" + code);
		if (code == 100)
		{
			console.log("logged in is true");
			this.mLoggedIn = true;	
		}
	}

	sendLogin()
	{
		console.log('username:' + APPLICATION.mLogin.mDivInputEmail.value); 
		var url = "/php/classes/login/login.php?username=" + APPLICATION.mLogin.mDivInputEmail.value + "&password=" + APPLICATION.mLogin.mDivInputPassword.value; 
		console.log('url:' + url);

                // Fetch the latest data.
                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
			console.log('onready');
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
				console.log('DONE');
                                if (request.status === 200)
                                {
					console.log('200');
                                        var data = JSON.parse(this.responseText);
                                        if (data)
                                        {
						APPLICATION.mLogin.processLogin(data);
						console.log('data:' + data);
                                        }
                                        else
                                        {
                                                console.log('got response with no data');
                                        }
                                }
                        }
                        else
                        {
                                // Return the initial weather forecast since no data is available.
                                if (APPLICATION)
                                {
                                        console.log('no data yet but APPLICATION exists');
                                }
				else
				{
                                        console.log('no data yet and APPLICATION does not exist');
                        	}
			}
					
                };

//		              xmlhttp.open("POST","../../src/php/application/core_application.php?code=117&username=" + username + "&password=" + password,true);

                //request.open('GET', url);
                request.open('POST', url);
                request.send();

	}
}
