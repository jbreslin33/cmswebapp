<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");

class InsertClub extends Insert
{
	function __construct($name, $street, $city, $state, $zip) 
	{

                $this->mName = $name;
                $this->mStreet = $street;
                $this->mCity = $city;
                $this->mState = $state;
                $this->mZip = $zip;
		
		parent::__construct();
	}

	public function query()
	{
		$this->mSQL = "

		insert into clubs (name, street, city, state, zip) values('" . 
		$this->mName .
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
