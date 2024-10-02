import React, { useState } from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="bg-gradient-to-b from-[#111827] to-[#374151] py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-10 text-center">
          Latest & Top <span className="text-[#FBBF24]">Job Openings</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allJobs &&
            allJobs?.slice(0, 6).map((job) => (
              <Link
                className="text-white text-lg"
                key={job._id}
                to={`/description/${job?._id}`}
              >
                <LatestJobCard job={job} />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LatestJobs;
