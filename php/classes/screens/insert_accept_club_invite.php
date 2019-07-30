<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

class InsertAcceptClubInvite 
{
	function __construct() 
	{
		$clubInviteToken = $_GET['club_invite_token'];
		error_log('yo in InserAccClub');
		error_log($clubInviteToken);
		
		$database = new Database("localhost","cms","postgres","mibesfat");

		$sql = 'select f_insert_accept_club_invite($1)';
		
		$prepare_result = pg_prepare($database->mConnection, "f_insert_accept_club_invite", $sql);

		$result = pg_execute($database->mConnection, "f_insert_accept_club_invite", array( $clubInviteToken));

               	$return_value = pg_fetch_result($result, 0);

                echo $return_value;
        }
}

$insertAcceptClubInvite = new InsertAcceptClubInvite();	

?>
