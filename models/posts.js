import mongoose, { mongo } from "mongoose";
let Schema = mongoose.Schema;



let postSchema = new Schema({

    title : {
        type : String,
        required : true
    },

    description : {
        type : String,
    },
    
    createdAt: {
        type: Date,
        default: Date.now,                                                       // Automatically sets the current date and time
      },
    // image:{
    //     url: String,
    //     filename: String
    // },

})



let Post = mongoose.model("Post", postSchema);

export default Post