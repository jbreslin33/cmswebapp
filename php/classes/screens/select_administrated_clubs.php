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
		error_log('getResult() in selectadmincl');
	   	$sql = 'select f_select_administrated_clubs($1,$2)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_select_administrated_clubs", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_select_administrated_clubs", array( $this->getSenderEmailId(), $this->mPersonId ) );

                $txt = pg_fetch_result($result, 0);
		error_log($txt);
                return $txt;

        }
}
$selectAdministratedClubs = new SelectAdministratedClubs();

?>

