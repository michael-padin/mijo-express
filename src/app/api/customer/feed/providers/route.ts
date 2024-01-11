import { getAllProviders } from "@/lib/data";
import { connectToDB } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    const providers = await getAllProviders();
    return new Response(JSON.stringify(providers));
  } catch (error) {
    // console.log(error);
    // return Response.json({
    //   message: error,
    //   success: false,
    // });
  }
}
