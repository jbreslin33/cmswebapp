<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class DeletePractice extends Screen 
{
	function __construct() 
	{
		parent::__construct();
	}

	function getResult()
	{
		$sql = 'select f_delete_practice($1,$2,$3,$4)';
		$prepare_result = pg_prepare($this->mDatabase->mConnection, "f_delete_practice", $sql);
		$result = pg_execute($this->mDatabase->mConnection, "f_delete_practice", array( $this->mFamilyId, $this->mPersonId, $this->mTeamId, $this->mPracticeId));

               	return pg_fetch_result($result, 0);
        }
}

$deletePractice = new DeletePractice();	

?>
