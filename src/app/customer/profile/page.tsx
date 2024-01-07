/** @format */

import UserHeader from "@/components/User/UserHeader";
import UserProfile from "@/components/User/UserProfile";

export default function UserProfilePage() {
  return (
    <div className="max-w-8xl flex h-screen flex-col bg-white">
      <UserHeader />
      <UserProfile />
    </div>
  );
}
