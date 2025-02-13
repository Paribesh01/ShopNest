import { Request, Response } from "express";
import { db as prisma } from "../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
    } else {
      const isPasswordValid = await bcrypt.compare(
        password,
        user.password as string
      );

      if (isPasswordValid) {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            role: user.role,
          },
          process.env.JSONSECRET as string,
          { expiresIn: "4h" }
        );
        res.status(200).json({ token, success: true });
      } else {
        console.log("password is not matched");
        res.status(401).json({ message: "Email or password is wrong" });
      }
    }
  } catch (e) {
    res.status(500).send("Something went wrong");
    console.error(e);
  }
};
export const Signup = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        email,
      },
    });

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (e) {
    console.log(e);
    res.send("Something went wrong").status(500);
  }
};
