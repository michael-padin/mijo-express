import { authConfig } from "@/lib/auth.config";
import { Briefcase } from "lucide-react";
import { getServerSession } from "next-auth";
import { DataTable } from "./components/data-table";
import { DataTable as AdminDataTable } from "./components/admin/data-table";
import { Separator } from "@/components/ui/separator";
import { serviceColumns } from "./components/report-columns";
import { Card, CardHeader } from "@/components/ui/card";
import { getReports } from "@/lib/data/report";
import CreateReportForm from "./components/create-report-form";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReportAdminColumns } from "./components/admin/report-admin-columns";

export default async function ReportsPage() {
  const session = await getServerSession(authConfig);
  const { role } = session?.user || {};
  const reports = JSON.parse(
    await getReports(role === "admin" ? null : session?.user?._id ?? null)
  );

  return (
    <div>
      <div className=" space-y-6 p-5 pb-16 ">
        <div className="flex items-center justify-between space-y-0.5">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <Briefcase />
              Reports
            </h2>
            <p className="text-muted-foreground">
              {role === "admin"
                ? "This is where you can view all reports."
                : "This is where you can view all your submitted reports."}
            </p>
          </div>

          <div className="">{role !== "admin" && <CreateReportForm />}</div>
        </div>
        <Separator className="my-6" />
        <Card>
          <CardHeader>
            {role === "admin" ? (
              <AdminDataTable columns={ReportAdminColumns} data={reports} />
            ) : (
              <DataTable columns={serviceColumns} data={reports} />
            )}
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
