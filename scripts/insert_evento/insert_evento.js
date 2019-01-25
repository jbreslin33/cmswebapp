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

                this.mGLOBAL_INSERT_EVENTO = new GLOBAL_INSERT_EVENTO();
                this.mINIT_INSERT_EVENTO   = new INIT_INSERT_EVENTO();
                this.mWAIT_INSERT_EVENTO   = new WAIT_INSERT_EVENTO();

                this.mStateMachine.setGlobalState(this.mGLOBAL_INSERT_EVENTO);
                this.mStateMachine.changeState(this.mINIT_INSERT_EVENTO);
	}

        send()
        {
                //need to handle not having a team yet...
                var url = "/php/classes/login/login.php?username=" + APPLICATION.mLogin.mUsername + "&password=" + APPLICATION.mLogin.mPassword;

                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
                                        var data = this.responseText;
                                        if (data)
                                        {
                                                if (data == 100)
                                                {
                                                        APPLICATION.mLogin.processLogin(data); //should recieve 100 for good login
                                                }
                                        }
                                }
                        }
                };
                request.open('POST', url);
                request.send();
        }

}
