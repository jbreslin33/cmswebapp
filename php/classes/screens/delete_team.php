<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class DeleteTeam extends Screen 
{
	function __construct() 
	{
		parent::__construct();
	}

	function getResult()
	{
		$team_id = null;

               	if (isset($_GET['team_id']))
                {
                        $team_id = $_GET['team_id'];
                }

		$sql = 'select f_delete_team($1,$2,$3)';
		$prepare_result = pg_prepare($this->mDatabase->mConnection, "f_delete_team", $sql);
		$result = pg_execute($this->mDatabase->mConnection, "f_delete_team", array( $this->getSenderEmailId(), $this->mPersonId, $team_id));

               	return pg_fetch_result($result, 0);
        }
}

$deleteTeam = new DeleteTeam();	

?>
