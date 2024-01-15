"use server";
import { z } from "zod";
import {
  Review,
  ServiceCategory,
  ServiceOffer,
  ServiceRequest,
  User,
} from "./models";
import { connectToDB } from "./utils";
import { serviceCategories } from "./sampleData/userTransaction";
import { revalidatePath } from "next/cache";

// Create a new user
const createUser = async (userData: any) => {
  try {
    const user = new User(userData);
    const newUser = await user.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

// Get all users
const getAllUsers = async () => {
  try {
    await connectToDB();
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
};

const getAllProviders = async () => {
  try {
    await connectToDB();

    const providers = await User.find({ role: "service_provider" }).select(
      "-password"
    );
    return JSON.stringify(providers);
  } catch (error) {
    throw new Error("Failed to fetch providers");
  }
};

const getProvidersBySearch = async (searchValue: string) => {
  try {
    await connectToDB();

    // find users by location or name, or services for from servicesschema
    const providers = await User.find({
      $or: [
        { address: { $regex: searchValue, $options: "i" } },
        { fullName: { $regex: searchValue, $options: "i" } },
      ],
    }).select("-password");

    return JSON.stringify(providers);
  } catch (error) {
    throw new Error("Failed to fetch providers");
  }
};

const getProvidersByCategory = async (categoryValue: string) => {
  /**
   * 1. get all services by category
   * 2. get all providers return from 1 by getting the providerid field from servicesOffer
   * 3. get all providers by id from 2
   ***/
  try {
    await connectToDB();

    const services = await ServiceOffer.find({
      serviceCategorySlug: categoryValue,
    });

    const providers = await User.find({
      _id: { $in: services.map((service: any) => service.serviceProviderId) },
    }).select("-password");

    return JSON.stringify(providers);
  } catch (error) {
    throw new Error("Failed to fetch providers");
  }
};
export const getProviderInfo = async (id: any) => {
  try {
    await connectToDB();

    const providerInfo = await User.findById(id).select("-password");
    return JSON.stringify(providerInfo);
  } catch (error) {
    throw new Error("Failed to fetch provider");
  }
};

export const getServiceOfferByProvider = async (id: any) => {
  try {
    await connectToDB();

    const services = await ServiceOffer.find({ serviceProviderId: id });
    return JSON.stringify(services);
  } catch (error) {
    throw new Error("Failed to fetch provider");
  }
};

const createReview = async (reviewData: any) => {
  try {
    await connectToDB();

    const review = new Review(reviewData);
    const newReview = await review.save();
    return newReview;
  } catch (error) {
    throw error;
  }
};

const getReviewsByProvider = async (id: string) => {
  try {
    await connectToDB();
    const reviews = await Review.find({ providerId: id });
    return JSON.stringify(reviews);
  } catch (error) {
    throw error;
  }
};

export const createServiceOffer = async (serviceOfferData: any) => {
  try {
    const serviceOffer = new ServiceOffer(serviceOfferData);
    const newServiceOffer = await serviceOffer.save();
    return newServiceOffer;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const checkEmailExists = async (email: string): Promise<boolean> => {
  const user = await User.findOne({ email });
  return !!user;
};

const insertAllCategories = async () => {
  const categories = await getAllServiceCategories();
  serviceCategories.map(async (category) => {
    // Perform the insertion operation for each category
    await createServiceCategory(category);
  });
};

// Create a new service category
const createServiceCategory = async (categoryData: any) => {
  try {
    connectToDB();
    const category = new ServiceCategory(categoryData);
    const newCategory = await category.save();
    return newCategory;
  } catch (error) {
    throw error;
  }
};

// Get all service categories
const getAllServiceCategories = async () => {
  try {
    await connectToDB();
    const categories = await ServiceCategory.find();
    return JSON.stringify(categories);
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};

// Create a new service provider
const createServiceProvider = async (providerData: any) => {
  try {
    const provider = new User(providerData);
    const newProvider = await provider.save();
    return newProvider;
  } catch (error) {
    throw error;
  }
};

// Get all service providers
const getAllServiceProviders = async () => {
  try {
    const providers = await User.find({ role: "service_provider" });
    return providers;
  } catch (error) {
    throw error;
  }
};

// Get all customers
const getAllCustomers = async () => {
  try {
    const customers = await User.find({ role: "customer" });
    return customers;
  } catch (error) {
    throw error;
  }
};

// Create a new service request
const createServiceRequest = async (requestData: any) => {
  try {
    const serviceOffer = await ServiceOffer.findOne({
      serviceOfferId: requestData.serviceOfferId,
    });

    const newRequestData = { ...requestData, serviceOffer: serviceOffer };

    const request = new ServiceRequest(newRequestData);
    const newRequest = await request.save();
    return newRequest;
  } catch (error) {
    throw error;
  }
};

// Get all service requests
const getAllServiceRequests = async () => {
  try {
    const requests = await ServiceRequest.find();
    return requests;
  } catch (error) {
    throw error;
  }
};

const getCustomerServiceRequest = async (id: string) => {
  try {
    await connectToDB();
    const requests = await ServiceRequest.find({ customerId: id });

    //find serviceOffer by serviceOfferId in the requeests object array then add to the service offer to each object

    return JSON.stringify(requests);
  } catch (error) {
    throw error;
  }
};

const updateServiceRequest = async (payload: any) => {
  try {
    const { updatedServiceRequestData, serviceRequestId } = payload;
    const request = await ServiceRequest.findOneAndUpdate(
      { requestId: serviceRequestId },
      updatedServiceRequestData
    );
    return request;
  } catch (error) {
    throw error;
  }
};

export {
  updateServiceRequest,
  getCustomerServiceRequest,
  getReviewsByProvider,
  createReview,
  getProvidersByCategory,
  getAllProviders,
  getProvidersBySearch,
  checkEmailExists,
  createUser,
  getAllUsers,
  createServiceCategory,
  getAllServiceCategories,
  createServiceProvider,
  getAllServiceProviders,
  getAllCustomers,
  createServiceRequest,
  getAllServiceRequests,
};
