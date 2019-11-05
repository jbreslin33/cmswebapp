<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class SelectPitches extends Screen
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

                $sql = 'select f_select_pitches($1,$2)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_select_pitches", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_select_pitches", array( $this->getSenderEmailId(), $this->mClubId));

                return pg_fetch_result($result, 0);
        }
}
$selectPitches = new SelectPitches();
?>

