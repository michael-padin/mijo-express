import { Button, buttonVariants } from "@/components/ui/button";
("use client");
import { Separator } from "@/components/ui/separator";
import ProviderCard from "@/components/customer/feed/ProviderCard";

const ServiceList = ({ providers }: any) => {
  return (
    <div className="w-full">
      <Separator className="my-6" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {providers.map((provider) => (
          <ProviderCard key={provider._id} providerInfo={provider} />
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
