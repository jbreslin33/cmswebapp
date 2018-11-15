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

			getSchedule();	
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
       
	getData()
        {
                var url = "/php/querys/get_schedule.php";

                // TODO add cache logic here
                if ('caches' in window)
                {
                        console.log("cached schedule in window");
                        /*
                        * Check if the service worker has already cached this city's weather
                        * data. If the service worker has the data, then display the cached
                        * data while the app fetches the latest data.
                        */
                        caches.match(url).then(function(response)
                        {
                                if (response)
                                {
                                        response.json().then(function updateFromCache(json)
                                        {
                                                console.log("update schedule from cache");
                                                var results = json.query.results;
                                                results.key = key;
                                                results.label = label;
                                                results.created = json.query.created;
                                                this.updateScheduleCard(results);
                                        });
                                }
                        });
                }

                // Fetch the latest data.
                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
                                        console.log('res:' + this.responseText);
                                        var data = JSON.parse(this.responseText);
                                        console.log('data:' + data);
                                        if (data)
                                        {
                                                console.log('data A:' + data[0][0]);
                                                console.log('data B:' + data[1][0]);
                                                console.log('data C:' + data[0][2]);
                                        }
                                        else
                                        {
                                                console.log('no schedule');
                                        }
                                }
                        }
                        else
                        {

                        // Return the initial weather forecast since no data is available.
                        console.log("update schedule from initial");
                        APPLICATION.mWeekReport.updateScheduleCard(APPLICATION.mWeekReport.initialScheduleData);
                        }
                };
                request.open('GET', url);
                request.send();
        }
}
