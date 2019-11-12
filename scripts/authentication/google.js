function onSignIn(googleUser) 
{
	if (APPLICATION.getCurrentScreen())
	{
		APPLICATION.getCurrentScreen().googleSignIn(googleUser);
	}
}

function signOut() 
{
	if (APPLICATION.getCurrentScreen())
	{
		APPLICATION.getCurrentScreen().googleSignOut();
	}
}


