import { deleteServiceOffer, updateServiceOffer } from "@/lib/data";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // You can continue to add more users with varied addresses, descriptions, and service categories.

  try {
    const data = await req.json();

    if (!data._id && !data.serviceProviderId) {
      return new Response("Error", {
        status: 400,
        statusText: "Bad Request",
      });
    }

    const response = await updateServiceOffer(data._id, data);

    if (!response) {
      return new Response("Error", {
        status: 500,
        statusText: "Internal Server Error",
      });
    }

    return new Response("Success", {
      status: 200,
      statusText: "Service updated successfully",
    });
  } catch (error) {
    console.log(error);

    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
