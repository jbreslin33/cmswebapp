<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class SelectFamilies extends Screen
{
        function __construct()
        {
                parent::__construct();
        }

        function getResult()
        {
	   	$sql = 'select f_select_family($1)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_select_family", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_select_family", array( $this->getSenderEmailId() ) );
                return pg_fetch_result($result, 0);
        }
}

$selectFamilies = new SelectFamilies();

?>

