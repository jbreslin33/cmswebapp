'use strict';

class ManagerHeader extends Header
{
	constructor(application,text)
	{
		super(application,text);

		//addbutton 1
		this.mButtonInsertAffairScreen = document.createElement("BUTTON");
		this.mButtonInsertAffairScreen.setAttribute("class", "headerButton");
		this.mButtonInsertAffairScreen.setAttribute("aria-label", "Add");
		this.mButtonInsertAffairScreen.setAttribute("id", "butAdd");
		this.mButtonInsertAffairScreen.addEventListener("click",this.buttonInsertAffairScreenClicked); 
		this.mHeader.appendChild(this.mButtonInsertAffairScreen);
	}

	buttonInsertAffairScreenClicked()
	{
		//show insert affair screen	
		if (APPLICATION.mSchedule)
		{
               		APPLICATION.mSchedule.mStateMachine.changeState(APPLICATION.mSchedule.mINSERT_AFFAIR_SCREEN_SCHEDULE);
		}

	}
}
