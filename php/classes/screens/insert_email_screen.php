<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/mail/mail.php");

class InsertEmailScreen extends Screen 
{
	function __construct() 
	{
		parent::__construct();	
	}
		
	function getResult()
	{
                //create mail
                $email = $_GET['email'];
                $this->mSubject = "Join Club Management System Link";
                $this->mAbsoluteURL = "http://footballhome.org/#insert_native_login_screen&";
                $token = $this->getToken();

                $this->mUrl = sprintf('%s%s', $this->mAbsoluteURL, http_build_query([
                        'insert_native_login_token' => $token,
                        'email' => $email
                        ]));
                $this->mBody = "Click the link to join Club Management System: ";
                $this->mBody .= $this->mUrl;

                $sql = 'select f_insert_email($1,$2)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_insert_email", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_insert_email", array( $email, $token));

                $mail = new Mail($email,$this->mSubject,$this->mBody);

                return pg_fetch_result($result, 0);
	}
}

$insertEmailScreen = new InsertEmailScreen();	

?>
