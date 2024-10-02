import React, { useEffect, useState } from "react";
import JobTable from "./JobTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import Navbar from "./shared/Navbar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchAdminJobs } from "@/redux/jobSlice";

function PostedJobs() {
  useGetAllAdminJobs();
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchAdminJobs(text));
  }, [text]);

  return (
    <div className="bg-[#1F2937] min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-[#374151] text-gray-200 placeholder-gray-400 border-none rounded-md"
            placeholder="Filter by company name & role"
          />
          <Button
            className="bg-[#3B82F6] text-white hover:bg-[#2563EB] transition duration-200"
            onClick={() => navigate("/admin/jobs/create")}
          >
            New Jobs
          </Button>
        </div>
        <JobTable />
      </div>
    </div>
  );
}

export default PostedJobs;
