import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";


let Schema = mongoose.Schema


const userSchema = new Schema({
    email: {
      type: String,
      required: true,
    },
  });
  
  userSchema.plugin(passportLocalMongoose);


  export default mongoose.model("User", userSchema);