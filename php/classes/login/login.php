<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

class Login
{
        function __construct()
        {
                $database = new Database("localhost","cms","postgres","mibesfat");

                $sql = 'select p_login($1,$2)';

                $prepare_result = pg_prepare($database->mConnection, "p_login", $sql);

                $result = pg_execute($database->mConnection, "p_login", array( $_GET['email'] ,$_GET['password']));

		//return to client
                echo pg_fetch_result($result, 0);
        }
}
        $login = new Login();

/*
100 success
101 please provide a username and a password  
102 please provide a username  
103 please provide a password  
104 user does not exist
105 wrong password

300 return schedule 
301 some other report
*/

?>
