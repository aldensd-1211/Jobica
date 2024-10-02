import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";

export function ProfilePopover() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser } = useSelector((store) => store.auth);
  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        "https://jobica.onrender.com/api/v1/user/logout",
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={authUser?.profile?.profilePhoto} alt="@shadcn" />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-gray-800 text-white shadow-lg p-4 rounded-lg">
        <div className="grid gap-4">
          <div className=" flex  gap-2 space-y-2">
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={authUser?.profile?.profilePhoto}
                alt="@shadcn"
              />
            </Avatar>
            <div>
              <h4 className="font-medium text-lg">{authUser?.fullname}</h4>
              {authUser && authUser?.role === "student" && (
                <p className="text-sm text-gray-400">{authUser?.profile.bio}</p>
              )}
            </div>
          </div>
          <div className="mt-4 text-white">
            {authUser && authUser?.role === "student" && (
              <Link
                to="/profile"
                className="flex w-fit items-center gap-2 cursor-pointer"
              >
                <User2 />
                <p>View Profile</p>
              </Link>
            )}

            <div
              onClick={logoutHandler}
              className="flex items-center gap-2 mt-4 cursor-pointer"
            >
              <LogOut />
              <p>Logout</p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
