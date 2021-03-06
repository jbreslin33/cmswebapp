<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class InsertTeamPlayer extends Screen
{
        function __construct()
        {
		parent::__construct();	
	}
	
	function getResult()
        {
                $sql = 'select f_insert_team_player($1,$2,$3,$4,$5)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_insert_team_player", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_insert_team_player", array( $this->mFamilyId, $this->mPersonId, $this->mScreenPersonId, $this->mTeamId, $this->mClubId));

                return pg_fetch_result($result, 0);
        }
}

$insertTeamPlayer = new InsertTeamPlayer();
?>
