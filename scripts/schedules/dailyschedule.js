'use strict';

class DailySchedule extends Report
{
	constructor(application)
	{
		super(application);

		this.mData = null;
		/**********************************/
        	//SCHEDULE
        	this.mData = localStorage.mDailyScheduleData;
        	if (this.mData)
		{
                	console.log("mDailySceduleData from localStorage");
                	this.mData = JSON.parse(this.mData);
			
		}
		else
		{
                	console.log("mDailySceduleData from initial");
		}
		
/*
        if (APPLICATION.mWeekReport.mScheduleData)
        {
                console.log("index schedule from localStorage");
                APPLICATION.mWeekReport.mScheduleData = JSON.parse(APPLICATION.mWeekReport.mScheduleData);

                APPLICATION.mWeekReport.mScheduleData.forEach(function(event_record)
                {
                        APPLICATION.mWeekReport.getSchedule(event_record.key, event_record.label);
                });
        }
        else
        {
                console.log("update scheduleCard from initial");
                APPLICATION.mWeekReport.updateScheduleCard(APPLICATION.mWeekReport.initialScheduleData);
                APPLICATION.mWeekReport.mScheduleData =
                [
                        {key: APPLICATION.mWeekReport.initialScheduleData.key, label: APPLICATION.mWeekReport.initialScheduleData.label}
                ];
                APPLICATION.mWeekReport.saveScheduleToLocalStorage();
        }
*/


                this.mDivDate = document.createElement("DIV");
                this.mDivDate.setAttribute("class", "date");
                this.mDivCardTemplate.appendChild(this.mDivDate);
		this.mDivDate.textContent = "yo";

          	var textScale = document.createTextNode(' mph ');
               	this.mDivDate.appendChild(textScale);

		console.log('DailySchedule constructor');


                //report vars
                this.isLoading = true;
                this.visibleCards = {};
                this.spinner = document.querySelector('.loader');
                this.cardTemplate = document.querySelector('.cardTemplate');
                this.container = document.querySelector('.main');

                //var card = this.visibleCards[data.key];
                //if (!card)
                //{
                        var card = this.cardTemplate.cloneNode(true);
                        card.classList.remove('cardTemplate');
                        //card.querySelector('.location').textContent = data.label;
                        //card.querySelector('.location').textContent = "LABEL GOES HERE";
                        card.removeAttribute('hidden');
                        this.container.appendChild(card);
                        //this.visibleCards[data.key] = card;
                //}



	}
}
