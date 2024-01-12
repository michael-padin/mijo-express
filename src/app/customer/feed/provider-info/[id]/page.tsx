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

  console.log(providerInfo);

  return (
    <div>
      <div className=" space-y-6 p-10 pb-16 ">
        <div className="flex gap-20">
          <ServiceProviderInfo providerInfo={providerInfo} />
          <Card className="w-[450px] ">
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
