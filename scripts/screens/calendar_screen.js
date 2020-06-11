'use strict';

class CalendarScreen extends ScheduleScreen
{
        constructor(application)
        {
                super(application);
               	
		location.hash = 'calendar_screen';

		this.setHtml(document.getElementById("calendar_screen_html_id"));
                this.setMessageElement(document.getElementById("calendar_screen_message_id"));
                this.setSpinner(document.getElementById("calendar_screen_spinner_id"));
                this.setForm(document.getElementById("calendar_screen_form_id"));
		this.setModal(document.getElementById("calendar_modal_id"));
		this.setModalContent(document.getElementById("calendar_modal_content_id"));
		this.setModalParagraph(document.getElementById("calendar_modal_p_id"));
		this.setModalButton(document.getElementById("calendar_modal_button_id"));
		this.setModalCloseButton(document.getElementById("calendar_modal_close_button_id"));

		this.mCalendarTable = null;
                this.setCalendarTable(document.getElementById("calendar_table_id"));

		this.deleteCalendarRows()

		this.mCalendarEventButtonArray = new Array();

		//month calendar_month_p_html_id
		var date = new Date();
  		this.mDisplayMonth = date.getMonth();
  		this.mDisplayYear = date.getYear();
		this.mDisplayYear = parseInt(this.mDisplayYear + 1900);

		this.drawDisplayMonth(this.mCalendar,this.mDisplayMonth, this.mDisplayYear);

		this.makeEmptyCalendar(this.mDisplayMonth,this.mDisplayYear);

		//navigation buttons
               	document.getElementById("calendarbackbuttonid").onclick = this.back.bind(this);
               	document.getElementById("calendarforwardbuttonid").onclick = this.forward.bind(this);

                //close nav
                this.setCloseNav();
	}

	back()
	{
		//delete old events
		this.mEventsArray.length = 0;
	
		//delete old button links
		this.mCalendarEventButtonArray.length = 0;

		//delete old rows
		this.deleteCalendarRows();

                //month calendar_month_p_html_id
                var date = new Date(this.mDisplayYear,this.mDisplayMonth, 0);

		//move up the display dates base on new forwarded date
                this.mDisplayMonth = date.getMonth();
                this.mDisplayYear = date.getYear();
                this.mDisplayYear = parseInt(this.mDisplayYear + 1900);

                this.drawDisplayMonth(this.mCalendar,this.mDisplayMonth,this.mDisplayYear);

                this.makeEmptyCalendar(this.mDisplayMonth,this.mDisplayYear);

		this.get();
	}

	forward()
	{
		//delete old events
		this.mEventsArray.length = 0;
	
		//delete old button links
		this.mCalendarEventButtonArray.length = 0;

		//delete old rows
		this.deleteCalendarRows();

                //month calendar_month_p_html_id
                var date = new Date(this.mDisplayYear,parseInt(this.mDisplayMonth + 2), 0);

		//move up the display dates base on new forwarded date
                this.mDisplayMonth = date.getMonth();
                this.mDisplayYear = date.getYear();
                this.mDisplayYear = parseInt(this.mDisplayYear + 1900);

                this.drawDisplayMonth(this.mCalendar,this.mDisplayMonth,this.mDisplayYear);

                this.makeEmptyCalendar(this.mDisplayMonth,this.mDisplayYear);

		this.get();
	}

	makeEmptyCalendar(month,year)
	{
		var numberOfDaysInLastMonth = new Date(year, month, 0).getDate();
		var numberOfDaysInThisMonth = new Date(year, parseInt(month + 1), 0).getDate();
		var dayOfWeekOfFirstDay = new Date(year, month, 1).getDay(); //good on first

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

				//while we are here lets set first and last day of db query
				if (i == 0 && y == 0)
				{
					this.mFirstDayOfQuery = txt;
				}
				if (i == parseInt(weekCount - 1) && y == 6)
				{
					this.mLastDayOfQuery = txt;
				}

				//lets print the day of month at top of td cell
				if (startDay < 1)
				{
					var lastMonth = parseInt(month - 2);
					var daysInMonth = new Date(year, lastMonth, 0).getDate();
					var dayOfMonth = parseInt(numberOfDaysInLastMonth + startDay);
					td.innerHTML = dayOfMonth;
				}
				else if (startDay > numberOfDaysInThisMonth)
				{
					var day = startDay - numberOfDaysInThisMonth  	
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

	drawDisplayMonth(calendar,month,year)
	{
		//set displayed month
		var p = document.getElementById("calendar_month_p_html_id");
		p.innerHTML = calendar.mMonthArray[month] + ' ' + year;  
	}

	getDisplayMonthElement(calendar)
	{
		for (var i = 0; i < calendar.mMonthArray.length; i++)
		{
			var p = document.getElementById("calendar_month_p_html_id");
			if (calendar.mMonthArray[i] == p.innerHTML)
			{
				return i;	
			}
		}
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
		if (this.mJson)
		{
		        if (this.mEventsArray.length > 0)
                        {
				this.sortEventsArray();
				this.printItemsToScreen();
                        }
		}
	}

	printItemsToScreen()
	{
		var screen = APPLICATION.getCurrentScreen();
		//print to screen
		if (screen.mItemArray)
                {
			console.log('printItemsToScreen() if');
			var td = null
			var txt = null;
				
		        for (var i = 0; i < screen.mItemArray.length; i++)
                        {
				
				if (screen.mItemArray[i].mJson.event_date)
				{
					//get the table data cell that goes with this date
					var event_date = screen.mItemArray[i].mJson.event_date;
					td = document.getElementById(event_date);

					var calendarEventButton = document.createElement('button');
					calendarEventButton.setAttribute('class','calendar-event-button');

					calendarEventButton.setAttribute('id',screen.mItemArray[i].mJson.id);
					calendarEventButton.setAttribute('type',screen.mItemArray[i].mJson.type);

					td.appendChild(calendarEventButton);

					calendarEventButton.onclick = this.printModal;
					this.mCalendarEventButtonArray.push(calendarEventButton);
					
					if (screen.mItemArray[i].mJson.type == 'game')
					{
						txt = '<br>Game';
					}
					if (screen.mItemArray[i].mJson.type == 'practice')
					{
						txt = '<br>Practice';
					}
					txt = txt + ' ' + this.mApplication.mTime.convertFromMilitaryToHuman(screen.mItemArray[i].mJson.arrival_time); 
					calendarEventButton.innerHTML = txt;
				}
			}
		}
	}

	printModal()
	{
                var id = this.getAttribute('id');
                var type = this.getAttribute('type');

		APPLICATION.getCurrentScreen().printItems(id,type);
		APPLICATION.getCurrentScreen().showModal();
	}

        printItems(id,type)
        {
		for (var i = 0; i < this.mItemArray.length; i++)
                {
			if (this.mItemArray[i].mJson.id == id && this.mItemArray[i].mJson.type == type)
			{
                        	this.mItemArray[i].printToScreen( this.getModalContent() );
			}
                }
        }

}
