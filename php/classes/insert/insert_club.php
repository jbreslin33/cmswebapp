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
                $database = new Database("localhost","cms","postgres","mibesfat");
		$sql = 'select f_insert_club($1,$2,$3,$4)';
		$prepare_result = pg_prepare($database->mConnection, "f_insert_club", $sql);
		$result = pg_execute($database->mConnection, "f_insert_club", array( $_GET['name'] ,$_GET['address'], $this->getSenderEmailId(), $_GET['person_id']));

                return pg_fetch_result($result, 0);
	}
}

$insertClub = new InsertClub();	

?>
