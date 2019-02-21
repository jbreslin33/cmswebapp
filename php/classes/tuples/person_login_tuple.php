<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/tuples/tuple.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/delete/delete.php");

class PersonLoginTuple extends Tuple
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

	function insert($person_id, $login_id) 
	{
		$this->mPersonID = $person_id;
		$this->mLoginID = $login_id;

		$this->mInsert = new Insert();
		
		$sql = "insert into persons_logins (person_id, login_id) values(" . 
		$person_id .
		"," .
		$login_id .	
		") returning id;";
		
		$this->mInsert->setSQL($sql);

		$this->mID = $this->mInsert->run();
	}
	
	function delete($id) 
	{
		$this->mID = $id;

		$this->mDelete = new Delete();

		$sql = "delete from persons_logins where id = " .
		$id .
		" returning id;";
		
		$this->mDelete->setSQL($sql);

		$this->mDelete->run();
	}
}


?>
