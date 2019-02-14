<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");

class Join extends Insert
{
	function __construct() 
	{
		//insertEvento specific parameters	
                if (isset($_GET['first_name']))
                {
                        $this->mFirstName = $_GET['first_name'];
                }
                if (isset($_GET['middle_name']))
                {
                        $this->mMiddleName = $_GET['middle_name'];
                }
                if (isset($_GET['last_name']))
                {
                        $this->mLastName = $_GET['last_name'];
                }
		
		parent::__construct();
	}

	public function query()
	{
		$this->mSQL = "
		
		insert into persons (first_name, middle_name, last_name) values('" . 
		$this->mFirstName .
		"','" .
		$this->mMiddleName .
		"','" .
		$this->mLastName .
		"');";

		error_log($this->mSQL);
	}
}

$join = new Join();

?>
