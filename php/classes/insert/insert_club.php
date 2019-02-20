<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");

class InsertClub extends Insert
{
	function __construct() 
	{
                $this->mName = null;
                $this->mStreet = null;
                $this->mCity = null;
                $this->mState = null;
                $this->mZip = null;

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
if ($insertClub->mSuccess)
{
	echo "100"; //success	
}
else
{
	echo "101"; //failure
}

?>
