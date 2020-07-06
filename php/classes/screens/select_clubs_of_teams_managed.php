<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class SelectClubsOfTeamsManaged extends Screen
{
        function __construct()
        {
                parent::__construct();
        }

        function getResult()
        {
	   	$sql = 'select f_select_clubs_of_teams_managed($1)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_select_clubs_of_teams_managed", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_select_clubs_of_teams_managed", array( $this->mPersonId ) );
                $txt = pg_fetch_result($result, 0);
                return $txt;
        }
}

$selectClubsOfTeamsManaged = new SelectClubsOfTeamsManaged();

?>

