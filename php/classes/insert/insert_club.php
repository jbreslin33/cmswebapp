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

               	if (isset($_GET['name']))
                {
                        $this->mName = $_GET['name'];
                }

                if (isset($_GET['street']))
                {
                        $this->mStreet = $_GET['street'];
                }

                if (isset($_GET['city']))
                {
                        $this->mCity = $_GET['city'];
                }

                if (isset($_GET['state']))
                {
                        $this->mState = $_GET['state'];
                }

                if (isset($_GET['zip']))
                {
                        $this->mZip = $_GET['zip'];
                }

		if ($insertClub->mSuccess)
		{
			echo "100"; //success	
		}
		else
		{
			echo "101"; //failure
		}


		
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

$insertClub = new InsertClub();

?>
