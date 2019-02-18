<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

/*
codes
---------------
100 success
101 please provide a username and a password  
102 please provide a username  
103 please provide a password  
104 user does not exist
105 wrong password

300 return schedule 
301 some other report


everything else will be done on client

So views should only need email address
only updates and inserts should check for password
*/

class Login 
{
	function __construct($email, $password) 
	{
		$this->mEcho = "";

		$this->mEmail = $email;
		$this->mPassword = $password;

		//business rules check
		if ($this->mEmail == "" && $this->mPassword == "")
		{
			$this->mEcho = 101; 
		}	
		else if ($this->mEmail == "")
		{
			$this->mEcho = 102; 
		}	
		else if ($this->mPassword == "")
		{
			$this->mEcho = 103; 
		}	
		else
		{
			$this->processLogin();
		}

		$this->sendResponse();
	}

	public function processLogin()
	{
		$database = new Database("localhost","cms","postgres","mibesfat");

		$query = "select logins.password from logins
			join emails on emails.id=logins.email_id
			where emails.email = '";
			$query .= $this->mEmail; 
			$query .= "';";

		$result = $database->query($query);
		if (pg_num_rows($result) > 0)
		{
			$row = pg_fetch_row($result);
			$user_id  = $row[0];
			$password = $row[1];

			if ($this->mPassword == $password)
			{
				$this->mEcho = "100"; //good email and password, yeah
			}
			else
			{
				$this->mEcho = "105"; //good email no password match
			}
			error_log($this->mEcho);	
		}
		else
		{
			//no email match
			$this->mEcho = "104";
		}
	}

	public function sendResponse()
	{
		echo $this->mEcho;
	}
}
//get parameters

//check for proper get
if (isset($_GET['email']) && isset($_GET['password']))
{
	$this->mEmail = $_GET['email'];
        $this->mPassword = $_GET['password'];
}

$login = new Login($email,$password);

?>
