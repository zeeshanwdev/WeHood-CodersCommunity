import express from 'express'
import wrapAsync from '../utils/wrapAsync.js'
import {validateListing} from '../middlewares.js'

import Post from '../models/posts.js'




const router = express.Router()




//routes -> /posts

router.route('/')
.get(wrapAsync(async(req,res)=>{
    const posts = await Post.find().sort({ createdAt: -1 }); 
    res.render('posts/index.ejs', { posts });
  
}))
.post((validateListing, wrapAsync(async (req,res)=>{  
    const newpost = new Post(req.body.post)
    await newpost.save();
    res.redirect('/')
    
  })))


router.route('/new')
.get(((req,res)=>{
    res.render('posts/newpost.ejs')
}))


router.route('/:id')
.get((wrapAsync(async (req,res)=>{
    let {id} = req.params
    let post = await Post.findById(id)
    res.render('posts/post.ejs',{post})
  })))
.put((validateListing, wrapAsync(async (req,res)=>{
    let {id} = req.params
    let update = req.body.post
  
    let updatePost = await Post.findByIdAndUpdate(id,{title:update.title,description:update.description})
    await updatePost.save();
    res.redirect('/')
    
  })))
.delete((wrapAsync(async (req,res)=>{
    let {id} = req.params
    let deletePost = await Post.findByIdAndDelete(id)
    console.log(deletePost);
    res.redirect('/')
    
  })))




router.route('/:id/edit')
.get((wrapAsync(async(req,res)=>{
    let {id} = req.params
    let post = await Post.findById(id)
    res.render('posts/edit.ejs',{post})
    
  })))




export default router




