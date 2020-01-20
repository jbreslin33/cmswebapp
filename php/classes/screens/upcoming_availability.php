<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class UpcomingAvailability extends Screen
{
        function __construct()
        {
		parent::__construct();	
	}
	
	function getResult()
        {
		error_log('upcoming availablity called');

		$available_practices = null;
		$available_games = null;
		$not_available_practices = null;
		$not_available_games = null;
		$maybe_available_practices = null;
		$maybe_available_games = null;

		if (isset($_GET['available_practices']))
		{
			$available_practices = $_GET['available_practices'];
			$txt = 'A';
			$txt .= $available_practices;
			error_log($txt);
		}
		if (isset($_GET['available_games']))
		{
			$available_games = $_GET['available_games'];
			$txt = 'B';
			$txt .= $available_games;
			error_log($txt);
		}
		if (isset($_GET['not_available_practices']))
		{
			$not_available_practices = $_GET['not_available_practices'];
			$txt = 'C';
			$txt .= $not_available_practices;
			error_log($txt);
		}
		if (isset($_GET['not_available_games']))
		{
			$not_available_games = $_GET['not_available_games'];
			$txt = 'D';
			$txt .= $not_available_gmaes;
			error_log($txt);
		}
		if (isset($_GET['maybe_available_practices']))
		{
			$maybe_available_practices = $_GET['maybe_available_practices'];
			$txt = 'E';
			$txt .= $maybe_available_practices;
			error_log($txt);
		}
		if (isset($_GET['maybe_available_games']))
		{
			$maybe_available_games = $_GET['maybe_available_games'];
			$txt = 'F';
			$txt .= $maybe_available_games;
			error_log($txt);
		}

                $sql = 'select f_update_availability($1,$2,$3,$4,$5,$6,$7)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_update_availability", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_update_availability", array( $this->getSenderEmailId(), $available_practices, $available_games, $not_available_practices, $not_available_games, $maybe_available_practices, $maybe_available_games));

                return pg_fetch_result($result, 0);
        }

}

$upcomingAvailability = new UpcomingAvailability();
?>
