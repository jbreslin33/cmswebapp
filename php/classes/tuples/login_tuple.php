<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/tuples/tuple.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");

class LoginTuple extends Tuple
{
	function __construct() 
	{
		$this->mID = null;
		$this->mEmailID = null;
		$this->mPassword = null;

		$this->mInsert = null;
		$this->mDelete = null;
		
		parent::__construct();
	}

	function insert($emailID, $password) 
	{
		$this->mEmailID = $emailID;

		$this->mInsert = new Insert();
		
		$sql = "insert into loginsD (email_id, password) values(" . 
		$emailID .
		",'" .
		$password .
		"') returning id;";
		
		$this->mInsert->setSQL($sql);

		$this->mID = $this->mInsert->run();
	}

	//need a delete class
/*	
	function delete($id) 
	{
		$sql = "delete from emails where id = " .
		$id .
		";";
	}
 */
}


?>
