<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");

class InsertUsernameCheck extends Insert
{
	function __construct() 
	{
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
			$this->runQuery();
		}

		//return result to client
		$this->sendData();
	}
}
?>
