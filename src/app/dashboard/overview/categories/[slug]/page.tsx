import ProviderList from "@/components/overview/customer/provider-list";
import { buttonVariants } from "@/components/ui/button";
import { getProvidersByCategory } from "@/lib/data";
import { cn, unslugAndCapitalize } from "@/lib/utils";
import { Home } from "lucide-react";
import Link from "next/link";

export default async function CategoriesPage({
  params,
}: {
  params: { slug: string };
}) {
  const providers = JSON.parse(await getProvidersByCategory(params.slug));

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
            <span className="font-bold">
              {unslugAndCapitalize(params.slug)}
            </span>
          </h2>
        </div>
      </div>

      <div className="">
        <ProviderList providers={providers} />
      </div>
    </div>
  );
}
