<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/update/update.php");

class AvailabilityUpdate extends Update
{
	function __construct() 
	{
		parent::__construct();
		
		if (isset($_GET['affairs_id']))
                {
                        $this->mAffairsID = $_GET['affairs_id'];
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
				" where affairs_id = " .
				$this->mAffairsID .
				" and $
3 where affair_id = 5 and users_id = 1;";




		           join users on users.id=users_clubs_roles.users_id
                        where username = '" .
                        $this->mUsername .
                        "';";

	}
}

$availabilityUpdate = new AvailabilityUpdate();

?>
