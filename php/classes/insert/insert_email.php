<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");

class InsertEmail extends Insert
{
	function __construct($email) 
	{
                $this->mEmail = $email;
		
		parent::__construct();
	}

	public function query()
	{
		$this->mSQL = "

		insert into emails (email) values ('" .
		$this->mEmail .
		"') returning id;"; 

		error_log($this->mSQL);
	}
}

?>
