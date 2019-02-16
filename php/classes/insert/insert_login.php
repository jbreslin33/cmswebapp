<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");

class InsertLogin extends Insert
{
	function __construct($username, $password, $email_id) 
	{

                $this->mUsername = $username;
                $this->mPassword = $password;
                $this->mEmailID  = $email_id;
		
		parent::__construct();
	}

	public function query()
	{
		$this->mSQL = "

		insert into logins (username, password, email_id) values('" . 
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
