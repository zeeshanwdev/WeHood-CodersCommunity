import express from 'express'
import wrapAsync from '../utils/wrapAsync.js'
import {validateListing,isLoggedIn } from '../middlewares.js'

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
.put( isLoggedIn ,validateListing, wrapAsync(data.updatePost) )
.delete( isLoggedIn, wrapAsync(data.destroyPost) )




router.route('/:id/edit')
.get( isLoggedIn ,wrapAsync(data.editForm) )




export default router




