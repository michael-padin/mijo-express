import { checkEmailExists, createServiceOffer, createUser } from "@/lib/data";
import { serviceOfferTestData, serviceProviderSample } from "@/lib/test-data";
import { connectToDB } from "@/lib/utils";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  // You can continue to add more users with varied addresses, descriptions, and service categories.

  try {
    await connectToDB();
    // Your registration logic here
  } catch (error) {
    console.log(error);

    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
