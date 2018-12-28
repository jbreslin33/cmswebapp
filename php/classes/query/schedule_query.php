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
		select affair_date, arrival_time, start_time, end_time, affairs.address, affairs.coordinates, pitches.name, field_name, teams.name, affair_types.name from affairs FULL OUTER JOIN teams on teams.id=affairs.team_id FULL OUTER JOIN teams_users on teams_users.team_id=teams.id FULL OUTER JOIN users on users.id=teams_users.user_id FULL OUTER JOIN affair_types on affair_types.id=affairs.affair_types_id FULL OUTER JOIN pitches on pitches.id=affairs.pitch_id where affair_date >= now() AND users.username = '" .
		$this->mUsername .
		"' order by affair_date asc";
		error_log($this->mQuery);
	}
}

$scheduleQuery = new ScheduleQuery();

?>
