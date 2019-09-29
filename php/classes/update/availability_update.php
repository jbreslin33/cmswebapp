<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/update/update.php");

class AvailabilityUpdate extends Update
{
	function __construct() 
	{
		
		if (isset($_GET['eventoss_users_availability_id']))
                {
                        $this->mEventosUsersAvailabilityID = $_GET['eventoss_users_availability_id'];
                }

		if (isset($_GET['availability_id']))
                {
                        $this->mAvailabilityID = $_GET['availability_id'];
                }

		parent::__construct();
	}

	public function update()
	{
		$this->mSQL = "
				update eventoss_users_availability set availability_id = " . 
				$this->mAvailabilityID .
				" where eventoss_users_availability.id = " .
				$this->mEventosUsersAvailabilityID .
				";";
	}
}

$availabilityUpdate = new AvailabilityUpdate();

?>
