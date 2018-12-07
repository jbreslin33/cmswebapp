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
}


?>

