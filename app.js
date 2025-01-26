import 'dotenv/config' 

import express from 'express'
import mongoose from "mongoose";

import ejsMate from 'ejs-mate';
import methodOverride from "method-override"

import ExpressError from './utils/ExpressError.js'

import postRouter from './routes/post.js'                                                //Post Router
import userRouter from './routes/user.js'                                                //User Router
import commentRouter from './routes/comment.js'                                          //Comment Router

import session from 'express-session'
import MongoStore from 'connect-mongo'
import flash from 'connect-flash'

import passport from 'passport'
import LocalStrategy from 'passport-local'
import User from './models/user.js'
  


import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// let mongo_url = "mongodb://127.0.0.1:27017/wehood"
let mongo_url = process.env.MONGODBATLAS_URL

let port = 3000
let app = express()


//middlewares
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.engine('ejs', ejsMate);
app.use(methodOverride('_method'))


//Database
main().then(()=>console.log("Database is Connected")).catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongo_url);
}


//Main route
app.get('/', (req,res)=>{
  res.redirect('/posts')
})



//-------Middlewares--------

//Store Session Object                                                                                  
const store = MongoStore.create({
  mongoUrl: mongo_url,
  crypto: {                                                                                            
    secret: process.env.SESSION_SECRET
  },
  touchAfter: 24 * 3600,                                                                               
})
store.on("error", ()=>console.log("Error Accured In Mongo Session Storing",err)) 


//Sessions
let sessionOptions={
  store: store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie:{                                                                                                
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly : true,
  }
}
app.use(session(sessionOptions))
app.use(flash())


//PassportJs Middleware                                
app.use(passport.initialize());
app.use(passport.session());                                                                            
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());                                                           
passport.deserializeUser(User.deserializeUser());



//Flash Middleware  
app.use((req,res,next)=>{
  res.locals.success = req.flash("success")                                                              
  // console.log(res.locals.success)
  res.locals.error = req.flash("error") 
  res.locals.currUser = req.user;                                                                       
  next()
})



//Routes Middlewares
app.use('/posts', postRouter)
app.use('/posts/:id/comments', commentRouter)
app.use('/', userRouter)


//Error's
app.all('*',(req,res,next)=>{
  next(new ExpressError(404,"Page Not Found"))
})

app.use((err,req,res,next)=>{
  let {statusCode=500,message="Something went wrong!"}=err
  res.status(statusCode).render('./posts/error',{message})
})


//Listen Port
app.listen(port,()=>console.log("Server Run's On 3000 Port")
)