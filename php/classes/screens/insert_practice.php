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

		if ($event_date)
		{
			if ($this->getAuthorizationId() > 0)
			{
				error_log('authorized');
				//prep db
				$sql = 'select f_insert_practice($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)';
				$prepare_result = pg_prepare($this->mDatabase->mConnection, "f_insert_practice", $sql);
				$result = pg_execute($this->mDatabase->mConnection, "f_insert_practice", array( $this->getSenderEmailId(), $team_id, $event_date, $arrival_time, $start_time, $end_time, $address, $coordinates, $pitch_id, $field_name, $person_id));
			
				return pg_fetch_result($result, 0);
			}
			else
			{
				error_log('not authorized');
                                //prep db
                                $sql = 'select f_format_result_set($1,$2,$3)';
                                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_format_result_set", $sql);
                                $result = pg_execute($this->mDatabase->mConnection, "f_format_result_set", array( $this->getSenderEmailId(), 'not authorized', -101));

                                return pg_fetch_result($result, 0);

			}
		}
        }
}

$insertPractice = new InsertPractice();	

?>
