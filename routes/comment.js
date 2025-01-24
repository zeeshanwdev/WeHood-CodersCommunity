import express from "express"
import wrapAsync from '../utils/wrapAsync.js'
import {validateComment,isLoggedIn,isCommentAuthorized } from '../middlewares.js'

import {createComment,deleteComment} from "../controllers/comments.js"



const router = express.Router({ mergeParams: true });


router.post("/", isLoggedIn, validateComment, wrapAsync(createComment));

router.delete("/:commentId",isLoggedIn,isCommentAuthorized,wrapAsync(deleteComment));


export default router