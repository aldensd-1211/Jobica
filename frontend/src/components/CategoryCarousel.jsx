import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="py-10 bg-[#1F2937]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Explore Job Categories
        </h2>
        <p className="text-gray-300 mb-12">
          Choose from various job categories tailored for you.
        </p>
        <Carousel className="w-full max-w-2xl mx-auto">
          <CarouselContent>
            {category.map((cat, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline"
                  className="rounded-full w-full py-4 text-center text-gray-900 border-2 border-gray-200 transition duration-300 hover:bg-gray-200" // Darker text color
                >
                  {cat}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-[#FBBF24] text-[#111827] rounded-full p-2" />
          <CarouselNext className="bg-[#FBBF24] text-[#111827] rounded-full p-2" />
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryCarousel;
