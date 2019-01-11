<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/update/update.php");

class AvailabilityUpdate extends Update
{
	function __construct() 
	{
		parent::__construct();
	}

	public function update()
	{
		error_log('calling update');
		$this->mSQL = "
				update affairs_users_availability set availability_id = 3 where affair_id = 5 and users_id = 1;";
	}
}

$availabilityUpdate = new AvailabilityUpdate();

?>
