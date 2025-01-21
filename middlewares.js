import ExpressError from './utils/ExpressError.js'
import {postSchema} from './joiSchema.js'

import Post from './models/posts.js'


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