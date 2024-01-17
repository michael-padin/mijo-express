import Navbar from "@/components/common/navbar";
import Profile from "@/components/common/profile";
import SidebarMenuItems from "@/components/common/sidebar-menu-items";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full overflow-hidden">
      <div
        className={`fixed bottom-0 left-0 top-0 z-50 hidden w-72   flex-col border-r  bg-background transition-transform  duration-300 md:translate-x-0 lg:flex`}
      >
        <div className="mx-4 flex items-center justify-between md:justify-center">
          <a href="#" className="flex h-20  items-center"></a>
          <h1 className="text-2xl font-black">
            <Link href={"/"}>
              <span className="text-primary">MiJo </span> Express
            </Link>
          </h1>
          {/* <X
						onClick={closeSidebar}
						className="block cursor-pointer md:hidden"
					/> */}
        </div>
        <ScrollArea>
          <SidebarMenuItems />
        </ScrollArea>
        <Profile />
      </div>

      <div className="w-full lg:ml-72 ">
        <Navbar />
        <ScrollArea className="m-auto h-[calc(100vh-72.8px)] bg-muted dark:bg-background">
          {children}
        </ScrollArea>
      </div>
    </div>
  );
}
