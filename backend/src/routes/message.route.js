import express from 'express'
import multer from 'multer'
import { protectRoute } from '../middleware/authcheck.middleware.js';
import { deleteMessage, getMessages, getUsersForSidebar, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

// const storage = multer.memoryStorage();
// const upload = multer({ storage });


router.get("/users",protectRoute,getUsersForSidebar)

router.get('/:id',protectRoute,getMessages)

router.post('/send/:id',protectRoute,sendMessage)

router.delete('/delete/:id',protectRoute,deleteMessage)

export default router;