<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class InsertPitch extends Screen 
{
	function __construct() 
	{
		parent::__construct();
        }

        function getResult()
        {
                $club_id = null;
                $person_id = null;
                $name = null;

                if (isset($_GET['club_id']))
                {
                        $club_id = $_GET['club_id'];
                }
                if (isset($_GET['person_id']))
                {
                        $person_id = $_GET['person_id'];
                }
                if (isset($_GET['name']))
                {
                        $name = $_GET['name'];
                }

                $sql = 'select f_insert_pitch($1,$2,$3,$4)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_insert_pitch", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_insert_pitch", array( $this->getSenderEmailId(), $club_id, $person_id, $name));

                return pg_fetch_result($result, 0);
        }
}

$insertPitch = new InsertPitch();	

?>
