<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

class JoinSite 
{
	function __construct() 
	{
		$this->mEcho = null;

                $database = new Database("localhost","cms","postgres","mibesfat");

		$sql = 'select p_joinsite($1,$2,$3,$4,$5,$6,$7)';
		
		$prepare_result = pg_prepare($database->mConnection, "p_joinsite", $sql);

		$result = pg_execute($database->mConnection, "p_joinsite", array( $_GET['email'] ,$_GET['password'], $_GET['first_name'], $_GET['middle_name'], $_GET['last_name'], $_GET['phone'], $_GET['address']));

		echo pg_fetch_result($result, 0); 
        }
}
	$joinSite = new JoinSite();	
?>
