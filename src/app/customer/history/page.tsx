/** @format */

import UserHeader from "@/components/User/UserHeader";
import UserHistory from "@/components/User/UserHistory";

import { UserTransactionHistory } from "@/lib/types/userType";

export default function UserHistoryPage({
  userTransactionData,
}: {
  userTransactionData: UserTransactionHistory[];
}) {
  return (
    <div className="max-w-8xl flex h-screen flex-col bg-white">
      <UserHeader />
      <UserHistory userTransactionData={userTransactionData} />
    </div>
  );
}
