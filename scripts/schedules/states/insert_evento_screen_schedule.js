
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
		schedule.mInsertEvento = new InsertEvento(schedule);

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
							APPLICATION.mSchedule.mInsertEvento.mScreen.mPitch.appendChild(option);
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
                 * AFFAIR TYPE 
                ****/
                var eventoTypeUrl = "/php/classes/query/evento_type_query.php?username=" + APPLICATION.mLogin.mUsername;

                // Fetch the latest data.
                var eventoTypeRequest = new XMLHttpRequest();
                eventoTypeRequest.onreadystatechange = function()
                {
                        if (eventoTypeRequest.readyState === XMLHttpRequest.DONE)
                        {
                                if (eventoTypeRequest.status === 200)
                                {
                                        var data = JSON.parse(this.responseText);
                                        if (data)
                                        {
                                                for (var i = 0; i < data.length; i++)
                                                {
                                                        var option = document.createElement("option");
                                                        option.value = data[i][0];
                                                        option.text = data[i][1];
                                                        APPLICATION.mSchedule.mInsertEvento.mScreen.mEventoType.appendChild(option);
                                                }
                                        }
                                        else
                                        {
                                                console.log('no eventoType data');
                                        }
                                }
                        }
                };

                pitchRequest.open('GET', pitchUrl);
                eventoTypeRequest.open('GET', eventoTypeUrl);
                pitchRequest.send();
                eventoTypeRequest.send();
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
