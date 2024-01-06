import { z } from "zod";
import {
  Customer,
  ServiceCategory,
  ServiceProvider,
  ServiceRequest,
  User,
} from "./models";

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
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
};

const checkEmailExists = async (email: string): Promise<boolean> => {
  const user = await User.findOne({ email });
  return !!user;
};

// Create a new service category
const createServiceCategory = async (categoryData: any) => {
  try {
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
    const categories = await ServiceCategory.find();
    return categories;
  } catch (error) {
    throw error;
  }
};

// Create a new service provider
const createServiceProvider = async (providerData: any) => {
  try {
    const provider = new ServiceProvider(providerData);
    const newProvider = await provider.save();
    return newProvider;
  } catch (error) {
    throw error;
  }
};

// Get all service providers
const getAllServiceProviders = async () => {
  try {
    const providers = await ServiceProvider.find();
    return providers;
  } catch (error) {
    throw error;
  }
};

// Create a new customer
const createCustomer = async (customerData: any) => {
  try {
    const customer = new Customer(customerData);
    const newCustomer = await customer.save();
    return newCustomer;
  } catch (error) {
    throw error;
  }
};

// Get all customers
const getAllCustomers = async () => {
  try {
    const customers = await Customer.find();
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
  checkEmailExists,
  createUser,
  getAllUsers,
  createServiceCategory,
  getAllServiceCategories,
  createServiceProvider,
  getAllServiceProviders,
  createCustomer,
  getAllCustomers,
  createServiceRequest,
  getAllServiceRequests,
};
