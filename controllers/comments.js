import Post from "../models/posts.js"
import Comment from "../models/comments.js"


const createComment = async(req,res)=>{
    let post = await Post.findById(req.params.id)
    let newComment = new Comment(req.body.comments)
    
    newComment.author = req.user._id                                                                      
    post.comments.push(newComment)                                                                    

    await newComment.save()                                                                             
    await post.save()                                                                             
  
    
    console.log("SomeOne Give's Review");
    req.flash("success","New Review Created")                                                         
    res.redirect(`/posts/${post._id}`)
}


const deleteComment = async(req,res)=>{
    let { id , commentId } = req.params
    await Post.findByIdAndUpdate(id , { $pull : { comments : commentId } })                        
    await Comment.findByIdAndDelete(commentId)
    req.flash("success","Review Deleted")                                                            
    res.redirect(`/posts/${id}`)
}




export {
    createComment,
    deleteComment
}