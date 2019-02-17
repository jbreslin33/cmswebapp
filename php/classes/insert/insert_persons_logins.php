<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");

class InsertPersonsLogins extends Insert
{
	function __construct($person_id, $login_id) 
	{

                $this->mPersonID = $person_id;
                $this->mLoginID = $login_id;
		
		parent::__construct();
	}

	public function query()
	{
		$this->mSQL = "

		insert into persons_logins (person_id, login_id) values(" . 
		$this->mPersonID .
		"," .
		$this->mLoginID .
		");";
		
		error_log($this->mSQL);
	}
}


?>
