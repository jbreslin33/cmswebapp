<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

abstract class Query 
{
	function __construct() 
	{
		$this->mUsername = "";
		$this->mQuery = "";
		$this->mData = "";

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
			$this->runQuery();
		}

		//return result to client
		$this->sendData();
	}

	//query is the sql line do we need to pass in anything?
	abstract protected function query();

	//run query is the machinations of running it from php to sql to return dataset
	public function runQuery()
	{
		$database = new Database("localhost","cms","postgres","mibesfat");

                $results = $database->query($this->mQuery);

                $myarray = array();

                $resultArray = pg_fetch_all($results);

                while ($row = pg_fetch_row($results))
                {
                        $myarray[] = $row;
                }
                $data = json_encode($myarray);
		error_log('pure data:' . $data);

		$this->mData = 110 . $data; //110 query success
		error_log('mData:' . $this->mData);
	}

	public function sendData()
	{
		echo $this->mData;
	}
}
?>
