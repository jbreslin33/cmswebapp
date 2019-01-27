'use strict';

class Evento
{
	constructor()
	{
		//this should always be db valid and not display valid though it can have team and team_id etc
		this.mID = null;
		this.mAvailabilityID = null;
                
		this.mEventoDate    = null;
                this.mArrivalTime   = null;
                this.mStartTime     = null;
                this.mEndTime       = null;
                this.mAddress       = null;
                this.mCoordinates   = null;

                this.mPitchID       = null;
		this.mPitch         = null;

                this.mFieldName     = null;

                this.mTeamID        = null;
                this.mTeam          = null;

                this.mEventoTypesID = null;
                this.mEventoTypes   = null;

	}
	destructor()
	{
	}
}
