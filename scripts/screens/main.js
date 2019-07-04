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

	/*
	        <div id="main_screen_html_id">
                <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
                        <div class="card-header">Header</div>
                        <div class="card-body">
                                <h5 class="card-title">Primary card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                </div>
                <div id="main_screen_spinner_id" class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                </div>
        </div>
 
		**/

        get()
        {
		if (this.mApplication.mJWT)
                {
                	var url = "/php/classes/select/select_events.php?jwt=" + APPLICATION.mJWT;
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

                if (this.mJson.practices)
		{
                        for (var i = 0; i < this.mJson.practices.length; i++)
			{
				events.push(this.mJson.practices[i]);
			}
		}

		if (this.mJson.games)
		{
                        for (var i = 0; i < this.mJson.games.length; i++)
			{
				events.push(this.mJson.games[i]);
			}
		}

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
// id | event_date | arrival_time | start_time | end_time | address | coordinates | pitch_id | field_name | team_id | opponent 
		/*
                
		<div id="main_screen_card_0" class="card text-white bg-primary mb-3" style="max-width: 18rem;">
                        <div class="card-header"></div>
                        <div class="card-body">
                                <h5 class="card-title"></h5>
                                <p class="card-text"></p>
                                <p class="card-text"></p>
                                <p class="card-text"></p>
                                <p class="card-text"></p>
                                <p class="card-text"></p>
                                <p class="card-text"></p>
                                <p class="card-text"></p>
                                <p class="card-text"></p>
                                <p class="card-text"></p>
                        </div>
                </div>

			*/
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


				divHeader.innerHTML = events[i].id;
				title.innerHTML = events[i].event_date;
				arrival_time.innerHTML = events[i].arrival_time;


				/*
				if (i == 0)
				{
                                	array[0].innerHTML = events[i].id;
                                	array[1].innerHTML = events[i].event_date;
					//arrayB[1].innerHTML = events[i].start_time;
					/*
                                	array[4].innerHTML = events[i].arrival_time;
                                	//array[5].innerHTML = events[i].start_time;
                                	//array[6].innerHTML = events[i].end_time;
                                	array[7].innerHTML = events[i].address;
                                	array[8].innerHTML = events[i].coordinates;
                                	array[9].innerHTML = events[i].pitch_id;
                                	array[10].innerHTML = events[i].field_name;
                                	array[11].innerHTML = events[i].team_id;
				}
				else //clone
				{
					var clone = main_screen_card_0.cloneNode(true);
					this.mCloneArray.push(clone);
					document.body.appendChild(clone);
					clone.id = 'main_screen_card_' + i;
					var cloneChildrenArray = clone.childNodes;
					cloneChildrenArray[1].innerHTML = events[i].id; 
					cloneChildrenArray[3].innerHTML = events[i].event_date; 
					cloneChildrenArray[4].innerHTML = events[i].arrival_time; 
					cloneChildrenArray[5].innerHTML = events[i].start_time; 
					cloneChildrenArray[6].innerHTML = events[i].end_time; 
					cloneChildrenArray[7].innerHTML = events[i].address; 
					cloneChildrenArray[8].innerHTML = events[i].coordinates; 
					cloneChildrenArray[9].innerHTML = events[i].pitch_id; 
					cloneChildrenArray[10].innerHTML = events[i].field_name; 
					cloneChildrenArray[11].innerHTML = events[i].team_id; 
					cloneChildrenArray[12].innerHTML = events[i].opponent; 
				}
			*/
                        }
                }
                
		//after processing data reset
	      	this.mCode = 0;
                this.mData = null;
                this.mJson = null;
	}
}
