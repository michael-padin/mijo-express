import { createReview, updateServiceRequest } from "@/lib/data";
import { connectToDB } from "@/lib/utils";

export async function POST(req: Request) {
  // You can continue to add more users with varied addresses, descriptions, and service categories.

  try {
    await connectToDB();
    const response = await createReview(await req.json());

    const updatedRequest = await updateServiceRequest({
      updatedServiceRequestData: { isCustomerReviewed: true },
      serviceRequestId: response.serviceRequestId,
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
