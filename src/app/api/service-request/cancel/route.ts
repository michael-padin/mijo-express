import { updateServiceRequest } from "@/lib/data";
import { connectToDB } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // You can continue to add more users with varied addresses, descriptions, and service categories.

  const requestId = req.nextUrl.searchParams.get("requestId");

  try {
    await connectToDB();
    // const response = await createReview(await req.json());

    const updatedRequest = await updateServiceRequest({
      updatedServiceRequestData: { status: "cancelled" },
      serviceRequestId: requestId,
    });

    if (!updatedRequest) {
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
