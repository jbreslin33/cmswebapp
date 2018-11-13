<?php
session_start();

include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

$query = "
select row_to_json(t)
        from
        (
                select
                (
                        select array_to_json(array_agg(row_to_json(d)))
                        from
                        (
                                select event_date, start_time, address
                                from practices
                                order by event_date asc
                        ) d
                ) as definitions
                from clubs
        ) t
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
