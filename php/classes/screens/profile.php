<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class Profile extends Screen 
{
	function __construct() 
	{
		parent::__construct();
        }

        function getResult()
        {
                $sql = 'select f_profile($1)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_profile", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_profile", array( $this->mPersonId));

                return pg_fetch_result($result, 0);
        }
}

$profile = new Profile();	

?>
