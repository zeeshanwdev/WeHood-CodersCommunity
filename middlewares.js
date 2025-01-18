import ExpressError from './utils/ExpressError.js'
import {postSchema} from './joiSchema.js'

import Post from './models/posts.js'


//middlewares
export let validateListing = (req, res, next) => {

    let { error } = postSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }

  };