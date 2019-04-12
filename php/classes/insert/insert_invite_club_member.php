<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/mail/invite_club_member.php");

class InsertInviteClubMember 
{
	function __construct($email) 
	{
		$this->mEmail = $email;

                $database = new Database("localhost","cms","postgres","mibesfat");

		$this->mAbsoluteURL = "http://elacore.org/#update_invite_club_member_screen&";
		$this->mSelector = bin2hex(random_bytes(8));
		$this->mToken = bin2hex(random_bytes(32));
		
		$this->mUrl = sprintf('%s%s', $this->mAbsoluteURL, http_build_query([
    			'selector' => $this->mSelector,
    			'token' => $this->mToken
			]));

                $sql = 'select f_insert_invite_club_member($1,$2,$3)';
                $prepare_result = pg_prepare($database->mConnection, "f_insert_invite_club_member", $sql);
                $result = pg_execute($database->mConnection, "f_insert_invite_club_member", array( $this->mEmail ,$this->mSelector, $this->mToken));

                $return_value = pg_fetch_result($result, 0);
		$return_value .= ",";

		error_log($return_value);
                echo $return_value;

		$inviteClubMember = new InviteClubMember($this->mEmail, $this->mUrl);
        }
}
$email = $_GET['email'];

$insertInviteClubMember = new InsertInviteClubMember($email);	

?>
