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
  // blockedTimeSlots: [
  //   {
  //     date: Date,
  //     startTime: String,
  //     endTime: String,
  //   },
  // ],
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
  serviceRequestId: { type: String, required: true },

  providerId: { type: String, required: true },
  providerName: { type: String },
  providerProfileImg: { type: String },
  providerAddress: { type: String },
  providerComment: { type: String },
  providerRating: { type: Number },

  customerId: { type: String, required: true },
  customerName: { type: String },
  customerProfileImg: { type: String },
  customerAddress: { type: String },
  customerComment: { type: String },
  customerRating: { type: Number },

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
  serviceOfferId: { type: String }, // Reference to the service
  serviceOffer: {
    serviceOfferId: { type: String },
    serviceCategory: { type: String },
    serviceCategorySlug: { type: String },
    serviceDescription: { type: String },
    serviceTitle: { type: String },
    servicePrice: { type: Number },
    serviceDuration: { type: Number },
    serviceImg: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  serviceProviderId: { type: String }, // Reference to the service provider
  serviceProviderName: { type: String }, // Service provider's full name
  serviceProvideAddress: { type: String }, // Service provider's address
  serviceProviderEmail: { type: String }, // Service provider's address
  serviceProviderContactNumber: { type: String }, // Service provider's contact number

  customerId: { type: String, required: true }, // Reference to the customer
  customerName: { type: String }, // Customer's full name
  customerAddress: { type: String }, // Customer's address
  customerEmail: { type: String }, // Customer's email
  contactNumber: { type: String }, // Customer's contact number
  customerDescription: { type: String }, // Description of the service request
  status: {
    type: String,
    enum: ["pending", "accepted", "cancelled", "completed", "rejected"],
    default: "pending",
  }, // Status of the service request
  startEndDate: {
    from: { type: Date },
    to: { type: Date },
  },
  isReviewed: { type: Boolean, default: false }, // Indicates whether the service provider has been reviewed
  isCustomerReviewed: { type: Boolean, default: false }, // Indicates whether the service provider has been reviewed
  isProviderReviewed: { type: Boolean, default: false }, // Indicates whether the service provider has been reviewed
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  attachments: [{ type: String }], // Attachments uploaded by the customer
  budget: { type: Number }, // Budget of the service request
  // Add other relevant service request fields
});

const ServiceOfferSchema = new mongoose.Schema({
  serviceOfferId: { type: String, required: true, default: () => nanoid(10) },
  serviceProviderId: { type: String },
  serviceCategory: { type: String },
  serviceCategorySlug: { type: String },
  serviceDescription: { type: String },
  serviceTitle: { type: String },
  servicePrice: { type: Number },
  serviceDuration: { type: Number },
  serviceImg: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Export the schemas as models
export const User = mongoose.models?.User || mongoose.model("User", UserSchema);
export const ServiceOffer =
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
