const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
function init(passport, getUserByUsername) {
  const authenticateUser = (username, password, done) => {
    //returns user, or null
    const user = getUserByUsername(username);
    if (user === null) {
      return done(null, false, { message: "No user with that username" });
	}
	try{
		if(await bcrypt.compare(password, user.user_password)){
			return done(null, user)
		}else{
			return done(null, false, {message: "Password Incorrect"})
		}
	}catch(e){
		return done(e)
	}
  };
  passport.use(new localStrategy({ usernameField: "username", passwordField: "user_password" }), authenticateUser);
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
}

module.exports = init