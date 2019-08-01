<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class InsertAcceptClubInvite extends Screen
{
        function __construct()
        {
                parent::__construct();
		error_log('yo in InserAccClub');
        }

        function getResult()
        {
		error_log('yo in InserAccClub get');
		
		$clubInviteToken = $_GET['club_invite_token'];
		
		$sql = 'select f_insert_accept_club_invite($1)';
		$prepare_result = pg_prepare($this->mDatabase->mConnection, "f_insert_accept_club_invite", $sql);
		$result = pg_execute($this->mDatabase->mConnection, "f_insert_accept_club_invite", array( $clubInviteToken));
		
		return pg_fetch_result($result, 0);
        }
}

$insertAcceptClubInvite = new InsertAcceptClubInvite();	

?>
