<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/query/query.php");

class GetYourRolesQuery extends Query
{
	function __construct() 
	{
		parent::__construct();
	}

	public function query()
	{
		$this->mQuery = "
			select distinct roles.id, roles.name
			from roles
			join users_clubs_roles on users_clubs_roles.roles_id=roles.id
			join users on users.id=users_clubs_roles.users_id
			where username = '" .
			$this->mUsername .
			"';";
	}
}

$getYourRolesQuery = new GetYourRolesQuery();

?>
