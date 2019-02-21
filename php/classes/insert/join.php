<?php 

include_once(getenv("DOCUMENT_ROOT") . "/php/classes/tuples/email_tuple.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/tuples/login_tuple.php");

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

		//insert next tuple
		if ($this->mEmailTuple->mInsert->getSuccess())
		{
			$this->mLoginTuple = new LoginTuple();
			$this->mLoginTuple->insert($this->mEmailTuple->mID, $this->mPassword);
		}
		//nothing to rollback
		else
		{
			//$this->mEmailTuple->delete($this->mEmailTuple->mID);
		}

		if ($this->mLoginTuple->mInsert->getSuccess())
		{
			
		}
		//rollback last all previous inserts which is just one at this point since we are here because login insert failed
		else
		{
			$this->mEmailTuple->delete($this->mEmailTuple->mID);
		}


	}
}
	$join = new Join();	

?>
