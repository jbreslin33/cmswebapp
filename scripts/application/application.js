'use strict';

class Application 
{
	constructor() 
	{

		/* this is the div container for all the cards. The cards hold the individual reports
		*/
		//header	
		this.mHeader = new Header(this,"Club Management System");
                
		//main class
                this.mDivMain = document.createElement("DIV");
                this.mDivMain.setAttribute("class", "main");
                document.body.appendChild(this.mDivMain);


		//login first
		this.mLogin = new Login(this);
		
		
		//report
		this.mDailySchedule = new DailySchedule(this);
		
	}

	update()
	{
		this.mStateMachine.update();
	}
}
