var express= require("express");
var cookieParser= require("cookie-parser");
var logger= require("morgan");

var session= require("express-session");
var passport= require("passport");
var localStrategy=require("passport-local").Strategy;

var isauth=require("./isauthenticated");


var app= express();

app.use(logger("combined"));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:"sfdipji[9"
    ,cookie:{
        secure:false
    }
    
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use('local',new localStrategy({
    usernameField:"username",
    passwordField:"password",
    passReqToCallback:true,
},(req,username,password,done)=>{
  //var data=database.usernameExists;
    return done(null,{
        id:1,
        name:"Abdul",
        password:"Abdul"
    });
}
))

passport.serializeUser((user,done)=>{
  done(null,user.id)
});

passport.deserializeUser((id,done)=>{
    done(null,{
        id:1,
        name:"Abdul",
        password:"Abdul"
    })
})

app.get('/login',(req,res,next)=>{

    res.send("please login");
})
app.post('/login',passport.authenticate(
    'local',{
        //successRedirect:'/profile',
        //failureRedirect:'/loginerror'
    }
),(req,res,next)=>{
 
res.json(req.user)
} );

 

app.get('/profile',isauth,(req,res,next)=>{
 
    res.json(req.user);
})

app.get('/service1',isauth,(req,res,next)=>{

    res.send("service1");
})

app.get('/service2',isauth,(req,res,next)=>{

    res.json("service2");
})


module.exports=app;