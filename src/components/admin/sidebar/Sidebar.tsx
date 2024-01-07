/** @format */
"use client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Link from "next/link";
import React from "react";
import {
  Banknote,
  Bell,
  GanttChartSquare,
  LayoutDashboard,
  LucideIcon,
  MessageSquare,
  Settings,
  ShieldEllipsis,
  View,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";

interface IDashProps {
  Icon: LucideIcon;
  className?: string;
  size?: number;
}

const DashIcon: React.FC<IDashProps> = ({
  Icon,
  className = "",
  size,
  ...props
}) => {
  return <Icon className={className} size={size} {...props} />;
};

const sidebarMenu = [
  {
    groupName: "Working Space",
    items: [
      { name: "Dashboard", url: "", icon: LayoutDashboard },
      { name: "Users", url: "users", icon: Banknote },
      { name: "Orders", url: "orders", icon: View },
      { name: "Applications", url: "applications", icon: View },
    ],
  },
  {
    groupName: "Personal",
    items: [
      { name: "Messages", url: "/messages", icon: MessageSquare },
      { name: "Settings", url: "/settings/account", icon: Settings },
    ],
  },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  return (
    <div className="h-[calc(100vh-162px)] px-4">
      <ul className="flex flex-col gap-4 ">
        {sidebarMenu.map((group, index) => (
          <li key={index} className="w-full ">
            <div className="">
              <p className="mb-4 text-sm font-semibold ">{group.groupName}</p>
              <div className="flex flex-col gap-4">
                {group.items.map((item, index2) => (
                  <Link
                    href={`/admin/${item.url as string}`}
                    key={index2 + 1}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "flex flex-row justify-between rounded-md    p-2 px-4 transition-colors  "
                    )}
                  >
                    <div className="flex items-center gap-2 ">
                      <DashIcon Icon={item.icon} size={20} />
                      <p>{item?.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
