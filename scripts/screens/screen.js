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

	processClubTeamPersonData()
	{
		//load up clubs option
                var select = document.getElementById("club_select_id");
               	for (var i = 0; i < this.mJson.clubs.length; i++)
                {
                	var opt = document.createElement('option');
                        opt.value = this.mJson.clubs[i].id;
                        var name = this.mJson.clubs[i].name;
                        opt.innerHTML = name;
                        select.appendChild(opt);
                }

                //load up persons option
                var select = document.getElementById("person_select_id");
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
