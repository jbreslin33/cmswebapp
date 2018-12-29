<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/query/query.php");

class PitchQuery extends Query
{
	function __construct() 
	{
		parent::__construct();
	}

	public function query()
	{
		$this->mQuery = "
			select pitches.id, pitches.name
			from users
			full outer join clubs_users on clubs_users.user_id=users.id
			full outer join clubs on clubs.id=clubs_users.club_id
			full outer join pitches on pitches.club_id=clubs.id
			where users.username = '" .
			$this->mUsername .
			"' order by pitches.name asc";
			error_log($this->mQuery);
	}
}

$pitchQuery = new PitchQuery();

?>
