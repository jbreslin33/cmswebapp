<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert_club.php");

class CreateClub 
{
	function __construct() 
	{
		$this->mEcho = null;

                if (isset($_GET['name']))
                {
                        $this->mName = $_GET['name'];
                }

                if (isset($_GET['street']))
                {
                        $this->mStreet = $_GET['street'];
                }

                if (isset($_GET['city']))
                {
                        $this->mCity = $_GET['city'];
                }

                if (isset($_GET['state']))
                {
                        $this->mState = $_GET['state'];
                }

                if (isset($_GET['zip']))
                {
                        $this->mZip = $_GET['zip'];
                }

		$this->mInsertClub = null;
		
		
		$this->mInsertClub = new InsertClub($this->mName, $this->mStreet, $this->mCity, $this->mState, $this->mZip);


		if ($this->mInsertClub->mSuccess == true)
		{
			error_log("SUCCESS ON CLUB INSERT");
			//$this->mInsertLogin = new InsertLogin($this->mInsertEmail->mID, $this->mPassword);
		}
		else
		{
			//no need for rollback because nothing went thru as yet
			error_log("FAILURE ON CLUB INSERT");
		}
/*
		if ($this->mInsertPersonsEmails->mSuccess == true)
		{
			error_log("SUCCESS ON PERSONS_EMAILS INSERT");
			$this->mEcho = "100";
		}
		else
		{
			//roll back everything
			//delete from persons where id = $this->mInsertLogin->mID
		}
 */		
		echo $this->mEcho;
	}
}
	$createCLub = new CreateClub();	

?>
