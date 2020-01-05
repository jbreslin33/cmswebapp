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

		//make a helper calendar instance
		this.mCalendar = new Calendar();
	
		this.deleteCalendarRows()

		this.mModalArray  = new Array();
		this.mEventsArray = new Array();
		this.mCalendarEventButtonArray = new Array();

		//month calendar_month_p_html_id
		var date = new Date();
  		var month = date.getMonth();
  		var year = date.getYear();
		year = parseInt(year + 1900);

		this.setDisplayMonth(this.mCalendar,month);

		this.makeEmptyCalendar(month,year);
	}

	makeEmptyCalendar(month,year)
	{
		var numberOfDaysInMonth = new Date(year, month, 0).getDate();
		var dayOfWeekOfFirstDay = new Date(year, month, 1).getDay();

		var weekCount = this.mCalendar.weekCount(year,parseInt(month + 1)); 

		var startDay = this.getStartDay(dayOfWeekOfFirstDay);

		//append to table
		for (var i = 0; i < weekCount; i++)
		{
			var tr = this.getCalendarTable().insertRow(parseInt(i + 1));
			for (var y = 0; y < 7; y++)
			{
				var td = tr.insertCell(y);

				//set id td
				var date = new Date(year, month, startDay);
				var s = parseInt(date.getYear() + 1900) + '-' + parseInt(date.getMonth() + 1) + '-' + date.getDate();  
				var txt = this.mCalendar.inflateDateString(s);
				td.setAttribute('id',txt);

				if (startDay < 1)
				{
					var lastMonth = parseInt(month - 2);
					var daysInMonth = new Date(year, lastMonth, 0).getDate();
					var dayOfMonth = parseInt(numberOfDaysInMonth + startDay);
					td.innerHTML = dayOfMonth;
				}
				else if (startDay > numberOfDaysInMonth)
				{
					var day = startDay - numberOfDaysInMonth  	
					td.innerHTML = day;
				}
				else
				{
					td.innerHTML = startDay;
				}
			
				//increment startDay
				startDay++;
			}
		}
	}

	deleteCalendarRows()
	{
		//lets delete any rows that linger
		var length = this.getCalendarTable().rows.length;
		for (var i = 1; i < length; i++)
		{
			this.getCalendarTable().deleteRow(1);		
		}
	}
	
	getStartDay(dayOfWeekOfFirstDay)
	{
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

		return startDay;
	}

	setDisplayMonth(calendar,month)
	{
		//set displayed month
		var p = document.getElementById("calendar_month_p_html_id");
		p.innerHTML = calendar.mMonthArray[month];  
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

		//make new array containing games and practices together
		if (this.mJson)
		{
                	if (this.mJson.practices)
			{
                        	for (var i = 0; i < this.mJson.practices.length; i++)
				{
					this.mEventsArray.push(this.mJson.practices[i]);
					this.mJson.practices[i].type = 'practice';
				}
			}

			if (this.mJson.games)
			{
                       		for (var i = 0; i < this.mJson.games.length; i++)
				{
					this.mEventsArray.push(this.mJson.games[i]);
					this.mJson.games[i].type = 'game';
				}
			}
		}

		this.sortEventsArray();
		this.printEventsToScreen();
	}

	sortEventsArray()
	{

		//sort this.mEventsArray by date and arrival time
		this.mEventsArray.sort
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
	}       
	
	printEventsToScreen()
	{
		//print to screen
		if (this.mEventsArray)
                {
			var td = null
			var txt = null;
				
                        for (var i = 0; i < this.mEventsArray.length; i++)
                        {
				
				if (this.mEventsArray[i].event_date)
				{
					//get the table data cell that goes with this date
					var event_date = this.mEventsArray[i].event_date;
					td = document.getElementById(event_date);

					var calendarEventButton = document.createElement('button');
					calendarEventButton.setAttribute('class','calendar-event-button');
					calendarEventButton.setAttribute('eventsarrayelementid',i);
					td.appendChild(calendarEventButton);

					calendarEventButton.onclick = this.printModal;
					this.mCalendarEventButtonArray.push(calendarEventButton);
					
					if (this.mEventsArray[i].type == 'game')
					{
						txt = '<br>Game';
					}
					if (this.mEventsArray[i].type == 'practice')
					{
						txt = '<br>Practice';
					}
					txt = txt + ' ' + this.mApplication.mTime.convertFromMilitaryToHuman(this.mEventsArray[i].arrival_time); 
					calendarEventButton.innerHTML = txt;
				}
			}
		}
	}

	printModal()
	{
		console.log('what:' + this);
		console.log('what:' + this.getAttribute('eventsarrayelementid'));
		var i = this.getAttribute('eventsarrayelementid'); 

		var p = document.getElementById("modal_p_id");
		var textArray = new Array();

		var eventsArray = APPLICATION.getCurrentScreen().mEventsArray;
				
		if (eventsArray[i].arrival_time)
		{
			var humanTime = APPLICATION.mTime.convertFromMilitaryToHuman(eventsArray[i].arrival_time);
			textArray.push('Arrive by: ' + humanTime);
		}
		
		for (var r = 0; r < textArray.length; r++)
		{
			p.innerHTML = p.innerHTML + ' ' + textArray[r] + '<br>';	
		}
		
		document.getElementById("calendar_modal_id").style.display = "block";

			/*	
		if (eventsArray[i].start_time)
		{
			var humanTime = this.mApplication.mTime.convertFromMilitaryToHuman(eventsArray[i].start_time);
			textArray.push('Start time: ' + humanTime);
		}
				
		if (this.eventsArray[i].end_time)
		{
			var humanTime = this.mApplication.mTime.convertFromMilitaryToHuman(eventsArray[i].end_time);
			textArray.push('End time: ' + humanTime);
		}
				
		if (this.eventsArray[i].address)
		{
			textArray.push('Address: ' + eventsArray[i].address);
		}

		if (this.eventsArray[i].coordinates)
		{
			textArray.push('Coordinates: ' + eventsArray[i].coordinates);
		}
				
		if (this.eventsArray[i].pitch_name)
		{
			textArray.push('Pitch: ' + eventsArray[i].pitch_name);
		}
				
		if (this.eventsArray[i].field_name)
		{
			textArray.push('Field: ' + eventsArray[i].field_name);
		}
				
		if (this.eventsArray[i].club_name)
		{
			textArray.push('Club: ' + eventsArray[i].club_name);
		}
				
		if (this.eventsArray[i].team_name)
		{
			textArray.push('Team: ' + eventsArray[i].team_name);
		}
				
		if (this.eventsArray[i].opponent)
		{
			textArray.push('Opponent: ' + eventsArray[i].opponent);
		}

		for (var r = 0; r < textArray.length; r++)
		{
			p.innerHTML = p.innerHTML + ' ' + textArray[r] + '<br>';	
		}
		*/
	}
}
