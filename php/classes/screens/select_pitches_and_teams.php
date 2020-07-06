<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class SelectPitchesAndTeams extends Screen
{
        function __construct()
        {
                parent::__construct();
        }

        function getResult()
        {
                $sql = 'select f_select_pitches_and_teams($1,$2)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_select_pitches_and_teams", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_select_pitches_and_teams", array( $this->mPersonId, $this->mClubId));

                return pg_fetch_result($result, 0);
        }
}
$selectPitchesAndTeams = new SelectPitchesAndTeams();
?>

