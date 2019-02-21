<?php 

include_once(getenv("DOCUMENT_ROOT") . "/php/classes/tuples/email_tuple.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/tuples/login_tuple.php");
/*
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert_email.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert_login.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert_person.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert_persons_logins.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert_persons_emails.php");
 */

class Join 
{
	function __construct() 
	{
		$this->mEcho = null;

		$this->mFirstName = null;
		$this->mMiddleName = null;
		$this->mLastName = null;
		$this->mPhone = null;
		$this->mStreet = null;
		$this->mCity = null;
		$this->mState = null;
		$this->mZip = null;
		$this->mEmail = null;
		$this->mPassword = null;

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

		$this->mEmailTuple = new EmailTuple();
		$this->mEmailTuple->insert($this->mEmail);
		error_log("HERE call insert");

		//insert next tuple
		if ($this->mEmailTuple->mInsert->getSuccess())
		{
			error_log("call insert");
			$this->mLoginTuple = new LoginTuple();
			$this->mLoginTuple->insert($this->mEmailTuple->mID, $this->mPassword);
		}
		//rollback last all previous inserts
		else
		{
			error_log("call delete");
			$this->mEmailTuple->delete($this->mEmailTuple->mID);
		}



/*
		$this->mInsertEmail = null;
		$this->mInsertLogin = null;
		$this->mInsertPerson = null;
		$this->mInsertPersonsLogins = null;
		$this->mInsertPersonsEmails = null;

		$this->mInsertEmail = new InsertEmail($this->mEmail);
		if ($this->mInsertEmail->mSuccess == true)
		{
			error_log("SUCCESS ON EMAIL INSERT");
			$this->mInsertLogin = new InsertLogin($this->mInsertEmail->mID, $this->mPassword);
		}
		else
		{
			//no need for rollback because nothing went thru as yet
			error_log("FAILURE ON EMAIL INSERT");
		}

		if ($this->mInsertLogin->mSuccess == true)
		{
			error_log("SUCCESS ON LOGIN INSERT");
			$this->mInsertPerson = new InsertPerson($this->mFirstName, $this->mMiddleName, $this->mLastName, $this->mPhone, $this->mStreet, $this->mCity, $this->mState, $this->mZip);
		}
		else
		{
			//roll back
			//delete from emails where id = $this->mInsertEmail->mID
		}
		
		if ($this->mInsertPerson->mSuccess == true)
		{
			error_log("SUCCESS ON PERSON INSERT");
			$this->mInsertPersonsLogins = new InsertPersonsLogins($this->mInsertPerson->mID, $this->mInsertLogin->mID);
		}
		else
		{
			//roll back
			//delete from logins where id = $this->mInsertLogin->mID
		}
		
		if ($this->mInsertPersonsLogins->mSuccess == true)
		{
			error_log("SUCCESS ON PERSONS_LOGINS INSERT");
			$this->mInsertPersonsEmails = new InsertPersonsEmails($this->mInsertPerson->mID, $this->mInsertEmail->mID);
		}
		else
		{
			//roll back
			//delete from persons where id = $this->mInsertLogin->mID
		}

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
		
		echo $this->mEcho;
 */
	}
}
	$join = new Join();	

?>
