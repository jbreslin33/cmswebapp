<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

abstract class Query 
{
	function __construct() 
	{
		$this->mEmail = "";
		$this->mQuery = "";
		$this->mData = "";

		//check for proper post or get
		if (isset($_POST['email']))
		{
			$this->mEmail = $_POST['email'];
		}
		if (isset($_GET['email']))
		{
			$this->mEmail = $_GET['email'];
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

		$this->mData = 110 . $data; //110 query success
	}

	public function sendData()
	{
		echo $this->mData;
	}
}
?>
