<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

abstract class Update 
{
	function __construct() 
	{
		$this->mUsername = "";
		$this->mSQL = "";
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
			$this->update();
			$this->run();
		}

		//return result to client
		$this->sendData();
	}

	//query is the sql line do we need to pass in anything?
	abstract protected function update();

	//run query is the machinations of running it from php to sql to return dataset
	public function run()
	{
		$database = new Database("localhost","cms","postgres","mibesfat");

                $results = $database->query($this->mSQL);

                $myarray = array();

                $resultArray = pg_fetch_all($results);

                while ($row = pg_fetch_row($results))
                {
                        $myarray[] = $row;
                }
                $data = json_encode($myarray);
		$this->mData = 111 . $data; //111 update success
	}

	public function sendData()
	{
		echo $this->mData;
	}
}
?>
