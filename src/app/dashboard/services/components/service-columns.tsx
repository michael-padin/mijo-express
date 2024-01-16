"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { MeDatePickerWithRange } from "@/components/me/me-date-range-picker";
import Link from "next/link";
import { ServiceAction } from "./service-action";

export const serviceColumns: ColumnDef<any>[] = [
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service Id" />
    ),
    cell: ({ row }) => {
      return (
        <span className=" truncate font-medium">{row.getValue("_id")}</span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "serviceDescription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DESCRIPTION" />
    ),
    cell: ({ row }) => {
      const category = row.original.serviceCategory as any;

      return (
        <div className="flex space-x-2">
          {category && <Badge variant="outline">{category}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("serviceDescription")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },

  // {
  //   accessorKey: "startEndDate",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="DATE" />
  //   ),
  //   cell: ({ row }) => {
  //     const due = (row.getValue("startEndDate") as { to: Date }).to;
  //     return <span className="flex flex-col">{format(due, "LLL dd, y")}</span>;
  //   },
  //   enableSorting: false,
  // },

  // {
  //   enableSorting: false,
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="STATUS" />
  //   ),
  //   cell: ({ row }) => {
  //     // generate badges by status
  //     // generate badges by status
  //     const status = row.getValue("status") as string;

  //     if (status === "pending") {
  //       return (
  //         <Badge
  //           className={cn("bg-yellow-100 text-yellow-800")}
  //           variant="outline"
  //         >
  //           {status}
  //         </Badge>
  //       );
  //     } else if (status === "accepted") {
  //       return (
  //         <Badge className="bg-green-100 text-green-800" variant="outline">
  //           {status}
  //         </Badge>
  //       );
  //     } else if (status === "completed") {
  //       return (
  //         <Badge className="bg-indigo-100 text-indigo-800" variant="outline">
  //           {status}
  //         </Badge>
  //       );
  //     } else if (status === "cancelled") {
  //       return (
  //         <Badge className="bg-purple-100 text-purple-800" variant="outline">
  //           {status}
  //         </Badge>
  //       );
  //     } else if (status === 'rejected') {
  //       return (
  //         <Badge className="bg-red-100 text-red-800" variant="outline">
  //           {status}
  //         </Badge>
  //       );
  //     }
  //     return <Badge>{status}</Badge>;
  //   },
  // },
  {
    accessorKey: "servicePrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price " />
    ),
    cell: ({ row }) => {
      return (
        <span className="">{formatCurrency(row.getValue("servicePrice"))}</span>
      );
    },
    enableSorting: false,
  },
  // {
  //   enableSorting: false,
  //   accessorKey: "customerName",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Customer" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <Link
  //         href={`/dashboard/customer/customer-info/${row.original.customerId}`}
  //         className="font-bold hover:underline"
  //       >
  //         {row.getValue("customerName")}
  //       </Link>
  //     );
  //   },
  // },
  {
    enableSorting: false,
    accessorKey: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ACTION" />
    ),
    cell: ({ row }) => {
      return <ServiceAction id="eheheh" serviceInfo={row.original} />;
    },
  },
];
