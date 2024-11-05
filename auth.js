const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const personModel = require("./models/personModel");

passport.use(
  new LocalStrategy(async (USERNAME, pwd, done) => {
    try {
      console.log("Recieved crenditals");
      const user = await personModel.findOne({ username: USERNAME });
      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      const isPasswordMatch =await  user.comparePassword(pwd);
    
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports=passport;