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
                if (APPLICATION.getCurrentScreen().getForm().checkValidity() == true)
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

	setMessage(message, color)
	{
                this.mMessageElement.innerHTML = message;
		this.mMessageElement.style.color = color;
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
	}

        showSpinner()
        {
		if (this.getHtml())
		{
                	this.getHtml().style.visibility = "hidden";
		}

		if (this.getSpinner())
		{
                	this.getSpinner().style.visibility = "visible";
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
		if (this.getHtml)
		{
                	this.getHtml().style.display = "none";
		}
        }

	processData()
	{
                if (this.mData)
                {
                        var dataArray = this.mData.split(",");
                        this.mCode = dataArray[0];
                        if (this.mCode == -100)
                        {
				this.mApplication.setJWT(dataArray[1]); //set jwt
                                
                                //JSON
                                dataArray.shift(); //remove mCode
                                dataArray.shift(); //remove mJwt
                                dataArray.join();
                                this.mJson = JSON.parse(dataArray);

                                this.processJsonData();
                        }
                        if (this.mCode == -101)
			{
				this.setMessage(dataArray[1],'red');
			}
			//ok we processed data so now lets reset so we can make room for more precious data
		}
	}

	processJsonData()
	{

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
			if (this.mJson.clubs)
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
			else
			{
                   		//load up persons for delete option
                                var select = document.getElementById("delete_person_screen_select_id");
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

                if (this.mJson)
                {
                        if (this.mJson.persons)
                        {
                                this.mApplication.mStateMachine.changeState(this.mApplication.mMAIN_APPLICATION);
                        }
                }
		this.resetDataVariables();
	}
	
	exit()
	{
                this.hide();
                this.mCode = 0;
                this.mData = null;
                this.mJson = null;
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
