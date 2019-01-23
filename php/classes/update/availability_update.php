<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/update/update.php");

class AvailabilityUpdate extends Update
{
	function __construct() 
	{
		
		if (isset($_GET['eventoss_users_availability_id']))
                {
                        $this->mAffairsUsersAvailabilityID = $_GET['eventoss_users_availability_id'];
			error_log('got 1');
                }

		if (isset($_GET['availability_id']))
                {
                        $this->mAvailabilityID = $_GET['availability_id'];
			error_log('got 2');
                }

		parent::__construct();
	}

	public function update()
	{
		error_log('calling update');
		$this->mSQL = "
				update eventoss_users_availability set availability_id = " . 
				$this->mAvailabilityID .
				" where eventoss_users_availability.id = " .
				$this->mAffairsUsersAvailabilityID .
				";";
	}
}

$availabilityUpdate = new AvailabilityUpdate();

?>
