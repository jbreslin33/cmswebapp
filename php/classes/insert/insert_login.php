<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");

class InsertLogin extends Insert
{
	function __construct(username, password, emailID) 
	{
		$this->mSuccess = false;

                $this->mUsername = password;
                $this->mPassword = emailID;
                $this->mEmailID = emailID;
		
		parent::__construct();
	}

	public function query()
	{
		$this->mSQL = "

		insert into persons (username, password, email_id) values('" . 
		$this->mUsername .
		"','" .
		$this->mPassword .
		"'," .
		$this->mEmailID .
		");";
		
		error_log($this->mSQL);
	}
}


?>
