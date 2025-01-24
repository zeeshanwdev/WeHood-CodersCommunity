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
    createdAt: {
      type: Date,
      default: Date.now,                                                       // Automatically sets the current date and time
    },
  });
  
  userSchema.plugin(passportLocalMongoose);


  export default mongoose.model("User", userSchema);