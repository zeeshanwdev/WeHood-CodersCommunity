import ExpressError from './utils/ExpressError.js'
import {postSchema,commentSchema} from './joiSchema.js'

import Post from './models/posts.js'
import Comment from './models/comments.js'


//ExpressError middleware
export let validateListing = (req, res, next) => {

    let { error } = postSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }

  };


export let validateComment = (req,res,next)=>{

    let {error}= commentSchema.validate(req.body)
    if(error){
      let errMsg=error.details.map((el)=>el.message).join(',')
      throw new ExpressError(400, errMsg)
    }else{
      next()
    }
    
}



//Passportjs middleware

export let isLoggedIn = (req,res,next)=>{                                                             

    if(!req.isAuthenticated()){             
      req.session.redirectUrl = req.originalUrl                                                        
      req.flash("error","You Must Be Login to Create Listing")
      // console.log("You Must Login First");
      
      return res.redirect('/login')
    }
    next()
}
  
                                                                      
export let saveRedirectUrl = (req,res,next)=>{  
    if(req.session.redirectUrl){                                                                        
      res.locals.redirectUrl = req.session.redirectUrl
    }
    next()
}



export let isCommentAuthorized = async(req,res,next)=>{                                                    
  let { id, commentId } = req.params;
  let review = await Comment.findById(commentId)                                                           
    if( !review.author.equals(res.locals.currUser._id)){
      req.flash("error","You are not the Author of this Review")
      return res.redirect(`/posts/${id}`)
    }
    next()                                                              
}