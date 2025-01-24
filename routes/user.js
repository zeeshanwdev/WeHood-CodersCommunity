import express from 'express'
import passport from 'passport'
import wrapAsync from '../utils/wrapAsync.js'
import {saveRedirectUrl} from '../middlewares.js'
import {userdata} from "../controllers/users.js"                                     //Controllers

import multer  from 'multer' 

let router = express.Router()

//Middlewares
const storage = multer.memoryStorage();
const upload = multer({ storage });


//Signup Route
router.route('/signup')
.get( userdata.signupForm )
.post( upload.single('user[image]'), wrapAsync(userdata.signup) )



//Login Route
router.route('/login')
.get( userdata.loginForm )
.post( saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}), userdata.login )



//LogOut Route
router.route('/logout')
.get(userdata.logout)




export default router