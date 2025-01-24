import mongoose  from "mongoose";

import Post from '../models/posts.js'
import Comment from "../models/comments.js";

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
    await Post.deleteMany({}).then(()=>console.log("All Exist Listings Deleted"))

    // await Comment.deleteMany({}).then(()=>console.log("All Exist Comment's are Deleted"))
    initData.data = initData.data.map((obj) => ({...obj , owner: "67910a40f471faefec821ead"}))

    await Post.insertMany(initData.data);
    console.log("SampleData Initilized");
    
}


sampleData()