<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class MainScreen extends Screen
{
        function __construct()
        {
		parent::__construct();	
	}

	function getResults()
	{
                $sql = 'select f_select_events($1)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_select_events", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_select_events", array( $this->getSenderEmailId()));
	
		error_log("heere");
		error_log($result);
		
		return pg_fetch_result($result, 0);
	}
}

$mainScreen = new MainScreen();
?>
