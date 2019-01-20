'use strict';

class Header 
{
	constructor(application,text)
	{
		//Application
		this.mApplication = application;

		//text
		this.mText = text;	

                //states
                this.mStateMachine = new StateMachine(this);
                this.mGLOBAL_APPLICATION = new GLOBAL_APPLICATION();
                this.mINIT_APPLICATION = new INIT_APPLICATION();
                this.mMAIN_APPLICATION = new MAIN_APPLICATION();

                this.mStateMachine.setGlobalState(this.mGLOBAL_APPLICATION);
                this.mStateMachine.changeState(this.mINIT_APPLICATION);

		//header image
		/*
		this.mIcon = document.createElement("img");
		this.mIcon.setAttribute('src', '/images/icons/celta-icon-32x32.png');
		this.mIcon.setAttribute('alt', 'na');
		*/
	}
}
