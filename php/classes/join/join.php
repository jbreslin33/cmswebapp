<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");

class InsertEvento extends Insert
{
	function __construct() 
	{

		//insertEvento specific parameters	
                if (isset($_GET['first_name']))
                {
                        $this->mAddress = $_GET['first_name'];
                }
		
		parent::__construct();

		//insert into eventos (evento_date,start_time,arrival_time,address,team_id,evento_types_id) 
		//values ('02/10/2019','20:55:00','20:45:00','4666 bristol road feasterville pa',3,1);";
		//  var url = "/php/classes/insert/insert_evento.php?username=" + APPLICATION.mLogin.mUsername + "&password=" + APPLICATION.mLogin.mPassword + "&evento_date=" + APPLICATION.mInsertEvento.mEventoDate + "&arrival_time=" + APPLICATION.mInsertoEvento.mArrivalTime + "&start_time=" + APPLICATION.mInsertoEvento.mStartTime + "&end_time=" + APPLICATION.mInsertoEvento.mEndTime + "&address=" + APPLICATION.mInsertoEvento.mAddress + "&coordinates=" + APPLICATION.mInsertoEvento.mCoordinates + "&pitch=" + APPLICATION.mInsertoEvento.mPitch + "&field_name=" + APPLICATION.mInsertoEvento.mFieldName + "&Team=" + APPLICATION.mInsertoEvento.mTeam + "&event_type=" + APPLICATION.mInsertoEvento.mEventTypesID;


	}

	public function query()
	{
		$this->mSQL = "
		
		insert into eventos (evento_date, arrival_time, start_time, end_time, address, coordinates, pitch_id, field_name, team_id, evento_types_id) values('" . 
		$this->mEventoDate .
		"','" .
		$this->mArrivalTime .
		"','" .
		$this->mStartTime .
		"','" .
		$this->mEndTime .
		"','" .
		$this->mAddress .
		"','" .
		$this->mCoordinates .
		"'," .
		$this->mPitchID .
		",'" .
		$this->mFieldName .
		"'," .
		$this->mTeamID .
		"," .
		$this->mEventoTypesID .
		");";

		error_log($this->mSQL);
	}
}

$insertEvento = new InsertEvento();

?>
