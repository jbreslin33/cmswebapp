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

so for a query all i need is a saved username which will be an email address if I have that 
there is no reason for user to login. if however they try to update or insert i will check but that will be in update and insert class to be made later.
so this class just needs to parse username and some parameters and a code.
*/

class Query 
{
	function __construct() 
	{
		$this->mEcho = "";

		$this->mUsername = "";

		//check for proper post or get
		if (isset($_POST['username']))
		{
			$this->mUsername = $_POST['username'];
		}
		if (isset($_GET['username']))
		{
			$this->mUsername = $_GET['username'];
		}

		//business rules check
		if ($this->mUsername == "")
		{
			$this->mEcho = 101; 
		}	
		else if ($this->mUsername == "")
		{
			$this->mEcho = 102; 
		}	
		else
		{
			$this->getSchedule();
		}

		$this->sendResponse();
	}

	public function processLogin()
	{
		$database = new Database;
		
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
	public function getSchedule()
	{
		$query = "
		select event_date, start_time, practices.address from practices join teams on teams.id=practices.team_id join teams_users on teams_users.team_id=teams.id join users on users.id=teams_users.user_id where users.username = 'j' order by event_date asc";
		$database = new Database();

		$results = $database->query($query);

		$myarray = array();

		$resultArray = pg_fetch_all($results);

		while ($row = pg_fetch_row($results))
		{
        		$myarray[] = $row;
		}
		$data = json_encode($myarray);
		error_log($data);
		echo $data;
	}
}

$query = new Query();

?>
