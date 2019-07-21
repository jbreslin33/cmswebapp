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

                $database = new Database("localhost","cms","postgres","mibesfat");
                $sql = 'select f_insert_team($1,$2,$3,$4)';
                $prepare_result = pg_prepare($database->mConnection, "f_insert_team", $sql);
		$email_id = $this->getSenderEmailId();
		error_log($email_id);
                $result = pg_execute($database->mConnection, "f_insert_team", array( $email_id, $club_id, $person_id, $name));
                return pg_fetch_result($result, 0);
        }

}

$insertTeam = new InsertTeam();	
$insertTeam->sendToClient();

?>
