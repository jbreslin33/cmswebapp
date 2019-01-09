<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/query/query.php");

class UserClubsRolesTeamsQuery extends Query
{
	function __construct() 
	{
		parent::__construct();
	}

	public function query()
	{
		$this->mQuery = "
			select teams.id, teams.name
			from users
			full outer join teams_users on teams_users.user_id=users.id
			full outer join teams on teams.id=teams_users.team_id
			where users.username = '" .
			$this->mUsername .
			"' order by teams.name asc";
	}
}

$usersClubsRolesTeamsQuery = new UsersClubsRolesTeamsQuery();

?>
