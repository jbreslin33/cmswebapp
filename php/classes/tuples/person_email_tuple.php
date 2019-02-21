<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/tuples/tuple.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/delete/delete.php");

class PersonEmailTuple extends Tuple
{
	function __construct() 
	{
		$this->mID = null;
		$this->mPersonID = null;
		$this->mLoginID = null;

		$this->mInsert = null;
		$this->mDelete = null;
		
		parent::__construct();
	}

	function insert($person_id, $email_id) 
	{
		$this->mPersonID = $person_id;
		$this->mEmailID = $email_id;

		$this->mInsert = new Insert();
		
		$sql = "insert into persons_emails (person_id, email_id) values(" . 
		$person_id .
		"," .
		$email_id .	
		") returning id;";
		
		$this->mInsert->setSQL($sql);

		$this->mID = $this->mInsert->run();
	}
	
	function delete($id) 
	{
		$this->mID = $id;

		$this->mDelete = new Delete();

		$sql = "delete from persons_emails where id = " .
		$id .
		" returning id;";
		
		$this->mDelete->setSQL($sql);

		$this->mDelete->run();
	}
}


?>
