const express = require("express");
const app = express();
const passport = require("passport");
const util = require("util");
var mysql = require("mysql");
const { v4: uuidv4 } = require("uuid");
const cookieSession = require("cookie-session");
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: ["hello"]
}))
ape.use(passport.initialize());
app.use(passport.session());
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Captain123@',
    database: 'Instagram_Database'
})
connection.connect();
let query = util.promisify(connection.query).bind(connection);
connection.log("Connected to db");
app.use(express.static("public"));
var GoogleStrategy = require("passport-google-oauth2").Strategy;
passport.serializeUser((user, done) => {
    done(null, user.gmail_id);
})
passport.deserializeUser(async (gmail_id, done)=>{
    let resArr = await query(`SELECT * from user WHERE gmail_id="${gmail_id}"`);
    if(resArr.length == 0){
        done(null, "user not found");
    }else{
        done(null, resArr[0]);
    }
})
passport.use(new GoogleStrategy({
    clientID: "",
    clientSecret: "",
    callbackURL: ""
},
    async function(request, accessToken, refreshToken, profile, done){
        console.log("Inside passport cb");
        console.log(profile);
        let resArr = await query(`SELECT * from user WHERE gmail_id="${profile.id}"`);
        let user = {};
        if(resArr.length == 0){
            user = {
                gmail_id: profile.id,
                p_img_url: profile.picture,
                email_id: profile.email,
                id: uuidv4() 
            }
            await query(`INSERT INTO user SET?`, user);
        }else{
            user = resArr[0];
        }
        done(null, user);
    }
));
app.get("/auth/google",passport.authenticate("google",{
    scope: ['email', 'profile']
}))
app.get("/auth/callback", passport.authenticate("google"), function(req, res){
    console.log("user authenticated");
    console.log(req.user);
    res.redirect("http://localhost:3000");
})
const authCheck = (req, res, next) => {
    if(req.user){
        next();
    }else{
        res.json({
            status: "failure"
        })
    }
}
app.get("/user", authCheck, function(req, res){
    res.join({
        status: "success",
        user: req.user
    })
})
app.listen(4000, console.log("Server is listening at port 4000"));