<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/mail/mail.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");

class UpdateForgotPassword 
{
	function __construct($forgot_password_token,$password) 
	{
                $database = new Database("localhost","cms","postgres","mibesfat");
		error_log($forgot_password_token);
		error_log($password);

                $sql = 'select f_update_forgot_password($1,$2)';

                $prepare_result = pg_prepare($database->mConnection, "f_update_forgot_password", $sql);

                $result = pg_execute($database->mConnection, "f_update_forgot_password", array( $forgot_password_token, $password));

                $return_value = pg_fetch_result($result, 0);

                if ($return_value < -100  && $return_value > -200)
		{
                	echo $return_value;
		}
		else
		{
			//A
                       	$return_value_array = explode(",",$return_value);
                        $email = array_shift($return_value_array);
                        $email_person_id = array_shift($return_value_array);
                        $data = implode(",",$return_value_array);

                        $email_person_person_id = null;

                        if ($data)
                        {
				//mail that you changed password
                		$this->mEmail = $email;
                		$this->mSubject = "Password has been changed.";
                		$this->mURL = "http://elacore.org/#insert_forgot_password_screen";
				$this->mBody = "You have recently changed your password. If this was not you. Click here: ";
				$this->mBody .= $this->mURL;
                		$mail = new Mail($this->mEmail,$this->mSubject,$this->mBody);

                                //encode
                                $oneRing = new OneRing();
                                $encoded_token = array();
                                $encoded_token['email_person_id'] = $email_person_id;
                                $encoded_token['email_person_person_id'] = null;
                                $jwt = JWT::encode($encoded_token, $oneRing->mOneRing);

                                $front = '{ "persons" :';
                                $back = '}';
                                $return_value = "";
                                $return_value .= $front;
                                $return_value .= $data;
                                $return_value .= $back;

                                $txt =  "-100," . $jwt . "," . $return_value;
                                echo $txt;
                        }
			//B
		}

        }
}
$forgot_password_token = $_GET['forgot_password_token'];
$password = $_GET['password'];

$updateForgotPassword = new UpdateForgotPassword($forgot_password_token,$password);	
?>
