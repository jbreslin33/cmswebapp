<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/tuples/tuple.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/delete/delete.php");

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
		
		$sql = "insert into logins (email_id, password) values(" . 
		$emailID .
		",'" .
		$password .
		"') returning id;";
		
		$this->mInsert->setSQL($sql);

		$this->mID = $this->mInsert->run();
	}

        function delete($id)
        {
                $this->mID = $id;

                $this->mDelete = new Delete();

                $sql = "delete from logins where id = " .
                $id .
                " returning id;";

                $this->mDelete->setSQL($sql);

                $this->mDelete->run();
        }
}

?>
