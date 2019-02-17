<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert_email.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert_login.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert_person.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert_persons_logins.php");

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

                if (isset($_GET['address']))
                {
                        $this->mAddress = $_GET['address'];
                }

                if (isset($_GET['email']))
                {
                        $this->mEmail = $_GET['email'];
                }
		
		if (isset($_GET['username']))
                {
                        $this->mUsername = $_GET['username'];
                }
                if (isset($_GET['password']))
                {
                        $this->mPassword = $_GET['password'];
                }

		$insertEmail = new InsertEmail($this->mEmail);
		$insertLogin = new InsertLogin($this->mUsername, $this->mPassword,$insertEmail->mID);
		$insertPerson = new InsertPerson($this->mFirstName, $this->mMiddleName, $this->mLastName, $this->mPhone, $this->mAddress);
		$insertPersonsLogins = new InsertPersonsLogins($insertPerson->mID, $insertLogin->mID);
	}
}
	$join = new Join();	

?>
