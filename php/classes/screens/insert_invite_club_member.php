<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/mail/mail.php");

class InsertInviteClubMember extends Screen
{
	function __construct() 
	{
		parent::__construct();
	}

	function getResult()
	{
		//token	
                $this->mClubInviteToken = bin2hex(random_bytes(32));

		$email = $_GET['email'];

                $sql = 'select f_insert_invite_club_member($1,$2,$3,$4)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_insert_invite_club_member", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_insert_invite_club_member", array( $email, $_GET['club_id'], $this->mClubInviteToken, $_GET['person_id']));

                //create mail
                $this->mEmail = $email;
                $this->mSubject = "Welcome to Club Link";
                $this->mAbsoluteURL = "http://elacore.org/#insert_accept_club_invite_screen&";

                $this->mUrl = sprintf('%s%s', $this->mAbsoluteURL, http_build_query([
                        'club_invite_token' => $this->mClubInviteToken
                        ]));

                //send mail
                $mail = new Mail($email, $this->mUrl,$this->mSubject);
		
		return pg_fetch_result($result, 0);
        }
}

$insertInviteClubMember = new InsertInviteClubMember();	

?>
