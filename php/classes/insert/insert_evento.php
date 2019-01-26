<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/insert/insert.php");

class InsertEvento extends Insert
{
	function __construct() 
	{

		//insertEvento specific parameters	
		if (isset($_POST['evento_date']))
                {
			error_log('POST!!!!!!!');
                        $this->mEventoDate = $_POST['evento_date'];
                }
                if (isset($_GET['evento_date']))
                {
			error_log('GET!!!!!!!');
                        $this->mEventoDate = $_GET['evento_date'];
                }
		
		parent::__construct();

		//insert into eventos (evento_date,start_time,arrival_time,address,team_id,evento_types_id) 
		//values ('02/10/2019','20:55:00','20:45:00','4666 bristol road feasterville pa',3,1);";

	}

	public function query()
	{
		$this->mSQL = "
		
		insert into eventos (evento_date) values('" . 
		$this->mEventoDate .
		"');";

		error_log($this->mSQL);
	}
}

$insertEvento = new InsertEvento();

?>
