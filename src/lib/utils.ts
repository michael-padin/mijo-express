import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import mongoose, { ConnectionStates } from "mongoose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const connection = { isConnected: false };

export const connectToDB = async () => {
  try {
    if (connection.isConnected) {
      console.log("Already connected to MongoDB");
      return;
    }

    if (!process.env.MONGODB_URI) {
      console.log("MongoDB URI is not defined");
      return;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI);

    connection.isConnected = db.connections[0].readyState === 1;
    console.log("Connected to MongoDB");
  } catch (error) {}
};
