"use server";
import { revalidatePath } from "next/cache";
import { connectToDB } from "../utils";
import { Report } from "../models";

export const createReport = async (data: any) => {
  try {
    await connectToDB();
    const report = new Report(data);
    await report.save();
    revalidatePath("/dashboard/reports");
    return { message: "Report submitted successfully", status: "success" };
  } catch (error) {
    console.log(error);
    return { message: "Failed to submit report", status: "error" };
  }
};

export const updateReport = async (id: string, data: any) => {
  try {
    // udpate report by id and pass data
    await connectToDB();
    await Report.findOneAndUpdate({ _id: id }, { ...data });
    revalidatePath("/dashboard/reports");
    return { message: "Report updated successfully", status: "success" };
  } catch (error) {
    console.log(error);
    return { message: "Failed to update report", status: "error" };
  }
};

export const deleteReport = async (id: string) => {
  try {
    // udpate report by id and pass data
    await connectToDB();
    await Report.findOneAndDelete({ _id: id });
    revalidatePath("/dashboard/reports");
    return { message: "Report deleted successfully", status: "success" };
  } catch (error) {
    console.log(error);
    return { message: "Failed to delete report", status: "error" };
  }
};
