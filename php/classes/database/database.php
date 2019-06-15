<?php 
class Database 
{
	function __construct($host,$dbname,$user,$password) 
	{
		$this->mConnection = NULL;
		$this->mResult = NULL;
		$this->mHost = $host;
		$this->mDBName = $dbname;
		$this->mUser = $user;
		$this->mPassword = $password;

		$this->mConnectionString = "host=" . $host . " dbname=" . $dbname . " user=" . $user . " password=" . $password;
        	$this->mConnection = pg_connect($this->mConnectionString);
	}

	public function getConnection()
	{
		return $this->$mConnection;
	}

	public function setConnectionString($connectionString)
	{
		$this->mConnectionString = $connectionString;
	}
	
	public function query($query)
	{
  		$this->mResult = pg_query($this->mConnection,$query);
		return $this->mResult;
	}

	public function formatResultSet($return_value)
	{
                if ($return_value < -100  && $return_value > -200)
                {
                        return $return_value;
                }
                else
                {
                        $return_value_array = explode(",",$return_value);
                        $email_id = array_shift($return_value_array);
                        $data = implode(",",$return_value_array);

                        if ($data)
                        {
                        	//encode
                                $oneRing = new OneRing();
                                $encoded_token = array();
                                $encoded_token['email_id'] = $email_id;
                                $jwt = JWT::encode($encoded_token, $oneRing->mOneRing);

                                $txt =  "-100," . $jwt . "," . $data;
                                return $txt;
                        }
                }
	}
}


?>

