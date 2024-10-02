import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Contact, Mail, Pen } from "lucide-react";
import ApplicationTable from "./ApplicationTable";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { UpdateProfileDialog } from "./UpdateProfileDialog";
import { useNavigate } from "react-router-dom";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { authUser } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const resume = true;
  // protect route
  useEffect(() => {
    if (!authUser) {
      navigate("/");
    }
  }, []);

  return (
    <div className="bg-[#1F2937] min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-[#374151] border border-gray-600 rounded-2xl my-5 p-8 shadow-lg">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={authUser?.profile?.profilePhoto}
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl text-white">
                {authUser?.fullname}
              </h1>
              <p className="text-gray-300">{`${
                authUser?.profile?.bio
                  ? authUser?.profile?.bio
                  : "Add your bio here"
              }`}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
            style={{ borderColor: "#3B82F6", color: "#3B82F6" }}
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2 text-gray-300">
            <Mail className="h-4 w-4" />
            <span>{authUser?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2 text-gray-300">
            <Contact className="h-4 w-4" />
            <span>{authUser?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-5">
          <h1 className="text-white font-semibold">Skills</h1>
          <div className="flex items-center gap-1">
            {authUser?.profile?.skills.length !== 0 ? (
              authUser?.profile?.skills?.map((skill, index) => (
                <Badge key={index} className="bg-[#3B82F6] text-white">
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-300">NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold text-white">Resume</Label>
          {authUser?.profile?.resume ? (
            <a
              target="blank"
              href={authUser?.profile?.resume}
              className="text-[#3B82F6] hover:underline cursor-pointer"
            >
              {authUser?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-300">NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-[#3F4A55] rounded-2xl shadow-lg p-5">
        <h1 className="font-bold text-lg my-5 text-white">Applied Jobs</h1>
        <ApplicationTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
