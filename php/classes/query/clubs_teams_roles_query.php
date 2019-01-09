<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/query/query.php");

class ClubsTeamsRolesQuery extends Query
{
	function __construct() 
	{
		parent::__construct();
	}

	public function query()
	{
		$this->mQuery = "
			select users_clubs_roles_teams.id, clubs.name, roles.name, roles.id, teams.name, users_clubs_roles_teams.default_timestamp
                        from users
                        full outer join users_clubs_roles on users_clubs_roles.users_id=users.id
                        join users_clubs_roles_teams on users_clubs_roles_teams.users_clubs_roles_id=users_clubs_roles.id
                        join clubs on clubs.id=users_clubs_roles.club_id
                        join roles on roles.id=users_clubs_roles.roles_id
                        join teams on teams.id=users_clubs_roles_teams.team_id
			where users.username = '" .
			$this->mUsername .
                        "' order by users_clubs_roles_teams.default_timestamp desc";
	}
}

$ClubsTeamsRolesQuery = new ClubsTeamsRolesQuery();

?>
