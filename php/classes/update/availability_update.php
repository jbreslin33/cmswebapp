<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/update/update.php");

class AvailabilityUpdate extends Update
{
	function __construct() 
	{
		parent::__construct();
		
		if (isset($_GET['affairs_users_availability_id']))
                {
                        $this->mAffairsUsersAvailabilityID = $_GET['affairs_users_availability_id'];
                }

		if (isset($_GET['availability_id']))
                {
                        $this->mAvailabilityID = $_GET['availability_id'];
                }
	}

	public function update()
	{
		error_log('calling update');
		$this->mSQL = "
				update affairs_users_availability set availability_id = " . 
				$this->mAvailabilityID .
				" where affairs_users_availability_id = " .
				$this->mAffairsUsersAvailabilityID .
				";";
	}
}

$availabilityUpdate = new AvailabilityUpdate();

?>
