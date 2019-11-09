<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class SelectedPerson extends Screen 
{
	function __construct() 
	{
		parent::__construct();
	}
	
	function getResult()
	{
		$sql = 'select f_selected_person($1,$2)';
		$prepare_result = pg_prepare($this->mDatabase->mConnection, "f_selected_person", $sql);
		$result = pg_execute($this->mDatabase->mConnection, "f_selected_person", array( $this->getSenderEmailId(), $this->mPersonId ));
               	return pg_fetch_result($result, 0);
        }
}

$selectedPerson = new SelectedPerson();	

?>
