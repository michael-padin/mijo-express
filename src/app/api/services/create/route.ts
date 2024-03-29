import { createServiceOffer } from "@/lib/data";
import { connectToDB } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // You can continue to add more users with varied addresses, descriptions, and service categories.

  try {
    await connectToDB();
    const data = await req.json();

    // update users data lowest price from  servicePrice data

    if (!data.serviceProviderId) {
      return new Response("Error", {
        status: 400,
        statusText: "Bad Request",
      });
    }

    const response = await createServiceOffer(data);

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
