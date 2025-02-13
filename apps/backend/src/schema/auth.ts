import { string, z } from "zod";

export const UserSignupSchema = z.object({
  name: z
    .string()
    .min(3, "Username should be more then 3 letter")
    .max(20, "Username should be less then 20 letter"),
  email: z.string().email("Invalid Email").max(100, "Email is too long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
  role: z.enum(["SUPERADMIN", "STORE_OWNER"]).default("STORE_OWNER"),
});

export type SignupType = z.infer<typeof UserSignupSchema>;

export const UserLoginSchema = z.object({
  email: z.string().email("Invalid Email").max(100, "Email is too long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

export type LoginType = z.infer<typeof UserLoginSchema>;
