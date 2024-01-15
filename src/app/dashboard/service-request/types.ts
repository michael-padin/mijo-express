import { z } from "zod";

export type ServiceRequest = {
  requestId: string;
  serviceOfferId?: string;
  serviceOffer: {
    serviceOfferId: string;
    serviceCategory: string;
    serviceCategorySlug: string;
    serviceDescription: string;
    serviceTitle: string;
    servicePrice: number;
    serviceDuration: number;
    serviceImg: string;
    createdAt: Date;
    updatedAt: Date;
  };
  serviceProviderId?: string;
  serviceProviderName?: string;
  serviceProvideAddress?: string;
  serviceProviderEmail?: string;
  serviceProviderContactNumber?: string;
  customerId: string;
  customerName?: string;
  customerAddress?: string;
  customerEmail?: string;
  contactNumber?: string;
  customerDescription?: string;
  status: "pending" | "accepted" | "cancelled" | "completed" | "rejected";
  startEndDate: {
    from: Date;
    to: Date;
  };
  isCustomerReviewed: boolean;
  isProviderReviewed: boolean;
  isReviewed: boolean;
  createdAt: Date;
  updatedAt: Date;
  attachments: string[];
  budget?: number;
  // Add other relevant service request fields
};

export type ServiceRequestActionProps = {
  id: string;
  requestInfo: ServiceRequest;
};

export const ServiceReviewSchema = z.object({
  serviceRequestId: z.string(),
  providerId: z.string(),
  customerId: z.string(),
  customerName: z.string(),
  customerProfileImg: z.string(),
  customerAddress: z.string(),
  customerComment: z.string().min(1).max(1000),
  customerRating: z.number().min(1).max(5),
});

export type ServiceReview = z.infer<typeof ServiceReviewSchema>;
