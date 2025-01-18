import express from 'express'
import mongoose from "mongoose";

import ejsMate from 'ejs-mate';
import methodOverride from "method-override"

import Post from "./models/posts.js"

import postRouter from './routes/post.js'

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



let mongo_url = "mongodb://127.0.0.1:27017/wehood"
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


//routes
app.get('/', (req,res)=>{
  res.redirect('/posts')
})



//middlewares
app.use('/posts', postRouter)


//Error's
app.all('*',(req,res,next)=>{
  next(new ExpressError(404,"Page Not Found"))
})

app.use((err,req,res,next)=>{
  let {statusCode=500,message="Something went wrong!"}=err
  res.status(statusCode).render('./listings/error',{message})
})


app.listen(port,()=>console.log("Server Run's On 3000 Port")
)