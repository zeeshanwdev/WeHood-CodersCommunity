import mongoose from "mongoose";
let Schema = mongoose.Schema;


let commentSchema = new Schema({
  comment: String,

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});




let Comment = mongoose.model("Comment", commentSchema);
export default Comment;