<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");

class InsertLogin extends Insert
{
	function __construct($first_name, $middle_name, $last_name, $phone, $address) 
	{

                $this->mFirstName = $first_name;
                $this->mMiddleName = $middle_name;
                $this->mLastName = $last_name;
                $this->mPhone = $phone;
                $this->mAddress = $address;
		
		parent::__construct();
	}

	public function query()
	{
		$this->mSQL = "

		insert into logins (first_name, middle_name, last_name, phone, address) values('" . 
		$this->mFirstName .
		"','" .
		$this->mMiddleName .
		"','" .
		$this->mLastName .
		"','" . 
		$this->mPhone .
		"','" .
		$this->mAddress .
		"');";
		
		error_log($this->mSQL);
	}
}


?>
