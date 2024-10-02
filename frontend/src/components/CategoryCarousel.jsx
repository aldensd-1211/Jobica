import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchText } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Engineer",
  "Data Science",
  "Graphic Designer",
  "UI Developer",
  "Wordpress Developer",
];

export function CategoryCarousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
            {category.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Button
                  onClick={() => {
                    dispatch(setSearchText(item));
                    navigate("/browse");
                  }}
                  variant="outline"
                  className="rounded-full w-full py-4 text-center text-gray-900 border-2 border-gray-200 transition duration-300 hover:bg-gray-200"
                >
                  {item}
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
}
