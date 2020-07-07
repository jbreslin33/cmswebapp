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
		$availability = null;

		if (isset($_GET['availability']))
		{
			$availability = $_GET['availability'];
		}

                $sql = 'select f_update_availability($1,$2,$3)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_update_availability", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_update_availability", array( $this->mFamilyId, $this->mPersonId ,$availability));

                return pg_fetch_result($result, 0);
        }
}

$upcomingAvailability = new UpcomingAvailability();
?>
