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
                $club_id = null;

                if (isset($_GET['club_id']))
                {
                        $club_id = $_GET['club_id'];
                }

                $sql = 'select f_select_pitches_and_teams($1,$2,$3)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_select_pitches_and_teams", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_select_pitches_and_teams", array( $this->getSenderEmailId(), $this->mClubId, $this->mPersonId));

                return pg_fetch_result($result, 0);
        }
}
$selectPitchesAndTeams = new SelectPitchesAndTeams();
?>

