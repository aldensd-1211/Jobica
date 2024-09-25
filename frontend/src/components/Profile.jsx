import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-[#1F2937] min-h-screen">
      {" "}
      {/* Dark background */}
      <Navbar />
      <div className="max-w-4xl mx-auto bg-[#2D3748] border border-gray-700 rounded-2xl my-5 p-8 shadow-lg">
        {" "}
        {/* Darker card background */}
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl text-white">
                {user?.fullname}
              </h1>{" "}
              {/* White text */}
              <p className="text-gray-400">{user?.profile?.bio}</p>{" "}
              {/* Lighter gray text */}
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
            style={{ borderColor: "#3B82F6", color: "#3B82F6" }} // Outline color
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2 text-gray-400">
            {" "}
            {/* Gray text */}
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2 text-gray-400">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="text-white font-semibold">Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index} className="bg-[#3B82F6] text-white">
                  {item}
                </Badge> // Blue badge
              ))
            ) : (
              <span className="text-gray-400">NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold text-white">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-[#3B82F6] hover:underline cursor-pointer" // Blue text
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-400">NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-[#2D3748] rounded-2xl shadow-lg p-5">
        {" "}
        {/* Darker card background */}
        <h1 className="font-bold text-lg my-5 text-white">Applied Jobs</h1>
        {/* Applied Job Table */}
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
