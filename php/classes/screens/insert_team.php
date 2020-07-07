<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class InsertTeam extends Screen 
{
	function __construct() 
	{
		parent::__construct();
        }

        function getResult()
        {
                $sql = 'select f_insert_team($1,$2,$3,$4)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_insert_team", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_insert_team", array( $this->mFamilyId, $this->mPersonId, $this->mClubId, $this->mName));

                return pg_fetch_result($result, 0);
        }
}

$insertTeam = new InsertTeam();	

?>
