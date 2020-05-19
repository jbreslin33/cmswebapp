<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class InsertClubParent extends Screen
{
        function __construct()
        {
		parent::__construct();	
	}
	
	function getResult()
        {
		$person_to_change_id = null;

		if (isset($_GET['person_to_change_id']))
		{
			$person_to_change_id = $_GET['person_to_change_id'];
		}
                $sql = 'select f_insert_club_parent($1,$2,$3)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_insert_club_parent", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_insert_club_parent", array( $this->getSenderEmailId(), $this->mPersonId, $person_to_change_id));

                return pg_fetch_result($result, 0);
        }
}

$insertClubParent = new InsertClubParent();
?>
