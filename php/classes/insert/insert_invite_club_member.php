<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/mail/mail.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");

class InsertInviteClubMember 
{
	function __construct($email,$club_id,$jwt) 
	{
                $database = new Database("localhost","cms","postgres","mibesfat");

                $sql = 'select f_insert_invite_club_member($1,$2,$3,$4)';

                $prepare_result = pg_prepare($database->mConnection, "f_insert_invite_club_member", $sql);

		//jwt decoding
                $oneRing = new OneRing();
                $payload = JWT::decode($jwt, $oneRing->mOneRing);
                $person_id = $payload->person_id;

		//token	
                $this->mClubInviteToken = bin2hex(random_bytes(32));

                $result = pg_execute($database->mConnection, "f_insert_invite_club_member", array( $email, $club_id, $this->mClubInviteToken, $person_id));

  		$return_value = pg_fetch_result($result, 0);

                echo $return_value;

                //create mail
                $this->mEmail = $email;
                $this->mSubject = "Welcome to Club Link";
                $this->mAbsoluteURL = "http://elacore.org/#insert_accept_club_invite_screen&";

                $this->mUrl = sprintf('%s%s', $this->mAbsoluteURL, http_build_query([
                        'club_invite_token' => $this->mClubInviteToken
                        ]));

                //send mail
                $mail = new Mail($this->mEmail, $this->mUrl,$this->mSubject);
        }
}
$email = $_GET['email'];
$club_id = $_GET['club_id'];
$jwt = $_GET['jwt'];

$insertInviteClubMember = new InsertInviteClubMember($email,$club_id,$jwt);	

?>
