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

                        select distinct eventos.id, evento_date, arrival_time, start_time, end_time, eventos.address, eventos.coordinates, pitches.name, field_name, teams.name, evento_types.name, availability.id, clubs.name

                        from eventos

                        full outer join pitches on pitches.id=eventos.pitch_id
                        full outer join evento_types on evento_types.id=eventos.evento_types_id

                        full outer join eventos_players_availability on eventos_players_availability.evento_id=eventos.id
                        full outer join availability on availability.id=eventos_players_availability.availability_id

                        full outer join teams on teams.id=eventos.team_id
                        full outer join clubs on clubs.id=teams.club_id

                        full outer join team_members on team_members.team_id=teams.id

                        full outer join club_members on club_members.id=team_members.club_members_id
                        full outer join site_members on site_members.id=club_members.site_member_id
                        full outer join users on users.id=site_members.user_id

			where evento_date >= now() - INTERVAL '1 DAY'  
                        and users.username = '" .
                        $this->mUsername .
			"' order by evento_date asc";
	}
}

$scheduleQuery = new ScheduleQuery();

?>
