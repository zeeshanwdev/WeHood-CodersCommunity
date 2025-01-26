import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";


let Schema = mongoose.Schema


const userSchema = new Schema({
    email: {
      type: String,
      required: true,
    },
     image:{
        url: String,
        filename: String
    },
    // image: {
    //   url: {
    //     type: String,
    //     default: "https://res.cloudinary.com/dzhovcqy3/image/upload/v1737887909/wehood_assets/muoi5lkwlvbkqr2ozhhx.png", 
    //   },
    //   filename: {
    //     type: String,
    //     default: "wehood_assets/muoi5lkwlvbkqr2ozhhx", 
    //   },
    // },
    createdAt: {
      type: Date,
      default: Date.now,                                                       // Automatically sets the current date and time
    },
  });
  
  userSchema.plugin(passportLocalMongoose);


  export default mongoose.model("User", userSchema);