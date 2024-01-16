"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
const data = [
  {
    revenue: 10400,
    subscription: 240,
  },
  {
    revenue: 14405,
    subscription: 300,
  },
  {
    revenue: 9400,
    subscription: 200,
  },
  {
    revenue: 8200,
    subscription: 278,
  },
  {
    revenue: 7000,
    subscription: 189,
  },
  {
    revenue: 9600,
    subscription: 239,
  },
  {
    revenue: 11244,
    subscription: 278,
  },
  {
    revenue: 26475,
    subscription: 189,
  },
];

export default function TotalUsers() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">Total Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+2350</div>
        <p className="text-xs text-muted-foreground">+180.1% from last month</p>
        <div className="mt-4 h-[80px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar dataKey="subscription" className="fill-primary" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
