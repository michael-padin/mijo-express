import { checkEmailExists, createUser } from "@/lib/data";
import { connectToDB } from "@/lib/utils";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  const ProvidersInfo = [
    {
      fullName: "John Doe",
      email: "provider1@example.com",
      password: "hashedpassword",
      address: "Argao, Cebu",
      role: "service_provider",
      profile: {
        firstName: "John",
        lastName: "Doe",
        contactNumber: "987-654-3210",
        location: "Argao, Cebu",
        description: "Experienced plumber offering reliable services.",
        profileImg: "https://randomuser.me/api/portraits/women/1.jpg",
      },
      ServiceCategory: ["Plumbing"],
      availability: [
        {
          dayOfWeek: "Monday",
          startTime: "09:00 AM",
          endTime: "05:00 PM",
        },
        {
          dayOfWeek: "Wednesday",
          startTime: "10:00 AM",
          endTime: "03:00 PM",
        },
      ],
      blockedTimeSlots: [],
    },
    {
      fullName: "Jane Smith",
      email: "provider2@example.com",
      password: "hashedpassword",
      address: "Argao, Cebu",
      role: "service_provider",
      profile: {
        firstName: "Jane",
        lastName: "Smith",
        contactNumber: "987-654-3211",
        location: "Argao, Cebu",
        description: "Skilled electrician providing efficient services.",
        profileImg: "https://randomuser.me/api/portraits/women/2.jpg",
      },
      ServiceCategory: ["Electrical Repair"],
      availability: [
        {
          dayOfWeek: "Tuesday",
          startTime: "08:00 AM",
          endTime: "04:00 PM",
        },
        {
          dayOfWeek: "Thursday",
          startTime: "01:00 PM",
          endTime: "06:00 PM",
        },
      ],
      blockedTimeSlots: [],
    },
    {
      fullName: "Anna Johnson",
      email: "provider3@example.com",
      password: "hashedpassword",
      address: "Argao, Cebu",
      role: "service_provider",
      profile: {
        firstName: "Anna",
        lastName: "Johnson",
        contactNumber: "987-654-3212",
        location: "Argao, Cebu",
        description: "Makeup artist specializing in various occasions.",
        profileImg: "https://randomuser.me/api/portraits/women/3.jpg",
      },
      ServiceCategory: ["Makeup Services"],
      availability: [
        {
          dayOfWeek: "Friday",
          startTime: "11:00 AM",
          endTime: "07:00 PM",
        },
        {
          dayOfWeek: "Saturday",
          startTime: "02:00 PM",
          endTime: "09:00 PM",
        },
      ],
      blockedTimeSlots: [],
    },
    {
      fullName: "Michael Johnson",
      email: "provider4@example.com",
      password: "hashedpassword",
      address: "Argao, Cebu",
      role: "service_provider",
      profile: {
        firstName: "Michael",
        lastName: "Johnson",
        contactNumber: "987-654-3213",
        location: "Argao, Cebu",
        description: "Fitness trainer offering personalized training sessions.",
        profileImg: "https://randomuser.me/api/portraits/women/4.jpg",
      },
      ServiceCategory: ["Personal Fitness Training"],
      availability: [
        {
          dayOfWeek: "Wednesday",
          startTime: "07:00 AM",
          endTime: "01:00 PM",
        },
        {
          dayOfWeek: "Friday",
          startTime: "05:00 PM",
          endTime: "10:00 PM",
        },
      ],
      blockedTimeSlots: [],
    },
    {
      fullName: "Sophia Miller",
      email: "provider5@example.com",
      password: "hashedpassword",
      address: "Argao, Cebu",
      role: "service_provider",
      profile: {
        firstName: "Sophia",
        lastName: "Miller",
        contactNumber: "987-654-3214",
        location: "Argao, Cebu",
        description: "Event planner with a creative touch.",
        profileImg: "https://randomuser.me/api/portraits/women/5.jpg",
      },
      ServiceCategory: ["Event Planning"],
      availability: [
        {
          dayOfWeek: "Thursday",
          startTime: "12:00 PM",
          endTime: "06:00 PM",
        },
        {
          dayOfWeek: "Saturday",
          startTime: "10:00 AM",
          endTime: "04:00 PM",
        },
      ],
      blockedTimeSlots: [],
    },
  ];

  try {
    await connectToDB();
    // Your registration logic here
    const { email, password, fullName, address } = await req.json();

    const hashedPassword = await hash(password, 10);

    // Check if email already exists in the database
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return new Response("Error", {
        status: 400,
        statusText: "Email already exists",
      });
    }

    // Your database logic here
    // Example: Save user to the database
    const user = {
      email,
      password: hashedPassword,
      fullName,
      address,
    };

    // map all providers to the database
    const providers = await Promise.all(
      ProvidersInfo.map(async (provider) => {
        await createUser(provider);
      })
    );
    const createdUser = await createUser(user);

    if (providers) {
      return new Response("Success", {
        status: 200,
        statusText: " User created successfully",
      });
    }
  } catch (error) {
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
