import  Express  from "express";
import { signup,signin } from "../controllers/auth.contrller.js";
const router  = Express.Router();

router.post('/signup',signup);
router.post('/signin',signin);

export default  router;