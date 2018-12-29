
'use strict';

class INSERT_AFFAIR_SCREEN_SCHEDULE extends State
{
	constructor() 
	{
		super();
	}
        
	enter(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateEnterLogs)
		{
			console.log("INSERT_AFFAIR_SCREEN_SCHEDULE: ENTER");        
		}
		schedule.mInsertAffair = new InsertAffair(schedule);

		/*******
		 *
		 * PITCH
		 */
		var pitchUrl = "/php/classes/query/pitch_query.php?username=" + APPLICATION.mLogin.mUsername;

                // Fetch the latest data.
                var pitchRequest= new XMLHttpRequest();
                pitchRequest.onreadystatechange = function()
                {
                        if (pitchRequest.readyState === XMLHttpRequest.DONE)
                        {
                                if (pitchRequest.status === 200)
                                {
                                        var data = JSON.parse(this.responseText);
                                        if (data)
                                        {
                                                for (var i = 0; i < data.length; i++)
                                                {
							var option = document.createElement("option");
							option.value = data[i][0];
							option.text = data[i][1];
							APPLICATION.mSchedule.mInsertAffair.mScreen.mPitch.appendChild(option);
                                                }
                                        }
                                        else
                                        {
                                                console.log('no pitch data');
                                        }
                                }
                        }
                };

		/*******
                 *
                 * TEAM 
                 ****/
                var teamUrl = "/php/classes/query/team_query.php?username=" + APPLICATION.mLogin.mUsername;

                // Fetch the latest data.
                var teamRequest = new XMLHttpRequest();
                teamRequest.onreadystatechange = function()
                {
                        if (teamRequest.readyState === XMLHttpRequest.DONE)
                        {
                                if (teamRequest.status === 200)
                                {
                                        var data = JSON.parse(this.responseText);
                                        if (data)
                                        {
                                                for (var i = 0; i < data.length; i++)
                                                {
                                                        var option = document.createElement("option");
                                                        option.value = data[i][0];
                                                        option.text = data[i][1];
                                                        APPLICATION.mSchedule.mInsertAffair.mScreen.mTeam.appendChild(option);
                                                }
                                        }
                                        else
                                        {
                                                console.log('no team data');
                                        }
                                }
                        }
                };

                /*******
                 *
                 * AFFAIR TYPE 
                ****/
                var affairTypeUrl = "/php/classes/query/affair_type_query.php?username=" + APPLICATION.mLogin.mUsername;

                // Fetch the latest data.
                var affairTypeRequest = new XMLHttpRequest();
                affairTypeRequest.onreadystatechange = function()
                {
                        if (affairTypeRequest.readyState === XMLHttpRequest.DONE)
                        {
                                if (affairTypeRequest.status === 200)
                                {
                                        var data = JSON.parse(this.responseText);
                                        if (data)
                                        {
                                                for (var i = 0; i < data.length; i++)
                                                {
                                                        var option = document.createElement("option");
                                                        option.value = data[i][0];
                                                        option.text = data[i][1];
                                                        APPLICATION.mSchedule.mInsertAffair.mScreen.mAffairType.appendChild(option);
                                                }
                                        }
                                        else
                                        {
                                                console.log('no affairType data');
                                        }
                                }
                        }
                };

                pitchRequest.open('GET', pitchUrl);
                teamRequest.open('GET', teamUrl);
                teamRequest.open('GET', affairTypeUrl);
                pitchRequest.send();
                teamRequest.send();
                affairTypeRequest.send();
	}

        execute(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateExecuteLogs)
		{
			console.log("INSERT_AFFAIR_SCREEN_SCHEDULE: EXECUTE");        
		}
	}

        exit(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateExitLogs)
		{
			console.log("INSERT_AFFAIR_SCREEN_SCHEDULE: EXIT");        
		}
	}
}
