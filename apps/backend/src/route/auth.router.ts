import { Router } from "express";
import { Login, Signup } from "../controller/auth.contoller";
import { validateSchema } from "../middleware/validateData";
import { UserLoginSchema, UserSignupSchema } from "../schema/auth";

const authRouter = Router();

authRouter.post("/signup", validateSchema(UserSignupSchema), Signup);
authRouter.post("/login", validateSchema(UserLoginSchema), Login);

export default authRouter;
