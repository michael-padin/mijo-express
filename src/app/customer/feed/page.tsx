import { Separator } from "@/components/ui/separator";
import ServiceList from "./components/ServiceList";
import Categories from "./components/Categories";
import { getAllProviders, getAllServiceCategories } from "@/lib/data";

export default async function ServicesPage() {
  const categories = JSON.parse(await getAllServiceCategories());
  const providers = JSON.parse(await getAllProviders());

  return (
    <div className=" ">
      <div className=" space-y-6 p-5 pb-16 ">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            Providers You May Find
          </h2>
          <p className="text-muted-foreground">
            Here are some providers you may find interesting.
          </p>
        </div>
        <Separator className="my-6" />

        <div className="">
          <Categories categories={categories} />
          <ServiceList providers={providers} />
        </div>
      </div>
    </div>
  );
}
