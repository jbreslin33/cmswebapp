<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/tuples/tuple.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/delete/delete.php");

class PersonTuple extends Tuple
{
        function __construct()
        {
		$this->mID = null;

		$this->mInsert = null;
		$this->mDelete = null;

		parent::__construct();
	}

        function insert($first_name, $middle_name, $last_name, $phone, $address)
	{
                $this->mFirstName = $first_name;
                $this->mMiddleName = $middle_name;
                $this->mLastName = $last_name;
                $this->mPhone = $phone;
                $this->mAddress = $address;

		$this->mInsert = new Insert();

		$sql = "insert into persons (first_name, middle_name, last_name, phone, address) values('" .
                $this->mFirstName .
                "','" .
                $this->mMiddleName .
                "','" .
                $this->mLastName .
                "','" .
                $this->mPhone .
                "','" .
                $this->mAddress .
                "') returning id;";

		$this->mInsert->setSQL($sql);
		error_log($sql);

		$this->mID = $this->mInsert->run();
	}
 
	function delete($id)
        {
                $this->mID = $id;

                $this->mDelete = new Delete();

                $sql = "delete from persons where id = " .
                $id .
                " returning id;";

                $this->mDelete->setSQL($sql);

                $this->mDelete->run();
        }
}

?>
