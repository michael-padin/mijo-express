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
    firstName: String,
    lastName: String,
    email: String,
    // Add other relevant user profile fields
  },
});

// ServiceCategories Collection: Represents different service categories offered in the app.
const ServiceCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Name of the service category
  description: String,
  // Add other relevant service category fields
});

// ServiceProviders Collection: Represents registered service providers in the app.
const ServiceProviderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the corresponding user
  serviceCategories: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ServiceCategory" },
  ], // Categories offered by the provider
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
  // Add other relevant service provider fields
});

// Customers Collection: Represents registered customers in the app.
const CustomerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the corresponding user
  // Add other relevant customer fields
});

// ServiceRequests Collection: Represents service requests made by customers.
const ServiceRequestSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  }, // Reference to the customer
  serviceProviderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceProvider",
  }, // Reference to the service provider
  status: {
    type: String,
    enum: ["pending", "accepted", "completed", "rejected"],
    default: "pending",
  }, // Status of the service request
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceCategory",
    required: true,
  }, // Service category of the request
  date: { type: Date, default: Date.now }, // Date and time of the service request
  isReviewed: { type: Boolean, default: false }, // Indicates whether the service provider has been reviewed
  // Add other relevant service request fields
});

// Export the schemas as models
export const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export const ServiceCategory =
  mongoose.models?.ServiceCategory ||
  mongoose.model("ServiceCategory", ServiceCategorySchema);

export const ServiceProvider =
  mongoose.models?.ServiceProvider ||
  mongoose.model("ServiceProvider", ServiceProviderSchema);

export const Customer =
  mongoose.models?.Customer || mongoose.model("Customer", CustomerSchema);

export const ServiceRequest =
  mongoose.models?.ServiceRequest ||
  mongoose.model("ServiceRequest", ServiceRequestSchema);
