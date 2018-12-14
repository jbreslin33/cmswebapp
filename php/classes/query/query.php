<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

abstract class Query 
{
	function __construct() 
	{
		$this->mData = "";

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
			$this->mData = 102; 
		}	
		else
		{
			$this->query();
		}

		//return result to client
		$this->sendData();
	}

	//query is the sql line
	abstract protected function query();

	//run query is the machinations of running it from php to sql to return dataset
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
                $this->mData = json_encode($myarray);
	}

	public function sendData()
	{
		echo $this->mData;
	}
}
?>
