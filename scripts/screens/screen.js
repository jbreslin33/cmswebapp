'use strict';

class Screen
{
	constructor(application)
	{
		this.mApplication = application;

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
		this.mPitchId = 0;

		this.mPersonSelect = null;
		this.mClubSelect = null;
		this.mTeamSelect = null;
		this.mPitchSelect = null;

		this.mSentAjax = false;

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

		//game canvas context
	        this.mCanvas = document.getElementById("rondo_screen_canvas_id");
                this.mContext = this.mCanvas.getContext("2d");

		document.addEventListener('keydown', function(e)
                {
                        APPLICATION.getCurrentScreen().keyDownHandler(e);
                });
		document.addEventListener('keyup', function(e)
                {
                        APPLICATION.getCurrentScreen().keyUpHandler(e);
                });
	}

        clearScreen()
        {
                this.mContext.clearRect(0, 0, this.mCanvas.width, this.mCanvas.height);
        }

	keyDownHandler(event)
	{
    		if(event.keyCode == 39) 
		{
        		APPLICATION.mRightPressed = true;
    		}
		else if(event.keyCode == 37) 
		{
        		APPLICATION.mLeftPressed = true;
    		}
    		if(event.keyCode == 40) 
		{
    			APPLICATION.mDownPressed = true;
    		}
    		else if(event.keyCode == 38) 
		{
    			APPLICATION.mUpPressed = true;
    		}
	}
	
	keyUpHandler(event)
	{
                if(event.keyCode == 39) 
                {
                        APPLICATION.mRightPressed = false;
                }
                else if(event.keyCode == 37) 
                {
                        APPLICATION.mLeftPressed = false;
                }
                if(event.keyCode == 40) 
                {
                        APPLICATION.mDownPressed = false; 
                }
                else if(event.keyCode == 38) 
                {
                        APPLICATION.mUpPressed = false;
                }
	}

	ajax()
	{
		if (this.mSentAjax)
		{
			console.log('ajax request already sent do not send again.');
		}
		else
		{
			this.mSentAjax = true;
	        	APPLICATION.getCurrentScreen().setRequest(new XMLHttpRequest());
                	APPLICATION.getCurrentScreen().getRequest().onreadystatechange = function()
                	{
                       		if (APPLICATION.getCurrentScreen().getRequest().readyState === XMLHttpRequest.DONE)
                       	 	{
                                	if (APPLICATION.getCurrentScreen().getRequest().status === 200)
                                	{
                                        	APPLICATION.getCurrentScreen().mData = this.responseText;
						APPLICATION.getCurrentScreen().mSentAjax = false;
                                	}
                        	}
                	};
			APPLICATION.getCurrentScreen().checkValidity();
		}
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

	//form
	setForm(form)
	{
		this.mForm = form;
	}

	getForm()
	{
		return this.mForm;
	}

	//url
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
                        //console.log('attempting to setMessage but there is no mMessageElement: ' + message);
                }
        }

	setNavigationBar(navigationBar)
	{
		this.mNavigationBar = navigationBar;
	}
	
	getNavigationBar()
	{
		return this.mNavigationBar;
	}
	
	setPersonSelect(select)
	{
		this.mPersonSelect = select;
	}

	getPersonSelect()
	{
		return this.mPersonSelect;
	}

	setClubSelect(select)
	{
		this.mClubSelect = select;
	}

	getClubSelect()
	{
		return this.mClubSelect;
	}
	
	setTeamSelect(select)
	{
		this.mTeamSelect = select;
	}

	getTeamSelect()
	{
		return this.mTeamSelect;
	}

        setPitchSelect(select)
        {
                this.mPitchSelect = select;
        }

        getPitchSelect()
        {
                return this.mPitchSelect;
        }


	hit()
	{
	
	}

	//used to get from selects
        getPersonId()
        {
                var select = this.mApplication.getPersonSelect();
                if (select.value == "")
                {
                        return 0;
                }
                else
                {
                        return select.value;
                }
        }

	getStandardParameters()
	{
		return "jwt=" + APPLICATION.getJWT() + "&person_id=" + this.getPersonId();
	}

	getClubId()
	{
                var select = this.getClubSelect();
                if (select.value == "")
                {
                        return 0;
                }
                else
                {
                        return select.value;
                }
	}
	
	getTeamId()
	{
                var select = this.getTeamSelect();
                if (select.value == "")
                {
                        return 0;
                }
                else
                {
                        return select.value;
                }
	}

        getPitchId()
        {
                var select = this.getPitchSelect();
                if (select.value == "")
                {
                        return 0;
                }
                else
                {
                        return select.value;
                }
        }



        get()
        {
	}
       
	update()
	{
		//clear canvas context...
		APPLICATION.getCurrentScreen().clearScreen();

		//states
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

	showForm()
	{
                if (this.getForm())
                {
                        this.getForm().style.display = "block";
                        this.getForm().style.visibility = "visible";
                }
	}

	hideForm()
	{
		if (this.getForm())
		{
                	this.getForm().style.display = "none";
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
			this.processPitches();
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
                        }
                }
	}

	//later we need to set Club if possible from saved clubs in localstorage
	processClubs()
	{
		//load up clubs option
		if (this.mJson.clubs)
		{
			var select = this.getClubSelect();
			if (select)
			{
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
	}
	
	processTeams()
	{
		//load up clubs option
		if (this.mJson.teams)
		{
			var select = this.getTeamSelect();
			if (select)
			{
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
	}

	processPersons()
	{
		if (this.mJson.persons)
		{
           		//lets grab old one first
                        var v = this.mApplication.getPersonSelect().value;

               		//load up persons option
               		var select = this.mApplication.getPersonSelect();
			select.length = 0;
               		for (var i = 0; i < this.mJson.persons.length; i++)
               		{
               			var opt = document.createElement('option');
               			opt.value = this.mJson.persons[i].id;
                       		var full_name = this.mJson.persons[i].first_name + ' ' + this.mJson.persons[i].middle_name + ' ' + this.mJson.persons[i].last_name;
                        	opt.innerHTML = full_name;
                       		select.appendChild(opt);
               		}

	           	//lets grab old one first
                        this.mApplication.getPersonSelect().value = v;

		}
	}
	processPitches()
	{
        	if (this.mJson.pitches)
                {
                	//load up pitches option
                        var select = this.getPitchSelect();
                        select.length = 0;
                        for (var i = 0; i < this.mJson.pitches.length; i++)
                        {
                       		var opt = document.createElement('option');
                                opt.value = this.mJson.pitches[i].id;
                                var name = this.mJson.pitches[i].name;
                                opt.innerHTML = name;
                                select.appendChild(opt);
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
			this.mCode = 0;
               		for (var i = 0; i < this.mJson.codes.length; i++)
			{
				this.mCode = this.mJson.codes[i].code;
			}
			//definite success so send to upcoming
			if (this.mCode == '-100') 
			{
				if (this.mApplication.mUserSelectedPerson)
				{
					if (this.mApplication.mStateMachine.currentState() != this.mApplication.mUPCOMING_APPLICATION)
					{
						if (this.mApplication.mStateMachine.currentState() != this.mApplication.mCALENDAR_APPLICATION)
						{
                                			this.mApplication.mStateMachine.changeState(this.mApplication.mUPCOMING_APPLICATION);
						}
					}
				}
				else
				{
					if (this.mApplication.mStateMachine.currentState() != this.mApplication.mCHOOSE_PERSON_APPLICATION)
					{
                                		this.mApplication.mStateMachine.changeState(this.mApplication.mCHOOSE_PERSON_APPLICATION);
					}
				}
			}
		}
	}
	
	enter()
	{
		this.setMessage('','red');
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
		this.mApplication.setCurrentScreen(null);
	}

	resetDataVariables()
	{
		this.mCode = 0;
		this.mData = null;
		this.mJson = null;
	}

	//Authentication

	googleLogin()
	{
                APPLICATION.mGoogleLoginHit = true;
                this.setUrl("/php/classes/screens/google_login.php?email=" + this.mApplication.mEmail + "&google_id=" + this.mApplication.mGoogleID + "&id_token=" + this.mApplication.mIDToken + "&first_name=" + this.mApplication.mFirstName + "&last_name=" + this.mApplication.mLastName);

                this.ajax();
        }
}
