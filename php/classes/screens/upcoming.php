<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class UpcomingScreen extends Screen
{
        function __construct()
        {
		parent::__construct();	
	}
	
	function getResult()
        {
                $first_day_of_query = null;
                $last_day_of_query = null;

                if (isset($_GET['first_day_of_query']))
                {
                        $first_day_of_query = $_GET['first_day_of_query'];
                }
                if (isset($_GET['last_day_of_query']))
                {
                        $last_day_of_query = $_GET['last_day_of_query'];
                }

                $sql = 'select f_select_events($1,$2,$3,$4)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_select_events", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_select_events", array( $this->getSenderEmailId(), $this->mPersonId, $first_day_of_query, $last_day_of_query));

                return pg_fetch_result($result, 0);
        }

}

$upcomingScreen = new UpcomingScreen();
?>
