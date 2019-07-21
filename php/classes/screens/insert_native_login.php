<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class InsertNativeLogin extends Screen 
{
	function __construct() 
	{
		parent::__construct();	
	}
		
	function getResult()
	{
		$sql = 'select f_insert_native_login($1,$2,$3,$4,$5,$6,$7)';
		$prepare_result = pg_prepare($this->mDatabase->mConnection, "f_insert_native_login", $sql);
		$result = pg_execute($this->mDatabase->mConnection, "f_insert_native_login", array( $_GET['email'] , $_GET['password'], $_GET['first_name'], $_GET['middle_name'], $_GET['last_name'], $_GET['phone'], $_GET['address']));
                return pg_fetch_result($result, 0);
	}
}

$insertNativeLogin = new InsertNativeLogin();	

?>
