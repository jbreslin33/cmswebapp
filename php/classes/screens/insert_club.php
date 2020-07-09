<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class InsertClub extends Screen
{
	function __construct() 
	{
		parent::__construct();
        }

	function getResult()
	{
		$sql = 'select f_insert_club($1,$2,$3,$4)';
		$prepare_result = pg_prepare($this->mDatabase->mConnection, "f_insert_club", $sql);
		$result = pg_execute($this->mDatabase->mConnection, "f_insert_club", array( $this->mFamilyId, $this->mPersonId, $this->mName, $this->mAddress));

                return pg_fetch_result($result, 0);
	}
}

$insertClub = new InsertClub();	

?>
