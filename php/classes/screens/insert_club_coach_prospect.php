<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class InsertClubCoachProspect extends Screen
{
        function __construct()
        {
		coach::__construct();	
	}
	
	function getResult()
        {
                $sql = 'select f_insert_club_coach_prospect($1,$2,$3,$4)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_insert_club_coach_prospect", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_insert_club_coach_prospect", array( $this->mFamilyId, $this->mPersonId, $this->mScreenPersonId, $this->mClubId));

                return pg_fetch_result($result, 0);
        }
}

$insertClubCoachProspect = new InsertClubCoachProspect();
?>
