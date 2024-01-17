"use server";
import { revalidatePath } from "next/cache";
import { Report } from "../models";
import { connectToDB } from "../utils";
import { Form } from "react-hook-form";

export const getReports = async (userId: string | null) => {
  try {
    // if no id get all reports
    await connectToDB();
    const reports = await Report.find(userId ? { userId: userId } : {}).sort({
      createdAt: -1,
    });
    return JSON.stringify(reports);
  } catch (error) {
    throw error;
  }
};

export const getReport = async (id: string) => {
  try {
    await connectToDB();
    const reports = await Report.find({ _id: id });
    return JSON.stringify(reports);
  } catch (error) {
    throw error;
  }
};
