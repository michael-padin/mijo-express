import mongoose from "mongoose";

// Users Collection: Represents user accounts for administrators, service providers, and customers.
const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true }, // User's full name
  email: { type: String, required: true, unique: true }, // User's login username
  password: { type: String, required: true }, // User's hashed password
  address: { type: String, required: true }, // User's address
  role: {
    type: String,
    enum: ["admin", "service_provider", "customer"],
    required: true,
    default: "customer",
  }, // User's role
  profile: {
    firstName: { type: String },
    lastName: { type: String },
    contactNumber: { type: String },
    location: { type: String },
    description: { type: String },
    profileImg: { type: String },
  },
  ServiceCategory: [{ type: String }],
  availability: [
    {
      dayOfWeek: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
      startTime: String,
      endTime: String,
    },
  ],
  blockedTimeSlots: [
    {
      date: Date,
      startTime: String,
      endTime: String,
    },
  ],
});

// ServiceCategories Collection: Represents different service categories offered in the app.
const ServiceCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Name of the service category
  description: String,
  slug: String,
  // Add other relevant service category fields
});

const ReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
  entityType: { type: String, required: true }, // Example: 'ServiceProvider', 'Product', etc.
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// ServiceRequests Collection: Represents service requests made by customers.
const ServiceRequestSchema = new mongoose.Schema({
  customerId: { type: String, required: true }, // Reference to the customer
  serviceProviderId: { type: String, required: true }, // Reference to the service provider
  status: {
    type: String,
    enum: ["pending", "accepted", "completed", "rejected"],
    default: "pending",
  }, // Status of the service request
  category: { type: String }, // Service category of the request
  date: { type: Date, default: Date.now }, // Date and time of the service request
  isReviewed: { type: Boolean, default: false }, // Indicates whether the service provider has been reviewed
  // Add other relevant service request fields
});

// Export the schemas as models
export const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export const ServiceCategory =
  mongoose.models?.ServiceCategory ||
  mongoose.model("ServiceCategory", ServiceCategorySchema);

export const Review =
  mongoose.models?.Review || mongoose.model("Review", ReviewSchema);

export const ServiceRequest =
  mongoose.models?.ServiceRequest ||
  mongoose.model("ServiceRequest", ServiceRequestSchema);
