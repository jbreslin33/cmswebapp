<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

class AddClub 
{
	function __construct() 
	{
                $database = new Database("localhost","cms","postgres","mibesfat");

		//actually we are going to get the jwt and need to extract id

		$sql = 'select f_insert_club($1,$2,$3)';
		
		$prepare_result = pg_prepare($database->mConnection, "f_insert_club", $sql);


		$result = pg_execute($database->mConnection, "f_insert_club", array( $_GET['name'] ,$_GET['address'], 1));

               	$return_value = pg_fetch_result($result, 0);

                if ($return_value < -99  && $return_value > -200)
                {
                        echo $return_value;
                }
        }
}

$addClub = new AddClub();	

?>
