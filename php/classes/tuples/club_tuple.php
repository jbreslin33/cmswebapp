<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/tuples/tuple.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");

class ClubTuple extends Tuple
{
	function __construct() 
	{
		$this->mID = null;
		$this->mName = null;
		$this->mStreet = null;
		$this->mState = null;
		$this->mCity = null;
		$this->mZip = null;

		$this->mInsert = null;
		$this->mDelete = null;
		
		parent::__construct();
	}

	function insert($name, $street, $city, $state, $zip) 
	{
		$this->mName = $name;
		$this->mState = $street;
		$this->mStreet = $city;
		$this->mCity = $state;
		$this->mZip = $zip;

		$this->mInsert = new Insert();
		
		$sql = "insert into clubs (name, street, city, state, zip) values('" . 
		$name .
		"','" .
		$street .
		"','" .
		$city .
		"','" .
		$state .
		"','" .
		$zip .
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
