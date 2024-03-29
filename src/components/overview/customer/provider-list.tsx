"use client";
import { Separator } from "@/components/ui/separator";
import ProviderCard from "@/components/overview/customer/provider-card";

const ProviderList = ({ providers }: any) => {
  return (
    <div className="w-full">
      <Separator className="my-6" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 ">
        {providers.map((provider: any) => (
          <ProviderCard key={provider._id} providerInfo={provider} />
        ))}
      </div>
    </div>
  );
};

export default ProviderList;
