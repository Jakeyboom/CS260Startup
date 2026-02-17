//Here, I will implement the login service that will allow a user to self authenticate.
//Note that the temporary implementation will simply allow a user to login locally using a password, but in the future, this will be replaced with a more secure authentication method (some kind of hashing).

export function login(email, password) {
    debugger;
    //for now, this will just push the email and password to local storage and do a log.
    console.log('Attempting to log in with email:' + email + ', password: ' + password);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if(users.some((user) => user.email === email && user.password === password)) {
        console.log("User authenticated successfully.");
        localStorage.setItem("currentUser", JSON.stringify({email}))

        return true;
    } else {
        console.log("Authentication failed. Invalid email or password.");
        return false;
    }

    //TODO: Implement authentication here.
    
}

export function createAccount(email, password) {
    console.log('Creating account with email:' + email + ', password: ' + password);
    const users = JSON.parse(localStorage.getItem("users")) || [];
    //Right here, I will check if the email is already in use; if not, I will create the account and push it to local storage.

    if(!users.some((user) => user.email === email)) {
        localStorage.setItem("users", JSON.stringify([...users, {email, password}]));
        return login(email, password);
    } else {
        console.log("Email is already in use.");
        return false;
    }

    //TODO: Implement account creation and verification here.
}

export function getCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser ? currentUser.email : null;
}

export function logout() {
    localStorage.removeItem("currentUser");
    console.log("User logged out successfully.");
}
