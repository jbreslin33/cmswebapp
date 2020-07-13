<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class DeleteClubPlayerLead extends Screen
{
        function __construct()
        {
		parent::__construct();	
	}
	
	function getResult()
        {
                $sql = 'select f_delete_club_player_lead($1,$2,$3,$4)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_delete_club_player_lead", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_delete_club_player_lead", array( $this->mFamilyId, $this->mPersonId, $this->mScreenPersonId, $this->mClubId));

                return pg_fetch_result($result, 0);
        }
}

$deleteClubPlayerLead = new DeleteClubPlayerLead();
?>
