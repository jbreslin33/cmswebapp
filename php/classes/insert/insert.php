<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

abstract class Insert 
{
	function __construct() 
	{
		$this->mSuccess = false;
		$this->mID = "";
		$this->mSQL = "";
		$this->mData = "";

		$this->query();
		$this->runQuery();
	}

	//query is the sql line do we need to pass in anything?
	abstract protected function query();

	//run query is the machinations of running it from php to sql to return dataset
	public function runQuery()
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
		
	}
}
?>
