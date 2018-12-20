<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/query/query.php");

class ScheduleQuery extends Query
{
	function __construct() 
	{
		parent::__construct();
	}

	public function query()
	{
		$this->mQuery = "
		select affair_types.name, affair_date, start_time, arrival_time, affairs.address from affairs join teams on teams.id=affairs.team_id join teams_users on teams_users.team_id=teams.id join users on users.id=teams_users.user_id join affair_types on affair_types.id=affairs.affair_types_id where users.username = '" .
		$this->mUsername .
		"' order by affair_date asc";
		error_log($this->mQuery);
	}
}

$scheduleQuery = new ScheduleQuery();

?>
