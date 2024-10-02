import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchText } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchText(query));
    navigate("/browse");
  };

  return (
    <div className="relative bg-[#1F2937] py-16">
      <div className="container mx-auto px-4 text-center">
        <span className="inline-block bg-[#10B981] text-white font-semibold px-4 py-2 rounded-full mb-4 text-sm tracking-wide animate-pulse">
          Trusted by Thousands of Job Seekers
        </span>

        <h1 className="text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Discover, Apply & Land Your <br />
          <span className="text-[#FBBF24]">Dream Job</span> with{" "}
          <span className="text-[#10B981]">Jobica</span>
        </h1>

        <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
          Jobica is the go-to platform for job seekers and recruiters. Whether
          you're starting your career or looking for new opportunities, we
          provide the best job listings to help you succeed.
        </p>

        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for your dream job..."
            className="w-full py-4 pl-6 pr-16 text-gray-900 rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-[#10B981] transition duration-300"
          />
          <Button
            onClick={searchJobHandler}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#FBBF24] hover:bg-[#F59E0B] text-gray-900 font-bold px-6 py-3 rounded-full transition-colors duration-300"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
