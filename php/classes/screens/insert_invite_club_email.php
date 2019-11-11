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

                $sql = 'select f_insert_invite_club_email($1,$2,$3,$4,$5)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_insert_invite_club_email", $sql);
	        //$result = pg_execute($this->mDatabase->mConnection, "f_insert_person", array( $first_name, $middle_name, $last_name, $phone, $address, $this->getSenderEmailId(), $this->mPersonId));
		//-email_id, person_id, club_id, email,token

                $result = pg_execute($this->mDatabase->mConnection, "f_insert_invite_club_email", array( $this->getSenderEmailId(), $this->mPersonId, $this->mClubId, $email, $this->mClubInviteToken));

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
