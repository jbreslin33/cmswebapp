<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert_email.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert_login.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert_person.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert_persons_logins.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert_persons_emails.php");

class Join 
{
	function __construct() 
	{

                if (isset($_GET['first_name']))
                {
                        $this->mFirstName = $_GET['first_name'];
                }
                if (isset($_GET['middle_name']))
                {
                        $this->mMiddleName = $_GET['middle_name'];
                }

                if (isset($_GET['last_name']))
                {
                        $this->mLastName = $_GET['last_name'];
                }

                if (isset($_GET['phone']))
                {
                        $this->mPhone = $_GET['phone'];
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

                if (isset($_GET['email']))
                {
                        $this->mEmail = $_GET['email'];
                }
		
                if (isset($_GET['password']))
                {
                        $this->mPassword = $_GET['password'];
                }

		$insertEmail = new InsertEmail($this->mEmail);
		if ($insertEmail->mSuccess == true)
		{
			error_log("SUCCESS ON EMAIL INSERT");
		}
		else
		{
			error_log("FAILURE ON EMAIL INSERT");
		}
		$insertLogin = new InsertLogin($insertEmail->mID, $this->mPassword);
		$insertPerson = new InsertPerson($this->mFirstName, $this->mMiddleName, $this->mLastName, $this->mPhone, $this->mStreet, $this->mCity, $this->mState, $this->mZip);
		$insertPersonsLogins = new InsertPersonsLogins($insertPerson->mID, $insertLogin->mID);
		$insertPersonsEmails = new InsertPersonsEmails($insertPerson->mID, $insertEmail->mID);
	}
}
	$join = new Join();	

?>
