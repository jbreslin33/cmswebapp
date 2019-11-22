<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class SelectAdministratedClubs extends Screen
{
        function __construct()
        {
                parent::__construct();
        }

        function getResult()
        {
	   	$sql = 'select f_select_administrated_clubs($1)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_select_administrated_clubs", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_select_administrated_clubs", array( $this->getSenderEmailId() ) );
                return pg_fetch_result($result, 0);
        }
}

$selectPersons = new SelectPersons();

?>

