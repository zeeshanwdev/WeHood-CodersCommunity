import User from '../models/user.js'




let signupForm = (req,res)=>{
    res.render('users/signup.ejs')
}


let signup = async(req,res)=>{

    try{
        let {username, email, password} = req.body
        const newUser = new User({email, username})
        const registeredUser = await User.register(newUser, password)                                                                                 
        console.log(registeredUser);
    
        req.login(registeredUser,(err) => {                                                                                                         
            if(err){
                return next(err)
            }
            req.flash('success','Welcome To WeHood')
            res.redirect('/')
        })
    
        }catch(e){
            req.flash("error", e.message)
            // console.log("error", e.message);
            res.redirect('/signup')
        }
   
}


let loginForm = (req,res)=>{
    res.render('users/login.ejs')
}


let login = async(req,res)=>{
    req.flash("success", "Welcome back to WeHood!")
    // console.log("You Are LogIn To WeHood!");
    let redirectUrl = res.locals.redirectUrl || '/posts'                                                                                 
    res.redirect(redirectUrl) 
}


let logout = (req,res)=>{

    req.logout((err) => {
        if(err){
            return next(err)
        }
        req.flash("success","You are Logged Out!")
        // console.log("You Are Logged Out!");
        res.redirect('/')
    })

}





const userdata = {
    signupForm,
    signup,
    loginForm,
    login,
    logout,
  };
  
  export { userdata };