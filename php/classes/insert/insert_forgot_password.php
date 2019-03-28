<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

class InsertForgotPassword 
{
	function __construct($email) 
	{
		$this->mEmail = $email;
		$txt = 'email:';
		$txt .= $email;
		error_log($txt);

                $database = new Database("localhost","cms","postgres","mibesfat");

		$this->mAbsoluteURL = "http://elacore.org/#insert_forgot_password_screen/";

		$txt = "";

		$this->mSelector = bin2hex(random_bytes(8));

		$txt .= $this->mSelector;

		$txt .= "GGGGG";	

		$this->mToken = bin2hex(random_bytes(32));

		$txt .= $this->mToken;

		error_log($txt);

		$this->mUrl = sprintf('%sreset.php?%s', $this->mAbsoluteURL, http_build_query([
    			'selector' => $this->mSelector,
    			'validator' => bin2hex($this->mToken)
			]));

		// Token expiration
		// Delete any existing tokens for this user
		/*
		$this->db->delete('password_reset', 'email', $this->mEmail);

		// Insert reset token into database
		$insert = $this->db->insert('password_reset',
    		array(
        		'email'     =>  $this->mEmail,
        		'selector'  =>  $this->mSelector,
        		'token'     =>  hash('sha256', $this->mToken),
        		'expires'   =>  $this->mExpires->format('U'),
    			)
		);
		 */
		//jim db stuff to replace thiers
                $sql = 'select f_insert_forgot_password($1,$2,$3)';

                $prepare_result = pg_prepare($database->mConnection, "f_insert_forgot_password", $sql);

                $result = pg_execute($database->mConnection, "f_insert_forgot_password", array( $this->mEmail ,$this->mSelector, $this->mToken));

                $return_value = pg_fetch_result($result, 0);

                echo $return_value;


/*
$selector = bin2hex(random_bytes(8));
$token = random_bytes(32);

$url = sprintf('%sreset.php?%s', ABS_URL, http_build_query([
    'selector' => $selector,
    'validator' => bin2hex($token)
]));

// Token expiration
$expires = new DateTime('NOW');
$expires->add(new DateInterval('PT01H')); // 1 hour

// Delete any existing tokens for this user
$this->db->delete('password_reset', 'email', $user->email);

// Insert reset token into database
$insert = $this->db->insert('password_reset', 
    array(
        'email'     =>  $user->email,
        'selector'  =>  $selector, 
        'token'     =>  hash('sha256', $token),
        'expires'   =>  $expires->format('U'),
    )
);
 */
		/*

		$sql = 'select f_insert_club($1,$2,$3)';
		
		$prepare_result = pg_prepare($database->mConnection, "f_insert_club", $sql);

		$jwt = $_GET['jwt'];
		$oneRing = new OneRing();
                $payload = JWT::decode($jwt, $oneRing->mOneRing);
		$id = $payload->id;

		$result = pg_execute($database->mConnection, "f_insert_club", array( $_GET['name'] ,$_GET['address'], $id));

               	$return_value = pg_fetch_result($result, 0);

                echo $return_value;
		 */
        }
}
$email = $_GET['email'];

$insertForgotPassword = new InsertForgotPassword($email);	

?>
