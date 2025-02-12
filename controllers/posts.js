import Post from "../models/posts.js"



let index = async(req,res)=>{
    const posts = await Post.find().sort({ createdAt: -1 }).populate('owner', 'image');
    res.render('posts/index.ejs', { posts });
  
}

let createPost = async (req,res)=>{  
    const newpost = new Post(req.body.post)
    newpost.owner = req.user._id;
    await newpost.save();
    req.flash('success', 'New Post Created');
    res.redirect('/')
  }


let newPostForm = (req,res)=>{
    res.render('posts/newpost.ejs')
}


let showPost = async (req,res)=>{
    let {id} = req.params
    let post = await Post.findById(id).populate({ path: 'comments', populate: { path: 'author' } }).populate('owner', 'username image');
    if(!post){
      req.flash("error","Post Does Not Exist") 
      res.redirect('/posts')
    }
    res.render('posts/showpost.ejs',{post})
  }


  let updatePost = async (req,res)=>{
    let {id} = req.params
    let update = req.body.post
  
    let updatePost = await Post.findByIdAndUpdate(id,{title:update.title,description:update.description})

    if (!updatePost) {
      req.flash("error", "Post not found");
      return res.redirect('/posts');
  }

    await updatePost.save();

    req.flash("success", "Post Updated");
    res.redirect('/')
    
  }


  let destroyPost = async (req,res)=>{
    let {id} = req.params
    let deletePost = await Post.findByIdAndDelete(id)
    req.flash("success","Post Deleted")  
    console.log(deletePost);
    res.redirect('/')
    
  }

  let editForm = async(req,res)=>{
    let {id} = req.params
    let post = await Post.findById(id)

    if(!post){
      req.flash("error","Listing Not Exist") 
      res.redirect('/posts')
    }
    console.log(post);
    
    res.render('posts/edit.ejs',{post})
    
  }




  
  const data = {
    editForm,
    destroyPost,
    updatePost,
    showPost,
    newPostForm,
    createPost,
    index
  };
  
  export { data };
