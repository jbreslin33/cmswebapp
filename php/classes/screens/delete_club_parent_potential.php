<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class DeleteClubParentPotential extends Screen
{
        function __construct()
        {
		parent::__construct();	
	}
	
	function getResult()
        {
                $sql = 'select f_delete_club_parent_potential($1,$2,$3,$4)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_delete_club_parent_potential", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_delete_club_parent_potential", array( $this->getSenderEmailId(), $this->mPersonId, $this->mScreenPersonId, $this->mClubId));

                return pg_fetch_result($result, 0);
        }
}

$deleteClubParentPotential = new DeleteClubParentPotential();
?>
