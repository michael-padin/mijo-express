/** @format */
"use client";

import React from "react";
import { PieGraphTransactions } from "./components/pie-graph-transactions";
import { TransactionsTable } from "./components/transactions-table";

export default function DashboardPage() {
  return (
    <div>
      <div className=" p-5">
        <h1 className="mb-5 text-2xl font-bold">Dashboard Page</h1>
        {/* Add your content here */}
        <div className="flex flex-wrap gap-5">
          {/* <PieGraphTransactions /> */}
          {/* <TransactionsTable /> */}
        </div>
      </div>
    </div>
  );
}
