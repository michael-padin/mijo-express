import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { transactionData } from "./components/data";

export default async function SericeRequestPage() {
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
          <div>
            <Link
              href="/customer/service-request/create"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              New Request
            </Link>
          </div>
        </div>
        <Separator className="my-6" />
        <DataTable columns={columns} data={transactionData} />
      </div>
    </div>
  );
}
