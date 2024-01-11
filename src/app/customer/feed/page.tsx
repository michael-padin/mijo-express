import { Separator } from "@/components/ui/separator";
import ServiceList from "./components/ServiceList";
import Categories from "./components/Categories";

const getProviders = async () => {
  const response = await fetch("/api/customer/feed/providers");
  const providers = await response.json();
  return providers;
};

const getCategories = async () => {
  const response = await fetch("/api/customer/feed/categories");
  const categories = await response.json();
  return categories;
};

export default async function ServicesPage() {
  const { categories } = await getCategories();
  const { providers } = await getProviders();

  return (
    <div className=" ">
      <div className=" space-y-6 p-10 pb-16 ">
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
