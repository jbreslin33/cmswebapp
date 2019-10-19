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
		$sql = 'select f_choose_person($1)';
		$prepare_result = pg_prepare($this->mDatabase->mConnection, "f_choose_person", $sql);
		$result = pg_execute($this->mDatabase->mConnection, "f_choose_person", array( $this->getSenderEmailId()));

               	return pg_fetch_result($result, 0);
        }
}

$choosePerson = new ChoosePerson();	

?>
