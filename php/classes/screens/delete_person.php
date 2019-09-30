<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class DeletePerson extends Screen 
{
	function __construct() 
	{
		parent::__construct();
	}

	function getResult()
	{
		$person_id = null;

               	if (isset($_GET['person_id']))
                {
                        $person_id = $_GET['person_id'];
                }

		$sql = 'select f_delete_person($1,$2,$3,$4,$5)';
		$prepare_result = pg_prepare($this->mDatabase->mConnection, "f_delete_person", $sql);
		$result = pg_execute($this->mDatabase->mConnection, "f_delete_person", array( $this->getSenderEmailId(), $this->mPersonId, $this->mClubId, $this->mTeamId, $person_id));

               	return pg_fetch_result($result, 0);
        }
}

$deletePerson = new DeletePerson();	

?>
