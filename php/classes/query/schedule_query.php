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
			select affairs.id, affairs_users_availability.id, affair_date, arrival_time, start_time, end_time, affairs.address, affairs.coordinates, pitches.name, field_name, teams.name, affair_types.name, availability.id, clubs.name
			from affairs
			full outer join teams on teams.id=affairs.team_id
			full outer join affair_types on affair_types.id=affairs.affair_types_id
			full outer join pitches on pitches.id=affairs.pitch_id
                        full outer join users_clubs_roles_teams on users_clubs_roles_teams.team_id=teams.id
                        full outer join users_clubs_roles on users_clubs_roles.id=users_clubs_roles_teams.users_clubs_roles_id
                        full outer join users on users.id=users_clubs_roles.users_id
                        full outer join clubs on clubs.id=users_clubs_roles.club_id
                       	full outer join affairs_users_availability on affairs_users_availability.affair_id=affairs.id
                        full outer join availability on availability.id=affairs_users_availability.availability_id
			where affair_date >= now() - INTERVAL '1 DAY'  
                        and users.username = '" .
                        $this->mUsername .
			"' order by affair_date asc";
	}
}

$scheduleQuery = new ScheduleQuery();

?>
