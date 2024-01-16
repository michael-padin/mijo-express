import SubmitRequestForm from "../components/submit-request-form";
import ServiceProviderInfo from "../components/service-provider-info";
import {
  getProviderInfo,
  getReviewsByProvider,
  getServiceOfferByProvider,
} from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";

export default async function ProviderInfoPage({
  params,
}: {
  params: { id: string };
}) {
  const providerInfo = JSON.parse(await getProviderInfo(params.id));
  const serviceOffers = JSON.parse(await getServiceOfferByProvider(params.id));
  const reviews = JSON.parse(await getReviewsByProvider(params.id));
  const userInfo: any = await getServerSession(authConfig);

  return (
    <div className=" relative space-y-6 pb-16 lg:p-8">
      <div className="flex lg:gap-5 ">
        <Card className="flex-1">
          <CardHeader>
            <ServiceProviderInfo
              providerInfo={providerInfo}
              reviews={reviews}
            />
          </CardHeader>
        </Card>
        <Card className="sticky top-8 h-full lg:w-1/2 xl:w-[450px]">
          <CardHeader>
            <CardTitle>Services Offered</CardTitle>
            <CardDescription>
              You can request for the following services from this provider.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SubmitRequestForm
              servicesOferrs={serviceOffers}
              providerInfo={providerInfo}
              userInfo={userInfo?.user}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
