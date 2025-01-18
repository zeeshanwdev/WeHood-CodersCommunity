import mongoose  from "mongoose";
import Post from '../models/posts.js'

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

    await Post.insertMany(initData.data);
    console.log("SampleData Initilized");
    
}


sampleData()