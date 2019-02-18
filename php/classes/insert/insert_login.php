<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");

class InsertLogin extends Insert
{
	function __construct($email_id, $password) 
	{
                $this->mEmailID  = $email_id;
                $this->mPassword = $password;
		
		parent::__construct();
	}

	public function query()
	{
		$this->mSQL = "

		insert into logins (email_id, password) values(" . 
		$this->mEmailID .
		",'" .
		$this->mPassword .
		"') returning id;";
		
		error_log($this->mSQL);
	}
}


?>
