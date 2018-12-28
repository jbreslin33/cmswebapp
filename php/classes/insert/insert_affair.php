<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");

class InsertAffair extends Insert
{
	function __construct() 
	{
		parent::__construct();
	}

	public function query()
	{
		$this->mSQL = "
		select affair_date, arrival_time, start_time, end_time, affairs.address, affairs.coordinates, pitches.name, field_name, teams.name, affair_types.name from affairs FULL OUTER JOIN teams on teams.id=affairs.team_id FULL OUTER JOIN teams_users on teams_users.team_id=teams.id FULL OUTER JOIN users on users.id=teams_users.user_id FULL OUTER JOIN affair_types on affair_types.id=affairs.affair_types_id FULL OUTER JOIN pitches on pitches.id=affairs.pitch_id where users.username = '" .
		$this->mUsername .
		"' order by affair_date asc";
		error_log($this->mSQL);
	}
}

$insertAffair = new InsertAffair();

?>
