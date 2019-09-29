<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class InsertNativeLoginClub extends Screen 
{
	function __construct() 
	{
		parent::__construct();
        }
	
	function getResult()
	{
		$sql = 'select f_insert_native_login_club($1,$2,$3,$4,$5,$6,$7)';
		$prepare_result = pg_prepare($this->mDatabase->mConnection, "f_insert_native_login_club", $sql);
		$result = pg_execute($this->mDatabase->mConnection, "f_insert_native_login_club", array( $_GET['password'], $_GET['first_name'], $_GET['middle_name'], $_GET['last_name'], $_GET['phone'], $_GET['address'], $_GET['club_invite_token']));
                return pg_fetch_result($result, 0);
	}
}
	$insertNativeLoginClub = new InsertNativeLoginClub();	
?>
