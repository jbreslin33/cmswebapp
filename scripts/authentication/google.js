function onSignIn(googleUser) 
{
	APPLICATION.googleSignIn(googleUser);
}

function signOut() 
{
	APPLICATION.googleSignOut();
      
	localStorage.removeItem("mJWT");
}


