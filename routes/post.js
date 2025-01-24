import express from 'express'
import wrapAsync from '../utils/wrapAsync.js'
import {validateListing,isLoggedIn,isOwner } from '../middlewares.js'

import {data} from "../controllers/posts.js"                                     //Controllers


const router = express.Router()




//routes -> /posts

router.route('/')
.get(wrapAsync(data.index))
.post((isLoggedIn, validateListing, wrapAsync(data.createPost)))


router.route('/new')
.get(isLoggedIn , data.newPostForm)


router.route('/:id')
.get( wrapAsync(data.showPost) )
.put( isLoggedIn ,isOwner, validateListing, wrapAsync(data.updatePost) )
.delete( isLoggedIn,isOwner, wrapAsync(data.destroyPost) )




router.route('/:id/edit')
.get( isLoggedIn ,isOwner, wrapAsync(data.editForm) )




export default router




