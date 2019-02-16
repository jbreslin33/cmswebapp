<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert_email.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert_login.php");

class Join 
{
	function __construct() 
	{

                if (isset($_GET['first_name']))
                {
			error_log("first name got");
                        $this->mFirstName = $_GET['first_name'];
                }
                if (isset($_GET['middle_name']))
                {
			error_log("middle name got");
                        $this->mMiddleName = $_GET['middle_name'];
                }

                if (isset($_GET['last_name']))
                {
			error_log("last name got");
                        $this->mLastName = $_GET['last_name'];
                }

                if (isset($_GET['phone']))
                {
			error_log("phonegot");
                        $this->mPhone = $_GET['phone'];
                }

                if (isset($_GET['address']))
                {
			error_log("addressl got");
                        $this->mAddress = $_GET['address'];
                }

                if (isset($_GET['email']))
                {
			error_log("email got");
                        $this->mEmail = $_GET['email'];
                }
		else
		{
			error_log("no email got");
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
		//$insertLogin = new InsertLogin($this->mUsername, $this->mPassword, $this->mEmailID);
		$insertLogin = new InsertLogin($this->mUsername, $this->mPassword,1);
		//$insertPerson = new InsertPerson($this->mFirstName, $this->mMiddleName, $this->mLastName, $this->mPhone, $this->mAddress);
	}
}
	$join = new Join();	

?>
