import { checkEmailExists, createUser } from "@/lib/data";
import { connectToDB } from "@/lib/utils";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  address: z.string().min(6),
  fullName: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    connectToDB();
    // Your registration logic here
    const { email, password, fullName, address } = await req.json();

    const hashedPassword = await hash(password, 10);

    // Check if email already exists in the database
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return new Response("Error", {
        status: 400,
        statusText: "Email already exists",
      });
    }

    // Your database logic here
    // Example: Save user to the database
    const user = {
      email,
      password: hashedPassword,
      fullName,
      address,
    };

    await createUser(user);

    return new Response("Success", {
      status: 200,
      statusText: " User created successfully",
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      message: error,
      success: false,
    });
  }
}
