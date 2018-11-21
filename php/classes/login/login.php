<?php 
//just in case start session again????
//session_start();

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

everything else will be done on client

*/

class Login 
{
	function __construct() 
	{
		$this->mEcho = "";

		//check for proper post
		if (isset($_POST['username']) && isset($_POST['password']))
		{
			$_SESSION['username'] = $_POST['username'];
			$_SESSION['password'] = $_POST['password'];
		}
		if (isset($_GET['username']) && isset($_GET['password']))
		{
			$_SESSION['username'] = $_GET['username'];
			$_SESSION['password'] = $_GET['password'];
		}

		//business rules check
		if (!isset($_SESSION['username']) && !isset($_SESSION['password']))
		{
			$this->mEcho = 101; 
		}	
		else if (!isset($_SESSION['username']))
		{
			$this->mEcho = 102; 
		}	
		else if (!isset($_SESSION['password']))
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
		$database = new Database;
/*		
		$query = "select id from users where username = '";
		$query .= $_SESSION['username']; 
		$query .= "' and password = '";
		$query .= $_SESSION['password']; 
		$query .= "';";
 */
		
		$query = "select id, password from users where username = '";
		$query .= $_SESSION['username']; 
		$query .= "';";
		
		$result = $database->query($query);
		if (pg_num_rows($result) > 0)
		{
			$_SESSION["logged_in"] = true;

			$row = pg_fetch_row($result);
			$_SESSION["user_id"] = $row[0];
			$password = $row[1];

			if ($_SESSION["password"] == $password)
			{
				error_log('successful login on server');
				$this->mEcho = "100";
			}
			else
			{
				$this->mEcho = "105";
			}
		}
		else
		{
			error_log('unsuccessful login');
			$_SESSION["logged_in"] = false;
			$this->mEcho = "104";
		}
	}

	public function sendResponse()
	{
		error_log("sending....");
		error_log($this->mEcho);
		echo $this->mEcho;
	}
}

$login = new Login();

?>
