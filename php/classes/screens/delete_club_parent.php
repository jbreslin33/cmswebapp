<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class DeleteClubParent extends Screen
{
        function __construct()
        {
		parent::__construct();	
	}
	
	function getResult()
        {
                $sql = 'select f_delete_club_parent($1,$2,$3,$4)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_delete_club_parent", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_delete_club_parent", array( $this->getSenderEmailId(), $this->mPersonId, $this->mScreenPersonId, $this->mClubId));

                return pg_fetch_result($result, 0);
        }
}

$deleteClubParent = new DeleteClubParent();
?>
