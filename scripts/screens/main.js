'use strict';

class Main extends Screen
{
        constructor(application)
        {
                super(application);

                location.hash = "main_screen";

                //html ids 
                this.mSpinnerId = "main_screen_spinner_id";
                this.mHtmlId = "main_screen_html_id";
		this.mCloneArray = new Array();
        }

        get()
        {
		console.log('getting');
		if (APPLICATION.getJWT())
                {
			console.log('in if getting');
                	var url = "/php/classes/select/select_events.php?jwt=" + APPLICATION.getJWT();
                        var request = new XMLHttpRequest();
                        request.onreadystatechange = function()
                        {
                        	if (request.readyState === XMLHttpRequest.DONE)
                                {
                                	if (request.status === 200)
                                        {
                                        	console.log('response:' + this.responseText);
                                                APPLICATION.mMain.mData = this.responseText;
                                        }
                                }
                        };
                        request.open('POST', url);
                        request.send();
                }
        }

        processJsonData()
	{
		super.processJsonData();

		var events = [];

		//make new array containing games and practices together
                if (this.mJson.practices)
		{
                        for (var i = 0; i < this.mJson.practices.length; i++)
			{
				events.push(this.mJson.practices[i]);
				this.mJson.practices[i].type = 'practice';
			}
		}

		if (this.mJson.games)
		{
                        for (var i = 0; i < this.mJson.games.length; i++)
			{
				events.push(this.mJson.games[i]);
				this.mJson.games[i].type = 'game';
			}
		}

		//sort events by date and arrival time
		events.sort
		(
			function(a, b)
			{
				var d = new Date(a.event_date) - new Date(b.event_date)
				if (d != 0)
				{
					return d;	
				}
				return new Date('1970/01/01 ' + a.arrival_time) - new Date('1970/01/01 ' + b.arrival_time); 
			}
		);
               
		//print to screen
		if (events)
                {

                        for (var i = 0; i < events.length; i++)
                        {
				var div = document.createElement('div');	
				div.setAttribute('class','card text-white bg-primary mb-3');
				div.style = "max-width: 18rem;";
				document.getElementById("main_screen_html_id").appendChild(div);

				//add to array
				this.mCloneArray.push(div);

				var divHeader = document.createElement('div');
				divHeader.setAttribute('class','card-header');
				div.appendChild(divHeader);

				var divBody = document.createElement('div');
				divBody.setAttribute('class','card-body');
				div.appendChild(divBody);

				var title = document.createElement('h5');
				title.setAttribute('class','card-title');
				divBody.appendChild(title);

				var arrival_time = document.createElement('p');
				arrival_time.setAttribute('class','card-text');
				divBody.appendChild(arrival_time);
				
				var start_time = document.createElement('p');
				start_time.setAttribute('class','card-text');
				divBody.appendChild(start_time);
				
				var end_time = document.createElement('p');
				end_time.setAttribute('class','card-text');
				divBody.appendChild(end_time);
				
				var address = document.createElement('p');
				address.setAttribute('class','card-text');
				divBody.appendChild(address);
				
				var coordinates = document.createElement('p');
				coordinates.setAttribute('class','card-text');
				divBody.appendChild(coordinates);
				
				var pitch_id = document.createElement('p');
				pitch_id.setAttribute('class','card-text');
				divBody.appendChild(pitch_id);
				
				var field_name = document.createElement('p');
				field_name.setAttribute('class','card-text');
				divBody.appendChild(field_name);
				
				var team_id = document.createElement('p');
				team_id.setAttribute('class','card-text');
				divBody.appendChild(team_id);

				if (events[i].type == 'game')
				{
					divHeader.innerHTML = "GAME";
				}
				if (events[i].type == 'practice')
				{
					divHeader.innerHTML = "PRACTICE";
				}

				title.innerHTML = events[i].event_date;
				arrival_time.innerHTML = events[i].arrival_time;
				start_time.innerHTML = events[i].start_time;
				end_time.innerHTML = events[i].end_time;
				address.innerHTML = events[i].address;
				address.innerHTML = events[i].address;
				coordinates.innerHTML = events[i].coordinates;
				pitch_id.innerHTML = events[i].pitch_name;
				field_name.innerHTML = events[i].field_name;
				team_id.innerHTML = events[i].team_name;
                        }
                }
                
		//after processing data reset
	      	this.mCode = 0;
                this.mData = null;
                this.mJson = null;
	}
}
