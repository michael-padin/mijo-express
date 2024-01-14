import { Separator } from "@/components/ui/separator";
import ServiceDetailsForm from "../components/service-details-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApplicantsList } from "../components/applicants-list";

export default function ServiceRequestDetailsPage() {
  return (
    <div className=" ">
      <div className=" space-y-6 p-10 pb-16 ">
        <div className="flex  justify-between space-y-0.5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Service Requests Details
            </h2>
            <p className="text-muted-foreground"></p>
          </div>
        </div>
        <Separator className="my-6" />
        {/* <DataTable columns={columns} data={transactionData} /> */}
        <div className="flex  gap-2">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Details</CardTitle>
              <CardDescription>
                This is the details of the service request.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ServiceDetailsForm categories={[]} />
            </CardContent>
          </Card>
          <div className="flex-1">
            <ApplicantsList />
          </div>
        </div>
      </div>
    </div>
  );
}
