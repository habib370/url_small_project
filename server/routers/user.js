import express from "express";
import { CreateAccount,LoginAccount } from "../controllers/user.js";
import {isAuthenticated} from '../middleware/authentication.js'
const router = express.Router();

router.post("/signin", CreateAccount);
router.post('/login',isAuthenticated,LoginAccount)

export default router;
