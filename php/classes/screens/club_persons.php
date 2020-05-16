<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class ClubPerson extends Screen 
{
	function __construct() 
	{
		parent::__construct();
        }

        function getResult()
        {
                $sql = 'select f_club_persons($1,$2,$3)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_club_persons", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_club_persons", array( $this->getSenderEmailId(), $this->mPersonId, $this->mClubId));

                return pg_fetch_result($result, 0);
        }
}

$clubperson = new ClubPerson();	

?>
