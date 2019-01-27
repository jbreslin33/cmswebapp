'use strict';

class InsertEvento
{
	constructor(application)
	{
		this.mApplication = application;
		this.mScreen = new InsertEventoScreen(this);

		//fields
		this.mEventoDate = null;
		this.mArrivalTime = null;
		this.mStartTime = null;
		this.mEndTime = null;
		this.mAddress = null;
		this.mCoordinates = null;
		this.mCoordinates = null;
		this.mPitchID = null;
		this.mFieldName = null;
		this.mTeamID = null;
		this.mEventoTypesID = null;

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
console.log('in send:' + APPLICATION.mInsertEvento.mEventoDate); 
                var url = "/php/classes/insert/insert_evento.php?username=" + APPLICATION.mLogin.mUsername + "&password=" + APPLICATION.mLogin.mPassword + "&evento_date=" + APPLICATION.mInsertEvento.mEventoDate + "&arrival_time=" + APPLICATION.mInsertEvento.mArrivalTime + "&start_time=" + APPLICATION.mInsertEvento.mStartTime + "&end_time=" + APPLICATION.mInsertEvento.mEndTime + "&address=" + APPLICATION.mInsertEvento.mAddress + "&coordinates=" + APPLICATION.mInsertEvento.mCoordinates + "&pitch=" + APPLICATION.mInsertEvento.mPitch + "&field_name=" + APPLICATION.mInsertEvento.mFieldName + "&Team=" + APPLICATION.mInsertEvento.mTeam + "&event_type=" + APPLICATION.mInsertEvento.mEventTypesID;

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
                                                        //APPLICATION.mLogin.processLogin(data); //should recieve 100 for good login
							//we should for user sanity ask for password when they go to an insert type screen
                                                }
                                        }
                                }
                        }
                };
                request.open('POST', url);
                request.send();
        }

}
