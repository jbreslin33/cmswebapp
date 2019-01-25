'use strict';

class InsertEvento
{
	constructor(application)
	{
		this.mApplication = application;
		this.mScreen = new InsertEventoScreen(this);

                //logs
                this.mStateLogs = false;
                this.mStateEnterLogs = true;
                this.mStateExecuteLogs = false;
                this.mStateExitLogs = false;

                //states
                this.mStateMachine = new StateMachine(this);

                this.mGLOBAL_INSERT_EVENTO              = new GLOBAL_INSERT_EVENTO();
                this.mINIT_INSERT_EVENTO                 = new INIT_INSERT_EVENTO();

                this.mStateMachine.setGlobalState(this.mGLOBAL_INSERT_EVENTO);
                this.mStateMachine.changeState(this.mINIT_INSERT_EVENTO);
	}
}
