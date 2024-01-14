import { Separator } from "@/components/ui/separator";
import SubmitRequestForm from "../components/submit-request-form";
import ServiceProviderInfo from "../components/service-provider-info";
import { getProviderInfo, getServiceOfferByProvider } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ProviderInfoPage({
  params,
}: {
  params: { id: string };
}) {
  const providerInfo = JSON.parse(await getProviderInfo(params.id));
  const serviceOffers = JSON.parse(await getServiceOfferByProvider(params.id));

  return (
    <div>
      <div className=" space-y-6 p-5 pb-16 ">
        <div className="flex gap-2 lg:gap-5 xl:gap-20">
          <div className="flex-2">
            <ServiceProviderInfo providerInfo={providerInfo} />
          </div>
          <Card className="flex-1 ">
            <CardHeader>
              <CardTitle>Services Offered</CardTitle>
              <CardDescription>
                You can request for the following services from this provider.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SubmitRequestForm servicesOferrs={serviceOffers} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
