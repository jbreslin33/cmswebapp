'use strict';

class LoginScreen
{
	constructor(application,login)
	{
		this.mLogin = login;
		this.mApplication = application;

                //card
/*
                this.mDivCard = document.createElement("DIV");
                this.mDivCard.setAttribute("class", "card");
                this.mApplication.mDivMain.appendChild(this.mDivCard);
*/


              
		//login stuff
                this.mDivLogin = document.createElement("DIV");
                this.mDivLogin.setAttribute("class", "login");
		//this.mDivCard.appendChild(this.mDivLogin);
		this.mApplication.mDivMain.appendChild(this.mDivLogin);
                
		//add card to main
                this.mContainer = document.querySelector('.main');
                this.mContainer.appendChild(this.mDivLogin);
                
		this.mDivInputEmail = document.createElement("INPUT");
                this.mDivInputEmail.setAttribute("type", "text");
                this.mDivInputEmail.setAttribute("placeholder", "email");
                this.mDivInputEmail.setAttribute("id", "username");
                this.mDivInputEmail.setAttribute("name", "username");
		this.mDivLogin.appendChild(this.mDivInputEmail);
                this.mDivInputEmail.addEventListener("keydown",this.divInputEmailKeyDown);
		
		this.mDivInputPassword = document.createElement("INPUT");
                this.mDivInputPassword.setAttribute("type", "password");
                this.mDivInputPassword.setAttribute("placeholder", "password");
                this.mDivInputPassword.setAttribute("id", "password");
                this.mDivInputPassword.setAttribute("name", "password");
		this.mDivLogin.appendChild(this.mDivInputPassword);
		
		this.mButton = document.createElement("BUTTON");
		this.mButton.innerHTML = "LOGIN";
		
                this.mButton.setAttribute("class", "btn");
		this.mDivLogin.appendChild(this.mButton);
	
		//shadow
                this.mDivShadow = document.createElement("DIV");
                this.mDivShadow.setAttribute("class", "shadow");
		this.mDivLogin.appendChild(this.mDivShadow);


	}

	divInputEmailKeyDown(e)
	{
		console.log('in function divInputEmailKeyDown:' + e.key);
		if (e.key == 'Enter')	
		{
			console.log('in function divInputEmailKeyDown:' + e.key);
			APPLICATION.mLogin.mLoginScreen.mDivInputPassword.focus();
		}
	}

	show()
	{
		this.mDivLogin.style.display = "block";	
	}

	hide()
	{
		this.mDivLogin.style.display = "none";	
	}

        //***tab to next

        //username
        usernameTextBoxMicrosoftHit(e)
        {
                if (e.keyCode == 13)
                {
                        //APPLICATION.mGame.mPasswordTextBox.mMesh.focus();
			console.log('hit enter');
                }
        }

        usernameTextBoxFirefoxHit(e)
        {
                if (e.key == 'enter')
                {
                        //APPLICATION.mGame.mPasswordTextBox.mMesh.focus();
			console.log('hit enter');
                }
        }

}
