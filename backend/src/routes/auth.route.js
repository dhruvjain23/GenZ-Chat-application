import express from 'express'   
import multer from 'multer'

import { checkAuth, login, logout, signup, updateProfile } from '../controllers/auth.controller.js';
import {protectRoute} from '../middleware/authcheck.middleware.js'



const router =express.Router();

// Configure multer to store files temporarily
const upload = multer({ dest: "uploads/" });

router.post('/signup',signup)    
router.post('/login',login)
router.post('/logout',logout)
// router.put('/update-profile',protectRoute,updateProfile)
router.put("/update-profile", protectRoute, upload.single("profilePic"), updateProfile);
router.get('/check',protectRoute,checkAuth)


export default router;
