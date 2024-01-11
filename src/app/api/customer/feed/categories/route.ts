import { getAllServiceCategories } from "@/lib/data";

export async function GET(req: Request) {
  try {
    const categories = await getAllServiceCategories();

    return new Response(JSON.stringify(categories));
  } catch (error) {
    // console.log(error);
    // return Response.json({
    //   message: error,
    //   success: false,
    // });
  }
}
