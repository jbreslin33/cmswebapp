'use strict';

class Screen
{
	constructor(application)
	{
		this.mApplication = application;

		//html ids
		this.mSpinnerId = null;
		this.mHtmlId = null;

		this.mCode = 0;
		this.mData = null;
		this.mJson = null;

		this.mHit = false;

		this.mMessageSpan = null;

                //states
		this.mStateLogs = false;
                this.mStateEnterLogs = true;
                this.mStateExecuteLogs = false;
                this.mStateExitLogs = false;

                this.mStateMachine = null;
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
	/*	
		if (this.mJson.pitches)
		{
                	//load up pitches option
                	var select = document.getElementById("insert_team_screen_pitch_id");
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
		*/
	}
}
