'use strict';

class Screen
{
	constructor(application)
	{
		this.mApplication = application;

		location.hash = null;

		//html ids
		this.mSpinner = null;
		this.mHtml = null;

		this.mCode = 0;
		this.mData = null;
		this.mJson = null;


		this.mHit = false;

		this.mForm = null;
		this.mUrl = null;
		this.mRequest = null;

		this.mMessageElement = null;
		this.mMenuItem = null;

                //states
		this.mStateLogs = false;
                this.mStateEnterLogs = true;
                this.mStateExecuteLogs = false;
                this.mStateExitLogs = false;

                this.mStateMachine = null;
	}

	ajax()
	{
	        APPLICATION.getCurrentScreen().setRequest(new XMLHttpRequest());
                APPLICATION.getCurrentScreen().getRequest().onreadystatechange = function()
                {
                        if (APPLICATION.getCurrentScreen().getRequest().readyState === XMLHttpRequest.DONE)
                        {
                                if (APPLICATION.getCurrentScreen().getRequest().status === 200)
                                {
                                        APPLICATION.getCurrentScreen().mData = this.responseText;
                                }
                        }
                };

		APPLICATION.getCurrentScreen().checkValidity();

	}

	checkValidity()
	{
                if (APPLICATION.getCurrentScreen().getForm())
		{
                	if (APPLICATION.getCurrentScreen().getForm().checkValidity() == true)
                	{
				APPLICATION.getCurrentScreen().send();
                	}
		}
		else //send if no form, one case that uses this is insert_accept_club_invite_screen system.
		{
			APPLICATION.getCurrentScreen().send();
		}
	}

	send()
	{
        	APPLICATION.getCurrentScreen().getRequest().open('POST', APPLICATION.getCurrentScreen().getUrl());
                APPLICATION.getCurrentScreen().getRequest().send();
	}

	setForm(form)
	{
		this.mForm = form;
	}

	getForm()
	{
		return this.mForm;
	}

	setUrl(url)
	{
		this.mUrl = url;
	}

	getUrl()
	{
		return this.mUrl;
	}

	setRequest(request)
	{
		this.mRequest = request;
	}

	getRequest()
	{
		return this.mRequest;
	}
	
	setSpinner(spinner)
	{
		this.mSpinner = spinner;
	}

	getSpinner()
	{
		return this.mSpinner;
	}

	setHtml(html)
	{
		this.mHtml = html;
	}

	getHtml()
	{
		return this.mHtml;
	}

	setMessageElement(messageElement)
	{
		this.mMessageElement = messageElement;
	}
	getMessageElement()
	{
		return this.mMessageElement;
	}

	setMessage(message, color)
	{
		if (this.mMessageElement)
		{
                	this.mMessageElement.innerHTML = message;
			this.mMessageElement.style.color = color;

                	//make sure we can see it	
			this.getMessageElement().style.display = "block";
                	this.getMessageElement().style.visibility = "visible";
		}
		else
		{
			console.log('attempting to setMessage but there is no mMessageElement: ' + message);
		}
	}

	setMenuItem(menuItem)
	{
		this.mMenuItem = menuItem;
	}

	getMenuItem()
	{
		return this.mMenuItem;
	}

	hit()
	{
	
	}

	get()
	{

	}
       
	update(timestamp)
	{
		if (this.mStateMachine)
		{
			this.mStateMachine.update();
		}
                if (this.getRequest())
		{

                	if (this.getRequest().readyState === XMLHttpRequest.UNSENT)
			{
				this.hideSpinner();
			}
                	if (this.getRequest().readyState === XMLHttpRequest.OPENED)
			{
				this.showSpinner();
			}
                	if (this.getRequest().readyState === XMLHttpRequest.HEADERS_RECEIVED)
			{
				this.showSpinner();
			}
                	if (this.getRequest().readyState === XMLHttpRequest.LOADING)
			{
				this.showSpinner();
			}
                	if (this.getRequest().readyState === XMLHttpRequest.DONE)
			{
				this.hideSpinner();
			}
		}
	}

        showSpinner()
        {
		if (this.getSpinner())
		{
                	this.getSpinner().style.visibility = "visible";
		}
        }

        hideSpinner()
	{
		if (this.getSpinner())
		{
                	this.getSpinner().style.visibility = "hidden";
		}
	}

        show()
        {
		if (this.getHtml())
		{
                	this.getHtml().style.display = "block";
                	this.getHtml().style.visibility = "visible";
		}
		if (this.getSpinner())
		{
                	this.getSpinner().style.visibility = "hidden";
		}
        }

        hide()
        {
		if (this.getHtml())
		{
                	this.getHtml().style.display = "none";
		}
        }

	processData()
	{
                if (this.mData)
                {
                        this.mJson = JSON.parse(this.mData);
                        this.processJsonData();
		}
	}

	processJsonData()
	{
                if (this.mJson.jwts)
                {
                        for (var i = 0; i < this.mJson.jwts.length; i++)
                        {
				this.mApplication.setJWT(this.mJson.jwts[i].jwt); //set jwt
                        }
                }

		//load up clubs option
		if (this.mJson.clubs)
		{
                	var select = document.getElementById("club_select_id");
			select.length = 0;
               		for (var i = 0; i < this.mJson.clubs.length; i++)
                	{
                		var opt = document.createElement('option');
                        	opt.value = this.mJson.clubs[i].id;
                        	var name = this.mJson.clubs[i].name;
                        	opt.innerHTML = name;
                        	select.appendChild(opt);
                	}
		}
		
		//load up teams option
		if (this.mJson.teams)
		{
                	var select = document.getElementById("team_select_id");
			select.length = 0;
               		for (var i = 0; i < this.mJson.teams.length; i++)
                	{
                		var opt = document.createElement('option');
                        	opt.value = this.mJson.teams[i].id;
                        	var name = this.mJson.teams[i].name;
                        	opt.innerHTML = name;
                        	select.appendChild(opt);
                	}
		}

		if (this.mJson.persons)
		{
               		//load up persons option
               		var select = document.getElementById("person_select_id");
			select.length = 0;
               		for (var i = 0; i < this.mJson.persons.length; i++)
               		{
               			var opt = document.createElement('option');
               			opt.value = this.mJson.persons[i].id;
                       		var full_name = this.mJson.persons[i].first_name + ' ' + this.mJson.persons[i].middle_name + ' ' + this.mJson.persons[i].last_name;
                       		opt.innerHTML = full_name;
                       		select.appendChild(opt);
               		}
		}

		if (this.mJson.messages)
		{
               		for (var i = 0; i < this.mJson.messages.length; i++)
			{
				this.setMessage(this.mJson.messages[i].message,'red');
			}
		}
		
		if (this.mJson.codes)
		{
			var code = 0;
               		for (var i = 0; i < this.mJson.codes.length; i++)
			{
				code = this.mJson.codes[i].code;
			}
			//definite success so send to main
			if (code == '-100') 
			{
				if (this.mApplication.mStateMachine.currentState() == this.mApplication.mMAIN_APPLICATION)
				{
					//do nothing
				}
				else
				{
                                	this.mApplication.mStateMachine.changeState(this.mApplication.mMAIN_APPLICATION);
				}
			}
			else if (code == '-101')
			{
				//standard error code so stay in state and display message if their is one.
			}
		}
	}
	
	enter()
	{
		if (this.getMenuItem())
		{
			this.getMenuItem().className += " active";
		}
		this.show();
		this.get();
	}

	execute()
	{
                this.processData();
		this.resetDataVariables();
	}
	
	exit()
	{
                this.hide();

		this.resetDataVariables();

		if (this.getMenuItem())
		{
            		this.getMenuItem().className = this.getMenuItem().className.replace(/\active\b/g, "");
		}
                
		this.mApplication.setCurrentScreen(null);
	}

	resetDataVariables()
	{
		this.mCode = 0;
		this.mData = null;
		this.mJson = null;
	}
}
