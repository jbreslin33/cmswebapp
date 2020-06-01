<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class DeletePitch extends Screen 
{
	function __construct() 
	{
		parent::__construct();
	}

	function getResult()
	{
		$sql = 'select f_delete_pitch($1,$2,$3)';
		$prepare_result = pg_prepare($this->mDatabase->mConnection, "f_delete_pitch", $sql);
		$result = pg_execute($this->mDatabase->mConnection, "f_delete_pitch", array( $this->getSenderEmailId(), $this->mPersonId, $this->mPitchId));

               	return pg_fetch_result($result, 0);
        }
}

$deletePitch = new DeletePitch();	

?>
