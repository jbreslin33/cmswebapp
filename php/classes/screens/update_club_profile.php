<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class UpdateClubProfile extends Screen
{
        function __construct()
        {
		parent::__construct();	
	}
	
	function getResult()
        {
		$profiletype = null;
		$active = null;
		$person_to_change_id = null;

		if (isset($_GET['profiletype']))
		{
			$profiletype = $_GET['profiletype'];
		}
		if (isset($_GET['active']))
		{
			$active = $_GET['active'];
		}
		if (isset($_GET['person_to_change_id']))
		{
			$person_to_change_id = $_GET['person_to_change_id'];
		}
// screen.setUrl("/php/classes/screens/update_club_profile.php?jwt=" + APPLICATION.getJWT() + '&profiletype=' + profileNumber + '&active=' + active + '&person_id=' + personId + '&person_to_change_id=' + person_to_change_id);

                $sql = 'select f_update_club_profile($1,$2,$3,$4,$5)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_update_club_profile", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_update_club_profile", array( $this->getSenderEmailId(), $this->mPersonId, $profiletype, $active, $person_to_change_id));

                return pg_fetch_result($result, 0);
        }
}

$updateClubProfile = new UpdateClubProfile();
?>
