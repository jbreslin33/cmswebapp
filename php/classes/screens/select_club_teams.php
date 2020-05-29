<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class SelectClubTeams extends Screen
{
        function __construct()
        {
                parent::__construct();
        }

        function getResult()
        {
                $sql = 'select f_select_club_teams($1,$2,$3)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_select_club_teams", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_select_club_teams", array( $this->getSenderEmailId(), $this->mPersonId, $this->mClubId));

                return pg_fetch_result($result, 0);
        }
}
$selectClubTeams = new SelectClubTeams();
?>

