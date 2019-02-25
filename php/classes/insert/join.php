<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

class Join 
{
	function __construct() 
	{
		$this->mEcho = null;

		$this->mFirstName = null;
		$this->mMiddleName = null;
		$this->mLastName = null;
		$this->mPhone = null;
		$this->mAddress = null;
		$this->mEmail = null;
		$this->mPassword = null;

                if (isset($_GET['first_name']))
                {
                        $this->mFirstName = $_GET['first_name'];
                }
                if (isset($_GET['middle_name']))
                {
                        $this->mMiddleName = $_GET['middle_name'];
                }

                if (isset($_GET['last_name']))
                {
                        $this->mLastName = $_GET['last_name'];
                }

                if (isset($_GET['phone']))
                {
                        $this->mPhone = $_GET['phone'];
                }

                if (isset($_GET['address']))
                {
                        $this->mAddress = $_GET['address'];
                }
		
                if (isset($_GET['email']))
                {
                        $this->mEmail = $_GET['email'];
                }
		
                if (isset($_GET['password']))
                {
                        $this->mPassword = $_GET['password'];
                }

		//$this->mSQL = "joinsite($this->mEmail
		$this->run();
	}

        public function run()
        {
                $database = new Database("localhost","cms","postgres","mibesfat");
		//$sql = 'SELECT adduser($1,$2,$3,$4)';
		$sql = 'call joinsite($1,$2,$3,$4,$5,$6,$7)';
		
		$res = pg_prepare($database->mConnection, "q_joinsite", $sql);

		$res = pg_execute($database->mConnection, "q_joinsite", array($this->mEmail,$this->mPassword, $this->mFirstName, $this->mMiddleName, $this->mLastName, $this->mPhone, $this->mAddress));
		
		//$result = pg_prepare($dbconn, "my_query", 'SELECT * FROM shops WHERE name = $1');
		//$result = pg_prepare($database->mConnection, "q_joinsite", 'joinsite($1,$2,$3,$4,$5,$6,$7)');
        }

}
	$join = new Join();	

?>
