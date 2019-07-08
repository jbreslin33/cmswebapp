function onSignIn(googleUser) 
{
	if (APPLICATION.mLogin)
	{
		console.log('in onSignin mLogin');
		//APPLICATION.mLogin.googleSignIn(googleUser);
	}

	if (APPLICATION.mInsertNativeLoginClubScreen)
	{
		console.log('in onSignin mInsertNativeLLoginClub');
		//APPLICATION.mInsertNativeLoginClubScreen.googleSignIn(googleUser);
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
