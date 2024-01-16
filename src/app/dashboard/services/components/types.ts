import { z } from "zod";

export const ServiceOfferSchema = z.object({
  _id: z.string(),
  serviceOfferId: z.string().min(1).max(10), // Assuming nanoid generates a string of length 10
  serviceProviderId: z.string(),
  serviceCategory: z.string(),
  serviceCategorySlug: z.string(),
  serviceDescription: z.string(),
  serviceTitle: z.string(),
  servicePrice: z.number(),
  serviceDuration: z.number(),
  serviceImg: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ServiceOffer = z.infer<typeof ServiceOfferSchema>;

export type ServiceActionsProps = {
  serviceInfo: ServiceOffer;
  id: string;
};
