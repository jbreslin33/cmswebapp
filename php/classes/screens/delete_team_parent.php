<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class DeleteTeamParent extends Screen
{
        function __construct()
        {
		parent::__construct();	
	}

	function getResult()
        {
                $sql = 'select f_delete_team_parent($1,$2,$3,$4,$5)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_delete_team_parent", $sql);
               	$result = pg_execute($this->mDatabase->mConnection, "f_delete_team_parent", array( $this->mFamilyId, $this->mPersonId, $this->mScreenPersonId, $this->mClubId, $this->team_club_parent_id));

                return pg_fetch_result($result, 0);
        }
}

$deleteTeamParent = new DeleteTeamParent();
?>
