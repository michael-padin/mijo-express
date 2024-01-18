import { createUser } from "@/lib/actions/user";
import { checkEmailExists, createServiceOffer } from "@/lib/data";
import { serviceOfferTestData, serviceProviderSample } from "@/lib/test-data";
import { connectToDB } from "@/lib/utils";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  // You can continue to add more users with varied addresses, descriptions, and service categories.

  try {
    await connectToDB();
    // Your registration logic here
    const data = await req.json();

    const hashedPassword = await hash(data.password, 10);

    // Check if email already exists in the database
    const emailExists = await checkEmailExists(data.email);
    if (emailExists) {
      return new Response("Error", {
        status: 400,
        statusText: "Email already exists",
      });
    }

    // // map all providers to the database
    // const providers = await Promise.all(
    //   serviceProviderSample.map(async (provider: any) => {
    //     await createUser(provider);
    //   })
    // );

    // const serviceOffers = await Promise.all(
    //   serviceOfferTestData.map(async (provider: any) => {
    //     await createServiceOffer(provider);
    //   })
    // );

    const createdUser = await createUser({ ...data, password: hashedPassword });

    if (createdUser) {
      return new Response("Success", {
        status: 200,
        statusText: " User created successfully",
      });
    }
  } catch (error) {
    console.log(error);

    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
