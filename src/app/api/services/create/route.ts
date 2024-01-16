import {
  checkEmailExists,
  createReview,
  createServiceOffer,
  createUser,
  updateServiceRequest,
} from "@/lib/data";
import { serviceOfferTestData, serviceProviderSample } from "@/lib/test-data";
import { connectToDB } from "@/lib/utils";
import { hash } from "bcrypt";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  // You can continue to add more users with varied addresses, descriptions, and service categories.

  try {
    await connectToDB();
    const data = await req.json();

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
