import { Separator } from "@/components/ui/separator";
import ServiceRequestForm from "./components/service-request-form";

const getCategories = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/feed/categories`
  );
  const categories = await response.json();
  return categories;
};

export default async function CreateServiceRequestPage() {
  const { categories } = await getCategories();
  return (
    <div className=" ">
      <div className=" space-y-6 p-10 pb-16 ">
        <div className="flex  justify-between space-y-0.5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Create Service Requests
            </h2>
            <p className="text-muted-foreground">
              Initiate service requests effortlessly by following simple steps
              on this page.
            </p>
          </div>
        </div>
        <Separator className="my-6" />
        <ServiceRequestForm categories={categories} />
      </div>
    </div>
  );
}
