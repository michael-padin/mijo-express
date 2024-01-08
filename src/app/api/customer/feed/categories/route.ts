import { getAllServiceCategories } from "@/lib/data";

export async function GET(req: Request) {
  try {
    const categories = await getAllServiceCategories();

    return Response.json({
      categories: categories,
      success: true,
      message: "Categories fetched successfully.",
    });
  } catch (error) {
    // console.log(error);
    // return Response.json({
    //   message: error,
    //   success: false,
    // });
  }
}
