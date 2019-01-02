<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/query/query.php");

class PitchQuery extends Query
{
	function __construct() 
	{
		parent::__construct();
	/*	
		$this->mClubID = "";

                //check for proper post or get
                if (isset($_POST['club_id']))
                {
                        $this->mClubID = $_POST['club_id'];
                }
                if (isset($_GET['club_id']))
                {
                        $this->mClubID = $_GET['club_id'];
                }
	 */
	}

	public function query()
	{
		$tempClubID = 1;
		$this->mQuery = "
			select pitches.id, pitches.name
			from users
			full outer join clubs_users on clubs_users.user_id=users.id
			full outer join clubs on clubs.id=clubs_users.club_id
			full outer join pitches on pitches.club_id=clubs.id
			where users.username = '" .
			$this->mUsername .
			"' and clubs.id = " . 
			//$this->mClubID .
			$tempClubID .
			" order by pitches.name asc";
	}
}

$pitchQuery = new PitchQuery();

?>
