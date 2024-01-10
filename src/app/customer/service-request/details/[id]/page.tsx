import { Separator } from "@/components/ui/separator";

export default function ServiceRequestDetailsPage() {
  return (
    <div className=" ">
      <div className=" space-y-6 p-10 pb-16 ">
        <div className="flex  justify-between space-y-0.5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Service Requests
            </h2>
            <p className="text-muted-foreground">
              This page displays a list of your service requests.
            </p>
          </div>
        </div>
        <Separator className="my-6" />
        {/* <DataTable columns={columns} data={transactionData} /> */}
      </div>
    </div>
  );
}
