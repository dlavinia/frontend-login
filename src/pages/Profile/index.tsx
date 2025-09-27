import LogoutButton from "@/components/LogoutButton";
import ProfileCard from "@/components/ProfileCard";

export default function Profile() {
  return (
    <div className="w-full flex justify-center">
      <LogoutButton />
      <ProfileCard />
    </div>
  );
}
