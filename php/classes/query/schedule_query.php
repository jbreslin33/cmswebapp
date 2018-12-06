<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/query/query.php");

class ScheduleQuery extends Query
{
	function __construct() 
	{
		parent::__construct();
	}

	public function sendResponse()
	{
		error_log($this->mEcho);
		echo $this->mEcho;
	}

	public function query()
	{
		$query = "
		select event_date, start_time, practices.address from practices join teams on teams.id=practices.team_id join teams_users on teams_users.team_id=teams.id join users on users.id=teams_users.user_id where users.username = 'j' order by event_date asc";
		$database = new Database();

		$results = $database->query($query);

		$myarray = array();

		$resultArray = pg_fetch_all($results);

		while ($row = pg_fetch_row($results))
		{
        		$myarray[] = $row;
		}
		$data = json_encode($myarray);
		error_log($data);
		echo $data;
	}
}

$scheduleQuery = new ScheduleQuery();

?>
