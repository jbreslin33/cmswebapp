<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class SelectPersons extends Screen
{
        function __construct()
        {
                parent::__construct();
        }

        function getResult()
        {
	   	$sql = 'select f_select_persons($1)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_select_persons", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_select_persons", array( $this->mFamilyId ) );
                return pg_fetch_result($result, 0);
        }
}

$selectPersons = new SelectPersons();

?>

