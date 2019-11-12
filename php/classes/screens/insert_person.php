<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class InsertPerson extends Screen 
{
	function __construct() 
	{
		parent::__construct();
	}
	
	function getResult()
	{
		$first_name = null;
		$middle_name = null;
		$last_name = null;
		$phone_name = null;
		$address_name = null;

               	if (isset($_GET['first_name']))
                {
                        $first_name = $_GET['first_name'];
                }
               	if (isset($_GET['middle_name']))
                {
                        $middle_name = $_GET['middle_name'];
                }
               	if (isset($_GET['last_name']))
                {
                        $last_name = $_GET['last_name'];
                }
               	if (isset($_GET['phone']))
                {
                        $phone = $_GET['phone'];
                }
               	if (isset($_GET['address']))
                {
                        $address = $_GET['address'];
                }

               	if ($this->getAuthorizationId() > 0)
                {
			$sql = 'select f_insert_person($1,$2,$3,$4,$5,$6,$7)';
			$prepare_result = pg_prepare($this->mDatabase->mConnection, "f_insert_person", $sql);
			$result = pg_execute($this->mDatabase->mConnection, "f_insert_person", array( $first_name, $middle_name, $last_name, $phone, $address, $this->getSenderEmailId(), $this->mPersonId));
               		return pg_fetch_result($result, 0);
		}
		else
		{
                	//prep db
                        $sql = 'select f_format_result_set($1,$2,$3)';
                       	$prepare_result = pg_prepare($this->mDatabase->mConnection, "f_format_result_set", $sql);
                        $result = pg_execute($this->mDatabase->mConnection, "f_format_result_set", array( $this->getSenderEmailId(), 'not authorized', -101));

                        return pg_fetch_result($result, 0);
		}
        }
}

$insertPerson = new InsertPerson();	

?>
