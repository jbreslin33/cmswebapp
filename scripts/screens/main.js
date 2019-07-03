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
                //var date_div_c = document.getElementById("main_screen_date");
		//date_div_c.innerHTML = "yo";

                //document.getElementById("mainscreenbuttonid").onclick = this.hit.bind(this);
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

		//events.sort(
		/*
		events.sort(function (x, y) 
		{
    			var n = x.event_date - y.event_date;
    			if (n != 0) 
			{
        			return n;
    			}
    			return x.arrival_time - y.arrival_time;
		});

*/

		events.sort
		(
			function(a, b)
			{
				console.log('a.event_date:' + a.event_date);
				//return new Date(a.event_date) - new Date(b.event_date)
				var d = new Date(a.event_date) - new Date(b.event_date)
				if (d != 0)
				{
					return d;	
				}
				return new Date(a.arrival_time) - new Date(b.arrival_time); 
			}
		);
		for (i = 0; i < events.length; i++)
		{
			console.log('order:' + events[i].event_date + ' ' + events[i].arrival_time);
		}


                if (this.mJson.practices)
                {
			console.log('practices.length:' + this.mJson.practices.length);		
			/*
                        var main_screen_card_0 = document.getElementById("main_screen_card_0");
                        
			console.log('length of events:' + this.mJson.events.length);
			

			var main_screen_card_0_children_array = main_screen_card_0.childNodes;

                        for (var i = 0; i < this.mJson.events.length; i++)
                        {
				if (i == 0)
				{
                                	main_screen_card_0_children_array[1].innerHTML = this.mJson.events[i].event_date;
                                	main_screen_card_0_children_array[3].innerHTML = this.mJson.events[i].id;
				}
				else //clone
				{
					var clone = main_screen_card_0.cloneNode(true);
					document.body.appendChild(clone);
					clone.id = 'main_screen_card_' + i;
					var card_children_array = clone.childNodes;
					card_children_array[1].innerHTML = this.mJson.events[i].event_date; 
					card_children_array[3].innerHTML = this.mJson.events[i].id; 
				}
                        }
			*/
                }
                
		if (this.mJson.games)
                {
			console.log('games.length:' + this.mJson.games.length);		
		}
		
		
		//after processing data reset
	      	this.mCode = 0;
                this.mData = null;
                this.mJson = null;
	}
/*
	comp(a, b) 
	{
    		return new Date(a.events.event_date).getTime() - new Date(b.events.event_date).getTime();
	}
	*/
}
