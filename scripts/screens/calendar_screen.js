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
		this.mCalendarTable = null;
                this.setCalendarTable(document.getElementById("calendar_table_id"));

		//lets delete any rows that linger
		//var x = document.getElementById("myTable").rows.length;
		var length = this.getCalendarTable().rows.length;
		console.log('TOTAL ROWS:' + length);
		for (var i = 1; i < length; i++)
		{
			console.log('DELETE ROW:' + i);
			this.getCalendarTable().deleteRow(1);		
		}

		//this.mTableRowArray = new Array();
		//this.mTableDataArray = new Array();

		//mViewedMonth
		this.mWeekCount = 0;
		this.mMonthView = 0;
		this.mWeekCount = 0;

		//month calendar_month_p_html_id
		var date = new Date();
  		var month = date.getMonth();

  		var year = date.getYear();
		year = parseInt(year + 1900);
		var numberOfDaysInMonth = new Date(year, month, 0).getDate();
		var dayOfWeekOfFirstDay = new Date(year, month, 1).getDay();
		var dayOfWeekOfLastDay = new Date(year, month, numberOfDaysInMonth).getDay();

		var p = document.getElementById("calendar_month_p_html_id");
		var calendar = new Calendar();

		this.mWeekCount = calendar.weekCount(year,parseInt(month + 1)); 

		p.innerHTML = calendar.mMonthArray[month] + ' weeks: ' + this.mWeekCount;  

		var startDay = 0;
		//check if its a sunday if so then we dont need to count back
		if (dayOfWeekOfFirstDay == 0) //its a sunday so make it 1
		{
			startDay = 1; 	
		}
		if (dayOfWeekOfFirstDay == 1) //its a monday so make it 0 to go back to last month barely
		{
			startDay = 0; 	
		}
		if (dayOfWeekOfFirstDay > 1) //its another day do calc
		{
			startDay = parseInt( (dayOfWeekOfFirstDay - 1) * -1 ) ; 	
		}
		var firstDAY = new Date(year, month, startDay);


		//append to table
		var table = document.getElementById("calendar_table_id");

		for (var i = 0; i < this.mWeekCount; i++)
		{
			var tr = table.insertRow(parseInt(i + 1));
			for (var y = 0; y < 7; y++)
			{
				var td = tr.insertCell(y);
				var date = new Date(year, month, startDay);
				
				var s = parseInt(date.getYear() + 1900) + '-' + parseInt(date.getMonth() + 1) + '-' + date.getDate();  
				var txt = calendar.inflateDateString(s);
				td.innerHTML = txt;
                		
				td.setAttribute('id',txt);
			
				//increment startDay
				startDay++;
			}
		}
                
		var presidents = document.getElementById("2020-01-20");
		presidents.innerHTML = "Presidents Day";
	}
	//so we will call get on enter into state 
	//so we should keep that and just call get again everytime you hit a button	

        get()
        {
                APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/calendar.php?jwt=" + APPLICATION.getJWT());
                APPLICATION.getCurrentScreen().ajax();
        }

	setCalendarTable(t)
	{
		this.mCalendarTable = t;
	}

	getCalendarTable()
	{
		return this.mCalendarTable;
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
			var td = null
                        for (var i = 0; i < events.length; i++)
                        {
				
				if (events[i].event_date)
				{
					var event_date = events[i].event_date;
					td = document.getElementById(event_date);
					//this.mCloneArray.push(td);

					console.log('event_date:' + events[i].event_date)
					var title = document.createElement('h5');
					td.appendChild(title);
					
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
				td.appendChild(p);

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
                }
	}
}
