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
                if (isset($_GET['phone']))
                {
                        $this->mLastName = $_GET['phone'];
                }
                if (isset($_GET['address']))
                {
                        $this->mLastName = $_GET['address'];
                }
                if (isset($_GET['email']))
                {
                        $this->mLastName = $_GET['email'];
                }
                if (isset($_GET['username']))
                {
                        $this->mLastName = $_GET['username'];
                }
                if (isset($_GET['password']))
                {
                        $this->mLastName = $_GET['password'];
                }
		
		parent::__construct();
		    var url = "/php/classes/insert/join.php?first_name=" + this.mFirstName + "&middle_name=" + this.mMiddleName + "&last_name=" + this.mLastName + "&phone=" + this.mPhone + "&address=" + this.mAddress + "&email=" + this.mEmail + "&username=" + this.mUsername + "&password=" + this.mPassword;

	}

	public function query()
	{
		$this->mSQL = "
		
		insert into persons (first_name, middle_name, last_name,phone, address, email, username, password) values('" . 
		$this->mFirstName .
		"','" .
		$this->mMiddleName .
		"','" .
		$this->mLastName .
		"','" .
		$this->mPhone .
		"','" .
		$this->mAddress .
		"','" .
		$this->mEmail .
		"','" .
		$this->mUsername .
		"','" .
		$this->mPassword .
		"');";

		error_log($this->mSQL);
	}
}

$join = new Join();

?>
