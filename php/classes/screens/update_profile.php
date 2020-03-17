<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class UpdateProfile extends Screen
{
        function __construct()
        {
		parent::__construct();	
	}
	
	function getResult()
        {
		$profiletype = null;
		$active = null;

		if (isset($_GET['profiletype']))
		{
			$profiletype = $_GET['profiletype'];
			error_log($profiletype);
		}
		if (isset($_GET['active']))
		{
			$active = $_GET['active'];
			error_log($active);
		}

                $sql = 'select f_update_profile($1,$2,$3,$4)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_update_profile", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_update_profile", array( $this->getSenderEmailId(), $this->mPersonId, $profiletype, $active));

                return pg_fetch_result($result, 0);
        }
}

$updateProfile = new UpdateProfile();
?>
