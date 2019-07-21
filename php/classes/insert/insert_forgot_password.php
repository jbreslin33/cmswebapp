<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/mail/mail.php");

class InsertForgotPassword 
{
	function __construct($email) 
	{
		error_log($email);
                $database = new Database("localhost","cms","postgres","mibesfat");

		//create mail
		$this->mEmail = $email;
		$this->mSubject = "Forgot Password Link";
		$this->mAbsoluteURL = "http://elacore.org/#update_forgot_password_screen&";
		$this->mForgotPasswordToken = bin2hex(random_bytes(32));
		
		$this->mUrl = sprintf('%s%s', $this->mAbsoluteURL, http_build_query([
    			'forgot_password_token' => $this->mForgotPasswordToken
			]));
		$this->mBody = "Click the link to change password: ";
		$this->mBody .= $this->mUrl; 

		//insert
                $sql = 'select f_insert_forgot_password($1,$2)';
                $prepare_result = pg_prepare($database->mConnection, "f_insert_forgot_password", $sql);
                $result = pg_execute($database->mConnection, "f_insert_forgot_password", array( $this->mEmail , $this->mForgotPasswordToken));

		//result to user
                $return_value = pg_fetch_result($result, 0);

	//maybe format with a different function	
		$result_set = $database->formatResultSet($return_value);
                echo $result_set;

		//$return_value .= ",";
                //echo $return_value;

		$mail = new Mail($this->mEmail,$this->mSubject,$this->mBody);



		//new
                //prep db
		/*
                $database = new Database("localhost","cms","postgres","mibesfat");
                $sql = 'select f_insert_team($1,$2,$3,$4)';
                $prepare_result = pg_prepare($database->mConnection, "f_insert_team", $sql);

                //get id of sender
                $oneRing = new OneRing();
                $payload = JWT::decode($jwt, $oneRing->mOneRing);
                $email_id = $payload->email_id;

                //result for sender
                $result = pg_execute($database->mConnection, "f_insert_team", array( $email_id, $club_id, $person_id, $name));
                $return_value = pg_fetch_result($result, 0);

                $result_set = $database->formatResultSet($return_value);
                echo $result_set;
		 */
        }
}
$email = $_GET['email'];

$insertForgotPassword = new InsertForgotPassword($email);	

?>
