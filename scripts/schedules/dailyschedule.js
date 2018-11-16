'use strict';

class DailySchedule extends Report
{
	constructor(application)
	{
		super(application);
               	console.log('DailySchedule Constructor'); 
		this.mDivDate = document.createElement("DIV");
                this.mDivDate.setAttribute("class", "date");
                this.mDivCardTemplate.appendChild(this.mDivDate);
		//this.mDivDate.textContent = "DEFAULT";

		this.mInitialPractice = new Practice();

		/**********************************/
        	//SCHEDULE
        	this.mPractice = localStorage.mPractice;
        	if (this.mPractice)
		{
                	console.log("mPractice from localStorage");
                	this.mPractice = JSON.parse(this.mPractice);

			//but lets get some new stuff from intertubes
			this.getData();	
		}
		else
		{
                	console.log("mPractice from initial");
			this.updateCard(this.mInitialPractice);
                	this.saveToLocalStorage(this.mInitialPractice);
		}
		
                //report vars
                this.mIsLoading = true;
                this.mVisibleCards = {};
                this.mSpinner = document.querySelector('.loader');
                this.mCardTemplate = document.querySelector('.cardTemplate');
                this.mContainer = document.querySelector('.main');

                 this.mCard = this.mCardTemplate.cloneNode(true);
                 this.mCard.classList.remove('cardTemplate');
                 this.mCard.removeAttribute('hidden');
                 this.mContainer.appendChild(this.mCard);
	}

        saveToLocalStorage(practice)
        {
		console.log('saving data to local storage');
                var data = JSON.stringify(practice);
                localStorage.mPractice = data;
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
                                        var data = JSON.parse(this.responseText);
                                        if (data)
					{
                                        	console.log("update from internet");
						APPLICATION.mDailySchedule.mPractice = new Practice();
						APPLICATION.mDailySchedule.mPractice.mEventDate = data[0][0];
						APPLICATION.mDailySchedule.mPractice.mStartTime = data[0][0];
						APPLICATION.mDailySchedule.mPractice.mAddress = data [0][0];
                                        	APPLICATION.mDailySchedule.updateCard(APPLICATION.mDailySchedule.mPractice);
                                        	APPLICATION.mDailySchedule.mDivDate.textContent = "WHAT";
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
				if (APPLICATION)
				{
					console.log('return initial data');
					APPLICATION.mDailySchedule.updateCard(APPLICATION.mDailySchedule.mInitialPractice);
				}
                        }
                };
                request.open('GET', url);
                request.send();
        }
	updateCard(practice)
	{
		if (APPLICATION)
		{
			console.log('updateCard function:' + practice.mEventDate);
			this.mDivDate.textContent = practice.mEventDate;
			this.mDivDate.textContent = "WHY";
			//APPLICATION.mDailySchedule.mDivDate.textContent = "WHY";
			APPLICATION.mDailySchedule.mDivDate.textContent = "PLEASE";

			var para = document.createElement("p");
			var node = document.createTextNode("this is new");
			para.appendChild(node);
			
			APPLICATION.mDailySchedule.mDivCardTemplate.appendChild(para);

			APPLICATION.mDailySchedule.mCard.querySelector('.date').textContent = practice.mEventDate;


		}
		else
		{
			console.log('why no application');
		}
	}

}
class Practice
{
        constructor()
        {
                this.mEventDate = 'NA';
                this.mStartTime = 'NA';
                this.mAddress   = 'NA';
        }
}
