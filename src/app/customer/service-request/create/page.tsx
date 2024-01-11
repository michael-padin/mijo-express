import { Separator } from "@/components/ui/separator";
import ServiceRequestForm from "./components/service-request-form";
import { getAllServiceCategories } from "@/lib/data";

export default async function CreateServiceRequestPage() {
  const categories = await getAllServiceCategories();
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
