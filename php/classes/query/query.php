<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

abstract class Query 
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
			$this->mEcho = 102; 
		}	
		else
		{
			$this->query();
		}

		$this->sendResponse();
	}

	abstract protected function query();

	public function runQuery($query)
	{
		$database = new Database("localhost","cms","postgres","mibesfat");

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

	public function sendResponse()
	{
		error_log($this->mEcho);
		echo $this->mEcho;
	}
}
?>
