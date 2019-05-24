function onSignIn(googleUser) 
{
	if (APPLICATION.mLogin)
	{
		APPLICATION.mLogin.googleSignIn(googleUser);
	}

	if (APPLICATION.mInsertNativeLoginClubScreen)
	{

		APPLICATION.mInsertNativeLoginClubScreen.googleSignIn(googleUser);
	}
}

function signOut() 
{
	if (APPLICATION.mLogin)
	{
		APPLICATION.mLogin.googleSignOut();
	}

	if (APPLICATION.mInsertNativeLoginClubScreen)
	{

		APPLICATION.mInsertNativeLoginClubScreen.googleSignOut();
	}
}
