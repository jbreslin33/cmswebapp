<?php 

include_once(getenv("DOCUMENT_ROOT") . "/php/classes/tuples/email_tuple.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/tuples/login_tuple.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/tuples/person_tuple.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/tuples/person_login_tuple.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/tuples/person_email_tuple.php");

class Join 
{
	function __construct() 
	{
		$this->mEcho = null;

		$this->mFirstName = null;
		$this->mMiddleName = null;
		$this->mLastName = null;
		$this->mPhone = null;
		$this->mAddress = null;
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

                if (isset($_GET['address']))
                {
                        $this->mAddress = $_GET['address'];
                }
		
                if (isset($_GET['email']))
                {
                        $this->mEmail = $_GET['email'];
                }
		
                if (isset($_GET['password']))
                {
                        $this->mPassword = $_GET['password'];
                }

		$this->mError = false;

		$this->mEmailTuple = new EmailTuple();
		$this->mEmailTuple->insert($this->mEmail);

		//insert next tuple
		if ($this->mEmailTuple->mInsert->getSuccess())
		{
			$this->mLoginTuple = new LoginTuple();

			$this->mLoginTuple->insert($this->mEmailTuple->mID, $this->mPassword);
		}
		else
		{
			$this->mError = true;
		}

		if ($this->mError == false)
		{
			if ($this->mLoginTuple->mInsert->getSuccess())
			{
				$this->mPersonTuple = new PersonTuple();
				$this->mPersonTuple->insert($this->mFirstName, $this->mMiddleName, $this->mLastName, $this->mPhone, $this->mAddress);
			}
			else
			{
				$this->mError = true;
				$this->mEmailTuple->delete($this->mEmailTuple->mID);
			}
		}
		
		if ($this->mError == false)
                {
                        if ($this->mPersonTuple->mInsert->getSuccess())
                        {
                                $this->mPersonLoginTuple = new PersonLoginTuple();
                                $this->mPersonLoginTuple->insert($this->mPersonTuple->mID, $this->mLoginTuple->mID);
                        }
                        else
                        {
				$this->mError = true;
				$this->mEmailTuple->delete($this->mEmailTuple->mID);
                                $this->mLoginTuple->delete($this->mLoginTuple->mID);
                        }
                }
		
		if ($this->mError == false)
                {
                        if ($this->mPersonLoginTuple->mInsert->getSuccess())
                        {
                                $this->mPersonEmailTuple = new PersonEmailTuple();
                                $this->mPersonEmailTuple->insert($this->mPersonTuple->mID, $this->mEmailTuple->mID);
                        }
                        else
                        {
				$this->mError = true;
				$this->mEmailTuple->delete($this->mEmailTuple->mID);
                                $this->mLoginTuple->delete($this->mLoginTuple->mID);
                                $this->mPersonTuple->delete($this->mLoginTuple->mID);
                        }
                }
		
		if ($this->mError == false)
                {
                        if ($this->mPersonEmailTuple->mInsert->getSuccess())
                        {
				//do nothing we had success
                        }
                        else
                        {
				$this->mError = true;
				$this->mEmailTuple->delete($this->mEmailTuple->mID);
                                $this->mLoginTuple->delete($this->mLoginTuple->mID);
                                $this->mPersonTuple->delete($this->mLoginTuple->mID);
                                $this->mPersonLoginTuple->delete($this->mPersonLoginTuple->mID);
                        }
                }
		
		if ($this->mError == false)
		{
			echo "100";	
		}
		else
		{
			echo "101";	
		}
	}
}
	$join = new Join();	

?>
