<?php
session_start();

include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

$query = "
select event_date, start_time, address from practices where event_date = current_date 
";
$database = new Database();

$results = $database->query($query);

$myarray = array();

$resultArray = pg_fetch_all($results);

while ($row = pg_fetch_row($results)) 
{
	$myarray[] = $row;
}
$data = json_encode($myarray);
error_log($data);
echo $data;

?>
