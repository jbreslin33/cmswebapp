<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/tuples/tuple.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/delete/delete.php");

class EmailTuple extends Tuple
{
	function __construct() 
	{
		$this->mID = null;
		$this->mEmail = null;

		$this->mInsert = null;
		$this->mDelete = null;
		
		parent::__construct();
	}

	function insert($email) 
	{
		$this->mEmail = $email;

		$this->mInsert = new Insert();
		
		$sql = "insert into emails (email) values('" . 
		$email .
		"') returning id;";
		
		$this->mInsert->setSQL($sql);

		$this->mID = $this->mInsert->run();
	}
	
	function delete($id) 
	{
		$this->mID = $id;

		$this->mDelete = new Delete();

		$sql = "delete from emails where id = " .
		$id .
		" returning id;";
		
		$this->mDelete->setSQL($sql);

		$this->mDelete->run();
	}
}


?>
