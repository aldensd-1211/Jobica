import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#111827] to-[#374151] shadow-lg">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <div>
          <h1 className="text-3xl font-extrabold text-white">
            Job<span className="text-[#FBBF24]">ica</span>
          </h1>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-6 text-white">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="hover:text-[#FBBF24] transition-colors duration-300"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-[#FBBF24] transition-colors duration-300"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="hover:text-[#FBBF24] transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-[#FBBF24] transition-colors duration-300"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="hover:text-[#FBBF24] transition-colors duration-300"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Authentication */}
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-white text-grat-100 hover:bg-white hover:text-gray-900 transition-colors duration-300"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#FBBF24] hover:bg-[#F59E0B] text-gray-900 font-bold px-6 py-2 rounded-full transition-colors duration-300">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="User Profile"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-gray-800 text-white shadow-lg p-4 rounded-lg">
                <div className="flex gap-4 items-center">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="User Profile"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-lg">{user?.fullname}</h4>
                    <p className="text-sm text-gray-400">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-white">
                  {user && user.role === "student" && (
                    <div className="flex items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button
                        variant="link"
                        className="text-white hover:text-[#FBBF24]"
                      >
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-4 cursor-pointer">
                    <LogOut />
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="text-white hover:text-[#FBBF24]"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
