import mongoose, { mongo } from "mongoose";
import Comment from './comments.js'


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
    comments:[                                                           
        {
            type:Schema.Types.ObjectId,
            ref:'Comment'
        }
      ],
    
      owner:{                                                                                         
          type:Schema.Types.ObjectId,
            ref:'User'                                                                               
      },

})


//mongoose -> pre/post Middleware   
postSchema.post("findOneAndDelete", async(post)=>{
    if(post){
      await Comment.deleteMany({ _id : {$in :post.comments} })
      console.log("Also Post Comment's Deleted Is Well");                         
    }
  })


let Post = mongoose.model("Post", postSchema);

export default Post