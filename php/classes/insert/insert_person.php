<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");

class InsertPerson extends Insert
{
	function __construct($first_name, $middle_name, $last_name, $phone, $street, $city, $state, $zip) 
	{

                $this->mFirstName = $first_name;
                $this->mMiddleName = $middle_name;
                $this->mLastName = $last_name;
                $this->mPhone = $phone;
                $this->mStreet = $street;
                $this->mCity = $city;
                $this->mState = $state;
                $this->mZip = $zip;
		
		parent::__construct();
	}

	public function query()
	{
		$this->mSQL = "

		insert into persons (first_name, middle_name, last_name, phone, street, city, state, zip) values('" . 
		$this->mFirstName .
		"','" .
		$this->mMiddleName .
		"','" .
		$this->mLastName .
		"','" . 
		$this->mPhone .
		"','" .
		$this->mStreet .
		"','" .
		$this->mCity .
		"','" .
		$this->mState .
		"','" .
		$this->mZip .
		"') returning id;";
		
		error_log($this->mSQL);
	}
}


?>
