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
import { ReportAdminActions } from "./report-admin-actions";

export const ReportAdminColumns: ColumnDef<any>[] = [
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      return <span>{row.getValue("_id")}</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "userName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="USER" />
    ),
    cell: ({ row }) => {
      return <span>{row.getValue("userName")}</span>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TITLE" />
    ),
    cell: ({ row }) => {
      return <span>{row.getValue("title")}</span>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DESCRIPTION" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span>{row.getValue("description")}</span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CREATED AT" />
    ),
    cell: ({ row }) => {
      const category = row.original.serviceCategory as any;

      return (
        <div className="flex space-x-2">
          <span>{format(row.getValue("createdAt"), "LLL dd, yyyy")}</span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="STATUS" />
    ),
    cell: ({ row }) => {
      const status = row.original.status as any;

      if (status === "pending") {
        return (
          <Badge
            className={cn("bg-yellow-100 text-yellow-800 hover:bg-yellow-100 ")}
          >
            {status}
          </Badge>
        );
      } else if (status === "resolved") {
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            {status}
          </Badge>
        );
      }

      return <span>{row.getValue("status")}</span>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: false,
  },
  {
    enableSorting: false,
    accessorKey: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ACTION" />
    ),
    cell: ({ row }) => {
      return <ReportAdminActions reportInfo={row.original} />;
    },
  },
];
