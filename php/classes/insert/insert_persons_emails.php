<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");

class InsertPersonsEmails extends Insert
{
	function __construct($person_id, $email_id) 
	{

                $this->mPersonID = $person_id;
                $this->mEmailID = $email_id;
		
		parent::__construct();
	}

	public function query()
	{
		$this->mSQL = "

		insert into persons_emails (person_id, email_id) values(" . 
		$this->mPersonID .
		"," .
		$this->mEmailID .
		");";
		
		error_log($this->mSQL);
	}
}


?>
