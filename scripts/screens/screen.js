'use strict';

class Screen
{
	constructor(application)
	{
		this.mApplication = application;

		location.hash = null;

		//html ids
		this.mSpinnerId = null;
		this.mHtmlId = null;

		this.mCode = 0;
		this.mData = null;
		this.mJson = null;

		this.mHit = false;

		this.mMessageElement = null;
		this.mMenuItem = null;

                //states
		this.mStateLogs = false;
                this.mStateEnterLogs = true;
                this.mStateExecuteLogs = false;
                this.mStateExitLogs = false;

                this.mStateMachine = null;
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
		console.log('showspinner');
                document.getElementById(this.mHtmlId).style.visibility = "hidden";
                document.getElementById(this.mSpinnerId).style.visibility = "visible";
        }

        show()
        {
                document.getElementById(this.mHtmlId).style.display = "block";
                document.getElementById(this.mHtmlId).style.visibility = "visible";
                document.getElementById(this.mSpinnerId).style.visibility = "hidden";
        }

        hide()
        {
                document.getElementById(this.mHtmlId).style.display = "none";
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
		this.getMenuItem().className += " active";
		this.show();
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
	}

	exit()
	{
                this.hide();
                this.mCode = 0;
                this.mData = null;
                this.mJson = null;

            	this.getMenuItem().className = this.getMenuItem().className.replace(/\active\b/g, "");
                //element.className = element.className.replace(/\active\b/g, "");
                
		this.mApplication.setCurrentScreen(null);
	}
}
