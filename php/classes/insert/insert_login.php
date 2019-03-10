<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

class InsertLogin 
{
	function __construct() 
	{
                $database = new Database("localhost","cms","postgres","mibesfat");

		$sql = 'select f_insert_native_login($1,$2,$3,$4,$5,$6,$7)';
		
		$prepare_result = pg_prepare($database->mConnection, "f_insert_native_login", $sql);

		$result = pg_execute($database->mConnection, "f_insert_native_login", array( $_GET['email'] ,$_GET['password'], $_GET['first_name'], $_GET['middle_name'], $_GET['last_name'], $_GET['phone'], $_GET['address']));

		echo pg_fetch_result($result, 0); 
        }
}
	$insertLogin = new InsertLogin();	
?>
