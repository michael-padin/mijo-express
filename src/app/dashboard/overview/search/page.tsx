import ProviderList from "@/components/overview/customer/provider-list";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAllProviders, getProvidersBySearch } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function SearchPage({ searchParams }: any) {
  const providers = JSON.parse(await getProvidersBySearch(searchParams.query));

  if (providers.length === 0) {
    return (
      <div className="mt-10">
        <p className="text-center text-2xl font-bold text-muted-foreground">
          No results found
        </p>
      </div>
    );
  }

  return (
    <div className=" space-y-6 p-5 pb-16 ">
      <div className="space-y-0.5">
        <div className=" flex items-center gap-2">
          <Link
            className={cn(buttonVariants({ variant: "ghost" }))}
            href="/dashboard/overview"
          >
            <Home />
          </Link>
          <h2 className="text-2xl  tracking-tight">
            Results for
            <span className="font-bold">{`'${searchParams.query}`}</span>
          </h2>
        </div>
      </div>

      <div className="">
        <ProviderList providers={providers} />
      </div>
    </div>
  );
}
