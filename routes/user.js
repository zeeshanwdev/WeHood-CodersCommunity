import express from 'express'
import passport from 'passport'
import wrapAsync from '../utils/wrapAsync.js'
import {saveRedirectUrl} from '../middlewares.js'
import {userdata} from "../controllers/users.js"                                     //Controllers


let router = express.Router()



//Signup Route
router.route('/signup')
.get( userdata.signupForm )
.post( wrapAsync(userdata.signup) )



//Login Route
router.route('/login')
.get( userdata.loginForm )
.post( saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}), userdata.login )



//LogOut Route
router.route('/logout')
.get(userdata.logout)




export default router