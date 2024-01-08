import UserPhoto from "@/components/User/UserPhoto";
import UserInfo from "@/components/User/UserInfo";

export default function UserProfile() {
  return (
    <div className="h-[calc(100vh-80px)] w-full overflow-hidden">
      <UserPhoto />
      <UserInfo />
    </div>
  );
}
