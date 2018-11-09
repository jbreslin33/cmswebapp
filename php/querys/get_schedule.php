<?php
//just in case start session again????
//session_start();

include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

$database = new Database();
$results = $database->query("select event_date, start_time, address from practices"); 
$myarray = array();
while ($row = pg_fetch_row($results)) 
{
	$myarray[] = $row;
	error_log($row[0]);
}

echo json_encode($myarray);


?>


