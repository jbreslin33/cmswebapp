'use strict';

class CalendarScreen extends Screen
{
        constructor(application)
        {
                super(application);
               	
		location.hash = 'calendar_screen';

		this.setHtml(document.getElementById("calendar_screen_html_id"));
                this.setMessageElement(document.getElementById("calendar_screen_message_id"));
                this.setSpinner(document.getElementById("calendar_screen_spinner_id"));
                this.setForm(document.getElementById("calendar_screen_form_id"));

		this.mCloneArray = new Array();


		//mViewedMonth
		this.mWeekCount = 0;
		this.mMonthView = 0;
		this.mWeekCount = 0;


		//month calendar_month_p_html_id
		var date = new Date();
		console.log('date:' + date);
  		var month = date.getMonth();
		console.log('month:' + month);

  		var year = date.getYear();
		year = parseInt(year + 1900);
		console.log('year:' + year);
		var numberOfDaysInMonth = new Date(year, month, 0).getDate();
		var dayOfWeekOfFirstDay = new Date(year, month, 1).getDay();
		var dayOfWeekOfLastDay = new Date(year, month, numberOfDaysInMonth).getDay();


		console.log('num:' + numberOfDaysInMonth);
		console.log('first:' + dayOfWeekOfFirstDay);
		console.log('last:' + dayOfWeekOfLastDay);

		var p = document.getElementById("calendar_month_p_html_id");
		var calendar = new Calendar();

		this.mWeekCount = calendar.weekCount(year,parseInt(month + 1)); 

		p.innerHTML = calendar.mMonthArray[month] + ' weeks: ' + this.mWeekCount;  

		//get first and last day of month
/*
		var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
		var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		console.log('firstDay:' + firstDay);
		console.log('lastDay:' + lastDay);
		
		var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
		var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		console.log('firstDay:' + firstDay);
		console.log('lastDay:' + lastDay);
*/

		//append to table
		var table = document.getElementById("calendar_table_id");

		for (i = 0; i < this.mWeekCount; i++)
		{
			console.log('i:' + i);
			var tr = table.insertRow(parseInt(i + 1));
			for (y = 0; y < 7; y++)
			{
				var td = tr.insertCell(y);
				td.innerHTML = "y";
			}
			
		}

		// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
		/*
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);

		// Add some text to the new cells:
		cell1.innerHTML = "NEW CELL1";
		cell2.innerHTML = "NEW CELL2";
		*/
		
		
		/*
                var div = document.createElement('div');
                div.setAttribute('class','card');
                document.getElementById("calendar_full_screen_html_id").appendChild(div);

                //add to array
                this.mCloneArray.push(div);

                var container = document.createElement('div');
                container.setAttribute('class','container');
                div.appendChild(container);

                var table = document.createElement('table');
                table.setAttribute('class','table');
                container.appendChild(table);
*/


/*
		for (i = 0; i < this.mWeekCount; i++)
		{
                	var tr = document.createElement('div');
			
		}
		*/


        
	}
	//so we will call get on enter into state 
	//so we should keep that and just call get again everytime you hit a button	

        get()
        {
		
                APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/calendar.php?jwt=" + APPLICATION.getJWT());
                APPLICATION.getCurrentScreen().ajax();
        }

        processJsonData()
	{
		super.processJsonData();

		var events = [];

		//make new array containing games and practices together
		if (this.mJson)
		{
                	if (this.mJson.practices)
			{
				//console.log('mJson.practices:' + JSON.stringify(this.mJson.practices));
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
			/*
                        for (var i = 0; i < events.length; i++)
                        {
				var div = document.createElement('div');	
				div.setAttribute('class','card');
				document.getElementById("calendar_full_screen_html_id").appendChild(div);

				//add to array
				this.mCloneArray.push(div);

				var container = document.createElement('div');
				container.setAttribute('class','container');
				div.appendChild(container);

				if (events[i].event_date)
				{
					console.log('event_date:' + events[i].event_date)
					var title = document.createElement('h5');
					container.appendChild(title);
					
					if (events[i].type == 'game')
					{
						title.innerHTML = 'Game: ' + this.mApplication.mCalendar.convertDate(events[i].event_date);
					}
					if (events[i].type == 'practice')
					{
						title.innerHTML = 'Practice: ' + this.mApplication.mCalendar.convertDate(events[i].event_date);
					}
				}
				
				var textArray = new Array();
				
				var p = document.createElement('p');
				container.appendChild(p);

				if (events[i].arrival_time)
				{
					var humanTime = this.mApplication.mTime.convertFromMilitaryToHuman(events[i].arrival_time);
					textArray.push('Arrive by: ' + humanTime);
				}
				
				if (events[i].start_time)
				{
					var humanTime = this.mApplication.mTime.convertFromMilitaryToHuman(events[i].start_time);
					textArray.push('Start time: ' + humanTime);
				}
				
				if (events[i].end_time)
				{
					var humanTime = this.mApplication.mTime.convertFromMilitaryToHuman(events[i].end_time);
					textArray.push('End time: ' + humanTime);
				}
				
				if (events[i].address)
				{
					textArray.push('Address: ' + events[i].address);
				}

				if (events[i].coordinates)
				{
					textArray.push('Coordinates: ' + events[i].coordinates);
				}
				
				if (events[i].pitch_name)
				{
					textArray.push('Pitch: ' + events[i].pitch_name);
				}
				
				if (events[i].field_name)
				{
					textArray.push('Field: ' + events[i].field_name);
				}
				
				if (events[i].club_name)
				{
					textArray.push('Club: ' + events[i].club_name);
				}
				
				if (events[i].team_name)
				{
					textArray.push('Team: ' + events[i].team_name);
				}
				
				if (events[i].opponent)
				{
					textArray.push('Opponent: ' + events[i].opponent);
				}

				for (var r = 0; r < textArray.length; r++)
				{
					p.innerHTML = p.innerHTML + ' ' + textArray[r] + '<br>';	
				}
                        }
			*/
                }
	}
}
