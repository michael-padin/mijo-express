"use server";
import { ServiceOffer, User } from "../models";
import { connectToDB } from "../utils";

// Create a new service provider
export const createServiceProvider = async (providerData: any) => {
  try {
    await connectToDB();
    const provider = new User(providerData);
    const newProvider = await provider.save();
    return newProvider;
  } catch (error) {
    throw error;
  }
};

// Get all service providers
export const getAllServiceProviders = async () => {
  try {
    await connectToDB();
    const providers = await User.find({ role: "service_provider" });
    return providers;
  } catch (error) {
    throw error;
  }
};

// Get all customers
export const getAllCustomers = async () => {
  try {
    await connectToDB();
    const customers = await User.find({ role: "customer" });
    return customers;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connectToDB();
    const response = await User.findOneAndDelete({ _id: id });

    return response;
  } catch (error) {
    console.log(error);

    throw error;
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

export const getProvidersByCategory = async (categoryValue: string) => {
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

// Create a new user
export const createUser = async (userData: any) => {
  try {
    const user = new User(userData);
    const newUser = await user.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    await connectToDB();
    const users = await User.find().select("-password");
    return JSON.stringify(users);
  } catch (error) {
    throw error;
  }
};

export const getAllProviders = async () => {
  try {
    await connectToDB();

    //query service_provider and return if has serviceOffer
    const providers = await User.find({ role: "service_provider" });
    const providerIds = providers.map((provider) => provider._id);

    const services = await ServiceOffer.find({
      serviceProviderId: { $in: providerIds },
    });

    const result = providers.filter((provider) =>
      services.some(
        (service) => service.serviceProviderId === provider._id.toString()
      )
    );

    return JSON.stringify(result);
  } catch (error) {
    throw new Error("Failed to fetch providers");
  }
};

export const getProvidersBySearch = async (searchValue: string) => {
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
