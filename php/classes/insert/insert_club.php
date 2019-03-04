<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

class AddClub 
{
	function __construct() 
	{
                $database = new Database("localhost","cms","postgres","mibesfat");

		$sql = 'select f_add_club($1,$2)';
		
		$prepare_result = pg_prepare($database->mConnection, "f_add_club", $sql);

		$result = pg_execute($database->mConnection, "f_add_club", array( $_GET['name'] ,$_GET['address']));

		echo pg_fetch_result($result, 0); 
        }
}
	$addClub = new AddClub();	
?>
