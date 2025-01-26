import mongoose  from "mongoose";

import Post from '../models/posts.js'
import Comment from "../models/comments.js";
import User from "../models/user.js"

import initData from "./data2.js"



let mongo_url = "mongodb://127.0.0.1:27017/wehood"
main()
  .then(() => console.log("Database is Connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongo_url);
}


//Initialize Data
let sampleData= async()=>{

  await User.deleteMany({}).then(()=>console.log("All Exist User's Deleted"))
    let newuser = new User({
    username : "admin",
    email : 'admin@gmail.com',
    password : 'admin'
    })
    newuser.image.url ="https://res.cloudinary.com/dzhovcqy3/image/upload/v1737752393/wehood_assets/ry0d2nhvytnrj61ph0j9.jpg"
    newuser.image.filename ="wehood_assets/defaultuserimage"
    await newuser.save()
    console.log("New User Added");

    await Comment.deleteMany({}).then(()=>console.log("All Exist Comment's Deleted"))

  
    await Post.deleteMany({}).then(()=>console.log("All Exist Listings Deleted"))
    initData.data = initData.data.map((obj) => ({...obj , owner: newuser._id }))

    await Post.insertMany(initData.data);
    console.log("SampleData Initilized");
  

}

sampleData()