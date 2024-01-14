import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import mongoose from "mongoose";

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
  } catch (error) {
    console.log(error);
  }
};

export const formatJoinDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const unslugAndCapitalize = (word: string) => {
  // Split the word by hyphens
  const words = word.split("-");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map(
    (w) => w.charAt(0).toUpperCase() + w.slice(1)
  );

  // Join the words back together
  const result = capitalizedWords.join(" ");

  return result;
};
