import { useAuth } from "../hooks/useAuth";
import { Button } from "./ui/button";

export default function Profile() {
    const { logout } = useAuth();

    return (
        <div className="w-full flex justify-end fixed top-0 left-0 bg-white">
            <Button onClick={logout} variant="destructive" data-testid="btn-logout" className="w-[200px] m-4 py-5" >
                Logout
            </Button>
        </div>
    );
}
