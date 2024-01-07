/** @format */
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpFromLine, Filter } from "lucide-react";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { transactionData } from "./data";

export const TransactionsTable: React.FC = () => {
  return (
    <Card className="grow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Transaction</CardTitle>
          <div className="flex items-center gap-4">
            <Button variant="secondary" size="icon">
              <Filter size={15} />
            </Button>
            <Button
              variant="secondary"
              className={cn("flex gap-2 text-primary dark:text-foreground")}
            >
              <ArrowUpFromLine size={15} />
              <p>Export</p>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={transactionData} />
      </CardContent>
    </Card>
  );
};
