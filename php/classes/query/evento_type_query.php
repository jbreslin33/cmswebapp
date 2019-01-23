<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/query/query.php");

class AffairTypeQuery extends Query
{
	function __construct() 
	{
		parent::__construct();
	}

	public function query()
	{
		$this->mQuery = "
			select id, name from eventos_types order by name asc";
	}
}

$eventosTypeQuery = new AffairTypeQuery();

?>
