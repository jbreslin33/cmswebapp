<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");

class InsertEvento extends Insert
{
	function __construct() 
	{
		parent::__construct();
	}

	public function query()
	{
		$this->mSQL = "
		select evento_date, arrival_time, start_time, end_time, eventos.address, eventos.coordinates, pitches.name, field_name, teams.name, evento_types.name from eventos FULL OUTER JOIN teams on teams.id=eventos.team_id FULL OUTER JOIN teams_users on teams_users.team_id=teams.id FULL OUTER JOIN users on users.id=teams_users.user_id FULL OUTER JOIN evento_types on evento_types.id=eventos.evento_types_id FULL OUTER JOIN pitches on pitches.id=eventos.pitch_id where users.username = '" .
		$this->mUsername .
		"' order by evento_date asc";
	}
}

$insertEvento = new InsertEvento();

?>
