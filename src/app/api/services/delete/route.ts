import { deleteServiceOffer } from "@/lib/data";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  // You can continue to add more users with varied addresses, descriptions, and service categories.

  try {
    const id = req.nextUrl.searchParams.get("serviceId");

    if (!id) {
      return new Response("Error", {
        status: 400,
        statusText: "Bad Request",
      });
    }

    const response = await deleteServiceOffer(id);

    if (!response) {
      return new Response("Error", {
        status: 500,
        statusText: "Internal Server Error",
      });
    }

    return new Response("Success", {
      status: 200,
      statusText: "Review submitted successfully",
    });
  } catch (error) {
    console.log(error);

    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
