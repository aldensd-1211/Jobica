import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ProfilePopover } from "../ProfilePopover";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { authUser } = useSelector((store) => store.auth);
  return (
    <div className="bg-gradient-to-r from-[#111827] to-[#374151] shadow-lg">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">
            Job<span className="text-[#FBBF24]">ica</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-6 text-white">
            {authUser && authUser.role === "recruiter" ? (
              <>
                <li className="hover:text-[#FBBF24] transition-colors duration-300">
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li className="hover:text-[#FBBF24] transition-colors duration-300">
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-[#FBBF24] transition-colors duration-300">
                  <Link to={"/"}>Home</Link>
                </li>
                <li className="hover:text-[#FBBF24] transition-colors duration-300">
                  <Link to={"/jobs"}>Jobs</Link>
                </li>
                <li className="hover:text-[#FBBF24] transition-colors duration-300">
                  <Link to={"/browse"}>Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!authUser ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button
                  variant={"outline"}
                  className="border-white text-gray-700 hover:bg-white hover:text-gray-900 transition-colors duration-300"
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
            <ProfilePopover />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
