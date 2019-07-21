<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class NativeLogin extends Screen
{
        function __construct()
        {
		parent::__construct();
	}

	function getResult()
	{
                $sql = 'select f_native_login($1,$2)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_native_login", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_native_login", array( $_GET['email'],$_GET['password']));
		
		return pg_fetch_result($result, 0);
	}
}

$nativeLogin = new NativeLogin();

?>
