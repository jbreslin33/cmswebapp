<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

class Insert 
{
	function __construct() 
	{
		$this->mSuccess = false;
		$this->mID = "";
		$this->mSQL = "";
		$this->mData = "";
	}

	public function setSQL($sql)
	{
		$this->mSQL = $sql;
	}
	
	public function getSQL()
	{
		return $this->mSQL;
	}

	public function getData()
	{
		return $this->mData;
	}

	public function getID()
	{
		return $this->mID;
	}
	
	public function getSuccess()
	{
		return $this->mSuccess;
	}

	public function run()
	{
		$database = new Database("localhost","cms","postgres","mibesfat");

                $results = $database->query($this->mSQL);

		if ($results)
		{
			$this->mSuccess = true;
				
			$myarray = array();

                	$resultArray = pg_fetch_all($results);

                	while ($row = pg_fetch_row($results))
                	{
                        	$myarray[] = $row;
				$this->mID = $row[0];
                	}
                	$this->mData = json_encode($myarray);
		}
		else //we have a problem
		{
			$this->mSuccess = false;
		}

		return $this->mID;
	}
}
?>
