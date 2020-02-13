<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/mail/mail.php");

//email token club_id

class InviteToClubScreen extends Screen 
{
	function __construct() 
	{
		parent::__construct();	
	}
		
	function getResult()
	{
                //create mail
                $email = $_GET['email'];

                $club_id = $_GET['club_id'];

                $this->mSubject = "Join Club Management System Link";
                $this->mAbsoluteURL = "http://footballhome.org/#insert_native_login_screen&";
                $token = $this->getToken();

                $this->mUrl = sprintf('%s%s', $this->mAbsoluteURL, http_build_query([
                        'insert_native_login_token' => $token,
                        'email' => $email
                        ]));
                $this->mBody = "Click the link to join Club Management System: ";
                $this->mBody .= $this->mUrl;

                $sql = 'select f_invite_to_club($1,$2,$3)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_invite_to_club", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_invite_to_club", array( $email, $token, $club_id));

                $mail = new Mail($email,$this->mSubject,$this->mBody);

                return pg_fetch_result($result, 0);
	}
}

$inviteToClubScreen = new InviteToClubScreen();	

?>
