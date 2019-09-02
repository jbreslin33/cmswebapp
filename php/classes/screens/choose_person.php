<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class ChoosePerson extends Screen 
{
	function __construct() 
	{
		parent::__construct();
	}

	function getResult()
	{
               	if (isset($_GET['person_id']))
                {
                        $this->mPersonId = $_GET['person_id'];
                }

		$sql = 'select f_choose_person($1,$2)';
		$prepare_result = pg_prepare($this->mDatabase->mConnection, "f_choose_person", $sql);
		$result = pg_execute($this->mDatabase->mConnection, "f_choose_person", array( $this->getSenderEmailId(), $this->mPersonId));

               	return pg_fetch_result($result, 0);
        }
}

$choosePerson = new ChoosePerson();	

?>
