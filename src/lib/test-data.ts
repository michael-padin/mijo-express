const sampleProviders = [
  {
    fullName: "John Doe",
    email: "john.doe@example.com",
    password: "hashedPassword1",
    address: "123 Main Street, Cebu City",
    role: "service_provider",
    contactNumber: "123-456-7890",
    description:
      "I am an experienced administrator with a background in system operations and user management. My goal is to ensure the smooth functioning of the platform, providing efficient services to both service providers and customers.",
    profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
    ServiceCategory: ["System Administration", "User Management"],
    availability: {
      from: new Date("2024-01-12T08:00:00Z"),
      to: new Date("2024-01-12T17:00:00Z"),
    },
    blockedTimeSlots: [],
    startingPrice: 0,
    reviews: [],
  },
  {
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    password: "hashedPassword2",
    address: "456 Oak Street, Carcar City",
    role: "service_provider",
    contactNumber: "987-654-3210",
    description:
      "I am a highly skilled plumber with over a decade of experience in providing plumbing solutions for both residential and commercial properties in Carcar City. My commitment is to deliver high-quality services, ensuring customer satisfaction with every job. Whether it's fixing leaks, installing new pipes, or maintaining plumbing systems, I am dedicated to excellence.",
    profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
    ServiceCategory: ["Plumbing", "Maintenance", "Pipe Installation"],
    availability: {
      from: new Date("2024-01-12T09:00:00Z"),
      to: new Date("2024-01-12T18:00:00Z"),
    },
    blockedTimeSlots: [
      {
        date: new Date("2024-01-15"),
        startTime: "10:00 AM",
        endTime: "12:00 PM",
      },
    ],
    startingPrice: 50,
    reviews: [
      {
        userId: "customer1",
        rating: 4.5,
        comment: "Great service! Fixed the issue quickly.",
        createdAt: new Date("2024-01-13T12:30:00Z"),
      },
    ],
  },
  {
    fullName: "Alice Johnson",
    email: "alice.johnson@example.com",
    password: "hashedPassword3",
    address: "789 Pine Avenue, Argao",
    role: "service_provider",
    contactNumber: "555-123-4567",
    description:
      "I am a professional electrician with a passion for providing reliable electrical services in Argao. With a focus on safety and efficiency, I offer a range of services including installations, repairs, and maintenance. My goal is to ensure that clients have a smooth and secure electrical system in their homes or businesses.",
    profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
    ServiceCategory: ["Electrical", "Repairs", "Wiring"],
    availability: {
      from: new Date("2024-01-12T10:00:00Z"),
      to: new Date("2024-01-12T19:00:00Z"),
    },
    blockedTimeSlots: [],
    startingPrice: 60,
    reviews: [
      {
        userId: "customer2",
        rating: 4.2,
        comment: "Prompt and efficient service. Would recommend!",
        createdAt: new Date("2024-01-14T09:45:00Z"),
      },
    ],
  },
  {
    fullName: "Bob Miller",
    email: "bob.miller@example.com",
    password: "hashedPassword4",
    address: "321 Elm Lane, Cebu City",
    role: "service_provider",
    contactNumber: "789-234-5678",
    description:
      "I am a landscaping expert offering a variety of services, from lawn care to garden design. With a passion for enhancing outdoor spaces, I strive to create beautiful and sustainable landscapes for my clients in Cebu City. My services include lawn mowing, tree pruning, flower bed design, and overall garden maintenance.",
    profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
    ServiceCategory: ["Landscaping", "Gardening", "Tree Services"],
    availability: {
      from: new Date("2024-01-12T08:30:00Z"),
      to: new Date("2024-01-12T16:30:00Z"),
    },
    blockedTimeSlots: [
      {
        date: new Date("2024-01-18"),
        startTime: "12:00 PM",
        endTime: "3:00 PM",
      },
    ],
    startingPrice: 70,
    reviews: [
      {
        userId: "customer3",
        rating: 4.8,
        comment: "Transformed my garden beautifully. Highly recommended!",
        createdAt: new Date("2024-01-16T14:15:00Z"),
      },
    ],
  },
  {
    fullName: "Emily White",
    email: "emily.white@example.com",
    password: "hashedPassword5",
    address: "567 Cedar Street, Carcar City",
    role: "service_provider",
    contactNumber: "345-678-9012",
    description:
      "I'm a homeowner in Carcar City looking for reliable service providers for various home improvement needs. My interests include gardening, home repairs, and occasional electrician services. Excited to connect with skilled professionals in the area!",
    profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
    ServiceCategory: ["Gardening", "Home Repairs"],
    availability: {
      from: null,
      to: null,
    },
    blockedTimeSlots: [],
    startingPrice: 0,
    reviews: [],
  },
  {
    fullName: "Michael Turner",
    email: "michael.turner@example.com",
    password: "hashedPassword6",
    address: "876 Oak Drive, Cebu City",
    role: "service_provider",
    contactNumber: "876-543-2109",
    description:
      "As a busy professional in Cebu City, I often need services like plumbing, electrical, and general home maintenance. Looking forward to finding reliable and trustworthy service providers in my local area. Open to recommendations!",
    profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
    ServiceCategory: ["Home Maintenance", "Plumbing", "Electrical"],
    availability: {
      from: null,
      to: null,
    },
    blockedTimeSlots: [],
    startingPrice: 0,
    reviews: [],
  },
  {
    fullName: "Olivia Garcia",
    email: "olivia.garcia@example.com",
    password: "hashedPassword7",
    address: "987 Pine Road, Argao",
    role: "service_provider",
    contactNumber: "321-765-0987",
    description:
      "Homeowner in Argao looking for skilled professionals for various home improvement projects. Interested in landscaping, gardening, and occasional maintenance services. Excited to connect with local experts!",
    profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
    ServiceCategory: ["Landscaping", "Gardening", "Home Maintenance"],
    availability: {
      from: null,
      to: null,
    },
    blockedTimeSlots: [],
    startingPrice: 0,
    reviews: [],
  },
  {
    fullName: "Daniel Brown",
    email: "daniel.brown@example.com",
    password: "hashedPassword8",
    address: "234 Elm Court, Cebu City",
    role: "service_provider",
    contactNumber: "234-567-8901",
    description:
      "Homeowner in Cebu City with a keen interest in home improvement projects. Looking for reliable service providers for plumbing, electrical, and landscaping services. Excited to connect with skilled professionals in the neighborhood!",
    profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
    ServiceCategory: ["Plumbing", "Electrical", "Landscaping"],
    availability: {
      from: null,
      to: null,
    },
    blockedTimeSlots: [],
    startingPrice: 0,
    reviews: [],
  },
  {
    fullName: "Sophia Lee",
    email: "sophia.lee@example.com",
    password: "hashedPassword9",
    address: "543 Pine Lane, Cebu City",
    role: "service_provider",
    contactNumber: "543-210-9876",
    description:
      "Homeowner in Cebu City seeking reliable service providers for various home improvement needs. Interested in plumbing, electrical, and landscaping services. Eager to connect with skilled professionals in the community!",
    profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
    ServiceCategory: ["Plumbing", "Electrical", "Landscaping"],
    availability: {
      from: null,
      to: null,
    },
    blockedTimeSlots: [],
    startingPrice: 0,
    reviews: [],
  },
  {
    fullName: "David Taylor",
    email: "david.taylor@example.com",
    password: "hashedPassword10",
    address: "678 Oak Avenue, Argao",
    role: "service_provider",
    contactNumber: "678-901-2345",
    description:
      "As a homeowner in Argao, I'm in search of reliable service providers for various home improvement projects. Interested in plumbing, electrical, and general maintenance services. Excited to connect with skilled professionals in my local area!",
    profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
    ServiceCategory: ["Plumbing", "Electrical", "Home Maintenance"],
    availability: {
      from: null,
      to: null,
    },
    blockedTimeSlots: [],
    startingPrice: 0,
    reviews: [],
  },
  // Add 10 more sample users with similar detailed information...
];

export const serviceProviderSample: any = [
  {
    fullName: "Juan dela Cruz",
    email: "juan@example.com",
    password: "hashedPassword123", // Hashed password using a secure algorithm
    address: "Carcar City, Cebu", // Specific address in Carcar City
    role: "service_provider",
    contactNumber: "123-456-7890",
    description:
      "I am a skilled service provider based in Carcar City, Cebu. With a passion for delivering high-quality services, I offer expertise in Plumbing, Makeup Services, Personal Fitness Training. Customer satisfaction is my top priority, and I strive to provide reliable and efficient solutions to meet your needs.",
    profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
    availability: {
      from: new Date("2024-01-15T08:00:00Z"), // Example start date and time
      to: new Date("2024-05-15T17:00:00Z"), // Example end date and time
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    startingPrice: 60.0,
    reviews: [
      {
        userId: "customer456",
        rating: 4.8,
        comment:
          "Juan provided excellent service. Very satisfied with the results!",
        createdAt: new Date(),
      },
      // Additional reviews can be added here
    ],
    skills: ["Skill A", "Skill B", "Skill C"],
  },
];

// Now you can use this object to create a new service provider user in your MongoDB database

export const serviceOfferTestData = [
  {
    serviceProviderId: "65a4412c298835d8c85538a8",
    serviceCategory: "Plumbing",
    serviceCategorySlug: "plumbing",
    serviceDescription:
      "Professional plumbing services for your home or business. We handle repairs, installations, and maintenance with expertise.",
    serviceTitle: "Plumbing Repair",
    servicePrice: 75.0,
    serviceDuration: 2, // in hours
    serviceImg: "https://example.com/plumbing_image.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    serviceProviderId: "65a4412c298835d8c85538a8",
    serviceCategory: "Makeup Services",
    serviceCategorySlug: "makeup-services",
    serviceDescription:
      "Enhance your beauty with our makeup services. From natural looks to glamorous makeovers, we bring out your best features.",
    serviceTitle: "Special Occasion Makeup",
    servicePrice: 50.0,
    serviceDuration: 1, // in hours
    serviceImg: "https://example.com/makeup_image.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    serviceProviderId: "65a4412c298835d8c85538a8",
    serviceCategory: "Personal Fitness Training",
    serviceCategorySlug: "fitness-training",
    serviceDescription:
      "Achieve your fitness goals with personalized training sessions. We focus on strength training, cardio, and overall well-being.",
    serviceTitle: "Personal Training Session",
    servicePrice: 60.0,
    serviceDuration: 1.5, // in hours
    serviceImg: "https://example.com/fitness_image.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // You can add more test data for additional categories or services
];

// Now you can use this array to create multiple service offers in your MongoDB database

export const testDataReview = {
  providerId: "65a4412c298835d8c85538a8",
  customerId: "65a4412c298835d8c85538ad",
  customerName: "Michael Gonzales Padin",
  customerProfileImg: "https://randomuser.me/api/portraits/men/1.jpg",
  customerAddress: "Napo, Carcar City, Cebu, Philippines",
  comment:
    "Exceptional plumbing service! The team was prompt, professional, and highly skilled. They efficiently addressed the issue, explaining the process along the way. The quality of their work exceeded my expectations. Fair pricing and great communication throughout. I highly recommend their services for anyone in need of reliable plumbing assistance.",
  rating: 5,
};
