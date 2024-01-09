import { createServiceRequest } from "@/lib/data";
import { connectToDB } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    connectToDB();
    await createServiceRequest(await req.json());

    return new Response("Success", {
      status: 200,
      statusText: "Job subbmitted successfully",
    });
  } catch (error) {
    console.log(error);
  }
}
