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
			select eventos.id, eventos_users_availability.id, evento_date, arrival_time, start_time, end_time, eventos.address, eventos.coordinates, pitches.name, field_name, teams.name, evento_types.name, availability.id, clubs.name
			from eventos
			full outer join teams on teams.id=eventos.team_id
			full outer join evento_types on evento_types.id=eventos.evento_types_id
			full outer join pitches on pitches.id=eventos.pitch_id
                        full outer join users_clubs_roles_teams on users_clubs_roles_teams.team_id=teams.id
                        full outer join users_clubs_roles on users_clubs_roles.id=users_clubs_roles_teams.users_clubs_roles_id
                        full outer join users on users.id=users_clubs_roles.users_id
                        full outer join clubs on clubs.id=users_clubs_roles.club_id
                       	full outer join eventos_users_availability on eventos_users_availability.evento_id=eventos.id
                        full outer join availability on availability.id=eventos_users_availability.availability_id
			where evento_date >= now() - INTERVAL '1 DAY'  
                        and users.username = '" .
                        $this->mUsername .
			"' order by evento_date asc";
	}
}

$scheduleQuery = new ScheduleQuery();

?>
