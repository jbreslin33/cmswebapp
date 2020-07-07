<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class DeleteGame extends Screen 
{
	function __construct() 
	{
		parent::__construct();
	}

	function getResult()
	{
		$sql = 'select f_delete_game($1,$2,$3,$4)';
		$prepare_result = pg_prepare($this->mDatabase->mConnection, "f_delete_game", $sql);
		$result = pg_execute($this->mDatabase->mConnection, "f_delete_game", array( $this->mFamilyId, $this->mPersonId, $this->mTeamId, $this->mGameId));

               	return pg_fetch_result($result, 0);
        }
}

$deleteGame = new DeleteGame();	

?>
