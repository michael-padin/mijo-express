import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Overview } from "./overview";
import { RecentSales } from "./recent-sales";
import { calculatePercentageChange, cn, formatCurrency } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import {
  getTotalRevenue,
  getRevenuePerMonth,
  getTotalCompletions,
  getAverageRating,
  getTotalServiceRequests,
} from "@/lib/data";
import { Calendar } from "@/components/ui/calendar";
import { Home } from "lucide-react";

// const totalRevenue = {
//   lastMonth: 10000,
//   thisMonth: 12000,
// };

const ratingsAndReviews = {
  lastMonth: { averageRating: 4.2, numberOfReviews: 10 },
  thisMonth: { averageRating: 4.5, numberOfReviews: 15 },
};

const completions = {
  lastMonth: 100,
  thisMonth: 120,
};

const serviceRequests = {
  lastMonth: 100,
  thisMonth: 120,
};

const ServiceProviderOverview = async () => {
  const session = await getServerSession(authConfig);
  const revenueByMonth = JSON.parse(
    (await getRevenuePerMonth(session?.user?._id || "")) || ""
  );
  const totalRevenue = JSON.parse(
    await getTotalRevenue(session?.user?._id || "")
  );
  const totalCompletions = JSON.parse(
    (await getTotalCompletions(session?.user?._id || "")) || ""
  );

  const averageRating = JSON.parse(
    (await getAverageRating(session?.user?._id || "")) || ""
  );

  const serviceRequests = JSON.parse(
    (await getTotalServiceRequests(session?.user?._id || "")) || ""
  );

  return (
    <div className=" space-y-6 p-10 pb-16 ">
      <div className="space-y-0.5">
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Home />
          Overview
        </h2>
        <p className="text-muted-foreground">
          Here is an overview of your account.
        </p>
      </div>
      <Separator className="my-6" />

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M17 14h.01" />
                <path d="M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(totalRevenue.thisMonth)}
              </div>
              <p className="text-xs text-muted-foreground">
                {totalRevenue.lastMonth > 0
                  ? `+${calculatePercentageChange(
                      totalRevenue.lastMonth,
                      totalRevenue.thisMonth
                    )}`
                  : "0"}
                % from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                +{totalCompletions.thisMonth}
              </div>
              <p className="text-xs text-muted-foreground">
                {`+${totalCompletions.lastMonth} from last month`}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ratings</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {averageRating.thisMonth}
              </div>
              <p className="text-xs text-muted-foreground">
                {averageRating.lastMonth} from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Service Requests
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                +{serviceRequests.thisMonth}
              </div>
              <p className="text-xs text-muted-foreground">
                +{`${serviceRequests.lastMonth}`} from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-7">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview data={revenueByMonth} />
            </CardContent>
          </Card>
          {/* <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar className={cn("!w-full")}  mode="single"/>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderOverview;
