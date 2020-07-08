<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class SelectClubPitches extends Screen
{
        function __construct()
        {
                parent::__construct();
        }

        function getResult()
        {
                $sql = 'select f_select_club_pitches($1,$2)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_select_club_pitches", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_select_club_pitches", array( $this->mFamilyId, $this->mClubId));

                return pg_fetch_result($result, 0);
        }
}
$selectClubPitches = new SelectClubPitches();
?>

