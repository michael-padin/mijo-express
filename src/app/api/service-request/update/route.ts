import { updateServiceRequest } from "@/lib/data";
import { connectToDB } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // You can continue to add more users with varied addresses, descriptions, and service categories.

  try {
    await connectToDB();
    const requestId = req.nextUrl.searchParams.get("requestId");
    const status = req.nextUrl.searchParams.get("status");

    console.log({ requestId, status });

    const updatedRequest = await updateServiceRequest({
      updatedServiceRequestData: { status: status },
      serviceRequestId: requestId,
    });

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
