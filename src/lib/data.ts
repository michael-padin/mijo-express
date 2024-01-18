"use server";
import {
  Review,
  ServiceCategory,
  ServiceOffer,
  ServiceRequest,
  User,
} from "./models";
import { connectToDB } from "./utils";
import { serviceCategories } from "./sampleData/userTransaction";

export const getServiceOfferByProvider = async (id: any) => {
  try {
    await connectToDB();

    const services = await ServiceOffer.find({ serviceProviderId: id }).sort({
      createdAt: -1,
    });
    return JSON.stringify(services);
  } catch (error) {
    throw new Error("Failed to fetch provider");
  }
};

export const getAllServiceOffers = async () => {
  try {
    await connectToDB();

    // find all serviceoffers then query userInfo returned by serviceOffer to get the provider info
    const services = await ServiceOffer.find().sort({ createdAt: -1 });
    const result = await Promise.all(
      services.map(async (service: any) => {
        const providerInfo = await User.findById(
          service.serviceProviderId
        ).select("-password");

        return { ...service._doc, serviceProviderName: providerInfo.fullName };
      })
    );

    return JSON.stringify(result);
  } catch (error) {
    throw new Error("Failed to fetch provider");
  }
};

export const deleteServiceOffer = async (id: string) => {
  try {
    await connectToDB();

    const serviceOffer = await ServiceOffer.findOneAndDelete({
      _id: id,
    });
    return serviceOffer;
  } catch (error) {
    throw error;
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
    const requests = await ServiceRequest.find({ customerId: id }).sort({
      createdAt: -1,
    });

    //find serviceOffer by serviceOfferId in the requeests object array then add to the service offer to each object

    return JSON.stringify(requests);
  } catch (error) {
    throw error;
  }
};

export const getAllServiceRequestsByRole = async (role: string) => {
  try {
    await connectToDB();
    const users = await User.find({ role });
    const userIds = users.map((user) => user._id);

    const requests = await ServiceRequest.find({
      $or: [
        { customerId: { $in: userIds } },
        { serviceProviderId: { $in: userIds } },
      ],
    }).sort({ createdAt: -1 });

    return JSON.stringify(requests);
  } catch (error) {
    throw error;
  }
};

const getProviderServiceRequest = async (id: string) => {
  try {
    await connectToDB();
    const requests = await ServiceRequest.find({ serviceProviderId: id }).sort({
      createdAt: -1,
    });

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

export const updateUserById = async (payload: any) => {};

const getRevenuePerMonth = async (serviceProviderId: string) => {
  try {
    await connectToDB();
    const result = await ServiceRequest.aggregate([
      {
        $match: {
          serviceProviderId: serviceProviderId,
          status: "completed",
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          total: { $sum: "$serviceOffer.servicePrice" },
        },
      },
      {
        $project: {
          _id: 0,
          name: {
            $let: {
              vars: {
                monthsInString: [
                  ,
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
              },
              in: { $arrayElemAt: ["$$monthsInString", "$_id.month"] },
            },
          },
          total: 1,
        },
      },
    ]);

    // Create a base array with all months and their totals set to zero
    const baseData = [
      { name: "Jan", total: 0 },
      { name: "Feb", total: 0 },
      { name: "Mar", total: 0 },
      { name: "Apr", total: 0 },
      { name: "May", total: 0 },
      { name: "Jun", total: 0 },
      { name: "Jul", total: 0 },
      { name: "Aug", total: 0 },
      { name: "Sep", total: 0 },
      { name: "Oct", total: 0 },
      { name: "Nov", total: 0 },
      { name: "Dec", total: 0 },
    ];

    // Merge the base array with the result from the MongoDB aggregation
    const finalResult = baseData.map((item) => {
      const found = result.find((r) => r.name === item.name);
      return found ? found : item;
    });

    return JSON.stringify(finalResult);
    console.log(result);

    // Use the result as needed, e.g., format it or send it to the client
  } catch (error) {
    console.error(error);
  }
};

const getTotalRevenue = async (serviceProviderId: string) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  try {
    const revenueUntilLastMonth = await ServiceRequest.aggregate([
      {
        $match: {
          serviceProviderId: serviceProviderId,
          status: "completed",
          createdAt: {
            $lt: new Date(currentYear, currentMonth, 1),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$serviceOffer.servicePrice",
          },
        },
      },
    ]);

    const revenueUntilThisMonth = await ServiceRequest.aggregate([
      {
        $match: {
          serviceProviderId: serviceProviderId,
          status: "completed",
          createdAt: {
            $lt: new Date(currentYear, currentMonth + 1, 1),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$serviceOffer.servicePrice",
          },
        },
      },
    ]);

    const result = {
      lastMonth: revenueUntilLastMonth[0]?.total || 0,
      thisMonth: revenueUntilThisMonth[0]?.total || 0,
    };

    return JSON.stringify(result);
  } catch (error) {
    throw error;
  }
};

const getTotalCompletions = async (serviceProviderId: string) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  try {
    const completionsUntilLastMonth = await ServiceRequest.countDocuments({
      serviceProviderId: serviceProviderId,
      status: "completed",
      createdAt: {
        $lt: new Date(currentYear, currentMonth, 1),
      },
    });

    const completionsUntilThisMonth = await ServiceRequest.countDocuments({
      serviceProviderId: serviceProviderId,
      status: "completed",
      createdAt: {
        $lt: new Date(currentYear, currentMonth + 1, 1),
      },
    });

    const result = {
      lastMonth: completionsUntilLastMonth,
      thisMonth: completionsUntilThisMonth,
    };

    return JSON.stringify(result);
  } catch (error) {
    throw error;
  }
};

const getAverageRating = async (providerId: string) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  try {
    const ratingUntilLastMonth = await Review.aggregate([
      {
        $match: {
          providerId: providerId,
          createdAt: {
            $lt: new Date(currentYear, currentMonth, 1),
          },
        },
      },
      {
        $group: {
          _id: null,
          averageRating: {
            $avg: "$customerRating",
          },
        },
      },
    ]);

    const ratingUntilThisMonth = await Review.aggregate([
      {
        $match: {
          providerId: providerId,
          createdAt: {
            $lt: new Date(currentYear, currentMonth + 1, 1),
          },
        },
      },
      {
        $group: {
          _id: null,
          averageRating: {
            $avg: "$customerRating",
          },
        },
      },
    ]);

    const result = {
      lastMonth: ratingUntilLastMonth[0]?.averageRating || 0,
      thisMonth: ratingUntilThisMonth[0]?.averageRating || 0,
    };

    return JSON.stringify(result);
  } catch (error) {
    throw error;
  }
};

const getTotalServiceRequests = async (providerId: string) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  try {
    const requestsUntilLastMonth = await ServiceRequest.countDocuments({
      serviceProviderId: providerId,
      createdAt: {
        $lt: new Date(currentYear, currentMonth, 1),
      },
    });

    const requestsUntilThisMonth = await ServiceRequest.countDocuments({
      serviceProviderId: providerId,
      createdAt: {
        $lt: new Date(currentYear, currentMonth + 1, 1),
      },
    });

    const result = {
      lastMonth: requestsUntilLastMonth,
      thisMonth: requestsUntilThisMonth,
    };

    return JSON.stringify(result);
  } catch (error) {
    throw error;
  }
};

const getProviderAppointments = async (providerId: string) => {
  try {
    await connectToDB();
    const requests = await ServiceRequest.find({
      serviceProviderId: providerId,
      status: "accepted",
    }).sort({ createdAt: -1 });

    return JSON.stringify(requests);
  } catch (error) {
    throw error;
  }
};
const getCustomerAppointments = async (id: string) => {
  try {
    await connectToDB();
    const requests = await ServiceRequest.find({
      customerId: id,
      status: "accepted",
    });

    //find serviceOffer by serviceOfferId in the requeests object array then add to the service offer to each object

    return JSON.stringify(requests);
  } catch (error) {
    throw error;
  }
};

export const updateServiceOffer = async (id: string, payload: any) => {
  try {
    await connectToDB();

    const serviceOffer = await ServiceOffer.findOneAndUpdate(
      { _id: id },
      { ...payload }
    );
    return serviceOffer;
  } catch (error) {
    console.log(error);
  }
};

const getTotalProviders = async () => {
  try {
    await connectToDB();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const providersUntilLastMonth = await User.countDocuments({
      role: "service_provider",
      createdAt: {
        $lt: new Date(currentYear, currentMonth, 1),
      },
    });
    User;
    const providersUntilThisMonth = await User.countDocuments({
      role: "service_provider",
      createdAt: {
        $lt: new Date(currentYear, currentMonth + 1, 1),
      },
    });

    const result = {
      lastMonth: providersUntilLastMonth,
      thisMonth: providersUntilThisMonth,
    };

    console.log(result);

    return JSON.stringify(result);
  } catch (error) {
    console.error(error);
  }
};

const getTotalPendingRequests = async () => {
  try {
    await connectToDB();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const requestsUntilLastMonth = await ServiceRequest.countDocuments({
      status: "pending",
      createdAt: {
        $lt: new Date(currentYear, currentMonth, 1),
      },
    });

    const requestsUntilThisMonth = await ServiceRequest.countDocuments({
      status: "pending",
      createdAt: {
        $lt: new Date(currentYear, currentMonth + 1, 1),
      },
    });

    const result = {
      lastMonth: requestsUntilLastMonth,
      thisMonth: requestsUntilThisMonth,
    };

    return JSON.stringify(result);
  } catch (error) {
    throw error;
  }
};

const getTotalStatusRequests = async (status: string) => {
  try {
    await connectToDB();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const requestsUntilLastMonth = await ServiceRequest.countDocuments({
      status: status,
      createdAt: {
        $lt: new Date(currentYear, currentMonth, 1),
      },
    });

    const requestsUntilThisMonth = await ServiceRequest.countDocuments({
      status: status,
      createdAt: {
        $lt: new Date(currentYear, currentMonth + 1, 1),
      },
    });

    const result = {
      lastMonth: requestsUntilLastMonth,
      thisMonth: requestsUntilThisMonth,
    };

    return JSON.stringify(result);
  } catch (error) {
    throw error;
  }
};

export {
  getTotalStatusRequests,
  getTotalPendingRequests,
  getTotalProviders,
  getProviderAppointments,
  getCustomerAppointments,
  getProviderServiceRequest,
  getTotalServiceRequests,
  getAverageRating,
  getTotalCompletions,
  getTotalRevenue,
  getRevenuePerMonth,
  updateServiceRequest,
  getCustomerServiceRequest,
  getReviewsByProvider,
  createReview,
  checkEmailExists,
  createServiceCategory,
  getAllServiceCategories,
  createServiceRequest,
  getAllServiceRequests,
};
