//PUT request is sent when the LOG IN and SIGN on button is clicked. enter event listeners

const logBtn = document.querySelectorAll(".logIn")

const signBtn = document.querySelectorAll(".signUp")

logBtn.addEventListener("click", logIn)

async function logIn() {

}

//Signup Page
router.get("/signup", ensureGuest, mainControllers.signupPage);

//Sign up new user POST request
router.post("/create-user", mainControllers.createUser);

// Redirects user to their profile page on a succesful login POST or back to login page if not a user
router.post("/login", mainControllers.doLogin);

// Redirects users back to the index page after logging out or presents an error if you are not logged in
router.get("/logout", mainControllers.logout);

// exports all the things with router (need to research more on how)
module.exports = router;