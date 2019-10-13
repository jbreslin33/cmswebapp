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

		this.mNavigationBar = null;

		//selects 
		this.mPersonId = 0;
		this.mClubId = 0;
		this.mTeamId = 0;

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

		document.getElementById("person_select_id").onclick = this.personSelected.bind(this);
		document.getElementById("club_select_id").onclick = this.clubSelected.bind(this);
		document.getElementById("team_select_id").onclick = this.teamSelected.bind(this);

	        this.setNavigationBar(document.getElementById("nav_bar_id"));

	}

	personSelected()
	{
		var select = document.getElementById("person_select_id");
		APPLICATION.setPersonId(select.value);
		if (APPLICATION.getPersonId() > 0)
		{
                	APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/selected_person.php?jwt=" + APPLICATION.getJWT() + this.getParameters());
                	APPLICATION.getCurrentScreen().ajax();
		}
	}

	clubSelected()
	{
		/*
		var select = document.getElementById("club_select_id");
		APPLICATION.setClubId(select.value);

                APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/selected_club.php?jwt=" + APPLICATION.getJWT() + this.getParameters());
                APPLICATION.getCurrentScreen().ajax();
		*/
	}

	teamSelected()
	{
		/*
		var select = document.getElementById("team_select_id");
		APPLICATION.setTeamId(select.value);

                APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/selected_team.php?jwt=" + APPLICATION.getJWT() + this.getParameters());
                APPLICATION.getCurrentScreen().ajax();
		*/
	}

	getParameters()
	{
		return '&person_id=' + APPLICATION.getPersonId() + '&club_id=' + APPLICATION.getClubId() + '&team_id=' + APPLICATION.getTeamId();
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

	setNavigationBar(navigationBar)
	{
		this.mNavigationBar = navigationBar;
	}
	
	getNavigationBar()
	{
		return this.mNavigationBar;
	}

	hit()
	{
	
	}

        get()
        {
		//if there are information selected then set keys
                var person_select = document.getElementById("person_select_id");
                if (person_select.length > 0)
                {
			//if (person_select.selectedIndex)
			if (person_select.options[person_select.selectedIndex])
			{
                       		APPLICATION.setPersonId(person_select.options[person_select.selectedIndex].value);
			}
                }

                var club_select = document.getElementById("club_select_id");
                if (club_select.length > 0)
                {
			if (club_select.selectedIndex)
			{
                        	APPLICATION.setClubId(club_select.options[club_select.selectedIndex].value);
			}
                }

                var team_select = document.getElementById("team_select_id");
                if (team_select.length > 0)
                {
			if (team_select.selectedIndex)
			{
                        	APPLICATION.setTeamId(team_select.options[team_select.selectedIndex].value);
			}
                }
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
	
	showNavigationBar()
	{
		if (this.getNavigationBar())
		{
                	this.getNavigationBar().style.display = "block";
                	this.getNavigationBar().style.visibility = "visible";
		}
	}

	hideNavigationBar()
	{
		if (this.getNavigationBar())
		{
                	this.getNavigationBar().style.display = "none";
		}
	}

	processData()
	{
		console.log('this.mData:' + this.mData);
                if (this.mData)
                {
                        this.mJson = JSON.parse(this.mData);
                        this.processJsonData();
		}
	}

	processJsonData()
	{
		if (this.mJson)
		{
			this.processJwts();
			this.processClubs();
			this.processTeams();
			this.processPersons();
			this.processSelects();
			this.processMessages();
			this.processCodes();
		}
		else
		{
		}
	}

	processJwts()
	{
                if (this.mJson.jwts)
                {
                        for (var i = 0; i < this.mJson.jwts.length; i++)
                        {
				this.mApplication.setJWT(this.mJson.jwts[i].jwt); //set jwt
				this.mApplication.setPersonId(this.mJson.jwts[i].person_id); //set jwt
				this.mApplication.setClubId(this.mJson.jwts[i].club_id); //set jwt
				this.mApplication.setTeamId(this.mJson.jwts[i].team_id); //set jwt
                        }
                }
	}
//later we need to set Club if possible from saved clubs in localstorage
	processClubs()
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
	}	

//later we need to set Team if possible from saved clubs in localstorage
	processTeams()
	{
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
	}

	processPersons()
	{
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
	}
	
	processSelects()
	{
		if (this.mJson.selects)
		{
			//if no local person storage set to first in list
                        if (APPLICATION.getPersonId() == 0)
			{
                        	APPLICATION.setPersonId(this.mJson.persons[0].id);
			}
			else
			{
               			var select = document.getElementById("person_select_id");
				select.value = APPLICATION.getPersonId(); 
			}
		}
	}
	
	processMessages()
	{
		if (this.mJson.messages)
		{
               		for (var i = 0; i < this.mJson.messages.length; i++)
			{
				this.setMessage(this.mJson.messages[i].message,'red');
			}
		}
	}	

	processCodes()
	{
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
