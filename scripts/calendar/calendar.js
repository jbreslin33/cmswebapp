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
		console.log('data:' + data);
                var date = new Date(data);
                var dayElement = date.getDay() + 1;
		console.log('dayEl:' + dayElement);
                var monthElement = date.getMonth();
		console.log('monthEl:' + monthElement);
                var dayOfMonth = date.getDate() + 1;
		console.log('dayOfMonth:' + dayOfMonth);

                return this.mDayArray[dayElement] + ' ' + this.mMonthArray[monthElement] + ' ' + dayOfMonth;
        }
}
