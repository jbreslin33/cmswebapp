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
                $name = null;

                if (isset($_GET['name']))
                {
                        $name = $_GET['name'];
                }

                $sql = 'select f_insert_team($1,$2,$3,$4)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_insert_team", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_insert_team", array( $this->getSenderEmailId(), $this->mPersonId, $this->mClubId, $name));

                return pg_fetch_result($result, 0);
        }
}

$insertTeam = new InsertTeam();	

?>
