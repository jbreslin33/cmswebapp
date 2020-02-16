<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class InsertPractice extends Screen
{
	function __construct() 
	{
		parent::__construct();
	}

	function getResult()
	{
		$team_id = null;
		$event_date = null;
		$arrival_time = null;
		$start_time = null;
		$end_time = null;
		$address = null;
		$coordinates = null;
		$pitch_id = null;
		$field_name = null;
		$person_id = null;
		
		$start_date = null;
		$end_date = null;
		$sunday_checked = null;
		$monday_checked = null;
		$tuesday_checked = null;
		$wednesday_checked = null;
		$thursday_checked = null;
		$friday_checked = null;
		$saturday_checked = null;
	
		if (isset($_GET['team_id']))
		{
			$team_id = $_GET['team_id'];
		}
		if (isset($_GET['event_date']))
		{
			$event_date = $_GET['event_date'];
		}
		if (isset($_GET['arrival_time']))
		{
			$arrival_time = $_GET['arrival_time'];
		}
		if (isset($_GET['start_time']))
		{
			$start_time = $_GET['start_time'];
		}
		if (isset($_GET['end_time']))
		{
			$end_time = $_GET['end_time'];
		}
		if (isset($_GET['address']))
		{
			$address = $_GET['address'];
		}
		if (isset($_GET['coordinates']))
		{
			$coordinates = $_GET['coordinates'];
		}
		if (isset($_GET['pitch_id']))
		{
			$pitch_id = $_GET['pitch_id'];
		}
		if (isset($_GET['field_name']))
		{
			$field_name = $_GET['field_name'];
		}

                if (isset($_GET['person_id']))
                {
                        $person_id = $_GET['person_id'];
                }
		
		if (isset($_GET['start_date']))
		{
			$start_date = $_GET['start_date'];
		}

		if (isset($_GET['end_date']))
		{
			$end_date = $_GET['end_date'];
		}
		$txt = '';	
		if (isset($_GET['sunday_checked']))
		{
			$sunday_checked = $_GET['sunday_checked'];
			$txt .= 'sunday_checked:'; 
			$txt .= $sunday_checked;
		}
		if (isset($_GET['monday_checked']))
		{
			$monday_checked = $_GET['monday_checked'];
			$txt .= 'monday_checked:'; 
			$txt .= $monday_checked;
		}
		if (isset($_GET['tuesday_checked']))
		{
			$tuesday_checked = $_GET['tuesday_checked'];
			$txt .= 'tuesday_checked:'; 
			$txt .= $tuesday_checked;
		}
		if (isset($_GET['wednesday_checked']))
		{
			$wednesday_checked = $_GET['wednesday_checked'];
			$txt .= 'wednesday_checked:'; 
			$txt .= $wednesday_checked;
		}
		if (isset($_GET['thursday_checked']))
		{
			$thursday_checked = $_GET['thursday_checked'];
			$txt .= 'thursday_checked:'; 
			$txt .= $thursday_checked;
		}
		if (isset($_GET['friday_checked']))
		{
			$friday_checked = $_GET['friday_checked'];
			$txt .= 'friday_checked:'; 
			$txt .= $friday_checked;
		}
		if (isset($_GET['saturday_checked']))
		{
			$saturday_checked = $_GET['saturday_checked'];
			$txt .= 'saturday_checked:'; 
			$txt .= $saturday_checked;
		}
		
		if ($this->getAuthorizationId() > 0)
		{
			//prep db
			error_log('send to db');
			$sql = 'select f_insert_practice($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)';
			$prepare_result = pg_prepare($this->mDatabase->mConnection, "f_insert_practice", $sql);
			$result = pg_execute($this->mDatabase->mConnection, "f_insert_practice", array( $this->getSenderEmailId(), $team_id, $event_date, $arrival_time, $start_time, $end_time, $address, $coordinates, $pitch_id, $field_name, $person_id, $start_date, $end_date, $sunday_checked, $monday_checked, $tuesday_checked, $wednesday_checked, $thursday_checked, $friday_checked, $saturday_checked));
		
			return pg_fetch_result($result, 0);
		}
		else
		{
                        //prep db
                        $sql = 'select f_format_result_set($1,$2,$3)';
                	$prepare_result = pg_prepare($this->mDatabase->mConnection, "f_format_result_set", $sql);
                        $result = pg_execute($this->mDatabase->mConnection, "f_format_result_set", array( $this->getSenderEmailId(), 'You are in view only mode. You must login to insert a practice.', -101));

                       	return pg_fetch_result($result, 0);
		}
        }
}

$insertPractice = new InsertPractice();	

?>
