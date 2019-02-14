<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert_username_check.php");

class InsertEvento extends Insert
{
	function __construct() 
	{

		//insertEvento specific parameters	
                if (isset($_GET['evento_date']))
                {
                        $this->mEventoDate = $_GET['evento_date'];
                }
                if (isset($_GET['arrival_time']))
                {
                        $this->mArrivalTime = $_GET['arrival_time'];
                }
                if (isset($_GET['start_time']))
                {
                        $this->mStartTime = $_GET['start_time'];
                }
                if (isset($_GET['end_time']))
                {
                        $this->mEndTime = $_GET['end_time'];
                }
                if (isset($_GET['address']))
                {
                        $this->mAddress = $_GET['address'];
                }
                if (isset($_GET['coordinates']))
                {
                        $this->mCoordinates = $_GET['coordinates'];
                }
                if (isset($_GET['pitch_id']))
                {
                        $this->mPitchID = $_GET['pitch_id'];
                }
                if (isset($_GET['field_name']))
                {
                        $this->mFieldName = $_GET['field_name'];
                }
                if (isset($_GET['team_id']))
                {
                        $this->mTeamID = $_GET['team_id'];
                }
                if (isset($_GET['evento_types_id']))
                {
                        $this->mEventoTypesID = $_GET['evento_types_id'];
                }
		
		parent::__construct();
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
