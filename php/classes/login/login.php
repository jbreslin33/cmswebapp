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
	function __construct() 
	{
		$this->mEcho = "";

		$this->mUsername = "";
		$this->mPassword = "";

		//check for proper post or get
		if (isset($_POST['username']) && isset($_POST['password']))
		{
			$this->mUsername = $_POST['username'];
			$this->mPassword = $_POST['password'];
		}
		if (isset($_GET['username']) && isset($_GET['password']))
		{
			$this->mUsername = $_GET['username'];
			$this->mPassword = $_GET['password'];
		}

		//business rules check
		if ($this->mUsername == "" && $this->mPassword == "")
		{
			$this->mEcho = 101; 
		}	
		else if ($this->mUsername == "")
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
		
		$query = "select id, password from users where username = '";
		$query .= $this->mUsername; 
		$query .= "';";
		
		$result = $database->query($query);
		if (pg_num_rows($result) > 0)
		{
			$_SESSION["logged_in"] = true;

			$row = pg_fetch_row($result);
			$user_id = $row[0];
			$_SESSION["user_id"] = $user_id;
			$password = $row[1];

			if ($this->mPassword == $password)
			{
				//$this->mEcho = "100," . $user_id;
				$this->mEcho = "100";
			}
			else
			{
				$this->mEcho = "105";
			}
		}
		else
		{
			$this->mEcho = "104";
		}
	}

	public function sendResponse()
	{
		error_log($this->mEcho);
		echo $this->mEcho;
	}
}

$login = new Login();

?>
