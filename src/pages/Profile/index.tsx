import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/button";
import { useUserProfile } from "../../hooks/useUserProfile";
import { SplashScreen } from "../../components/SplashScreen";

export default function Profile() {
  const { logout } = useAuth();
  const { user, loading, error } = useUserProfile();

  if (loading) return <SplashScreen/>;
  if (error || !user) return <div className="flex items-center justify-center h-screen">{error || "Erro"}</div>;


  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex justify-end fixed top-0 left-0 bg-white">
        <Button onClick={logout} variant="destructive" className="w-[200px] m-4 py-5" >
          Logout
        </Button></div>

        <div className="bg-white shadow-2xl rounded-2xl p-7 flex space-y-4 flex-col items-center m-3.5 w-full md:max-w-[60%] lg:max-w-[25%]">
          <div className="flex flex-col items-center justify-center " >
            <p className="text-sm"> Profile picture</p>
            <div className="aspect-square w-18 h-18 rounded-xl shadow mb-4">
              <img
              src={user.avatar?.high}
              alt={user.name}
              className="w-full h-full object-cover rounded-xl"
            />
            </div>
            
          </div>

          <div className="flex flex-col space-y-1 items-start w-full mb-4">
            <p>Your <span className="font-bold"> Name</span></p>
            <p className="bg-gray-100 p-2 rounded-sm w-full">{user.name}</p>
          </div>
          <div className="flex flex-col space-y-1 items-start  w-full">
            <p>Your <span className="font-bold"> Email</span></p>
            <p className="bg-gray-100 p-2 rounded-sm w-full">{user.email}</p>
          </div>

        </div>
      
 </div>
  );
}
