'use strict';

class Calendar 
{
	constructor()
	{
		//utilities
		this.mTime = new Time();
	
		//day and month
		this.mDayArray = new Array();
		this.mDayArray.push('Sunday');
		this.mDayArray.push('Monday');
		this.mDayArray.push('Tuesday');
		this.mDayArray.push('Wednesday');
		this.mDayArray.push('Thursday');
		this.mDayArray.push('Friday');
		this.mDayArray.push('Saturday');
		
		this.mMonthArray = new Array();
		this.mMonthArray.push('January');
		this.mMonthArray.push('February');
		this.mMonthArray.push('March');
		this.mMonthArray.push('April');
		this.mMonthArray.push('May');
		this.mMonthArray.push('June');
		this.mMonthArray.push('July');
		this.mMonthArray.push('August');
		this.mMonthArray.push('September');
		this.mMonthArray.push('October');
		this.mMonthArray.push('November');
		this.mMonthArray.push('December');
	}

        convertDate(data)
        {
		var dateArray = data.split("-");
		dateArray[1]--;
                
		var date = new Date(dateArray[0], dateArray[1], dateArray[2]);

                var dayElement = date.getDay();
                var monthElement = date.getMonth();
                var dayOfMonth = date.getDate();

                return this.mDayArray[dayElement] + ' ' + this.mMonthArray[monthElement] + ' ' + dayOfMonth;
        }
}
