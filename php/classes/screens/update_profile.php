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
		$profile_update = null;

		if (isset($_GET['profile_update']))
		{
			$availability = $_GET['profile_update'];
			error_log($profile_update);
		}

                $sql = 'select f_update_profile($1,$2)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_update_profile", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_update_profile", array( $this->getSenderEmailId(), $profile_update));

                return pg_fetch_result($result, 0);
        }
}

$updateProfile = new UpdateProfile();
?>
