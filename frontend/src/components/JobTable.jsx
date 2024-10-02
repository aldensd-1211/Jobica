import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const JobTable = () => {
  const { adminJobs, searchAdminJobs } = useSelector((store) => store.job);
  const [filterJob, setFilterJob] = useState(adminJobs);
  const navigate = useNavigate();
  useEffect(() => {
    const filterData =
      adminJobs &&
      adminJobs.filter((job) => {
        if (!searchAdminJobs) return true;
        return (
          job.company?.name
            .toLowerCase()
            .includes(searchAdminJobs.toLowerCase()) ||
          job?.title.toLowerCase().includes(searchAdminJobs.toLowerCase())
        );
      });
    setFilterJob(filterData);
  }, [adminJobs, searchAdminJobs]);

  return (
    <div className="bg-[#1F2937] p-4 rounded-md shadow-md">
      <Table className="text-gray-200">
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-200">Company Name</TableHead>
            <TableHead className="text-gray-200">Role</TableHead>
            <TableHead className="text-gray-200">Date</TableHead>
            <TableHead className="text-gray-200 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJob &&
            filterJob?.map((job) => (
              <motion.tr
                className="bg-[#2D3748] hover:bg-[#4A5568] transition duration-200"
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                exit={{ x: -100 }}
                transition={{ duration: 0.5 }}
                key={job?._id}
              >
                <TableCell className="text-gray-200">
                  {job?.company?.name}
                </TableCell>
                <TableCell className="text-gray-200">{job?.title}</TableCell>
                <TableCell className="text-gray-200">
                  {job?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="text-gray-200" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 bg-[#374151] text-gray-200">
                      <div
                        onClick={() => {
                          navigate(`/admin/jobs/${job?._id}/edit`);
                        }}
                        className="flex w-fit items-center gap-2 cursor-pointer"
                      >
                        <Edit2 className="w-4 text-gray-200" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => {
                          navigate(`/admin/jobs/${job?._id}/applicants`);
                        }}
                        className="flex w-fit items-center gap-2 cursor-pointer mt-2"
                      >
                        <Eye className="w-4 text-gray-200" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </motion.tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default JobTable;
