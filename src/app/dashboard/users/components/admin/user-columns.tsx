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
      <DataTableColumnHeader column={column} title="USER ID" />
    ),
    cell: ({ row }) => {
      return <span className=" truncate ">{row.getValue("_id")}</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="FULL NAME" />
    ),
    cell: ({ row }) => {
      return <span className="truncate ">{row.getValue("fullName")}</span>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="EMAIL" />
    ),
    cell: ({ row }) => {
      const category = row.original.serviceCategory as any;

      return (
        <div className="flex space-x-2">
          <span className=" truncate ">{row.getValue("email")}</span>
        </div>
      );
    },
    enableHiding: false,
  },

  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ROLE" />
    ),
    cell: ({ row }) => {
      return <span className="flex flex-col">{row.getValue("role")}</span>;
    },
    enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="JOINED " />
    ),
    cell: ({ row }) => {
      return (
        <span className="">
          {format(row.getValue("createdAt"), "LLL, dd, y")}
        </span>
      );
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
          href={`/dashboard/customer/customer-info/${row.original.customerId}`}
          className="font-bold hover:underline"
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
      return <ServiceAction id="eheheh" serviceInfo={row.original} />;
    },
  },
];
