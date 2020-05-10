<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class SelectRoles extends Screen
{
        function __construct()
        {
                parent::__construct();
        }

        function getResult()
        {
	   	$sql = 'select f_select_roles($1,$2)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_select_roles", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_select_roles", array( $this->getSenderEmailId(), $this->mPersonId ) );
                $txt = pg_fetch_result($result, 0);
                return $txt;
        }
}

$selectRoles = new SelectRoles();

?>

