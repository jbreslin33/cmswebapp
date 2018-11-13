<?php
session_start();

include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

$database = new Database();

$results = $database->query("select array_to_json(array_agg(row_to_json(t))) 
	from (
		select event_date, start_time, address from practices where event_date > now() - INTERVAL '1 days' AND event_date < NOW() + INTERVAL '7 days'
	) t	
");

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


