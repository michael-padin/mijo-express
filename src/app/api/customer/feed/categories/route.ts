import { getAllServiceCategories } from "@/lib/data";

export async function GET(req: Request) {
  try {
    const categories = await getAllServiceCategories();
    return new Response(JSON.stringify(categories));
  } catch (error) {
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
