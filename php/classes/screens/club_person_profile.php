<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class ClubPersonProfile extends Screen 
{
	function __construct() 
	{
		parent::__construct();
        }


        function getResult()
        {
                $sql = 'select f_club_person_profile($1,$2,$3,$4)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_club_person_profile", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_club_person_profile", array( $this->mFamilyId, $this->mPersonId, $this->mClubId, $this->mScreenPersonId));

                return pg_fetch_result($result, 0);
        }
}

$clubpersonprofile = new ClubPersonProfile();	

?>
