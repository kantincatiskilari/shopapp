import express from 'express';
import { signin, signup } from '../controllers/auth.js';
import {verifyToken} from '../verifyToken.js';

const router = express.Router();

//signup
router.post("/signup",signup);
//signin
router.post("/signin",signin);


export default router;