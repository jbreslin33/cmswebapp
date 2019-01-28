'use strict';

class InsertEvento
{
	constructor(application)
	{
		this.mApplication = application;

		this.mEvento = new Evento();
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
console.log('in send:' + APPLICATION.mInsertEvento.mEventoDate); 
                var url = "/php/classes/insert/insert_evento.php?username=" + APPLICATION.mLogin.mUsername + "&password=" + APPLICATION.mLogin.mPassword + "&evento_date=" + APPLICATION.mInsertEvento.mEvento.mEventoDate + "&arrival_time=" + APPLICATION.mInsertEvento.mEvento.mArrivalTime + "&start_time=" + APPLICATION.mInsertEvento.mEvento.mStartTime + "&end_time=" + APPLICATION.mInsertEvento.mEvento.mEndTime + "&address=" + APPLICATION.mInsertEvento.mEvento.mAddress + "&coordinates=" + APPLICATION.mInsertEvento.mEvento.mCoordinates + "&pitch_id=" + APPLICATION.mInsertEvento.mEvento.mPitchID + "&field_name=" + APPLICATION.mInsertEvento.mEvento.mFieldName + "&team_id=" + APPLICATION.mInsertEvento.mEvento.mTeamID + "&evento_types_id=" + APPLICATION.mInsertEvento.mEvento.mEventoTypesID;

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
