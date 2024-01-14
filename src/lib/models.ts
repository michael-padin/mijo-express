import mongoose from "mongoose";
import { nanoid } from "nanoid";

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
  contactNumber: { type: String },
  description: { type: String },
  profileImg: { type: String },
  availability: {
    from: { type: Date },
    to: { type: Date },
  },
  blockedTimeSlots: [
    {
      date: Date,
      startTime: String,
      endTime: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  startingPrice: { type: Number },
  reviews: [
    {
      userId: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  skills: [{ type: String }],
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
  requestId: {
    type: String,
    required: true,
    unique: true,
    default: () => nanoid(10),
  }, // Custom Unique identifier for the service request
  customerId: { type: String, required: true }, // Reference to the customer
  serviceProviderId: { type: String }, // Reference to the service provider
  fullName: { type: String }, // Customer's full name
  email: { type: String }, // Customer's email
  contactNumber: { type: String }, // Customer's contact number
  address: { type: String }, // Customer's address
  description: { type: String }, // Description of the service request
  assignedTo: {
    serviceProviderId: { type: String, default: "" },
    serviceProviderImg: { type: String, default: "" },
    serviceProviderName: { type: String, default: "" },
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "cancelled", "completed", "rejected"],
    default: "pending",
  }, // Status of the service request
  startEndDate: {
    from: { type: Date },
    to: { type: Date },
  },
  category: { type: String }, // Service category of the request
  date: { type: Date, default: Date.now }, // Date and time of the service request
  isReviewed: { type: Boolean, default: false }, // Indicates whether the service provider has been reviewed
  urgency: { type: String, enum: ["low", "medium", "high"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  attachments: [{ type: String }], // Attachments uploaded by the customer
  budget: { type: Number }, // Budget of the service request
  applicants: [
    {
      providerId: String,
      application: String,
      status: String,
      createdAt: Date,
      updatedAt: Date,
    },
  ],
  // Add other relevant service request fields
});

const ServiceOfferSchema = new mongoose.Schema({
  serviceProviderId: { type: String, required: true },
  serviceCategory: { type: String, required: true },
  serviceCategorySlug: { type: String, required: true },
  serviceDescription: { type: String },
  servicePrice: { type: Number, required: true },
  serviceDuration: { type: Number },
  serviceImg: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Export the schemas as models
export const User = mongoose.models?.User || mongoose.model("User", UserSchema);
export const ServicesOffer =
  mongoose.models?.ServiceOffer ||
  mongoose.model("ServiceOffer", ServiceOfferSchema);

export const ServiceCategory =
  mongoose.models?.ServiceCategory ||
  mongoose.model("ServiceCategory", ServiceCategorySchema);

export const Review =
  mongoose.models?.Review || mongoose.model("Review", ReviewSchema);

export const ServiceRequest =
  mongoose.models?.ServiceRequest ||
  mongoose.model("ServiceRequest", ServiceRequestSchema);
