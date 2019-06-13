<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");
header('Content-Type: application/json');

class SelectPersons
{
        function __construct()
        {
                $jwt = $_GET['jwt'];
                $oneRing = new OneRing();
                $payload = JWT::decode($jwt, $oneRing->mOneRing);
                $email_id = $payload->email_id;

                $database = new Database("localhost","cms","postgres","mibesfat");

                $sql = 'select f_select_person($1)';

                $prepare_result = pg_prepare($database->mConnection, "f_select_person", $sql);

                $result = pg_execute($database->mConnection, "f_select_person", array( $email_id));

                $return_value = pg_fetch_result($result, 0);

                if ($return_value < -100  && $return_value > -200)
                {
                        echo $return_value;
                }
                else
                {

                        $return_value_array = explode(",",$return_value);
                        $email_id = array_shift($return_value_array);
                        $data = implode(",",$return_value_array);

                        if ($email_id < -100  && $email_id > -200)
                        {
                                echo $email_id;
                        }
                        else
                        {
                                if ($data)
                                {
                                        //encode
                                        $oneRing = new OneRing();
                                        $encoded_token = array();
                                        $encoded_token['email_id'] = $email_id;
                                        $jwt = JWT::encode($encoded_token, $oneRing->mOneRing);

                                        $front = '{ "persons" :';
                                        $back = '}';
                                        $return_value = "";
                                        $return_value .= $front;
                                        $return_value .= $data;
                                        $return_value .= $back;

                                        $txt =  "-190," . $jwt . "," . $return_value;
                                        echo $txt;
                                }
                        }
                }
	}
}

$selectPersons = new SelectPersons();
?>
