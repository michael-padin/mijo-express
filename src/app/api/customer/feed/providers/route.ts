import { getAllProviders } from "@/lib/data";
import { connectToDB } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    const providers = await getAllProviders();
    return Response.json({
      providers: providers,
      success: true,
      message: "Providers fetched successfully.",
    });
  } catch (error) {
    // console.log(error);
    // return Response.json({
    //   message: error,
    //   success: false,
    // });
  }
}
