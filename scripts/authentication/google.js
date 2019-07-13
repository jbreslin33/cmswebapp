function onSignIn(googleUser) 
{
	if (APPLICATION.getCurrentScreen())
	{
		console.log('in onSignin');
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
