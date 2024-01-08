"use server";
import { z } from "zod";
import { ServiceCategory, ServiceRequest, User } from "./models";
import { connectToDB } from "./utils";
import { serviceCategories } from "./sampleData/userTransaction";

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
    return providers;
  } catch (error) {
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
    return categories;
  } catch (error) {
    throw error;
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
    const request = new ServiceRequest(requestData);
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

export {
  getAllProviders,
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
