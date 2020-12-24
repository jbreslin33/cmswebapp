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
		$delete_person_id = null;

               	if (isset($_GET['delete_person_id']))
                {
                        $delete_person_id = $_GET['delete_person_id'];
                }

		$sql = 'select f_delete_person($1,$2,$3)';
		$prepare_result = pg_prepare($this->mDatabase->mConnection, "f_delete_person", $sql);
		$result = pg_execute($this->mDatabase->mConnection, "f_delete_person", array( $this->getFamilyId(), $this->mPersonId, $delete_person_id));

               	return pg_fetch_result($result, 0);
        }
}

$deletePerson = new DeletePerson();	

?>
