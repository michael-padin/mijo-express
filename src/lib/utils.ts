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

// generate a reusable function the capitalize first 2 letters of a string and remove the reset
export const capitalizeFirstTwoLetters = (str: string) => {
  const initials = str
    .split(" ") // Split the full name into an array of words
    .slice(0, 2) // Take only the first two words
    .map((word) => word.charAt(0)) // Extract the first character of each word
    .join(""); // Join the extracted characters into a single string
  return initials;
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

// generate function to slug a string
export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

// Calculate percentage change for each metric
export const calculatePercentageChange = (
  oldValue: number,
  newValue: number
) => {
  const change = ((newValue - oldValue) / Math.abs(oldValue)) * 100;
  return change.toFixed(1);
};

export const formatCurrency = (
  amount: number,
  currencyCode = "PHP",
  locale = "en-PH"
) =>
  amount?.toLocaleString(locale, {
    style: "currency",
    currency: currencyCode,
  });
