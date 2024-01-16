"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ServiceRequestAction } from "./admin-customer-request-action";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { MeDatePickerWithRange } from "@/components/me/me-date-range-picker";
import Link from "next/link";
import { AdminProviderRequestAction } from "./admin-provider-request-action";

export const adminProviderColumns: ColumnDef<any>[] = [
  // {
  //   accessorKey: "_id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="ID" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <span className="max-w-[500px] truncate">
  //         {row.getValue("_id")}
  //       </span>
  //     );
  //   },
  //   enableSorting: false,
  // },
  {
    accessorKey: "serviceProviderName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PROVIDER" />
    ),
    cell: ({ row }) => {
      const category = row.original.serviceOffer.serviceCategory as any;

      return (
        <div className="flex space-x-2">
          <span className="truncate ">
            {row.getValue("serviceProviderName")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "customerDescription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DESCRIPTION" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-2">
          <span className="max-w-[200px] truncate">
            {row.getValue("customerDescription")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },

  {
    accessorKey: "startEndDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DUE ON" />
    ),
    cell: ({ row }) => {
      const due = (row.getValue("startEndDate") as { to: Date }).to;
      return <span className="flex flex-col">{format(due, "LLL dd, y")}</span>;
    },
    enableSorting: false,
  },

  {
    enableSorting: false,
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="STATUS" />
    ),
    cell: ({ row }) => {
      // generate badges by status
      // generate badges by status
      const status = row.getValue("status") as string;

      if (status === "pending") {
        return (
          <Badge
            className={cn("bg-yellow-100 text-yellow-800 hover:bg-yellow-100 ")}
          >
            {status}
          </Badge>
        );
      } else if (status === "accepted") {
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            {status}
          </Badge>
        );
      } else if (status === "completed") {
        return (
          <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">
            {status}
          </Badge>
        );
      } else if (status === "cancelled") {
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            {status}
          </Badge>
        );
      }
      return <Badge>{status}</Badge>;
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TOTAL " />
    ),
    cell: ({ row }) => {
      const price: any = row.original.serviceOffer.servicePrice;

      return <span className="">{formatCurrency(price)}</span>;
    },
    enableSorting: false,
  },
  {
    enableSorting: false,
    accessorKey: "customerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/overview/provider-info/${row.original.serviceProviderId}`}
          className="hover:underline"
        >
          {row.getValue("customerName")}
        </Link>
      );
    },
  },
  {
    enableSorting: false,
    accessorKey: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ACTION" />
    ),
    cell: ({ row }) => {
      return <AdminProviderRequestAction requestInfo={row.original} />;
    },
  },
];
