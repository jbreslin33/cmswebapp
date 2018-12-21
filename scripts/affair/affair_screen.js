'use strict';

class AffairScreen
{
	constructor(affair)
	{
		this.mAffair = affair;

               	//card
                this.mDivCard = document.createElement("DIV");
                this.mDivCard.setAttribute("class", "card");
                this.mAffair.mSchedule.mApplication.mDivMain.appendChild(this.mDivCard);

                //add card to main
                this.mContainer = document.querySelector('.main');
                this.mContainer.appendChild(this.mDivCard);
                
		this.mDivAffairType = document.createElement("DIV");
                this.mDivAffairType.setAttribute("class", "affairType");
                this.mDivCard.appendChild(this.mDivAffairType);

                this.mDivAffairDate = document.createElement("DIV");
                this.mDivAffairDate.setAttribute("class", "affairDate");
                this.mDivCard.appendChild(this.mDivAffairDate);

                this.mDivStartTime = document.createElement("DIV");
                this.mDivStartTime.setAttribute("class", "startTime");
                this.mDivCard.appendChild(this.mDivStartTime);
                
		this.mDivArrivalTime = document.createElement("DIV");
                this.mDivArrivalTime.setAttribute("class", "arrivalTime");
                this.mDivCard.appendChild(this.mDivArrivalTime);

                this.mDivAddress = document.createElement("DIV");
                this.mDivAddress.setAttribute("class", "address");
                this.mDivCard.appendChild(this.mDivAddress);

	}

	update()
	{
		//mAffairType
		if (this.mAffair.mAffairType == null)
		{
         		this.mDivCard.querySelector('.affairType').style.display == "none";
		}
		else
		{
         		this.mDivCard.querySelector('.affairType').textContent = this.mAffair.mAffairType;
		}

		//mAffairDate
                var date = new Date(this.mAffair.mAffairDate);
                var dayElement = date.getDay();
                var monthElement = date.getMonth();
         	this.mDivCard.querySelector('.affairDate').textContent = this.mAffair.mSchedule.mDayArray[dayElement] + ' ' + this.mAffair.mSchedule.mMonthArray[monthElement] + ' ' + date.getDate();

		//mStartTime
         	this.mDivCard.querySelector('.startTime').textContent = this.mAffair.mStartTime;

		//mArrivalTime
         	//this.mDivCard.querySelector('.arrivalTime').textContent = this.mAffair.mArrivalTime;
		console.log('mArrivalTime:' + this.mAffair.mArrivalTime);
		if (this.mAffair.mArrivalTime == null)
		{
			console.log("A");
         		this.mDivCard.querySelector('.arrivalTime').style.display == "none";
		}
		else
		{
			console.log("B");
         		this.mDivCard.querySelector('.arrivalTime').textContent = this.mAffair.mArrivalTime;
		}

		//mAddress
         	this.mDivCard.querySelector('.address').textContent = this.mAffair.mAddress;
	}
}
/*
 *
 *
                            var affair = new Affair(schedule);
                                                        affair.mAffairScreen = new AffairScreen(affair);

                                                        //set affair member vars
                                                        affair.mAffairType = data[i][0];

                                                        var date = new Date(data[i][1]);
                                                        var dayElement = date.getDay();
                                                        var monthElement = date.getMonth();
                                                        affair.mAffairDate = schedule.mDayArray[dayElement] + ' ' + schedule.mMonthArray[monthElement] + ' ' + date.getDate();

                                                        affair.mStartTime = "Start Time: " + schedule.mTime.convertFromMilitaryToHuman(data[i][2]);

                                                        affair.mArrivalTime = "Arrival Time: " + schedule.mTime.convertFromMilitaryToHuman(data[i][3]);

                                                        affair.mAddress   = data[i][4];

                                                        //update screen card
                                                        affair.mAffairScreen.update();

                                                        //save for later
                                                        APPLICATION.mSchedule.saveToLocalStorage(schedule.mAffair);

                                                        //push to array
                                                        APPLICATION.mSchedule.mAffairArray.push(affair);
                                                        i++;
*
 */
