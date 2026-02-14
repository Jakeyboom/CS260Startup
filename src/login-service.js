//Here, I will implement the login service that will allow a user to self authenticate.
//Note that the temporary implementation will simply allow a user to login locally using a password, but in the future, this will be replaced with a more secure authentication method (some kind of hashing).

export function login(email, password) {
    //for now, this will just push the email and password to local storage and do a log.
    console.log('Logging in with email:' + email + ', password: ' + password);
    return true;

    //TODO: Implement authentication here.
    
}

export function createAccount(email, password) {
    console.log('Creating account with email:' + email + ', password: ' + password);
    return true;

    //TODO: Implement account creation and verification here.
}

