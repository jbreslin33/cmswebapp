function onSignIn(googleUser) 
{
	APPLICATION.mLogin.googleSignIn(googleUser);
}

function signOut() 
{
	APPLICATION.mLogin.googleSignOut();
}
